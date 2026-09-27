const { ACTIONS, BASE } = require('./capture-base');

ACTIONS['TC17.1'] = async (p) => {
  await p.goto(`${BASE}/entry_ad`);
  await p.waitForSelector('#modal', { state: 'visible', timeout: 4000 }).catch(() => {});
};
ACTIONS['TC17.2'] = async (p) => {
  await p.goto(`${BASE}/exit_intent`);
  await p.mouse.move(300, 200);
  await p.mouse.move(300, 0);
};
ACTIONS['TC18.1'] = async (p) => {
  await p.goto(`${BASE}/infinite_scroll`);
  await p.evaluate(() => window.scrollBy(0, 1000));
};
ACTIONS['TC18.2'] = async (p) => {
  await p.goto(`${BASE}/floating_menu`);
  await p.evaluate(() => window.scrollBy(0, 800));
};
ACTIONS['TC19'] = async (p) => {
  await p.goto(`${BASE}/windows`);
  await p.evaluate(() => {
    const box = document.createElement('div');
    box.innerHTML = '<div style="margin-top:20px;padding:16px;background:#eff6ff;border:2px dashed #3b82f6;border-radius:8px;"><strong>Cửa sổ mới đã mở:</strong> /windows/new với tiêu đề "New Window"</div>';
    document.querySelector('.example')?.appendChild(box);
  });
};
ACTIONS['TC20.1'] = async (p) => {
  await p.goto(`${BASE}/dynamic_controls`);
  await p.getByRole('button', { name: 'Remove' }).click();
  await p.waitForSelector('#message');
};
ACTIONS['TC20.2'] = async (p) => {
  await p.goto(`${BASE}/dynamic_controls`);
  await p.getByRole('button', { name: 'Enable' }).click();
  await p.waitForSelector('#message');
};
ACTIONS['TC21.1'] = async (p) => {
  await p.goto(`${BASE}/dynamic_loading/1`);
  await p.getByRole('button', { name: 'Start' }).click();
  await p.waitForSelector('#finish', { state: 'visible', timeout: 7000 }).catch(() => {});
};
ACTIONS['TC21.2'] = async (p) => {
  await p.goto(`${BASE}/dynamic_loading/2`);
  await p.getByRole('button', { name: 'Start' }).click();
  await p.waitForSelector('#finish', { state: 'visible', timeout: 7000 }).catch(() => {});
};
ACTIONS['TC23.2'] = async (p) => {
  await p.goto(`${BASE}/challenging_dom`);
  await p.locator('.button').first().click();
};
ACTIONS['TC23.3'] = async (p) => {
  await p.goto(`${BASE}/large`);
  await p.evaluate(() => {
    const r = document.querySelector('#large-table tbody tr:nth-child(25)');
    if (r) { r.scrollIntoView({ block: 'center' }); r.style.background = '#fdeede'; }
  });
};
ACTIONS['TC23.4'] = async (p) => {
  await p.goto(`${BASE}/large`);
  await p.evaluate(() => {
    const el = document.querySelector('#sibling-50\\.3');
    if (el) { el.scrollIntoView({ block: 'center' }); el.style.outline = '3px solid #c2410c'; }
  });
};
ACTIONS['TC24.1'] = async (p) => {
  await p.goto(`${BASE}/add_remove_elements/`);
  const btn = p.getByRole('button', { name: 'Add Element' });
  await btn.click(); await btn.click(); await btn.click();
};
ACTIONS['TC24.3'] = async (p) => {
  await p.goto(`${BASE}/notification_message`);
  await p.getByRole('link', { name: 'Click here' }).click();
  await p.waitForSelector('#flash');
};
ACTIONS['TC25.1'] = async (p) => {
  await p.goto(`${BASE}/forgot_password`);
  await p.locator('#email').fill('learner@playwright.dev');
  await p.locator('#form_submit').click();
};
ACTIONS['TC26.1'] = async (p) => {
  await p.goto(`${BASE}/jqueryui/menu`);
  await p.getByRole('menuitem', { name: 'Enabled' }).hover();
  await p.waitForTimeout(200);
  await p.getByRole('menuitem', { name: 'Downloads' }).hover();
};
ACTIONS['TC26.3'] = async (p) => {
  await p.goto(`${BASE}/geolocation`);
  await p.getByRole('button', { name: 'Where am I?' }).click();
  await p.waitForSelector('#lat-value', { timeout: 4000 }).catch(() => {});
};
