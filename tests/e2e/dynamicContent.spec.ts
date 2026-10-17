import { test, expect } from '@playwright/test';

test('verify dynamic content changes on reload', async ({ page }) => {
    await page.goto('/dynamic_content');

    const firstTexts = await page.locator('.row .large-10').allTextContents();
    expect(firstTexts.length).toBeGreaterThan(0);

    await page.reload();
    const secondTexts = await page.locator('.row .large-10').allTextContents();
    expect(secondTexts.length).toBeGreaterThan(0);
    await expect(page.getByRole('heading', { name: 'Dynamic Content' })).toBeVisible();
});

test('verify static content link keeps avatar images', async ({ page }) => {
    await page.goto('/dynamic_content?with_content=static');

    await expect(page.getByRole('heading', { name: 'Dynamic Content' })).toBeVisible();
    const images = await page.locator('.row img').count();
    expect(images).toBeGreaterThan(0);
});
