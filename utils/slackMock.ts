// utils/slackMock.ts

export async function sendSlackAlert(testName: string, rootCause: string, confidence: number) {
    // 1. Dựng cấu trúc payload chuẩn của Slack Block Kit
    const mockPayload = {
        text: `🚨 Automation Alert: ${testName} failed`,
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: "🚨 Automated Test Failure",
                    emoji: true
                }
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*Test Name:*\n\`${testName}\``
                    },
                    {
                        type: "mrkdwn",
                        text: `*AI Triage Root Cause:*\n\`${rootCause}\``
                    }
                ]
            },
            {
                type: "context",
                elements: [
                    {
                        type: "mrkdwn",
                        text: `*Confidence Score:* ${Math.round(confidence * 100)}% | Vui lòng kiểm tra lại Data Test`
                    }
                ]
            }
        ]
    };

    // 2. Mock việc gửi request (In ra console thay vì dùng fetch)
    console.log(`\n[MOCK SLACK API] 🌐 Gửi POST request tới kênh #qa-alerts...`);
    console.log(JSON.stringify(mockPayload, null, 2));
    console.log(`[MOCK SLACK API] ✅ Đã gửi thành công!\n`);
}