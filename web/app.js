window.openLightbox = function(src, title) {
  let overlay = document.getElementById('lightbox-modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-modal';
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<div class="lightbox-content">' +
      '<div class="lightbox-head">' +
      '  <span class="lightbox-title"></span>' +
      '  <button type="button" class="lightbox-close" aria-label="Đóng">&times;</button>' +
      '</div>' +
      '<img class="lightbox-img" src="" alt="Zoom preview" />' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
        overlay.classList.remove('active');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
      }
    });
  }
  overlay.querySelector('.lightbox-title').textContent = title;
  overlay.querySelector('.lightbox-img').src = src;
  overlay.classList.add('active');
};


const list = document.getElementById('list');
const search = document.getElementById('search');
const filtersEl = document.getElementById('filters');
const count = document.getElementById('count');
const groups = [...new Set(TESTS.map(t => t.group))];
let active = 'Tất cả';
var PAL = { ink: '#1a1611', accent: '#c2410c', soft: '#fdeede', line: '#e7e0d4', green: '#15803d' };
function doodle(inner) {
  return '<svg viewBox="0 0 120 72" width="100%" height="64" aria-hidden="true">' + inner + '</svg>';
}
var ILLUS = {
'Locator cơ bản': doodle('<rect x="14" y="10" width="92" height="52" rx="8" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><circle cx="34" cy="26" r="5" fill="none" stroke="' + PAL.accent + '" stroke-width="2.5"/><path d="M30 44 L46 44 M30 50 L58 50" stroke="' + PAL.line + '" stroke-width="3" stroke-linecap="round"/><path d="M74 30 l14 14 M88 30 l-14 14" stroke="' + PAL.accent + '" stroke-width="3" stroke-linecap="round"/>'),
'Thao tác form': doodle('<rect x="14" y="12" width="92" height="48" rx="8" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><rect x="24" y="22" width="34" height="10" rx="5" fill="' + PAL.soft + '" stroke="' + PAL.accent + '" stroke-width="2"/><path d="M66 22 l12 0 M72 16 l0 12" stroke="' + PAL.accent + '" stroke-width="2.5" stroke-linecap="round"/><rect x="24" y="40" width="72" height="10" rx="5" fill="none" stroke="' + PAL.ink + '" stroke-width="2" stroke-dasharray="4 3"/>'),
'Hộp thoại': doodle('<rect x="22" y="14" width="76" height="40" rx="8" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><circle cx="36" cy="26" r="3" fill="' + PAL.accent + '"/><path d="M46 26 l30 0" stroke="' + PAL.line + '" stroke-width="3" stroke-linecap="round"/><rect x="32" y="38" width="24" height="10" rx="5" fill="' + PAL.accent + '"/><rect x="62" y="38" width="24" height="10" rx="5" fill="none" stroke="' + PAL.ink + '" stroke-width="2"/>'),
'Frame': doodle('<rect x="14" y="10" width="92" height="52" rx="8" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><path d="M60 10 L60 62 M14 36 L106 36" stroke="' + PAL.ink + '" stroke-width="2"/><rect x="20" y="16" width="34" height="14" rx="3" fill="' + PAL.soft + '"/><rect x="66" y="16" width="34" height="14" rx="3" fill="none" stroke="' + PAL.accent + '" stroke-width="2" stroke-dasharray="4 3"/><rect x="20" y="42" width="80" height="14" rx="3" fill="none" stroke="' + PAL.green + '" stroke-width="2"/>'),
'Chuột': doodle('<rect x="46" y="8" width="28" height="44" rx="14" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><path d="M60 8 L60 28" stroke="' + PAL.ink + '" stroke-width="2"/><path d="M34 20 q-10 22 4 40" fill="none" stroke="' + PAL.accent + '" stroke-width="2.5" stroke-dasharray="5 4" stroke-linecap="round"/><circle cx="92" cy="52" r="4" fill="' + PAL.accent + '"/>'),
'Tải tệp/tab mới': doodle('<path d="M40 12 L80 12 L80 48 L40 48 Z" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><path d="M60 20 L60 38 M53 31 l7 7 7-7" fill="none" stroke="' + PAL.accent + '" stroke-width="2.5" stroke-linecap="round"/><path d="M30 56 L90 56" stroke="' + PAL.ink + '" stroke-width="3" stroke-linecap="round"/>'),
'Xác thực': doodle('<rect x="42" y="28" width="36" height="30" rx="6" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><circle cx="60" cy="22" r="10" fill="none" stroke="' + PAL.ink + '" stroke-width="2.5"/><circle cx="60" cy="22" r="3" fill="' + PAL.accent + '"/><circle cx="60" cy="42" r="4" fill="' + PAL.green + '"/><path d="M56 42 l3 3 5-6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>'),
'Chờ động': doodle('<circle cx="60" cy="36" r="22" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><path d="M60 36 L60 22 M60 36 L72 42" stroke="' + PAL.accent + '" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="36" r="3" fill="' + PAL.ink + '"/><path d="M14 60 q10 -8 20 0 t20 0" fill="none" stroke="' + PAL.green + '" stroke-width="2.5" stroke-linecap="round"/>'),
'Quan sát trình duyệt': doodle('<circle cx="60" cy="34" r="18" fill="#fff" stroke="' + PAL.ink + '" stroke-width="2.5"/><circle cx="60" cy="34" r="7" fill="none" stroke="' + PAL.accent + '" stroke-width="2.5"/><circle cx="60" cy="34" r="2.5" fill="' + PAL.ink + '"/><path d="M20 56 L100 56" stroke="' + PAL.line + '" stroke-width="3" stroke-linecap="round"/>')
};
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
function renderFilters() {
  filtersEl.innerHTML = '';
  ['Tất cả', ...groups].forEach(g => {
    const b = document.createElement('button');
    b.textContent = g; if (g === active) b.classList.add('active');
    b.onclick = () => { active = g; renderFilters(); render(); };
    filtersEl.appendChild(b);
  });
}
function match(t, q) {
  q = q.toLowerCase();
  return (t.id + ' ' + t.title + ' ' + t.route + ' ' + t.spec).toLowerCase().includes(q);
}
function render() {
  const q = search.value.trim();
  const items = TESTS.filter(t => (active === 'Tất cả' || t.group === active) && (!q || match(t, q)));
  count.textContent = 'Đang hiển thị ' + items.length + ' / ' + TESTS.length + ' test case';
  document.getElementById('stat-cases').textContent = TESTS.length;
  list.innerHTML = items.map(t =>
    '<details class="case" id="case-' + esc(t.id) + '"><summary><span class="case-id">' + esc(t.id) + '</span>' +
    '<span class="case-title">' + esc(t.title) + '</span>' +
    '<span class="case-route">' + esc(t.route) + ' · ' + esc(t.group) + '</span></summary>' +
    '<div class="case-body">' +
    '<div class="case-screenshot-wrap">' +
    '  <div class="case-screenshot-header">' +
    '    <span class="shot-title">📸 Giao diện màn hình test flow (' + esc(t.id) + ')</span>' +
    '    <span class="shot-route">' + esc(t.route) + '</span>' +
    '  </div>' +
    '  <div class="case-screenshot-box">' +
    '    <img src="screenshots/' + esc(t.id) + '.jpg" alt="Screenshot ' + esc(t.id) + ' - ' + esc(t.title) + '" loading="lazy" class="case-screenshot-img" onclick="openLightbox(this.src, \'' + esc(t.id) + ' - ' + esc(t.title) + '\')" />' +
    '    <span class="zoom-tip">🔍 Bấm ảnh để xem cỡ lớn</span>' +
    '  </div>' +
    '</div>' +
    '<div class="step-3">' +
    '<div class="step"><h4><b>1</b>Ứng dụng</h4><p>' + esc(t.app) + '</p></div>' +
    '<div class="step"><h4><b>2</b>Các bước kiểm thử</h4><ol>' + t.steps.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol></div>' +
    '<div class="step"><h4><b>3</b>Vì sao viết code như vậy</h4><p>' + esc(t.why) + '</p><div class="illus">' + ILLUS[t.group] + '</div></div>' +
    '</div><div class="code-head"><span class="file-tag">Script hoàn chỉnh: ' + esc(t.spec) + '</span>' +
    '<span class="lang-tag">TypeScript</span>' +
    '<button class="copy-btn" type="button">Sao chép</button></div>' +
    '<pre data-code="' + esc(t.spec) + '"><code class="language-typescript">Đang tải script...</code></pre></div></details>'
  ).join('') || '<p>Không tìm thấy test case nào.</p>';
}
search.addEventListener('input', render);
function highlight(pre) {
  var codeEl = pre.querySelector('code');
  codeEl.removeAttribute('data-highlighted');
  if (window.hljs) { try { window.hljs.highlightElement(codeEl); } catch (e) {} }
}
list.addEventListener('toggle', async (e) => {
  const d = e.target;
  if (!d || d.tagName !== 'DETAILS' || !d.open) return;
  const pre = d.querySelector('pre[data-code]');
  if (!pre || pre.dataset.loaded) return;
  try {
    const res = await fetch('code/' + pre.dataset.code);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    pre.querySelector('code').textContent = await res.text();
    pre.dataset.loaded = '1';
    highlight(pre);
  } catch (err) {
    pre.querySelector('code').textContent = 'Không tải được script: ' + err.message;
  }
}, true);
list.addEventListener('click', (e) => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  const code = btn.closest('.case-body').querySelector('pre code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Đã chép!';
    setTimeout(() => { btn.textContent = 'Sao chép'; }, 1500);
  });
});
renderFilters(); render();

