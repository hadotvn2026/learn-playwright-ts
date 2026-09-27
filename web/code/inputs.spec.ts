import { test, expect } from '@playwright/test';

test('verify number input accepts value', async ({ page }) => {
    await page.goto('/inputs');

    const input = page.locator('input[type="number"]');
    await input.fill('123');
    await expect(input).toHaveValue('123');

    await input.press('ArrowUp');
    await expect(input).toHaveValue('124');
});
