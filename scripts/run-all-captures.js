const { chromium, path, OUT_DIR, BASE, routes, ACTIONS } = require('./capture-base');
require('./actions-1');
require('./actions-2');
require('./actions-3');

async function main() {
  const ids = Object.keys(routes);
  console.log(`Bắt đầu chụp ${ids.length} test case...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 750 },
    permissions: ['geolocation'],
    geolocation: { latitude: 37.7749, longitude: -122.4194 }
  });
  const page = await context.newPage();

  let done = 0;
  for (const id of ids) {
    const info = routes[id];
    const dest = path.join(OUT_DIR, `${id}.jpg`);
    try {
      if (ACTIONS[id]) {
        await ACTIONS[id](page);
      } else if (info.route && info.route.startsWith('/')) {
        await page.goto(`${BASE}${info.route}`);
      } else {
        await page.goto(BASE);
      }
      await page.waitForTimeout(250);
      await page.screenshot({ path: dest, type: 'jpeg', quality: 78 });
      done++;
      console.log(`[${done}/${ids.length}] Chụp thành công: ${id}.jpg`);
    } catch (err) {
      console.error(`[Lỗi] ${id}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Tất cả screenshot đã được lưu trong web/screenshots/!');
}

main().catch(console.error);
