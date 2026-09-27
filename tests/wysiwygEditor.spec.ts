import { test, expect } from '@playwright/test';

test('verify editor has default content', async ({ page }) => {
    await page.goto('/tinymce');

    const editor = page.frameLocator('#mce_0_ifr').locator('body#tinymce');
    await expect(editor).toContainText('Your content goes here.');
});
