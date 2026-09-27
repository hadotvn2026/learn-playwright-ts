import {test, expect} from '@playwright/test';

test('right click context menu', async ({ page }) => {
    // Go to the context menu page
    await page.goto('https://the-internet.herokuapp.com/context_menu');
    
    // Right click on the box
    const box = page.locator('#hot-spot');
    await box.click({ button: 'right' });
    
    // Wait for the alert to appear
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('You selected a context menu');
        await dialog.dismiss();
    });
})
