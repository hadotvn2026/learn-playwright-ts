import { test, expect } from '@playwright/test';

test('remove and add checkbox', async ({ page }) => {
    await page.goto('/dynamic_controls');

    const checkbox = page.locator('#checkbox-example input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('#message')).toHaveText("It's gone!", { timeout: 10000 });
    await expect(checkbox).toBeHidden();

    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('#message')).toHaveText("It's back!", { timeout: 10000 });
    await expect(checkbox).toBeVisible({ timeout: 10000 });
});

test('enable and disable input', async ({ page }) => {
    await page.goto('/dynamic_controls');

    const input = page.locator('#input-example input');
    await expect(input).toBeDisabled();
    await page.getByRole('button', { name: 'Enable' }).click();
    await expect(page.locator('#message')).toHaveText("It's enabled!", { timeout: 10000 });
    await expect(input).toBeEnabled();
    await input.fill('hello');
    await expect(input).toHaveValue('hello');

    await page.getByRole('button', { name: 'Disable' }).click();
    await expect(page.locator('#message')).toHaveText("It's disabled!", { timeout: 10000 });
    await expect(input).toBeDisabled();
});
