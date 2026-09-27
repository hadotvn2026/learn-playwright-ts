import {test,expect} from '@playwright/test';

test('verify broken image', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    
    const images = page.locator('img');
    
    // Check if the image is present
    const allImages = await images.all();

    for (const image of allImages) {
        const imgSrc = await image.getAttribute('src');
        expect(imgSrc?.length).toBeGreaterThan(1)
        const res = await page.request.get("https://the-internet.herokuapp.com/"+imgSrc)
        expect.soft(res.status()).toBe(200)// Ensure src attribute exists
    }   
});