/* Cat Roadmap */
var CAT_ICON = '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M10 13 L8 5 L15 10" fill="#fdeede"/>' +
  '<path d="M26 13 L28 5 L21 10" fill="#fdeede"/>' +
  '<circle cx="18" cy="20" r="12" fill="#fff"/>' +
  '<circle cx="14" cy="18" r="1.5" fill="currentColor"/>' +
  '<circle cx="22" cy="18" r="1.5" fill="currentColor"/>' +
  '<path d="M18 20.5 l-1.2 1.5 h2.4 Z" fill="currentColor"/>' +
  '<path d="M18 22 v2 c-1.2 1 -2.5 0 -3 0 M18 24 c1.2 1 2.5 0 3 0"/>' +
  '<path d="M9 19 H4 M9 22 H5 M27 19 H32 M27 22 H31"/>' +
'</svg>';

var ROADMAP_DATA = [
  {
    phase: 'Giai đoạn 1: Nền tảng & Form cơ bản (TC01 – TC04)',
    stops: [
      { id: 'TC01.1', code: 'TC01', title: 'Form đăng nhập & URL validation', desc: 'Thao tác getByRole, nhập username/password, kiểm tra chuyển hướng an toàn.', route: '/login' },
      { id: 'TC02.1', code: 'TC02', title: 'Checkbox: Check & Uncheck', desc: 'Kiểm soát trạng thái tích/bỏ tích và xác minh toBeChecked.', route: '/checkboxes' },
      { id: 'TC03.1', code: 'TC03', title: 'Dropdown & Select options', desc: 'Chọn giá trị đơn hoặc nhiều giá trị trong select dropdown.', route: '/dropdown' },
      { id: 'TC04', code: 'TC04', title: 'Status Codes & Network triggers', desc: 'Bấm liên kết sinh các mã trạng thái HTTP 200, 301, 404, 500.', route: '/status_codes' }
    ]
  },
  {
    phase: 'Giai đoạn 2: Bảng biểu, Frame & Hộp thoại (TC05 – TC09)',
    stops: [
      { id: 'TC05.1', code: 'TC05', title: 'Duyệt bảng & tính toán dữ liệu', desc: 'Đọc cột số liệu trong HTML table, parse tiền tệ để tìm max/min.', route: '/tables' },
      { id: 'TC06.1', code: 'TC06', title: 'Nested Frames & TinyMCE Iframe', desc: 'Chuyển ngữ cảnh page.frameLocator để đọc frame lồng và gõ WYSIWYG.', route: '/nested_frames' },
      { id: 'TC07.1', code: 'TC07', title: 'JS Dialogs (Alert, Confirm, Prompt)', desc: 'Lắng nghe sự kiện page.on("dialog") để accept, dismiss hoặc gõ text.', route: '/javascript_alerts' },
      { id: 'TC08', code: 'TC08', title: 'Hover & Dynamic overlay', desc: 'Di chuột để kích hoạt animation hiện thông tin profile ẩn.', route: '/hovers' },
      { id: 'TC09', code: 'TC09', title: 'Context Menu & Right-click', desc: 'Bấm chuột phải button: "right" và bắt hộp thoại xác nhận.', route: '/context_menu' }
    ]
  },
  {
    phase: 'Giai đoạn 3: Tương tác chuột, phím & Tệp (TC10 – TC14)',
    stops: [
      { id: 'TC10', code: 'TC10', title: 'HTML5 Drag and Drop', desc: 'Kéo thả cột A sang cột B bằng dragTo hoặc tọa độ chuột.', route: '/drag_and_drop' },
      { id: 'TC11', code: 'TC11', title: 'Range Slider & Phím điều hướng', desc: 'Mô phỏng phím mũi tên ArrowRight để trượt từng nấc chính xác.', route: '/horizontal_slider' },
      { id: 'TC12', code: 'TC12', title: 'Key Presses & Phím đặc biệt', desc: 'Nhấn Tab, Enter, Space và bắt phản hồi You entered: KEY.', route: '/key_presses' },
      { id: 'TC13', code: 'TC13', title: 'Input số & Arrow up/down', desc: 'Tương tác với input[type=number] bằng phím và giá trị số.', route: '/inputs' },
      { id: 'TC14.1', code: 'TC14', title: 'Download & Upload File', desc: 'Xử lý waitForEvent("download") và setInputFiles tải tệp lên/xuống.', route: '/download' }
    ]
  }
];

