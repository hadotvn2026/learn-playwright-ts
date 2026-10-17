import { test, expect } from '@playwright/test';

test('verify exit intent modal shows on mouse out', async ({ page }) => {
    await page.goto('/exit_intent');

    await page.mouse.move(400, 300);
    await page.mouse.move(400, -100, { steps: 5 });

    await expect(page.locator('.modal-title')).toContainText('This is a modal window', { timeout: 10000 });
    await page.locator('.modal-footer p').click();
    await expect(page.locator('.modal-title')).toBeHidden();
});
