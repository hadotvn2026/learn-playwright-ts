import {test, expect} from '@playwright/test'

test('login successfully with valid credential', async({page}) =>{
    await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth")
    await expect(page.getByRole('heading', { name: 'Basic Auth' })).toBeVisible()
})