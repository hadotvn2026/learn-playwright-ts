import { test, expect } from '@playwright/test';

test('verify notification message shows after click', async ({ page }) => {
    await page.goto('/notification_message_rendered');

    const flash = page.locator('#flash');
    for (let i = 0; i < 5; i++) {
        await page.getByRole('link', { name: 'Click here' }).click();
        try {
            await expect(flash).toContainText(/Action (successful|unsuccessful, please try again)/, { timeout: 5000 });
            break;
        } catch {
            if (i === 4) throw new Error('No notification message appeared after 5 tries');
        }
    }
});