ROADMAP_DATA.push(
  {
    phase: 'Giai đoạn 4: Xác thực & Trải nghiệm giao diện (TC15 – TC19)',
    stops: [
      { id: 'TC15.1', code: 'TC15', title: 'Basic & Digest Authentication', desc: 'Truyền thông tin xác thực HTTP credentials hoặc embedded URL.', route: '/basic_auth' },
      { id: 'TC16', code: 'TC16', title: 'Broken Images & Natural dimensions', desc: 'Duyệt ảnh trang web và kiểm tra naturalWidth > 0 bằng evaluate.', route: '/broken_images' },
      { id: 'TC17.1', code: 'TC17', title: 'Modal Entry Ad & Exit Intent', desc: 'Xử lý modal tự xuất hiện và kích hoạt sự kiện rê chuột ra ngoài cửa sổ.', route: '/entry_ad' },
      { id: 'TC18.1', code: 'TC18', title: 'Infinite Scroll & Floating Menu', desc: 'Cuộn trang nạp thêm dữ liệu và kiểm tra menu bám đỉnh sticky.', route: '/infinite_scroll' },
      { id: 'TC19', code: 'TC19', title: 'Multiple Windows / Tabs', desc: 'Bắt tab mới bằng context.waitForEvent("page") và điều khiển song song.', route: '/windows' }
    ]
  },
  {
    phase: 'Giai đoạn 5: Chờ bất đồng bộ & Giao diện động (TC20 – TC23)',
    stops: [
      { id: 'TC20.1', code: 'TC20', title: 'Dynamic Controls (Add/Remove)', desc: 'Xử lý loading spinner, chờ phần tử bị gỡ hoặc kích hoạt lại.', route: '/dynamic_controls' },
      { id: 'TC21.1', code: 'TC21', title: 'Dynamic Loading (Hidden / Delayed DOM)', desc: 'Chờ element hiển thị sau AJAX loading không cần sleep cứng.', route: '/dynamic_loading/1' },
      { id: 'TC22.1', code: 'TC22', title: 'Dynamic Content & Disappearing elements', desc: 'Kiểm thử nội dung thay đổi ngẫu nhiên và nút xuất hiện chập chờn.', route: '/dynamic_content' },
      { id: 'TC23.1', code: 'TC23', title: 'A/B Testing & Challenging DOM', desc: 'Xử lý biến thể thử nghiệm A/B và bảng sinh ID ngẫu nhiên phức tạp.', route: '/abtest' }
    ]
  },
  {
    phase: 'Giai đoạn 6: Thử thách nâng cao & Edge cases (TC24 – TC26)',
    stops: [
      { id: 'TC24.1', code: 'TC24', title: 'Shifting Content, Redirect & Notification', desc: 'Bắt flash message tự ẩn, kiểm tra redirect chain và layout dịch chuyển.', route: '/add_remove_elements/' },
      { id: 'TC25.1', code: 'TC25', title: 'Console Errors, Typos & Slow Network', desc: 'Bắt page.on("pageerror"), kiểm tra chính tả và timeout mạng chậm.', route: '/javascript_error' },
      { id: 'TC26.1', code: 'TC26', title: 'Shadow DOM, Geolocation & jQuery Menu', desc: 'Xuyên thấu Shadow DOM, giả lập GPS tọa độ và rê menu đa cấp.', route: '/shadowdom' }
    ]
  }
);

