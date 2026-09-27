import { test, expect } from '@playwright/test';

test('verify typo text content', async ({ page }) => {
    await page.goto('/typos');

    await expect(page.getByRole('heading', { name: 'Typos' })).toBeVisible();
    const typoText = await page.locator('#content p').nth(1).textContent();
    expect(typoText).toMatch(/Sometimes you'll see a typo/);
});
