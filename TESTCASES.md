# Test Cases — the-internet.herokuapp.com (Playwright)

> Format theo testingvn.gitbook.io/.../test-cases:
> moi case gom ID - Ten - Steps (Open browser / Navigate / thao tac / Verify).
> Map 1-1 voi file trong tests/*.spec.ts (60 tests, 44 routes).
> Base URL: https://the-internet.herokuapp.com (config baseURL).

## TC01: Form Authentication (tests/login.spec.ts)

**TC01.1: Login successful with valid credentials**

1. Open browser
2. Navigate to /login
3. Fill username tomsmith
4. Fill password SuperSecretPassword!
5. Click Login
6. Verify URL /secure + heading Secure Area visible

**TC01.2: Login with invalid password**

1. Open browser
2. Navigate to /login
3. Fill username tomsmith + password SuperSecretPassword
4. Click Login
5. Verify text Your password is invalid!

**TC01.3: Login with invalid username**

1. Open browser
2. Navigate to /login
3. Fill username tomsmith! + password SuperSecretPassword!
4. Click Login
5. Verify text Your username is invalid!

## TC02: Checkboxes (tests/checkboxes.spec.ts)

**TC02.1: Check boxes**

1. Open browser
2. Navigate to /checkboxes
3. Check checkbox1, verify checked
4. Check checkbox2, verify checked

**TC02.2: Uncheck boxes**

1. Open browser
2. Navigate to /checkboxes
3. Uncheck checkbox1, verify NOT checked
4. Uncheck checkbox2, verify NOT checked

## TC03: Dropdown (tests/dropdown.spec.ts)

**TC03.1: Select single option**

1. Open browser
2. Navigate to /dropdown
3. Select Option 1
4. Validate value = 1

**TC03.2: Select multiple options**

1. Open browser
2. Navigate to demo dropdown page
3. Select Java + Go
4. Validate values = java,go

## TC04: Status Codes (tests/links.spec.ts)

**TC04: Hyperlink - link text**

1. Open browser
2. Navigate to /status_codes
3. Click 200, verify 200 page, click here back
4. Click 301, verify 301 page, click here back
5. Click 404, verify 404 page, click here back
6. Click 500, verify 500 page, click here back

## TC05: Data Tables (tests/table.spec.ts)

**TC05.1: Largest due person**

1. Open browser
2. Navigate to /tables
3. Collect fullName + due from table2
4. Verify max due = Jason Doe

**TC05.2: Smallest due persons**

1. Open browser
2. Navigate to /tables
3. Collect fullName + due from table2
4. Verify min due = John Smith, Tim Conway

## TC06: Frames (frame.spec.ts, iframe.spec.ts, wysiwygEditor.spec.ts)

**TC06.1: Nested frames**

1. Open browser
2. Navigate to /nested_frames
3. Verify LEFT / MIDDLE / RIGHT / BOTTOM

**TC06.2: iFrame editor**

1. Open browser
2. Navigate to /iframe
3. Verify editor contains Your content goes here.

**TC06.3: WYSIWYG editor**

1. Open browser
2. Navigate to /tinymce
3. Verify editor contains Your content goes here.

## TC07: JavaScript Alerts (tests/jsAlert.spec.ts)

**TC07.1: JS Alert**

1. Open browser
2. Navigate to /javascript_alerts
3. Click Click for JS Alert, Accept popup I am a JS Alert
4. Verify You successfully clicked an alert

**TC07.2: JS Confirm Cancel**

1. Navigate to /javascript_alerts
2. Click Click for JS Confirm, Dismiss
3. Verify You clicked: Cancel

**TC07.3: JS Confirm OK**

1. Navigate to /javascript_alerts
2. Click Click for JS Confirm, Accept
3. Verify You clicked: OK

**TC07.4: JS Prompt**

1. Navigate to /javascript_alerts
2. Click Click for JS Prompt, fill Hello World, Accept
3. Verify You entered: Hello World

## TC08: Hovers (tests/hover.spec.ts)

**TC08: Hover user1**

1. Open browser
2. Navigate to /hovers
3. Hover user1 avatar
4. Verify name: user1 present

## TC09: Context Menu (tests/contextMenu.spec.ts)

**TC09: Right click box**

1. Open browser
2. Navigate to /context_menu
3. Right click hot-spot box
4. Verify alert You selected a context menu, Dismiss

## TC10: Drag and Drop (tests/dragDrop.spec.ts)

**TC10: Drag A to B**

1. Open browser
2. Navigate to /drag_and_drop
3. Verify column A = A
4. Drag #column-a to #column-b
5. Verify column A = B

## TC11: Horizontal Slider (tests/horizontalSlider.spec.ts)

**TC11: Slider to 3.5**

1. Open browser
2. Navigate to /horizontal_slider
3. Press ArrowRight until 3.5
4. Verify value 3.5

## TC12: Key Presses (tests/keyPresses.spec.ts)

**TC12: Press keys**

1. Open browser
2. Navigate to /key_presses
3. Click #target, press Tab, verify You entered: TAB
4. Press a, verify You entered: A

## TC13: Inputs (tests/inputs.spec.ts)

**TC13: Number input**

1. Open browser
2. Navigate to /inputs
3. Fill 123, verify 123
4. Press ArrowUp, verify 124

## TC14: Download Upload (download/uploadFile/secureDownload)

**TC14.1: Download one file**

1. Open browser
2. Navigate to /download
3. Click resume.txt, save to downloads/
4. Verify file exists

**TC14.2: Download multiple files**

1. Navigate to /download
2. Download t1.txt + text.txt
3. Verify files exist

**TC14.3: Secure download**

1. Open browser with admin/admin
2. Navigate to /download_secure
3. Click first file, save to downloads/
4. Verify file exists

**TC14.4: Upload file**

1. Open browser
2. Navigate to /upload
3. Choose uploads/resume.txt, click Upload
4. Verify resume.txt shown

## TC15: Auth (basicAuth/digestAuth.spec.ts)

**TC15.1: Basic Auth**

1. Open browser
2. Navigate to https://admin:admin@/basic_auth
3. Verify heading Basic Auth

**TC15.2: Digest Auth**

1. Open browser with httpCredentials admin/admin
2. Navigate to /digest_auth
3. Verify Congratulations text

## TC16: Broken Images (tests/brokenImage.spec.ts)

**TC16: Verify images load**

1. Open browser
2. Navigate to /broken_images
3. For each img: verify src not empty + GET src returns 200

## TC17: Entry Ad + Exit Intent (adPopup/exitIntent.spec.ts)

**TC17.1: Entry ad popup**

1. Open browser
2. Navigate to /entry_ad
3. When modal THIS IS A MODAL WINDOW appears, click close
4. Verify heading Entry Ad visible

**TC17.2: Exit intent modal**

1. Open browser
2. Navigate to /exit_intent
3. Move mouse out top viewport
4. Verify modal This is a modal window, close it, verify hidden

## TC18: Scroll + Floating Menu (infinityScroll/floatingMenu)

**TC18.1: Infinite scroll**

1. Open browser
2. Navigate to /infinite_scroll
3. Scroll down with wheel 5 times

**TC18.2: Floating menu**

1. Open browser
2. Navigate to /floating_menu
3. Verify Home visible, scroll 2000px, menu still visible
4. Click News, verify URL #news

## TC19: Multiple Windows (tests/multipleWindows.spec.ts)

**TC19: Open new window**

1. Open browser
2. Navigate to /windows
3. Click Click Here, new tab New Window appears
4. Verify old page still Opening a new window

## TC20: Dynamic Controls (tests/dynamicControls.spec.ts)

**TC20.1: Remove/Add checkbox**

1. Open browser
2. Navigate to /dynamic_controls
3. Click Remove, verify It is gone! + checkbox hidden
4. Click Add, verify It is back! + checkbox visible

**TC20.2: Enable/Disable input**

1. Navigate to /dynamic_controls
2. Verify input disabled, click Enable, verify enabled + fill hello
3. Click Disable, verify disabled

## TC21: Dynamic Loading (tests/dynamicLoading.spec.ts)

**TC21.1: Hidden element /dynamic_loading/1**

1. Open browser
2. Navigate to /dynamic_loading/1
3. Verify #finish hidden, click Start
4. Verify Hello World! within 15s

**TC21.2: Rendered element /dynamic_loading/2**

1. Open browser
2. Navigate to /dynamic_loading/2
3. Verify #finish hidden, click Start
4. Verify Hello World! within 15s

## TC22: Dynamic Content + Disappearing (dynamicContent/disappearingElements)

**TC22.1: Dynamic content changes**

1. Open browser
2. Navigate to /dynamic_content
3. Read texts, reload, verify rows > 0

**TC22.2: Static content avatars**

1. Navigate to /dynamic_content?with_content=static
2. Verify heading + avatar images > 0

**TC22.3: Disappearing menu**

1. Open browser
2. Navigate to /disappearing_elements
3. Verify Home + About, reload, verify items >= 4

## TC23: AB/Challenging/Large DOM (abTest/challengingDom/largeDom)

**TC23.1: AB test**

1. Navigate to /abtest
2. Verify heading A/B Test + paragraph not empty

**TC23.2: Challenging DOM**

1. Navigate to /challenging_dom
2. Verify 10 rows, click first button, verify id changed

**TC23.3: Large table**

1. Navigate to /large
2. Verify 50 rows, first row contains 1.1

**TC23.4: Siblings**

1. Navigate to /large
2. Verify sibling-1.1 visible + no-siblings text

## TC24: AddRemove/Redirect/Notification/Shifting

**TC24.1: AddRemove (addRemoveElements.spec.ts)**

1. Navigate to /add_remove_elements/
2. Click Add Element x2, verify 2 Delete
3. Click first Delete, verify 1 Delete left

**TC24.2: Redirect (redirector.spec.ts)**

1. Navigate to /redirector
2. Click #redirect
3. Verify URL /status_codes + heading Status Codes

**TC24.3: Notification (notificationMessage.spec.ts)**

1. Navigate to /notification_message_rendered
2. Click Click here (retry 5), verify Action successful/unsuccessful

**TC24.4: Shifting (shiftingContent.spec.ts)**

1. Navigate to /shifting_content/menu, verify 5 items
2. Navigate to /shifting_content/image, verify img.shift src avatar.jpg
3. Navigate to /shifting_content/list, verify rows > 0

## TC25: Misc (forgotPassword/typos/javascriptError/slowResources)

**TC25.1: Forgot password**

1. Navigate to /forgot_password
2. Fill test@example.com, submit
3. Verify Internal Server Error (server loi 500 that)

**TC25.2: Typos**

1. Navigate to /typos
2. Verify text matches Sometimes you will see a typo

**TC25.3: JS error**

1. Listen pageerror, navigate to /javascript_error
2. Verify This page has a JavaScript error
3. Verify error contains Cannot read properties of undefined

**TC25.4: Slow resources**

1. Navigate to /slow, wait slow_external 45s
2. Verify heading Slow Resources + status 200 (chap nhan 503)

## TC26: Menu/Shadow/Geo (jqueryMenu/shadowDom/geolocation)

**TC26.1: JQuery menu**

1. Navigate to /jqueryui/menu
2. Hover Enabled then Downloads
3. Verify menu.pdf + menu.csv visible

**TC26.2: Shadow DOM**

1. Navigate to /shadowdom
2. Verify text Let us have some different text!

**TC26.3: Geolocation**

1. New context with geolocation 10.762622, 106.660172
2. Navigate to /geolocation, click Where am I?
3. Verify lat/long values

---

# PHAN 2 - Gom nhom theo Playwright feature + giai thich code

## Nhom 1 - Locator co ban: getByRole/locator/getByText + auto-retry

**Gom:** TC01 login, TC02 checkboxes, TC03 dropdown, TC04 links, TC08 hover,
TC10 dragDrop, TC11 slider, TC12 keyPresses, TC13 inputs, TC15 auth, TC23, TC25 typos.

**Vi du (tests/login.spec.ts):**

```ts
await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
```

**Tai sao viet the:**

- getByRole uu tien vi giong cach user nhin thay element, it gay khi doi class/id.
- expect toHaveURL/toBeVisible/toHaveValue co auto-retry 5s, khong can waitForTimeout.
- Dung relative path /login nho baseURL trong playwright.config.ts.

## Nhom 2 - Form nang cao: selectOption/check/setInputFiles/press

**Gom:** TC03 dropdown, TC02 checkboxes, TC11 slider, TC12 keyPresses, TC14 upload.

**Vi du:**

```ts
await page.getByRole('combobox').selectOption({ label: 'Option 1' });
await expect(page.locator('#dropdown')).toHaveValue('1');
await page.setInputFiles('input[type="file"]', 'uploads/resume.txt');
await slider.press('ArrowRight');
```

**Tai sao viet the:**

- selectOption/check/setInputFiles tac dong protocol-level, on dinh hon click mo file-dialog.
- Slider chi nhan step 0.5 nen loop press ArrowRight + doc #range moi lan.
- Upload dung duong dan repo uploads/resume.txt de CI nao cung co file.

## Nhom 3 - Dialog: page.on('dialog')

**Gom:** TC07 jsAlert, TC09 contextMenu.

**Vi du (tests/jsAlert.spec.ts):**

```ts
page.on('dialog', async (dialog) => {
  expect(dialog.message()).toEqual('I am a JS Confirm');
  await dialog.dismiss();
});
await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
```

**Tai sao viet the:**

- Dialog block browser nen phai dang ky handler TRUOC click, neu khong se bi auto-dismiss.
- accept(text) cho prompt nhap Hello World, dismiss() mo phong Cancel.
- Luu y: 3 test alert/confirm cu dang ky sau click nen flaky.

## Nhom 4 - Frame: frameLocator

**Gom:** TC06 nested_frames, iframe, tinymce.

**Vi du (tests/frame.spec.ts):**

```ts
const topFrame = page.frameLocator("[name='frame-top']");
await expect(topFrame.frameLocator("[name='frame-left']").locator('body')).toHaveText('LEFT');
```

**Tai sao viet the:**

- frameLocator resolve lazy + retry theo tree, khong can page.frames() thu cong.
- Long 2 tang mo ta dung DOM that, assert tung body nen biet frame nao sai.

## Nhom 5 - Chuot mo phong user: dragTo/hover/mouse

**Gom:** TC08 hover, TC10 dragDrop, TC18 scroll, TC17 exitIntent, TC26 jqueryMenu.

**Vi du:**

```ts
await page.locator('#column-a').dragTo(page.locator('#column-b'));
await page.mouse.move(400, 300);
await page.mouse.move(400, -100, { steps: 5 });
```

**Tai sao viet the:**

- dragTo ban dung chuoi mouse events HTML5 DnD; assert text A->B sau drag.
- Exit-intent bat mouseout khoi viewport nen phai move 2 diem voi steps, hover() don thuan khong trigger.
- Floating menu dung mouse.wheel(0, 2000) de kiem tra menu van visible sau scroll.

## Nhom 6 - Multi-tab + download: waitForEvent + Promise.all

**Gom:** TC14 download/secureDownload, TC19 multipleWindows.

**Vi du:**

```ts
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('link', { name: 'resume.txt' }).click(),
]);
await download.saveAs('downloads/' + download.suggestedFilename());
```

**Tai sao viet the:**

- Phai waitForEvent CUNG LUC voi click trong Promise.all vi event xay ra ngay sau click (race condition).
- saveAs + fs.existsSync xac nhan file ghi dia that; suggestedFilename xac nhan ten dung.
- Secure download them setHTTPCredentials(admin/admin) vi /download_secure tra Not authorized.

## Nhom 7 - Cho dong: timeout tuy chinh + waitForResponse

**Gom:** TC20 dynamicControls, TC21 dynamicLoading, TC25 slowResources.

**Vi du:**

```ts
await expect(page.locator('#message')).toHaveText("It's gone!", { timeout: 10000 });
const slowResponse = page.waitForResponse((res) => res.url().includes('slow_external'), { timeout: 45000 });
```

**Tai sao viet the:**

- Site delay 3-30s nen timeout 5s mac dinh khong du, truyen 10-45s tuy case.
- Dung message text lam dieu kien dong bo thay vi dem element.
- Slow chap nhan 200/503 vi Heroku hay 503.

## Nhom 8 - Auth + permission o context-level

**Gom:** TC15 digestAuth, TC14 secureDownload, TC26 geolocation.

**Vi du:**

```ts
test.use({ httpCredentials: { username: 'admin', password: 'admin' } });
const context = await browser.newContext({
  permissions: ['geolocation'],
  geolocation: { latitude: 10.762622, longitude: 106.660172 },
});
```

**Tai sao viet the:**

- Digest auth khong nhung user:pass@url duoc (challenge-response) nen dung httpCredentials.
- Geolocation phai xin truoc khi load trang vi site goi getCurrentPosition ngay khi click.

## Nhom 9 - Quan sat browser: pageerror + request.get + parse table

**Gom:** TC25 javascriptError, TC16 brokenImage, TC05 table.

**Vi du:**

```ts
const errors: string[] = [];
page.on('pageerror', (error) => errors.push(error.message));
const res = await page.request.get(src);
const due = parseFloat(((await row.locator('td:nth-child(4)').textContent()) ?? '').replace('$', ''));
```

**Tai sao viet the:**

- pageerror bat exception tu JS trang (khac console), phai nghe truoc goto.
- Broken image check HTTP status tung anh thay vi nhin mat.
- Table parse ve type Person, beforeEach + test.step nen report ro tung buoc.


