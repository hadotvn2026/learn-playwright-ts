import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

// define all pages under the-internet.herokuapp.com
type HerokuPages = {
    loginPage: LoginPage;
    getCurrentUrl: () => Promise<string>;
};

export const test = base.extend<HerokuPages>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        console.log('loginPage fixture is created == before use() ');
        await use(loginPage);
        console.log('loginPage fixture is disposed == after use() ');
    },
    // Provide a lazy getter so page.url() is read when the test calls it,
    // not eagerly at fixture setup time (before the page has navigated).
    getCurrentUrl: async ({ page }, use) => {
        await use(async () => page.url());
    }
});

export { expect } from '@playwright/test';