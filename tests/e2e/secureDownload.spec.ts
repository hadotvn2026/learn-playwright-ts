import { test, expect } from '@playwright/test';
import fs from 'fs';

test.use({ httpCredentials: { username: 'admin', password: 'admin' } });

test('download a secure file', async ({ page, context }) => {
    await context.setHTTPCredentials({ username: 'admin', password: 'admin' });
    await page.goto('/download_secure');

    const firstFile = page.locator('#content a').first();
    const fileName = (await firstFile.textContent())?.trim() ?? '';
    expect(fileName.length).toBeGreaterThan(0);

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        firstFile.click(),
    ]);

    expect(download.suggestedFilename()).toBe(fileName);
    const filePath = 'downloads/' + download.suggestedFilename();
    await download.saveAs(filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();
});
