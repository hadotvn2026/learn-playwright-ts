import { test, expect } from '@playwright/test';

test('verify new window opens with text', async ({ page }) => {
    await page.goto('/windows');

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'Click Here' }).click(),
    ]);

    await expect(newPage.getByRole('heading', { name: 'New Window' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible();
});
