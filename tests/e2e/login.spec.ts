import { test, expect } from './fixtures/heroku.fixture';

// Data-driven test for login functionality with different username and password combinations
[
    { username: "tomsmith", password: "SuperSecretPassword!", errorMessage: "Your password is invalid! ×" },
    { username: "tomsmith", password: "invalidpassword", errorMessage: "Your password is invalid! ×" },
].forEach(({ username, password, errorMessage }) => {
    test(`error message ${errorMessage} for username: ${username} and password: ${password}`, async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(username, password);
        await expect(loginPage.getErrrorMessage()).resolves.toBe(errorMessage);
    });
});

