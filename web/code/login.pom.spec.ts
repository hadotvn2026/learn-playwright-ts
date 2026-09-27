import { test, expect } from '../pages/base';

test.describe('Heroku App - Login with POM and Fixture', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('login with valid credentials', async ({ loginPage }) => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');
        const messageText = await loginPage.getFlashmessage();
        expect(messageText).toContain('You logged into a secure area!');
    });

    test('login with invalid credentials', async ({ loginPage }) => {
        await loginPage.login('invalidUser', 'invalidPassword');
        const messageText = await loginPage.getFlashmessage();
        expect(messageText).toContain('Your username is invalid!');
    });
});

