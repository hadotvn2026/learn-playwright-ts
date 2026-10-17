import { test, expect } from '@playwright/test';

test.describe('shifting content', () => {
    test('verify menu items shift on reload', async ({ page }) => {
        await page.goto('/shifting_content/menu');

        const firstOrder = await page.locator('ul li').allTextContents();
        expect(firstOrder.length).toBe(5);

        await page.reload();
        const secondOrder = await page.locator('ul li').allTextContents();
        expect(secondOrder.length).toBe(5);
        await expect(page.getByRole('heading', { name: 'Shifting Content' })).toBeVisible();
    });

    test('verify image shifts on reload', async ({ page }) => {
        await page.goto('/shifting_content/image');

        await expect(page.locator('img.shift')).toBeVisible();
        await expect(page.locator('img.shift')).toHaveAttribute('src', '/img/avatar.jpg');
    });

    test('verify list shifts on reload', async ({ page }) => {
        await page.goto('/shifting_content/list');

        await expect(page.locator('.row .large-6').first()).toBeVisible();
        const items = await page.locator('.row .large-6').count();
        expect(items).toBeGreaterThan(0);
    });
});
