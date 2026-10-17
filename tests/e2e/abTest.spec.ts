import { test, expect } from '@playwright/test';

test('verify ab test content', async ({ page }) => {
    await page.goto('/abtest');

    await expect(page.getByRole('heading')).toContainText('A/B Test');
    await expect(page.locator('#content p')).not.toBeEmpty();
});
