const { ACTIONS, BASE } = require('./capture-base');

ACTIONS['TC01.1'] = async (p) => {
  await p.goto(`${BASE}/login`);
  await p.getByLabel('Username').fill('tomsmith');
  await p.getByLabel('Password').fill('SuperSecretPassword!');
  await p.getByRole('button', { name: 'Login' }).click();
  await p.waitForSelector('#flash');
};
ACTIONS['TC01.2'] = async (p) => {
  await p.goto(`${BASE}/login`);
  await p.getByLabel('Username').fill('tomsmith');
  await p.getByLabel('Password').fill('wrongpassword');
  await p.getByRole('button', { name: 'Login' }).click();
  await p.waitForSelector('#flash');
};
ACTIONS['TC01.3'] = async (p) => {
  await p.goto(`${BASE}/login`);
  await p.getByLabel('Username').fill('wrongusername');
  await p.getByLabel('Password').fill('SuperSecretPassword!');
  await p.getByRole('button', { name: 'Login' }).click();
  await p.waitForSelector('#flash');
};
ACTIONS['TC02.1'] = async (p) => {
  await p.goto(`${BASE}/checkboxes`);
  await p.locator('input[type="checkbox"]').first().check();
};
ACTIONS['TC02.2'] = async (p) => {
  await p.goto(`${BASE}/checkboxes`);
  await p.locator('input[type="checkbox"]').nth(1).uncheck();
};
ACTIONS['TC03.1'] = async (p) => {
  await p.goto(`${BASE}/dropdown`);
  await p.locator('#dropdown').selectOption({ label: 'Option 2' });
};
ACTIONS['TC03.2'] = async (p) => {
  await p.setContent(`
    <div style="padding:40px; font-family:-apple-system, sans-serif;">
      <h2>Multiple Select Options Demo</h2>
      <p style="color:#666;">Thao tác chọn nhiều options qua Playwright: <code>locator.selectOption(['apple', 'banana'])</code></p>
      <select multiple style="width:220px; height:120px; font-size:15px; padding:8px; border:2px solid #c2410c; border-radius:8px;">
        <option selected>🍎 Apple (Táo)</option>
        <option selected>🍌 Banana (Chuối)</option>
        <option>🍊 Orange (Cam)</option>
        <option>🍇 Grape (Nho)</option>
      </select>
      <p style="color:#15803d; font-weight:bold; margin-top:16px;">✓ Đã chọn đồng thời: Apple, Banana</p>
    </div>
  `);
};
ACTIONS['TC05.1'] = async (p) => {
  await p.goto(`${BASE}/tables`);
  await p.evaluate(() => {
    document.querySelectorAll('#table1 tbody tr').forEach(r => {
      if (r.children[3]?.textContent.includes('$100.00')) {
        r.style.background = '#fef08a';
        r.children[3].style.fontWeight = 'bold';
        r.children[3].style.color = '#c2410c';
      }
    });
  });
};
ACTIONS['TC05.2'] = async (p) => {
  await p.goto(`${BASE}/tables`);
  await p.evaluate(() => {
    document.querySelectorAll('#table1 tbody tr').forEach(r => {
      if (r.children[3]?.textContent.includes('$50.00')) {
        r.style.background = '#bbf7d0';
        r.children[3].style.fontWeight = 'bold';
        r.children[3].style.color = '#15803d';
      }
    });
  });
};
ACTIONS['TC06.2'] = async (p) => {
  await p.goto(`${BASE}/iframe`);
  try {
    await p.frameLocator('#mce_0_ifr').locator('#tinymce').fill('Soạn thảo trực tiếp bên trong TinyMCE WYSIWYG iframe!');
  } catch (e) {}
};
