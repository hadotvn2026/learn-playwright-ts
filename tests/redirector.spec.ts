import { test, expect } from '@playwright/test';

test('verify redirect to status code page', async ({ page }) => {
    await page.goto('/redirector');

    await page.locator('#redirect').click();
    await expect(page).toHaveURL(/\/status_codes/);
    await expect(page.getByRole('heading', { name: 'Status Codes' })).toBeVisible();
});

