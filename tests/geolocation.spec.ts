import { test, expect } from '@playwright/test';

test('verify geolocation shows coordinates', async ({ browser }) => {
    const context = await browser.newContext({
        permissions: ['geolocation'],
        geolocation: { latitude: 10.762622, longitude: 106.660172 },
        locale: 'en-US',
    });
    const page = await context.newPage();

    await page.goto('/geolocation');
    await page.getByRole('button', { name: 'Where am I?' }).click();

    await expect(page.locator('#lat-value')).toHaveText('10.762622', { timeout: 10000 });
    await expect(page.locator('#long-value')).toHaveText('106.660172', { timeout: 10000 });

    await context.close();
});
