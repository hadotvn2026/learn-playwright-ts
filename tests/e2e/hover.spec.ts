import {test, expect} from '@playwright/test';

test('hover test', async ({ page }) => {
  // Go to the dropdown page
  await page.goto('https://the-internet.herokuapp.com/hovers');

  await page.locator('div.figure').nth(0).hover();
  await expect(page.locator('div.figure').nth(0).locator('h5')).toHaveText('name: user1');
});