import { test, expect } from '@playwright/test';

test('verify large dom table rows', async ({ page }) => {
    await page.goto('/large');

    await expect(page.getByRole('heading', { name: 'Large & Deep DOM' })).toBeVisible();
    await expect(page.locator('#large-table tbody tr')).toHaveCount(50);
    await expect(page.locator('#large-table tbody tr').first()).toContainText('1.1');
});

test('verify sibling divs structure', async ({ page }) => {
    await page.goto('/large');

    await expect(page.locator('#sibling-1\\.1')).toBeVisible();
    await expect(page.locator('#no-siblings')).toHaveText('No siblings');
});
