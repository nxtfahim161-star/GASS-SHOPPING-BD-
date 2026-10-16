/* Core: state, helpers, layers, header, footer, router.
   Everything is exposed on window.GASS.U for views.js and main.js. */
(function (G) {
  'use strict';
  var D = document;
  var U = G.U = {};
  var PRODUCTS = G.PRODUCTS, CATS = G.CATS, VOUCHERS = G.VOUCHERS, GEO = G.GEO;

  function $(s, r) { return (r || D).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function byId(id) { return PRODUCTS.filter(function (p) { return p.id === +id; })[0]; }
  function catOf(id) { return CATS.filter(function (c) { return c.id === id; })[0]; }
  function reduced() { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }

  /* ---------- state ---------- */
  var KEY = 'gass-shopping-bd.v1';
  var S = {
    lang: 'en', theme: '', cart: [], wish: [], compare: [], orders: [], user: null,
    loc: { div: 'Dhaka', dist: 'Dhaka' }, vouchers: ['GASS50'], applied: '', coins: 120,
    recent: [], addr: { name: '', phone: '', line: '', label: 'home' }, ship: 'std', pay: 'cod', reviews: {}
  };
  try { var raw = localStorage.getItem(KEY); if (raw) Object.assign(S, JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  /* ---------- text ---------- */
  function t(k) {
    var d = (G.T[S.lang] || {})[k];
    if (d == null) d = G.T.en[k];
    if (d == null) d = k;
    for (var i = 1; i < arguments.length; i++) d = d.replace('{' + (i - 1) + '}', arguments[i]);
    return d;
  }
  function tx(o) { return o[S.lang] || o.en; }
  function loc() { return S.lang === 'bn' ? 'bn-BD' : 'en-US'; }
  function fmt(n) { return Number(n).toLocaleString(loc()); }
  function money(n) { return '৳' + fmt(Math.round(n)); }
  function disc(p) { return p.old > p.price ? Math.round((1 - p.price / p.old) * 100) : 0; }
  function stars(r) { return '<span class="stars" style="--r:' + r + '" role="img" aria-label="' + r + ' / 5"></span>'; }
  function tint(c) { return 'color-mix(in srgb,' + G.COL[c].c + ' 24%,var(--surface-2))'; }
  function distName(d) {
    for (var i = 0; i < GEO.length; i++) for (var j = 0; j < GEO[i].d.length; j++) if (GEO[i].d[j][0] === d) return S.lang === 'bn' ? GEO[i].d[j][1] : d;
    return d;
  }
  function divName(id) { var g = GEO.filter(function (x) { return x.id === id; })[0]; return g ? tx(g) : id; }

  /* ---------- icons ---------- */
  var IC = {
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    heart: '<path d="M12 20s-7.5-4.6-9-9.5C2 7 4.5 4.5 7.5 4.5c2 0 3.5 1 4.5 2.5 1-1.5 2.5-2.5 4.5-2.5 3 0 5.5 2.5 4.5 6-1.5 4.9-9 9.5-9 9.5z"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L20 8H6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    chev: '<path d="M9 5l7 7-7 7"/>',
    down: '<path d="M5 9l7 7 7-7"/>',
    share: '<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    truck: '<path d="M2 6h11v10H2zM13 10h4l4 3v3h-8z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    ret: '<path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/>',
    cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
    close: '<path d="M5 5l14 14M19 5L5 19"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    compare: '<path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M12 9C9 9 7 7.5 7.5 5.5 8.5 3 12 5 12 9zM12 9c3 0 5-1.5 4.5-3.5C15.5 3 12 5 12 9z"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    sliders: '<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    cube: '<path d="M12 2.5l8 4.5v9l-8 4.5-8-4.5V7z"/><path d="M4 7l8 4.5L20 7M12 11.5v9"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/>',
    verified: '<path d="M12 2l2.4 1.8 3-.2 1 2.8 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8-2.5-1.7.9-2.9-.9-2.9 2.5-1.7 1-2.8 3 .2z" fill="currentColor" stroke="none"/><path d="M8.5 12l2.5 2.5L16 9.5" stroke="var(--vk,#fff)" stroke-width="2.2"/>'
  };
  function ico(n, c) { return '<svg class="i ' + (c || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[n] + '</svg>'; }

  /* ---------- delivery and cart maths ---------- */
  var REMOTE = ['Bandarban', 'Rangamati', 'Khagrachhari', "Cox's Bazar", 'Panchagarh', 'Kurigram', 'Lalmonirhat', 'Thakurgaon', 'Sunamganj'];
  function zone(d) {
    if (d === 'Dhaka') return { fee: 60, days: [1, 2], exp: 70 };
    if (['Gazipur', 'Narayanganj', 'Chattogram'].indexOf(d) > -1) return { fee: 80, days: [2, 3], exp: 70 };
    if (REMOTE.indexOf(d) > -1) return { fee: 150, days: [5, 7], exp: 0 };
    return { fee: 110, days: [3, 5], exp: 0 };
  }
  function etaText(z, express) {
    var a = express && z.exp ? 1 : z.days[0], b = express && z.exp ? 1 : z.days[1];
    function f(n) { return new Date(Date.now() + n * 864e5).toLocaleDateString(S.lang === 'bn' ? 'bn-BD' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' }); }
    return a === b ? f(a) : f(a) + ' – ' + f(b);
  }
  function defSize(p) {
    if (!p.sizes) return '';
    return p.sizes[(p.shape === 'phone' || p.shape === 'laptop') ? 0 : Math.min(2, p.sizes.length - 1)];
  }
  function totals() {
    var lines = S.cart.map(function (l) { return { l: l, p: byId(l.id) }; }).filter(function (x) { return x.p; });
    var count = lines.reduce(function (a, x) { return a + x.l.qty; }, 0);
    var sub = lines.reduce(function (a, x) { return a + x.p.price * x.l.qty; }, 0);
    var v = VOUCHERS.filter(function (x) { return x.code === S.applied; })[0];
    var off = 0, shipFree = false, why = '';
    if (v) {
      if (sub < v.min) why = 'min';
      else if (v.pay && v.pay !== S.pay) why = 'pay';
      else if (v.type === 'flat') off = v.val;
      else if (v.type === 'pct') off = Math.min(Math.round(sub * v.val / 100), v.cap);
      else if (v.type === 'ship') shipFree = true;
    }
    var z = zone(S.loc.dist), exp = S.ship === 'exp' && z.exp;
    var ship = z.fee, free = sub >= 1500 || shipFree;
    if (free) ship = 0;
    if (exp) ship += z.exp;
    if (!count) ship = 0;
    return { lines: lines, count: count, sub: sub, off: off, ship: ship, total: Math.max(0, sub - off + ship), v: v, why: why, z: z, free: free, exp: !!exp };
  }
  function cartCount() { return S.cart.reduce(function (a, l) { return a + l.qty; }, 0); }
  function addCart(id, o) {
    o = o || {};
    var p = byId(id), color = o.color == null ? 0 : o.color, size = o.size == null ? defSize(p) : o.size, qty = o.qty || 1;
    var key = p.id + '|' + color + '|' + size;
    var ex = S.cart.filter(function (l) { return l.k === key; })[0];
    if (ex) ex.qty = Math.min(Math.min(10, p.stock), ex.qty + qty);
    else S.cart.push({ k: key, id: p.id, qty: Math.min(qty, p.stock), color: color, size: size });
    save(); updateBadges();
  }
  function updateBadges() {
    var c = cartCount(), w = S.wish.length;
    $$('[data-cnt="cart"]').forEach(function (e) { e.textContent = c ? fmt(c) : ''; e.classList.toggle('on', c > 0); });
    $$('[data-cnt="wish"]').forEach(function (e) { e.textContent = w ? fmt(w) : ''; e.classList.toggle('on', w > 0); });
    var tray = $('#cmpTray');
    if (tray) { tray.hidden = !S.compare.length; tray.querySelector('b').textContent = fmt(S.compare.length); }
  }

  /* ---------- countdown ---------- */
  function nextEnd() { var H = 4 * 3600e3; return Math.ceil((Date.now() + 1000) / H) * H; }
  function cdHTML(end) {
    return '<div class="cd" data-end="' + end + '" role="timer">' + ['h', 'm', 's'].map(function (u, i) {
      return '<span class="cdu"><i data-u="' + u + '">00</i><em>' + t('cd_' + u) + '</em></span>' + (i < 2 ? '<b>:</b>' : '');
    }).join('') + '</div>';
  }
  function tickCd() {
    $$('.cd').forEach(function (el) {
      var ms = +el.dataset.end - Date.now();
      if (ms <= 0) { el.dataset.end = nextEnd(); ms = 0; }
      var s = Math.floor(ms / 1000), v = { h: Math.floor(s / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
      Object.keys(v).forEach(function (u) {
        var i = el.querySelector('[data-u="' + u + '"]'), shown = v[u].toLocaleString(loc(), { minimumIntegerDigits: 2 });
        if (i.textContent !== shown) {
          i.textContent = shown;
          if (i.dataset.ready) { i.classList.remove('flip'); void i.offsetWidth; i.classList.add('flip'); }
        }
        i.dataset.ready = 1;
      });
    });
  }

  /* ---------- toast, layers, confetti ---------- */
  function toast(msg, act) {
    var el = D.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span>' + esc(msg) + '</span>' + (act ? '<button data-go="' + act.go + '">' + esc(act.label) + '</button>' : '');
    $('#toasts').appendChild(el);
    setTimeout(function () { el.classList.add('out'); }, 2800);
    setTimeout(function () { el.remove(); }, 3200);
  }
  function openLayer(html, cls) {
    var L = $('#layer');
    L.innerHTML = '<div class="ov" data-act="closeLayer"></div><div class="lyr ' + (cls || '') + '" role="dialog" aria-modal="true">' + html + '</div>';
    L.className = 'on';
    D.body.classList.add('lock');
    var f = L.querySelector('[data-focus]');
    if (f) setTimeout(function () { try { f.focus(); } catch (e) { /* ignore */ } }, 60);
  }
  function closeLayer() {
    var L = $('#layer');
    if (!L.classList.contains('on')) return;
    if (U.cleanup) { try { U.cleanup(); } catch (e) { /* ignore */ } U.cleanup = null; }
    L.classList.add('out');
    setTimeout(function () { L.className = ''; L.innerHTML = ''; D.body.classList.remove('lock'); }, reduced() ? 0 : 180);
  }
  function confetti() {
    if (reduced()) return;
    var c = D.createElement('canvas');
    c.className = 'confetti'; c.width = innerWidth; c.height = innerHeight;
    D.body.appendChild(c);
    var x = c.getContext('2d'), cols = ['#c6f24a', '#0b6b57', '#e8472f', '#f0a21c', '#7fb2d9', '#ffffff'], ps = [], i;
    for (i = 0; i < 150; i++) ps.push({ x: innerWidth / 2, y: innerHeight * 0.55, vx: (Math.random() - 0.5) * 15, vy: -Math.random() * 16 - 4, s: 5 + Math.random() * 6, r: Math.random() * 6, c: cols[Math.floor(Math.random() * cols.length)] });
    var t0 = performance.now();
    (function f(now) {
      x.clearRect(0, 0, c.width, c.height);
      ps.forEach(function (p) { p.vy += 0.4; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.r += 0.2; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); x.restore(); });
      if (now - t0 < 2600) requestAnimationFrame(f); else c.remove();
    })(t0);
  }

  /* ---------- router ---------- */
  var cur = (location.hash || '#/').slice(1) || '/';
  var hist = [];
  function parse() {
    var p = cur.split('?'), q = {};
    new URLSearchParams(p[1] || '').forEach(function (v, k) { q[k] = v; });
    return { parts: p[0].split('/').filter(Boolean), q: q, path: p[0] };
  }
  function go(h, o) {
    o = o || {};
    if (o.replace) { try { history.replaceState(null, '', '#' + h); } catch (e) { /* ignore */ } }
    else { hist.push(cur); try { if (location.hash !== '#' + h) location.hash = h; } catch (e) { /* ignore */ } }
    cur = h;
    G.render();
    if (!o.keep) window.scrollTo(0, 0);
  }
  function back() {
    if (hist.length) { var h = hist.pop(); cur = h; try { location.hash = h; } catch (e) { /* ignore */ } G.render(); window.scrollTo(0, 0); }
    else go('/');
  }
  window.addEventListener('hashchange', function () {
    var h = (location.hash || '#/').slice(1) || '/';
    if (h !== cur) { cur = h; G.render(); window.scrollTo(0, 0); }
  });

  /* ---------- chrome ---------- */
  function logoMark() {
    return '<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="var(--cta)"/><path d="M12 15h16l-1.6 14H13.6z" fill="var(--cta-ink)"/><path d="M16 15v-2.5a4 4 0 0 1 8 0V15" fill="none" stroke="var(--cta-ink)" stroke-width="2.4" stroke-linecap="round"/><circle cx="20" cy="22.5" r="3" fill="var(--cta)"/></svg>';
  }
  function renderHeader() {
    var r = parse(), q = r.q.q || '', cat = r.q.cat || '';
    $('#top').innerHTML =
      '<div class="wrap top-in">' +
      '<a class="logo" href="#/" data-go="/" aria-label="GASS SHOPPING BD">' + logoMark() + '<span class="logo-t"><b>GASS</b><small>SHOPPING BD</small></span></a>' +
      '<button class="loc" data-act="loc" aria-label="' + t('deliverTo') + '">' + ico('pin') + '<span><small>' + t('deliverTo') + '</small><b>' + esc(distName(S.loc.dist)) + '</b></span></button>' +
      '<form class="search" id="searchForm" autocomplete="off" role="search">' +
      '<select id="sCat" aria-label="' + t('allCats') + '"><option value="">' + t('all') + '</option>' + CATS.map(function (c) { return '<option value="' + c.id + '"' + (cat === c.id ? ' selected' : '') + '>' + esc(tx(c)) + '</option>'; }).join('') + '</select>' +
      '<input id="sQ" type="search" placeholder="' + t('searchPh') + '" value="' + esc(q) + '" aria-label="' + t('search') + '">' +
      '<button class="sbtn" type="submit" aria-label="' + t('search') + '">' + ico('search') + '</button>' +
      '<div id="sug" class="sug" hidden></div></form>' +
      '<div class="acts">' +
      '<button class="ib" data-act="lang" aria-label="Language"><span class="lg">' + (S.lang === 'bn' ? 'EN' : 'বাং') + '</span></button>' +
      '<button class="ib" data-act="theme" aria-label="' + t('theme') + '">' + ico('moon') + '</button>' +
      '<a class="ib hide-s" href="#/orders" data-go="/orders" aria-label="' + t('orders') + '">' + ico('box') + '</a>' +
      '<a class="ib" href="#/wishlist" data-go="/wishlist" aria-label="' + t('wishlist') + '">' + ico('heart') + '<em class="cnt" data-cnt="wish"></em></a>' +
      '<button class="ib" id="cartBtn" data-act="openCart" aria-label="' + t('cart') + '">' + ico('cart') + '<em class="cnt" data-cnt="cart"></em></button>' +
      '<a class="ib hide-s acc" href="#/account" data-go="/account" aria-label="' + t('account') + '">' + ico('user') + '<span class="hide-m">' + (S.user ? esc(S.user.name.split(' ')[0]) : t('login')) + '</span></a>' +
      '</div></div>' +
      '<nav class="wrap subnav" aria-label="Shortcuts">' +
      '<button class="navb" data-act="cats">' + ico('menu') + t('allCats') + '</button>' +
      '<a href="#/deals" data-go="/deals">' + ico('bolt') + t('flash') + '</a>' +
      '<a href="#/search?cat=mart" data-go="/search?cat=mart">GASS Mart</a>' +
      '<a href="#/vouchers" data-go="/vouchers">' + t('vouchers') + '</a>' +
      '<button class="navb" data-act="mystery">' + ico('gift') + t('mystery') + '</button>' +
      '<a href="#/compare" data-go="/compare">' + ico('compare') + t('compare') + '</a>' +
      '</nav>';
    updateBadges();
  }
  function renderBnav() {
    var p = parse().parts[0] || 'home';
    function it(id, route, icon, label, extra) {
      return '<a class="bn-i' + (p === id ? ' on' : '') + '" href="#' + route + '" data-go="' + route + '">' + ico(icon) + extra + '<span>' + label + '</span></a>';
    }
    $('#bnav').innerHTML =
      it('home', '/', 'home', t('home'), '') +
      '<button class="bn-i" data-act="cats">' + ico('grid') + '<span>' + t('cats') + '</span></button>' +
      it('deals', '/deals', 'bolt', t('deals'), '') +
      '<button class="bn-i" data-act="openCart">' + ico('cart') + '<em class="cnt" data-cnt="cart"></em><span>' + t('cart') + '</span></button>' +
      it('account', '/account', 'user', t('account'), '');
    updateBadges();
  }
  function renderFooter() {
    function col(h, items) { return '<div><h4>' + h + '</h4>' + items.map(function (x) { return '<button class="flk" data-act="demo">' + x + '</button>'; }).join('') + '</div>'; }
    $('#foot').innerHTML =
      '<div class="f-top"><button class="totop" data-act="top">' + t('backTop') + '</button></div>' +
      '<div class="wrap f-grid">' +
      col(t('f_care'), [t('f_help'), t('f_how'), t('f_returns'), t('f_contact')]) +
      col(t('f_about'), [t('f_us'), t('f_careers'), t('f_sell'), t('f_aff')]) +
      '<div><h4>' + t('f_pay') + '</h4><div class="pay-chips"><span>' + t('cod') + '</span><span>bKash</span><span>Nagad</span><span>Visa</span><span>Mastercard</span></div></div>' +
      '<div><h4>' + t('f_ship') + '</h4><p class="muted">' + t('f_shipTxt') + '</p></div>' +
      '</div>' +
      '<div class="wrap f-end"><p>© ' + new Date().getFullYear() + ' GASS SHOPPING BD · ' + t('f_demo') + '</p></div>' +
      '<button class="cmp-tray" id="cmpTray" data-go="/compare" hidden>' + ico('compare') + t('compare') + ' (<b>0</b>)</button>';
    updateBadges();
  }

  Object.assign(U, {
    $: $, $$: $$, esc: esc, byId: byId, catOf: catOf, reduced: reduced, S: S, save: save, t: t, tx: tx, fmt: fmt, money: money,
    disc: disc, stars: stars, tint: tint, distName: distName, divName: divName, ico: ico, zone: zone, etaText: etaText, defSize: defSize,
    totals: totals, cartCount: cartCount, addCart: addCart, updateBadges: updateBadges, nextEnd: nextEnd, cdHTML: cdHTML, tickCd: tickCd,
    toast: toast, openLayer: openLayer, closeLayer: closeLayer, confetti: confetti, parse: parse, go: go, back: back,
    renderHeader: renderHeader, renderBnav: renderBnav, renderFooter: renderFooter, logoMark: logoMark, loc: loc
  });
})(window.GASS = window.GASS || {});
    
