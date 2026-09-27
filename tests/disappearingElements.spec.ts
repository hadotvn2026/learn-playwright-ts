import { test, expect } from '@playwright/test';

test('verify disappearing elements menu', async ({ page }) => {
    await page.goto('/disappearing_elements');

    await expect(page.getByRole('heading', { name: 'Disappearing Elements' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

    await page.reload();
    const menuItems = await page.locator('ul li').count();
    expect(menuItems).toBeGreaterThanOrEqual(4);
});
