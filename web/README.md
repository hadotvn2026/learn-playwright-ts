# Deploy len Vercel (static, khong can build)

## Cach 1 — Vercel Dashboard (de nhat)
1. Vao vercel.com → Add New → Project → Import repo nay.
2. O muc **Root Directory**: chon `web`.
3. Framework Preset: **Other**. Build Command: de trong. Output: de trong.
4. Deploy → xong, se co URL `*.vercel.app`.

## Cach 2 — Vercel CLI
```bash
cd web
npx vercel deploy --prod
```

## Cau truc
- `web/` la site tinh: HTML + CSS + JS thuan, khong dependency, khong build step.
- Du lieu 60 cases nam trong `data-1.js` … `data-6.js` (bien `TESTS`), render boi `app.js`.
- Search + filter theo nhom chay hoan toan client-side.
