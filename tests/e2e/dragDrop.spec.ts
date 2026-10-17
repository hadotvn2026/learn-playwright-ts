import { test, expect } from '@playwright/test';
// mouse actions
test('drag and drop', async ({ page }) => {
    // Go to the drag and drop page
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    let colA_AfterDrag = await page.locator('#column-a').textContent();
    expect(colA_AfterDrag).toBe('A');

    await page
        .locator('#column-a') // source 
        .dragTo(page.locator('#column-b')); // target

    colA_AfterDrag = await page.locator('#column-a').textContent();
    expect(colA_AfterDrag).toBe('B');
});
