/* Main: rendering, actions and event wiring. */
(function (G) {
  'use strict';
  var D = document, U = G.U, V = G.V, $ = U.$, $$ = U.$$, S = U.S, t = U.t, tx = U.tx, esc = U.esc, fmt = U.fmt, money = U.money, byId = U.byId, toast = U.toast, COL = G.COL, ico = U.ico;
  var timers = [], ar = {}, lastSig = '';

  function applyTheme() { if (S.theme) D.documentElement.setAttribute('data-theme', S.theme); else D.documentElement.removeAttribute('data-theme'); }
  function applyLang() { D.documentElement.lang = S.lang; }

  /* ---------- render ---------- */
  G.render = function () {
    timers.forEach(clearInterval); timers = [];
    if (V.v360) { V.v360.destroy(); V.v360 = null; }
    var r = U.parse(), name = r.parts[0] || 'home', html = '', title = 'GASS SHOPPING BD';
    switch (name) {
      case 'home': html = V.home(); break;
      case 'search': html = V.search(r); break;
      case 'p': html = V.product(r.parts[1]); var p = byId(r.parts[1]); if (p) title = U.tx(p.name) + ' · GASS SHOPPING BD'; break;
      case 'cart': html = V.cart(); break;
      case 'checkout': html = V.checkout(); break;
      case 'orders': html = V.orders(); break;
      case 'wishlist': html = V.wishlist(); break;
      case 'compare': html = V.compare(); break;
      case 'deals': html = V.deals(r); break;
      case 'vouchers': html = V.vouchers(); break;
      case 'account': html = V.account(); break;
      default: html = V.notFound();
    }
    var v = $('#view');
    v.innerHTML = html;
    v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter');
    D.body.dataset.route = name;
    D.title = title;
    U.renderHeader(); U.renderBnav();
    if (name === 'p') V.after.product(r);
    if (name === 'home') initHero();
    if (name === 'orders') { lastSig = S.orders.map(V.orderStep).join(); timers.push(setInterval(refreshOrders, 3000)); }
    U.tickCd(); U.updateBadges();
  };

  function initHero() {
    var tr = $('#heroTrack'); if (!tr) return;
    var n = tr.children.length, i = 0, hover = false, dots = $$('.hero-dots button');
    function show(k) { i = (k + n) % n; tr.style.transform = 'translateX(-' + (i * 100) + '%)'; dots.forEach(function (d, j) { d.classList.toggle('on', j === i); }); }
    G.heroShow = show;
    var h = $('#hero');
    h.addEventListener('mouseenter', function () { hover = true; });
    h.addEventListener('mouseleave', function () { hover = false; });
    if (!U.reduced()) timers.push(setInterval(function () { if (!hover && !D.hidden) show(i + 1); }, 5200));
  }
  function refreshOrders() {
    var l = $('#ordersList'); if (!l) return;
    var sig = S.orders.map(V.orderStep).join();
    if (sig === lastSig) return;
    lastSig = sig;
    var open = $$('.ord details[open]').map(function (d) { return d.closest('.ord').dataset.oid; });
    l.innerHTML = V.ordersList(open);
  }
  function refreshCartUI() {
    var name = U.parse().parts[0];
    if (name === 'cart') G.render();
    else if (name === 'checkout') { if (!U.totals().count) G.render(); else refreshCheckout(); }
    var lyr = $('#layer.on .lyr.drawer');
    if (lyr) lyr.innerHTML = V.drawer();
    U.updateBadges();
  }
  function refreshCheckout() {
    var s = $('#coSum'); if (s) s.innerHTML = V.coSum();
    var pb = $('#payBox'); if (pb) pb.innerHTML = V.payBox();
    $$('.rads').forEach(function (g) { $$('.rad', g).forEach(function (l) { l.classList.toggle('on', l.querySelector('input').checked); }); });
  }

  /* ---------- helpers ---------- */
  function bump() { var c = $('#cartBtn'); if (!c) return; c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
  function fly(src, p, ci) {
    var cb = $('#cartBtn');
    if (!src || !cb || U.reduced() || !src.getBoundingClientRect) { bump(); return; }
    var fr = src.getBoundingClientRect(), to = cb.getBoundingClientRect(), sz = Math.min(90, Math.max(48, fr.width));
    var d = D.createElement('div');
    d.className = 'fly';
    d.innerHTML = G.shapeSVG(p.shape, COL[p.cols[ci || 0]].c, false);
    d.style.cssText = 'left:' + (fr.left + fr.width / 2 - sz / 2) + 'px;top:' + (fr.top + fr.height / 2 - sz / 2) + 'px;width:' + sz + 'px;height:' + sz + 'px';
    D.body.appendChild(d);
    var dx = to.left + to.width / 2 - (fr.left + fr.width / 2), dy = to.top + to.height / 2 - (fr.top + fr.height / 2);
    var an = d.animate([
      { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: 'translate(' + dx * 0.45 + 'px,' + (dy * 0.45 - 90) + 'px) scale(.8) rotate(120deg)', opacity: 1, offset: 0.45 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.12) rotate(300deg)', opacity: 0.3 }
    ], { duration: 780, easing: 'cubic-bezier(.4,0,.2,1)' });
    an.onfinish = function () { d.remove(); bump(); };
  }
  function cartToast() { toast(t('added'), { go: '/cart', label: t('viewCart') }); }
  function sugBox() {
    var q = $('#sQ').value.trim().toLowerCase(), box = $('#sug');
    if (!q) { box.hidden = true; return; }
    var items = G.PRODUCTS.filter(function (p) { return p.name.en.toLowerCase().indexOf(q) > -1 || p.name.bn.indexOf(q) > -1 || p.brand.toLowerCase().indexOf(q) > -1; }).slice(0, 6);
    var cats = G.CATS.filter(function (c) { return c.en.toLowerCase().indexOf(q) > -1 || c.bn.indexOf(q) > -1; }).slice(0, 2);
    var h = cats.map(function (c) { return '<a class="sg" data-go="/search?cat=' + c.id + '" href="#/search?cat=' + c.id + '">' + ico('grid') + '<span>' + esc(tx(c)) + '</span><small>' + t('inCat') + '</small></a>'; }).join('') +
      items.map(function (p) { return '<a class="sg" data-go="/p/' + p.id + '" href="#/p/' + p.id + '"><span class="sg-i" style="--tint:' + U.tint(p.cols[0]) + '">' + G.shapeSVG(p.shape, COL[p.cols[0]].c, false) + '</span><span>' + esc(tx(p.name)) + '</span><b>' + money(p.price) + '</b></a>'; }).join('');
    box.innerHTML = h || '<p class="muted pad">' + t('noRes') + '</p>';
    box.hidden = false;
  }
  function applyFilters(box) {
    var q = U.parse().q, o = { q: q.q || '', cat: q.cat || '', sort: q.sort || '' };
    o.br = $$('[data-f="br"]:checked', box).map(function (x) { return x.value; }).join(',');
    o.min = $('[data-f="min"]', box).value; o.max = $('[data-f="max"]', box).value;
    var rr = $('[data-f="r"]:checked', box); o.r = rr && rr.value !== '0' ? rr.value : '';
    o.free = $('[data-f="free"]', box).checked ? '1' : ''; o.stock = $('[data-f="stock"]', box).checked ? '1' : '';
    U.go('/search?' + V.qs(o), { replace: true, keep: true });
    if (box.dataset.ctx === 'm') { var r = U.parse(); r.ctx = 'm'; box.innerHTML = V.filtersHTML(r); }
  }
  function validate() {
    var a = S.addr;
    a.name = $('#aName').value.trim(); a.phone = $('#aPhone').value.trim(); a.line = $('#aLine').value.trim();
    var ph = a.phone.replace(/[\s-]/g, '').replace(/^\+?88/, ''), mob = /^01[3-9]\d{8}$/;
    if (a.name.length < 2) return ['aName', t('eName')];
    if (!mob.test(ph)) return ['aPhone', t('ePhone')];
    if (a.line.length < 8) return ['aLine', t('eAddr')];
    if (S.pay === 'card') {
      if ($('#cNo').value.replace(/\s/g, '').length !== 16) return ['cNo', t('eCard')];
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test($('#cExp').value)) return ['cExp', t('eExp')];
      if (!/^\d{3}$/.test($('#cCvv').value)) return ['cCvv', t('eCvv')];
    }
    if (S.pay === 'bkash' || S.pay === 'nagad') { if (!mob.test($('#wNo').value.trim())) return ['wNo', t('ePhone')]; }
    U.save();
    return null;
  }
  function setSlide(i) {
    $('#galTrack').style.transform = 'translateX(-' + (i * 100) + '%)';
    $$('.dots button').forEach(function (d, j) { d.classList.toggle('on', j === i); });
    var h = $('#galHint'); if (h) h.hidden = i !== 0;
        }  /* ---------- AR ---------- */
  function openAR() {
    var p = byId(U.parse().parts[1]); if (!p) return;
    U.openLayer(V.arHTML(), 'full');
    ar = { p: p, ci: V.pv.color, x: 0, y: 0, s: 1, v: null, placed: false };
    var timer = setTimeout(function () {
      var b = $('#arBtn'); if (!b) return;
      b.disabled = false; $('#arMsg').textContent = t('arFound'); $('#arRet').classList.add('ok');
    }, 2200);
    U.cleanup = function () { clearTimeout(timer); if (ar.v) ar.v.destroy(); ar = {}; };
  }
  function arApply() { var o = $('#arObj'); if (o) o.style.transform = 'translate(' + ar.x + 'px,' + ar.y + 'px) scale(' + ar.s + ')'; }
  function arPlace() {
    if (!ar.p) return;
    if (ar.placed) {
      var f = D.createElement('div'); f.className = 'ar-flash'; $('.ar').appendChild(f);
      setTimeout(function () { f.remove(); }, 500);
      toast(t('arSaved')); return;
    }
    ar.placed = true;
    var o = $('#arObj'); o.hidden = false;
    var v = $('#arV'); v.classList.add('drop');
    ar.v = G.mount360(v, ar.p.shape, COL[ar.p.cols[ar.ci]].c, { drag: false, speed: 0.5 });
    $('#arRet').hidden = true;
    $('#arMsg').textContent = t('arDrag');
    $('#arBtn').textContent = t('arCapture');
    var drag = null;
    o.addEventListener('pointerdown', function (e) { drag = { x: e.clientX - ar.x, y: e.clientY - ar.y }; try { o.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } });
    o.addEventListener('pointermove', function (e) { if (!drag) return; ar.x = e.clientX - drag.x; ar.y = e.clientY - drag.y; arApply(); });
    o.addEventListener('pointerup', function () { drag = null; });
  }

  /* ---------- actions ---------- */
  var PRIZES = [{ c: 'GASS50' }, { c: 'WELCOME10' }, { c: 'FREESHIP' }, { c: 'FEST100' }, { c: 'BKASH15' }, { coins: 50 }, { coins: 200 }];
  var ACT = {
    back: function () { U.back(); },
    top: function () { window.scrollTo({ top: 0, behavior: U.reduced() ? 'auto' : 'smooth' }); },
    demo: function () { toast(t('demoPage')); },
    closeLayer: function () { U.closeLayer(); },
    lang: function () { S.lang = S.lang === 'bn' ? 'en' : 'bn'; U.save(); applyLang(); U.renderFooter(); G.render(); },
    theme: function () {
      var dark = S.theme ? S.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      S.theme = dark ? 'light' : 'dark'; U.save(); applyTheme();
    },
    hero: function (b) { if (G.heroShow) G.heroShow(+b.dataset.i); },
    more: function (b) {
      V.jfy += 12;
      var m = V.moreHTML(); $('#jfy').innerHTML = m.html; if (m.done) b.hidden = true;
    },
    wish: function (b) {
      var id = +b.dataset.id, i = S.wish.indexOf(id), on = i < 0;
      if (on) S.wish.push(id); else S.wish.splice(i, 1);
      U.save();
      $$('.heart[data-id="' + id + '"]').forEach(function (h) { h.classList.toggle('on', on); h.setAttribute('aria-pressed', on); h.classList.remove('pop'); void h.offsetWidth; if (on) h.classList.add('pop'); });
      U.updateBadges();
      toast(on ? t('wishAdded') : t('wishRemoved'));
      if (U.parse().parts[0] === 'wishlist' && !on) G.render();
    },
    compare: function (b) {
      var id = +b.dataset.id, i = S.compare.indexOf(id);
      if (i < 0) { if (S.compare.length >= 3) { toast(t('cmpFull')); return; } S.compare.push(id); } else S.compare.splice(i, 1);
      U.save(); U.updateBadges();
      if (U.parse().parts[0] === 'compare') { G.render(); return; }
      var on = i < 0; b.classList.toggle('on', on); b.innerHTML = ico('compare') + (on ? t('inCompare') : t('compare'));
      toast(on ? t('cmpAdded') : t('cmpRemoved'), on ? { go: '/compare', label: t('compare') } : null);
    },
    quick: function (b) {
      var id = +b.dataset.id, p = byId(id), c = b.closest('.pc'), src = c ? c.querySelector('.pc-img svg') : b;
      U.addCart(id); fly(src, p, 0); cartToast(); refreshCartUI();
    },
    add: function (b) {
      var p = byId(U.parse().parts[1]); if (!p) return;
      U.addCart(p.id, { color: V.pv.color, size: V.pv.size, qty: V.pv.qty });
      fly($('#v360'), p, V.pv.color); cartToast();
      b.classList.add('done'); b.innerHTML = ico('check') + t('addedShort');
      setTimeout(function () { b.classList.remove('done'); b.innerHTML = ico('plus') + t('addCart'); }, 1400);
    },
    buy: function () {
      var p = byId(U.parse().parts[1]); if (!p) return;
      U.addCart(p.id, { color: V.pv.color, size: V.pv.size, qty: V.pv.qty }); U.go('/checkout');
    },
    color: function (b) {
      var p = byId(U.parse().parts[1]), i = +b.dataset.i, k = p.cols[i], c = COL[k].c;
      V.pv.color = i;
      $$('.sw').forEach(function (s, j) { s.classList.toggle('on', j === i); });
      $('#colName').textContent = tx(COL[k]);
      if (V.v360) V.v360.setColor(c);
      $$('.gs').forEach(function (s) { s.style.setProperty('--pc', c); });
      $('#galView').style.setProperty('--tint', U.tint(k));
    },
    size: function (b) { V.pv.size = b.dataset.s; $$('.pill[data-act="size"]').forEach(function (x) { x.classList.toggle('on', x === b); }); },
    pq: function (b) {
      var p = byId(U.parse().parts[1]), n = V.pv.qty + (+b.dataset.d);
      V.pv.qty = Math.max(1, Math.min(Math.min(10, p.stock), n)); $('#pq').textContent = fmt(V.pv.qty);
    },
    slide: function (b) { setSlide(+b.dataset.i); },
    rot: function (b) { if (V.v360) V.v360.step(+b.dataset.d); },
    share: function () {
      var done = function () { toast(t('linkCopied')); }, fail = function () { toast(t('linkManual')); };
      try { navigator.clipboard.writeText(location.href).then(done, fail); } catch (e) { fail(); }
    },
    sizeguide: function (b) { U.openLayer(V.sizeHTML(byId(b.dataset.id)), 'sheet'); },
    ar: openAR, arPlace: arPlace,
    loc: function () { U.openLayer(V.locHTML(), 'sheet'); },
    applyLoc: function () {
      S.loc = { div: $('#lcDiv').value, dist: $('#lcDist').value };
      if (S.ship === 'exp' && !U.zone(S.loc.dist).exp) S.ship = 'std';
      U.save(); U.closeLayer(); G.render(); toast(t('locSet', U.distName(S.loc.dist)));
    },
    cats: function () { U.openLayer(V.catsHTML(), 'sheet'); },
    filters: function () { var r = U.parse(); U.openLayer(V.filterSheet(r), 'sheet tall'); },
    openCart: function () { U.openLayer(V.drawer(), 'drawer'); },
    cq: function (b) {
      var l = S.cart.filter(function (x) { return x.k === b.dataset.k; })[0]; if (!l) return;
      var p = byId(l.id); l.qty += +b.dataset.d;
      if (l.qty < 1) S.cart.splice(S.cart.indexOf(l), 1); else l.qty = Math.min(l.qty, Math.min(10, p.stock));
      U.save(); refreshCartUI();
    },
    crm: function (b) { S.cart = S.cart.filter(function (x) { return x.k !== b.dataset.k; }); U.save(); refreshCartUI(); },
    csave: function (b) {
      var l = S.cart.filter(function (x) { return x.k === b.dataset.k; })[0]; if (!l) return;
      if (S.wish.indexOf(l.id) < 0) S.wish.push(l.id);
      S.cart = S.cart.filter(function (x) { return x !== l; }); U.save(); refreshCartUI(); toast(t('wishAdded'));
    },
    vPick: function (b) { S.applied = S.applied === b.dataset.code ? '' : b.dataset.code; U.save(); refreshCartUI(); },
    vClear: function () { S.applied = ''; U.save(); refreshCartUI(); },
    collect: function (b) {
      var c = b.dataset.code; if (S.vouchers.indexOf(c) < 0) S.vouchers.push(c);
      U.save(); b.disabled = true; b.className = 'btn sm ghost'; b.textContent = t('collected'); toast(t('vCollected', c));
    },
    login: function () { U.openLayer(V.loginHTML(), 'sheet'); },
    logout: function () { S.user = null; U.save(); U.renderHeader(); G.render(); },
    mystery: function () { U.openLayer(V.mysteryHTML(), 'sheet'); },
    shake: function (b) {
      var box = $('#mbBox'); b.disabled = true;
      box.classList.remove('open'); box.classList.add('shake');
      setTimeout(function () {
        box.classList.remove('shake'); box.classList.add('open');
        var pz = PRIZES[Math.floor(Math.random() * PRIZES.length)], html;
        if (pz.c) {
          var v = G.VOUCHERS.filter(function (x) { return x.code === pz.c; })[0];
          if (S.vouchers.indexOf(pz.c) < 0) S.vouchers.push(pz.c);
          html = '<div class="prize"><b>' + v.code + '</b><span>' + esc(tx(v)) + '</span></div>';
        } else { S.coins += pz.coins; html = '<div class="prize"><b>+' + fmt(pz.coins) + '</b><span>' + t('coins') + '</span></div>'; }
        U.save();
        $('#mbOut').innerHTML = '<p class="mb-win">' + t('mbWin') + '</p>' + html;
        U.confetti(); b.disabled = false; b.textContent = t('mbAgain');
      }, U.reduced() ? 200 : 1100);
    },
    aLabel: function (b) { S.addr.label = b.dataset.v; U.save(); $$('[data-act="aLabel"]').forEach(function (x) { x.classList.toggle('on', x === b); }); },
    place: function () {
      var err = validate(), box = $('#coErr');
      $$('.bad').forEach(function (x) { x.classList.remove('bad'); });
      if (err) { box.textContent = err[1]; box.hidden = false; var f = $('#' + err[0]); if (f) { f.classList.add('bad'); f.focus(); } return; }
      box.hidden = true;
      var tt = U.totals(), a = S.addr;
      U.openLayer(V.processHTML(), 'sheet center');
      setTimeout(function () {
        var id = 'GBD' + String(Math.floor(Math.random() * 90000000) + 10000000), coins = Math.floor(tt.total / 100);
        var payLabel = { cod: t('cod'), bkash: 'bKash', nagad: 'Nagad', card: t('card') }[S.pay];
        var o = { id: id, at: Date.now(), boost: 0, total: tt.total, payLabel: payLabel, name: a.name, coins: coins, items: tt.lines.map(function (x) { return { id: x.p.id, qty: x.l.qty, color: x.l.color, size: x.l.size, price: x.p.price }; }) };
        S.orders.unshift(o); S.coins += coins; S.cart = []; S.applied = ''; U.save(); U.updateBadges();
        U.openLayer(V.successHTML(o), 'sheet center');
        U.confetti();
      }, U.reduced() ? 300 : 1700);
    },
    skip: function (b) { var o = S.orders.filter(function (x) { return x.id === b.dataset.id; })[0]; if (o) { o.boost = (o.boost || 0) + 1; U.save(); lastSig = ''; refreshOrders(); } },
    reorder: function (b) {
      var o = S.orders.filter(function (x) { return x.id === b.dataset.id; })[0]; if (!o) return;
      o.items.forEach(function (i) { U.addCart(i.id, { color: i.color, size: i.size, qty: i.qty }); });
      U.go('/cart');
    },
    wishAll: function () { S.wish.forEach(function (id) { U.addCart(id); }); cartToast(); refreshCartUI(); },
    fbtAdd: function () {
      $$('[data-fbt]:checked').forEach(function (c) { U.addCart(+c.dataset.fbt); });
      fly($('.fbt-img'), byId(U.parse().parts[1]), 0); cartToast(); refreshCartUI();
    },
    writeRv: function () { var f = $('#rvForm'); f.hidden = !f.hidden; },
    pickStar: function (b) { var n = +b.dataset.n; $('#starPick').dataset.v = n; $$('#starPick button').forEach(function (x, i) { x.classList.toggle('on', i < n); }); },
    sendRv: function (b) {
      var txt = $('#rvText').value.trim(); if (txt.length < 3) { toast(t('rvShort')); return; }
      var id = +b.dataset.id, star = +($('#starPick').dataset.v || 5), nm = S.user ? S.user.name : null;
      (S.reviews[id] = S.reviews[id] || []).unshift({ star: star, name: { en: nm || 'You', bn: nm || 'আপনি' }, text: { en: txt, bn: txt }, daysAgo: 0, verified: false });
      U.save(); $('#rvList').innerHTML = V.rvList(byId(id)); $('#rvText').value = ''; $('#rvForm').hidden = true; toast(t('rvThanks'));
    }
  };  /* ---------- events ---------- */
  D.addEventListener('click', function (e) {
    var sb = $('#sug');
    if (sb && !sb.hidden && !e.target.closest('.search')) sb.hidden = true;
    var a = e.target.closest('[data-go]');
    if (a) { e.preventDefault(); if ($('#layer').classList.contains('on')) U.closeLayer(); U.go(a.dataset.go); return; }
    var b = e.target.closest('[data-act]');
    if (b && ACT[b.dataset.act]) { if (b.tagName === 'A') e.preventDefault(); ACT[b.dataset.act](b, e); }
  });
  D.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.id === 'searchForm') { e.preventDefault(); U.go('/search?' + V.qs({ q: $('#sQ').value.trim(), cat: $('#sCat').value })); }
    else if (f.id === 'vForm') {
      e.preventDefault();
      var c = $('#vIn').value.trim().toUpperCase(), v = G.VOUCHERS.filter(function (x) { return x.code === c; })[0];
      if (!v) { toast(t('vBad')); return; }
      if (S.vouchers.indexOf(c) < 0) S.vouchers.push(c);
      S.applied = c; U.save(); refreshCartUI();
    } else if (f.id === 'loginForm') {
      e.preventDefault();
      var name = $('#lgName').value.trim();
      if (name.length < 2) { toast(t('eName')); return; }
      S.user = { name: name, id: $('#lgId').value.trim() }; if (!S.addr.name) S.addr.name = name;
      U.save(); U.closeLayer(); G.render(); toast(t('welcome', name));
    }
  });
  D.addEventListener('input', function (e) {
    var el = e.target;
    if (el.id === 'sQ') sugBox();
    else if (el.id === 'cNo') el.value = el.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    else if (el.id === 'cExp') { var d = el.value.replace(/\D/g, '').slice(0, 4); el.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; }
    else if (el.id === 'arScale') { ar.s = el.value / 100; arApply(); }
    else if (el.id === 'cCvv' || el.id === 'wNo') el.value = el.value.replace(/\D/g, '');
    else if (el.id === 'aName' || el.id === 'aPhone' || el.id === 'aLine') { S.addr[el.id === 'aName' ? 'name' : el.id === 'aPhone' ? 'phone' : 'line'] = el.value; U.save(); }
    if (el.classList.contains('bad')) el.classList.remove('bad');
  });
  D.addEventListener('focusin', function (e) { if (e.target.id === 'sQ') sugBox(); });
  D.addEventListener('change', function (e) {
    var el = e.target, box = el.closest('.filters');
    if (box && el.hasAttribute('data-f')) { applyFilters(box); return; }
    if (el.hasAttribute('data-sort')) { var q = U.parse().q; q.sort = el.value === 'rel' ? '' : el.value; U.go('/search?' + V.qs(q), { replace: true, keep: true }); return; }
    if (el.id === 'lcDiv') { $('#lcDist').innerHTML = V.distOpts(el.value, ''); $('#lcPrev').innerHTML = V.locPrev($('#lcDist').value); }
    else if (el.id === 'lcDist') $('#lcPrev').innerHTML = V.locPrev(el.value);
    else if (el.id === 'aDiv') { $('#aDist').innerHTML = V.distOpts(el.value, ''); S.loc = { div: el.value, dist: $('#aDist').value }; U.save(); G.render(); }
    else if (el.id === 'aDist') { S.loc = { div: $('#aDiv').value, dist: el.value }; if (S.ship === 'exp' && !U.zone(el.value).exp) S.ship = 'std'; U.save(); G.render(); }
    else if (el.name === 'pay') { S.pay = el.value; U.save(); refreshCheckout(); }
    else if (el.name === 'ship') { S.ship = el.value; U.save(); refreshCheckout(); }
    else if (el.hasAttribute('data-fbt')) {
      var p = byId(U.parse().parts[1]), all = [p].concat(V.fbtPick(p));
      $('#fbtTot').textContent = money(all.reduce(function (a, x) { var c = $('[data-fbt="' + x.id + '"]'); return a + (c && c.checked ? x.price : 0); }, 0));
    }
  });
  D.addEventListener('keydown', function (e) { if (e.key === 'Escape') { U.closeLayer(); var s = $('#sug'); if (s) s.hidden = true; } });

  /* ---------- start ---------- */
  D.addEventListener('pointerdown', function (e) {
    var b = e.target.closest('.btn');
    if (!b || b.disabled || U.reduced()) return;
    var r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), n = D.createElement('span');
    n.className = 'ripple';
    n.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px';
    b.appendChild(n);
    setTimeout(function () { n.remove(); }, 650);
  });

  applyTheme(); applyLang();
  U.renderFooter();
  if (U.reduced()) G.render();
  else {
    U.renderHeader(); U.renderBnav();
    $('#view').innerHTML = '<div class="wrap"><div class="sk hero"></div><div class="grid" style="margin-top:18px">' + new Array(7).join('<div class="sk"></div>') + '</div></div>';
    setTimeout(G.render, 450);
  }
  setInterval(U.tickCd, 1000);
})(window.GASS = window.GASS || {});
