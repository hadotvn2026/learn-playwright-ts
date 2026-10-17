import { test, expect } from '@playwright/test';

test('verify hidden element loads after start', async ({ page }) => {
    await page.goto('/dynamic_loading/1');

    await expect(page.locator('#finish')).toBeHidden();
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.locator('#finish h4')).toHaveText('Hello World!', { timeout: 15000 });
});

test('verify rendered element loads after start', async ({ page }) => {
    await page.goto('/dynamic_loading/2');

    await expect(page.locator('#finish')).toBeHidden();
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.locator('#finish h4')).toHaveText('Hello World!', { timeout: 15000 });
});
