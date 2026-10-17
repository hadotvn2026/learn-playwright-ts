import { test, expect } from '@playwright/test'

test('handle entry ad popup',
    { tag: '@smoke' },
    async ({ page,browserName }) => {
        test.skip(browserName === 'webkit', 'Still working on it');

        test.setTimeout(120_000)
        await page.goto("https://the-internet.herokuapp.com/entry_ad")

        // Setup the entry ad popup.
        await page.addLocatorHandler(page.getByRole('heading', { name: "THIS IS A MODAL WINDOW" }), async () => {
            await page.locator('.modal .modal-footer p').click();
        });

        await page.waitForTimeout(30000)
        await expect(page.getByRole('heading', { name: "Entry Ad" })).toBeVisible()
    })