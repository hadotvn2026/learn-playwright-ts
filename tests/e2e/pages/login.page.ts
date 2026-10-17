import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    /// properties <locators>
    readonly page: Page;

    // constructor
    constructor(page: Page) {
        this.page = page;
    }

    //methods <user behavior methods> ==> define first 
    async open() {
        this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async login(username: string, password: string) {
        await this.page
            .getByRole('textbox', { name: 'Username' })
            .fill(username);
        await this.page
            .getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page
            .getByRole('button', { name: 'Login' })
            .click();
    }

    async isLoginSuccess() {
        return await this.page
            .getByRole('heading', { name: 'Secure Area' })
            .first()
            .isVisible();
    }

    async isPasswordErrorVisible() {
        return await this.page.getByText('Your password is invalid! ×').isVisible();
    }

    async isUsernameErrorVisible() {
        return await this.page.getByText('Your username is invalid! ×').isVisible();
    }

    async getErrrorMessage() {
        return await this.page.locator('.error').textContent();
    }
}