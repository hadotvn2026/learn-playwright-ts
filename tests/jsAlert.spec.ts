import {test, expect} from '@playwright/test';

test('js alert', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('I am a JS Alert')
        await dialog.accept();
    });

    await expect(page.getByText('You successfully clicked an alert')).toBeVisible();
})

test('js confirm =>cancel', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('I am a JS Confirm')
        await dialog.dismiss();
    });

    await expect(page.getByText('You clicked: Cancel')).toBeVisible();
})

test('js confirm =>OK', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('I am a JS Confirm')
        await dialog.accept();
    });

    await expect(page.getByText('You clicked: OK')).toBeVisible();
})
test('js prompt ', async ({page}) => {
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('I am a JS prompt')
        await dialog.accept("Hello World")
    });

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.getByText('You entered: Hello World')).toBeVisible();
})