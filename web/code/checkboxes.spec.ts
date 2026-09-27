import {test, expect} from '@playwright/test';

test('verify check success',async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes')

    await page.getByRole('checkbox').first().check()
    await expect(page.getByRole('checkbox').first()).toBeChecked()

    await page.getByRole('checkbox').last().check()
    await expect(page.getByRole('checkbox').last()).toBeChecked()
})

test('verify uncheck success',async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes')

    await page.getByRole('checkbox').first().uncheck()
    await expect(page.getByRole('checkbox').first()).not.toBeChecked()
    
    await page.getByRole('checkbox').last().uncheck()
    await expect(page.getByRole('checkbox').last()).not.toBeChecked()
})