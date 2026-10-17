import { test, expect } from '@playwright/test';

test('verify floating menu stays visible on scroll', async ({ page }) => {
    await page.goto('/floating_menu');

    const menu = page.locator('#menu');
    await expect(menu.getByRole('link', { name: 'Home' })).toBeVisible();

    await page.mouse.wheel(0, 2000);
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Contact' })).toBeVisible();

    await menu.getByRole('link', { name: 'News' }).click();
    await expect(page).toHaveURL(/.*#news/);
});
