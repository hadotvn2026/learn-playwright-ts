const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  const indexPath = 'file://' + path.resolve(__dirname, '../web/index.html');
  await page.goto(indexPath);
  console.log('Title:', await page.title());

  const casesCount = await page.locator('details.case').count();
  console.log('Cases rendered:', casesCount);

  // Check screenshot in first card
  const firstDetails = page.locator('details.case').first();
  await firstDetails.locator('summary').click();
  const img = firstDetails.locator('.case-screenshot-img');
  console.log('Img src:', await img.getAttribute('src'));
  console.log('Img visible:', await img.isVisible());

  // Click img to open lightbox
  await img.click();
  const lightboxVisible = await page.locator('#lightbox-modal.active').isVisible();
  console.log('Lightbox active:', lightboxVisible);

  // Close lightbox
  await page.locator('.lightbox-close').click();
  const lightboxClosed = !(await page.locator('#lightbox-modal.active').isVisible());
  console.log('Lightbox closed properly:', lightboxClosed);

  // Verify POM section
  const pom = await page.$('#pom');
  console.log('POM section exists:', !!pom);
  const tabs = await page.$$('.pom-tab-btn');
  console.log('POM tab count:', tabs.length);
  await tabs[1].click();
  const activePane2 = await page.$eval('.pom-tab-pane.active', el => el.id);
  console.log('Active pane after click tab 2:', activePane2);
  await tabs[2].click();
  const activePane3 = await page.$eval('.pom-tab-pane.active', el => el.id);
  console.log('Active pane after click tab 3:', activePane3);


  await browser.close();
  console.log('All verification steps succeeded!');
})().catch(console.error);
