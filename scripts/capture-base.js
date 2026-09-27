const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '../web/screenshots');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const BASE = 'https://the-internet.herokuapp.com';
const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json'), 'utf8'));

const ACTIONS = {};
module.exports = { chromium, path, fs, OUT_DIR, BASE, routes, ACTIONS };
