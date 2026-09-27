const { ACTIONS, BASE, path, fs } = require('./capture-base');

ACTIONS['TC07.1'] = async (p) => {
  await p.goto(`${BASE}/javascript_alerts`);
  p.once('dialog', d => d.accept());
  await p.getByRole('button', { name: 'Click for JS Alert' }).click();
};
ACTIONS['TC07.2'] = async (p) => {
  await p.goto(`${BASE}/javascript_alerts`);
  p.once('dialog', d => d.dismiss());
  await p.getByRole('button', { name: 'Click for JS Confirm' }).click();
};
ACTIONS['TC07.3'] = async (p) => {
  await p.goto(`${BASE}/javascript_alerts`);
  p.once('dialog', d => d.accept());
  await p.getByRole('button', { name: 'Click for JS Confirm' }).click();
};
ACTIONS['TC07.4'] = async (p) => {
  await p.goto(`${BASE}/javascript_alerts`);
  p.once('dialog', d => d.accept('Playwright TS'));
  await p.getByRole('button', { name: 'Click for JS Prompt' }).click();
};
ACTIONS['TC08'] = async (p) => {
  await p.goto(`${BASE}/hovers`);
  await p.locator('.figure').first().hover();
};
ACTIONS['TC09'] = async (p) => {
  await p.goto(`${BASE}/context_menu`);
  p.once('dialog', d => d.accept());
  await p.locator('#hot-spot').click({ button: 'right' });
};
ACTIONS['TC10'] = async (p) => {
  await p.goto(`${BASE}/drag_and_drop`);
  await p.locator('#column-a').dragTo(p.locator('#column-b'));
};
ACTIONS['TC11'] = async (p) => {
  await p.goto(`${BASE}/horizontal_slider`);
  const sl = p.locator('input[type="range"]');
  await sl.focus();
  for (let i = 0; i < 7; i++) await p.keyboard.press('ArrowRight');
};
ACTIONS['TC12'] = async (p) => {
  await p.goto(`${BASE}/key_presses`);
  await p.locator('#target').click();
  await p.keyboard.press('Control');
};
ACTIONS['TC13'] = async (p) => {
  await p.goto(`${BASE}/inputs`);
  await p.locator('input[type="number"]').fill('9999');
};
ACTIONS['TC14.2'] = async (p) => {
  await p.goto(`${BASE}/download`);
  await p.evaluate(() => {
    document.querySelectorAll('.example a').forEach((l, i) => {
      if (i < 3) {
        l.style.background = '#fef08a';
        l.style.padding = '2px 6px';
        l.style.borderRadius = '4px';
      }
    });
  });
};
ACTIONS['TC14.3'] = async (p) => {
  await p.goto(`https://admin:admin@the-internet.herokuapp.com/download_secure`);
};
ACTIONS['TC14.4'] = async (p) => {
  await p.goto(`${BASE}/upload`);
  const f = path.join(__dirname, '../uploads/resume.txt');
  if (fs.existsSync(f)) {
    await p.setInputFiles('#file-upload', f);
    await p.locator('#file-submit').click();
    await p.waitForSelector('#uploaded-files').catch(() => {});
  }
};
ACTIONS['TC15.1'] = async (p) => {
  await p.goto(`https://admin:admin@the-internet.herokuapp.com/basic_auth`);
};
ACTIONS['TC15.2'] = async (p) => {
  await p.goto(`https://admin:admin@the-internet.herokuapp.com/digest_auth`);
};
