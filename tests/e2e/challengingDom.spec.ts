import { test, expect } from '@playwright/test';

test('verify challenging dom table', async ({ page }) => {
    await page.goto('/challenging_dom');

    await expect(page.getByRole('heading', { name: 'Challenging DOM' })).toBeVisible();
    await expect(page.locator('table tbody tr')).toHaveCount(10);

    const firstButton = page.locator('.button').first();
    const beforeId = await firstButton.getAttribute('id');
    await firstButton.click();
    const afterId = await page.locator('.button').first().getAttribute('id');
    expect(afterId).not.toBe(beforeId);
});
