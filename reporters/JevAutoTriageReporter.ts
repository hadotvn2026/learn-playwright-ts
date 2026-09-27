// reporters/JevAutoTriageReporter.ts
import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import { triageTestError } from '../utils/jevTriage';
import { sendSlackAlert } from '../utils/slackMock';
import { execSync } from 'child_process';
import * as fs from 'fs';
export default class JevAutoTriageReporter implements Reporter {
    private failedTests: { name: string, error: string }[] = [];

    onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === 'failed' && result.error?.message) {
            this.failedTests.push({ name: test.title, error: result.error.message });
        }
    }

    async onEnd(result: FullResult) {
        if (this.failedTests.length === 0) return;

        console.log(`\n🤖 Bắt đầu phân tích ${this.failedTests.length} tests thất bại bằng Jev...`);

        // Map đồng loạt qua các hàm async (Chạy song song)
        const triagePromises = this.failedTests.map(async (t) => {
            const aiDecision = await triageTestError(t.error, t.name);
            return { test: t.name, rootCause: aiDecision.result, confidence: aiDecision.confidence };
        });

        const triageResults = await Promise.all(triagePromises);

        // Xuất summary
        console.table(triageResults);
        for (const result of triageResults) {
            if (result.confidence < 0.75) {
                // Fallback: AI không chắc chắn, cần con người vào xem
                console.log(`⚠️ Bỏ qua auto-action cho ${result.test} vì AI tự tin thấp.`);
                continue;
            }

            switch (result.rootCause) {
                case 'NETWORK_TIMEOUT':
                    // Logic: Mạng giật -> Kích hoạt cơ chế Auto-Retry qua API CI/CD
                    console.log(`🔄 Gắn tag @Flaky cho test: ${result.test}`);
                    break;

                case 'DATA_ISSUE':
                    // Logic: Lỗi dữ liệu test -> Bắn cảnh báo cho QA kiểm tra lại DB Staging
                    // Ví dụ trong test của bạn, có thể user name cần test đã bị xóa khỏi DB
                    await sendSlackAlert(result.test, result.rootCause, result.confidence);
                    if (result.confidence >= 0.85) {
                        console.log(`🛠️ Kích hoạt GenAI Auto-Healing cho test: ${result.test}...`);
                        const cleanName = result.test.replace(/[^a-zA-Z0-9]/g, '_');

                        // 1. Tạo file System Prompt ép khuôn hành vi của Claude
                        const instructionPrompt = `
                    You are an expert QA Automation Engineer.
                    Task: Fix the Playwright locator issue for the failed test.
                    
                    Context:
                    - Error Log: ai-triage-logs/${cleanName}-error.txt
                    - DOM Snapshot: ai-triage-logs/${cleanName}-dom.html
                    
                    Rules:
                    1. Analyze the DOM to find the correct CSS/XPath for the failing element.
                    2. Locate the corresponding Page Object Model class in the codebase.
                    3. Update the locator.
                    4. CRITICAL: Maintain encapsulation. Operate user behaviors on the page. Do NOT create methods with a chain of single interactions.
                    5. Create a new branch, commit the fix, and push.
                `.trim();

                        const promptPath = `ai-triage-logs/${cleanName}-instruction.txt`;
                        fs.writeFileSync(promptPath, instructionPrompt);

                        // 2. Kích hoạt Claude Code (Chạy không cần tương tác - Non-interactive mode)
                        try {
                            console.log(`🤖 Claude đang đọc DOM và sửa code...`);
                            // Lưu ý: Tuỳ thuộc vào cách bạn config Claude CLI
                            execSync(`claude --prompt-file ${promptPath} --auto-approve`, { stdio: 'inherit' });
                            console.log(`✅ Đã tạo Pull Request sửa lỗi tự động!`);
                        } catch (error: unknown) {
                            console.error(`❌ Auto-healing thất bại:`, String(error));
                        }
                    } else {
                        console.log(`⚠️ Jev báo LOCATOR_ISSUE nhưng confidence thấp (${result.confidence}). Cần QA review.`);
                    }
                    break;

                case 'LOCATOR_ISSUE':
                    // Logic: UI thay đổi -> Đẩy log sang Tier 2 (Claude Code / MCP) để sinh code sửa locator
                    console.log(`🛠️ Gửi log của ${result.test} sang Claude để tự động update Page Object...`);
                    break;

                default:
                    console.log(`🔍 Cần Manual Review cho test: ${result.test}`);
            }
        }
        // Ở đây bạn có thể dùng API Slack/Teams để bắn ra một report: 
        // "Có 10 test tạch, trong đó 8 cái do NETWORK, 2 cái do LOCATOR_ISSUE (Có thể là bug thật)"
    }
}