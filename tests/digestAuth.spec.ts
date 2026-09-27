import { test, expect } from '@playwright/test';

test.use({ httpCredentials: { username: 'admin', password: 'admin' } });

test('login successfully with digest auth', async ({ page }) => {
    await page.goto('/digest_auth');

    await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();
});
