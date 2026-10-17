import {test, expect} from '@playwright/test';

test('change range slider value', async ({ page }) => {
    // Go to the horizontal slider page
    await page.goto('https://the-internet.herokuapp.com/horizontal_slider');
    
    // Get the initial value of the slider
    const slider = page.locator('.sliderContainer input');
    
    var sliderValue = Number(await page.locator('#range').innerText());
    const range = 3.5 // set a value between 0-5 , intervals of 0.5 only
    while (sliderValue < range) {   
        await slider.press('ArrowRight');
        sliderValue = Number(await page.locator('#range').innerText());
        console.log("Press ArrowRight")
    }
    expect(sliderValue).toBe(range);
})
