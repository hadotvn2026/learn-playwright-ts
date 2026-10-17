import { test, expect } from '@playwright/test';

test('verify key press result', async ({ page }) => {
    await page.goto('/key_presses');

    const target = page.locator('#target');
    await target.click();
    await target.press('Tab');
    await expect(page.locator('#result')).toContainText('You entered: TAB');

    await target.press('a');
    await expect(page.locator('#result')).toContainText('You entered: A');
});