function renderRoadmap() {
  var roadmapEl = document.getElementById('roadmap');
  if (!roadmapEl) return;
  var html = '';
  ROADMAP_DATA.forEach(function(phaseBlock) {
    html += '<div class="roadmap-phase">';
    html += '<div class="roadmap-phase-tag">' + esc(phaseBlock.phase) + '</div>';
    html += '</div>';
    phaseBlock.stops.forEach(function(stop) {
      html += '<a class="roadmap-stop" href="#case-' + esc(stop.id) + '" data-target="' + esc(stop.id) + '">';
      html += '  <div class="roadmap-cat-btn" title="Đi tới test case ' + esc(stop.id) + '">' + CAT_ICON + '</div>';
      html += '  <div class="roadmap-card">';
      html += '    <div class="roadmap-card-head">';
      html += '      <span class="roadmap-step-num">' + esc(stop.code) + '</span>';
      html += '      <span class="roadmap-tc-pill">' + esc(stop.id) + '</span>';
      html += '      <h4>' + esc(stop.title) + '</h4>';
      html += '      <span class="roadmap-route">' + esc(stop.route) + '</span>';
      html += '    </div>';
      html += '    <p>' + esc(stop.desc) + '</p>';
      html += '  </div>';
      html += '</a>';
    });
  });
  roadmapEl.innerHTML = html;
}

function navigateToCase(tcId) {
  var targetEl = document.getElementById('case-' + tcId);
  if (!targetEl) {
    active = 'Tất cả';
    if (search) search.value = '';
    renderFilters();
    render();
    targetEl = document.getElementById('case-' + tcId);
  }
  if (!targetEl) return;
  
  targetEl.open = true;
  targetEl.dispatchEvent(new Event('toggle'));
  targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  targetEl.classList.add('highlight-target');
  setTimeout(function() {
    targetEl.classList.remove('highlight-target');
  }, 2200);
}

document.addEventListener('click', function(e) {
  var stopEl = e.target.closest('.roadmap-stop');
  if (!stopEl) return;
  e.preventDefault();
  var tcId = stopEl.dataset.target;
  if (tcId) {
    navigateToCase(tcId);
    if (history.pushState) {
      history.pushState(null, null, '#case-' + tcId);
    }
  }
});

renderRoadmap();


