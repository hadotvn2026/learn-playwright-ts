import { test as base } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';


export const test = base.extend({
    // Khởi tạo POM và các setup khác ở đây...
});


test.afterEach(async ({ page }, testInfo) => {
    // So sánh với expectedStatus để bắt được cả test bị timeout, không chỉ status === 'failed'
    if (testInfo.status === testInfo.expectedStatus) return;

    const logDir = path.join(process.cwd(), 'ai-triage-logs');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

    // cleanName phải trùng với cách đặt tên file trong JevAutoTriageReporter
    const cleanName = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_');

    // 1. Lưu Error Trace (luôn có) - gộp toàn bộ lỗi để AI có đủ ngữ cảnh phân loại
    const errorMessage =
        testInfo.errors.map((error) => error.message).join('\n\n') || 'Unknown error';
    fs.writeFileSync(path.join(logDir, `${cleanName}-error.txt`), errorMessage, 'utf-8');

    // 2. Lưu DOM một cách an toàn
    try {
        // Kiểm tra xem page có còn mở không trước khi lấy nội dung
        if (!page.isClosed()) {
            const domSnapshot = await page.content();
            fs.writeFileSync(path.join(logDir, `${cleanName}-dom.html`), domSnapshot, 'utf-8');
            console.log(`📸 Đã lưu DOM Snapshot cho: ${testInfo.title}`);
        } else {
            console.log(`⚠️ Page đã đóng, không thể chụp DOM.`);
        }
    } catch (e) {
        console.log(`⚠️ Lỗi khi trích xuất DOM: ${e}`);
    }
});