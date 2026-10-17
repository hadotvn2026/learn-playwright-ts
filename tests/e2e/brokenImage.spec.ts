import { test, expect } from '@playwright/test';

test('verify broken image', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');

    const images = page.locator('.example img');
    const allImages = await images.all();
    expect(allImages.length).toBeGreaterThan(0);

    const results: { src: string; status: number }[] = [];
    for (const image of allImages) {
        const imgSrc = await image.getAttribute('src');
        expect(imgSrc?.length).toBeGreaterThan(0);
        const res = await page.request.get('https://the-internet.herokuapp.com/' + imgSrc);
        results.push({ src: imgSrc || '', status: res.status() });
    }

    // Verify broken images (404) and working images (200) are correctly detected
    const brokenImages = results.filter(r => r.status === 404);
    const validImages = results.filter(r => r.status === 200);

    expect(brokenImages.length).toBeGreaterThan(0);
    expect(validImages.length).toBeGreaterThan(0);
});
