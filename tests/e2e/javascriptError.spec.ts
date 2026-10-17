import { test, expect } from '@playwright/test';

test('verify console error on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/javascript_error');
    await expect(page.getByText('This page has a JavaScript error')).toBeVisible();
    await page.waitForTimeout(1000);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.join(' ')).toContain('Cannot read properties of undefined');
});
