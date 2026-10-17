import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('download a file', async ({ page }) => {
    await page.goto('/download');

    // Dynamically locate the first available file link to avoid hardcoding volatile filenames
    const fileLink = page.locator('.example a').first();
    const expectedFilename = (await fileLink.innerText()).trim();

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        fileLink.click(),
    ]);

    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toBe(expectedFilename);

    const filePath = 'downloads/' + suggestedFilename;
    await download.saveAs(filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();
});

test('download multiple files', async ({ page }) => {
    await page.goto('/download');

    const fileLinks = page.locator('.example a');
    const totalToDownload = Math.min(await fileLinks.count(), 2);

    for (let i = 0; i < totalToDownload; i++) {
        const link = fileLinks.nth(i);
        const expectedFilename = (await link.innerText()).trim();

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            link.click(),
        ]);

        const suggestedFilename = download.suggestedFilename();
        expect(suggestedFilename).toBe(expectedFilename);

        const filePath = 'downloads/' + suggestedFilename;
        await download.saveAs(filePath);
        expect(fs.existsSync(filePath)).toBeTruthy();
    }
});