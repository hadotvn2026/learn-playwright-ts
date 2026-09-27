import { test, expect } from '@playwright/test';

test('verify jquery ui menu navigation', async ({ page }) => {
    await page.goto('/jqueryui/menu');

    await expect(page.getByRole('heading', { name: 'JQueryUI - Menu' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Enabled' }).hover();
    await page.getByRole('menuitem', { name: 'Downloads' }).hover();

    const pdfLink = page.locator('a[href="/download/jqueryui/menu/menu.pdf"]');
    await expect(pdfLink).toBeVisible();
    await expect(page.locator('a[href="/download/jqueryui/menu/menu.csv"]')).toBeVisible();
});
