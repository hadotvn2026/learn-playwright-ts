import { test, expect } from '@playwright/test';

test('verify forgot password form submits', async ({ page }) => {
    await page.goto('/forgot_password');

    await expect(page.getByRole('heading', { name: 'Forgot Password' })).toBeVisible();
    await page.locator('#email').fill('test@example.com');
    await page.locator('#form_submit').click();

    await expect(page.locator('h1')).toContainText('Internal Server Error', { timeout: 15000 });
});

