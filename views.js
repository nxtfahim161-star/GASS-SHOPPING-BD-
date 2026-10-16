/* Views: every page and modal is a function that returns an HTML string. */
(function (G) {
  'use strict';
  var U = G.U, V = G.V = {};
  var $ = U.$, esc = U.esc, t = U.t, tx = U.tx, fmt = U.fmt, money = U.money, ico = U.ico, S = U.S, stars = U.stars, tint = U.tint, disc = U.disc, byId = U.byId;
  var COL = G.COL, CATS = G.CATS, P = G.PRODUCTS, shapeSVG = G.shapeSVG;
  var pv = V.pv = { color: 0, size: '', qty: 1 };
  V.jfy = 12;

  function qs(o) {
    var a = [];
    Object.keys(o).forEach(function (k) { if (o[k] !== '' && o[k] != null && o[k] !== 0 && o[k] !== false) a.push(k + '=' + encodeURIComponent(o[k])); });
    return a.join('&');
  }
  function lang2(arr, i) { return arr[S.lang === 'bn' ? i + 1 : i]; }
  V.qs = qs;

  /* ---------- shared pieces ---------- */
  function card(p, i, flash) {
    var c = p.cols[0], d = disc(p), w = S.wish.indexOf(p.id) > -1;
    return '<article class="pc" style="--i:' + Math.min(i || 0, 10) + '">' +
      '<a class="pc-img" href="#/p/' + p.id + '" data-go="/p/' + p.id + '" style="--tint:' + tint(c) + '" aria-label="' + esc(tx(p.name)) + '">' + shapeSVG(p.shape, COL[c].c) +
      (d ? '<span class="badge sale">-' + fmt(d) + '%</span>' : '') + (p.mall ? '<span class="badge mall">Mall</span>' : '') + '</a>' +
      '<button class="heart' + (w ? ' on' : '') + '" data-act="wish" data-id="' + p.id + '" aria-label="' + t('wishlist') + '" aria-pressed="' + w + '">' + ico('heart') + '</button>' +
      '<div class="pc-b"><div class="pc-brand">' + esc(p.brand) + '</div>' +
      '<a class="pc-t" href="#/p/' + p.id + '" data-go="/p/' + p.id + '">' + esc(tx(p.name)) + '</a>' +
      '<div class="pc-r">' + stars(p.rating) + '<span>(' + fmt(p.reviews) + ')</span></div>' +
      '<div class="pc-p"><b>' + money(p.price) + '</b>' + (p.old > p.price ? '<s>' + money(p.old) + '</s>' : '') + '</div>' +
      (flash ? '<div class="sold"><i style="width:' + p.sold + '%"></i><span>' + t('sold', fmt(p.sold)) + '</span></div>' : '') +
      '<div class="pc-f">' + (p.free ? '<span class="tag">' + t('freeDel') + '</span>' : '<span></span>') +
      '<button class="quick" data-act="quick" data-id="' + p.id + '" aria-label="' + t('addCart') + '">' + ico('plus') + '</button></div></div></article>';
  }
  V.card = card;

  function empty(icon, title, text, btn) {
    return '<div class="wrap"><div class="empty">' + ico(icon) + '<h2>' + title + '</h2><p>' + text + '</p>' + (btn || '') + '</div></div>';
  }

  /* ---------- home ---------- */
  function hero() {
    var slides = [
      { k: 'h1', go: '/deals', sh: [['hoodie', 'sand'], ['headphones', 'lemon'], ['watch', 'sage']] },
      { k: 'h2', go: '/search?cat=mart', sh: [['jar', 'gold'], ['bottle', 'olive'], ['bag', 'clay']] },
      { k: 'h3', go: '/vouchers', box: 1 }
    ];
    return '<section class="wrap hero-w"><div class="hero" id="hero" aria-roledescription="carousel"><div class="hero-track" id="heroTrack">' +
      slides.map(function (s, i) {
        var art = s.box ? '<span class="fl fl0 big">' + G.boxSVG() + '</span>' : s.sh.map(function (x, j) { return '<span class="fl fl' + j + '">' + shapeSVG(x[0], COL[x[1]].c) + '</span>'; }).join('');
        return '<article class="slide ' + s.k + '" aria-roledescription="slide"><div class="sl-txt"><span class="eyebrow">' + t(s.k + '_e') + '</span>' +
          (i === 0 ? '<h1>' : '<h2>') + t(s.k + '_t') + (i === 0 ? '</h1>' : '</h2>') + '<p>' + t(s.k + '_p') + '</p>' +
          '<a class="btn cta" href="#' + s.go + '" data-go="' + s.go + '">' + t(s.k + '_c') + ico('chev') + '</a></div><div class="sl-art" aria-hidden="true">' + art + '</div></article>';
      }).join('') + '</div>' +
      '<div class="hero-dots">' + slides.map(function (s, i) { return '<button class="' + (i ? '' : 'on') + '" data-act="hero" data-i="' + i + '" aria-label="' + (i + 1) + '"></button>'; }).join('') + '</div></div></section>';
  }

  function voucherTk(v) {
    var has = S.vouchers.indexOf(v.code) > -1;
    return '<div class="tk"><div class="tk-l"><b>' + v.code + '</b><span>' + tx(v) + '</span></div>' +
      '<button class="btn sm ' + (has ? 'ghost' : 'cta') + '" data-act="collect" data-code="' + v.code + '"' + (has ? ' disabled' : '') + '>' + (has ? t('collected') : t('collect')) + '</button></div>';
  }

  V.home = function () {
    var flash = P.filter(function (p) { return p.flash; });
    var brands = Object.keys(P.reduce(function (a, p) { a[p.brand] = 1; return a; }, {}));
    var jfy = P.slice().sort(function (a, b) { return b.reviews - a.reviews; });
    var recent = S.recent.map(byId).filter(Boolean).slice(0, 8);
    var svc = [['truck', 'svc1'], ['ret', 'svc2'], ['cash', 'svc3'], ['shield', 'svc4']];
    V.jfy = 12;
    return hero() +
      '<section class="wrap svc">' + svc.map(function (s) { return '<div>' + ico(s[0]) + '<span><b>' + t(s[1]) + '</b><small>' + t(s[1] + 'b') + '</small></span></div>'; }).join('') + '</section>' +
      '<section class="wrap sec"><div class="sec-h"><h2>' + t('cats') + '</h2></div><div class="catgrid">' + CATS.map(function (c) {
        return '<a class="cat" href="#/search?cat=' + c.id + '" data-go="/search?cat=' + c.id + '"><span class="cat-i" style="--tint:' + tint(c.col) + '">' + shapeSVG(c.shape, COL[c.col].c) + '</span><span>' + esc(tx(c)) + '</span></a>';
      }).join('') + '</div></section>' +
      '<section class="wrap sec flashsec"><div class="sec-h"><h2>' + ico('bolt') + t('flash') + '</h2>' + U.cdHTML(U.nextEnd()) + '<a class="more" href="#/deals" data-go="/deals">' + t('seeAll') + ico('chev') + '</a></div><div class="hscroll">' +
      flash.map(function (p, i) { return card(p, i, true); }).join('') + '</div></section>' +
      '<section class="wrap sec"><div class="sec-h"><h2>' + t('vouchers') + '</h2><a class="more" href="#/vouchers" data-go="/vouchers">' + t('seeAll') + ico('chev') + '</a></div><div class="tks">' + G.VOUCHERS.slice(0, 3).map(voucherTk).join('') + '</div></section>' +
      '<section class="wrap sec duo">' +
      '<button class="promo mb" data-act="mystery"><span class="promo-art">' + G.boxSVG() + '</span><span><b>' + t('mbPromoT') + '</b><small>' + t('mbPromoP') + '</small></span></button>' +
      '<a class="promo plus" href="#/vouchers" data-go="/vouchers"><span class="promo-art">' + ico('shield') + '</span><span><b>' + t('plusT') + '</b><small>' + t('plusP') + '</small></span></a></section>' +
      '<section class="wrap sec"><div class="sec-h"><h2>' + t('brands') + '</h2></div><div class="chips">' + brands.map(function (b) { return '<a class="chip" href="#/search?br=' + encodeURIComponent(b) + '" data-go="/search?br=' + encodeURIComponent(b) + '">' + esc(b) + '</a>'; }).join('') + '</div></section>' +
      (recent.length ? '<section class="wrap sec"><div class="sec-h"><h2>' + t('recent') + '</h2></div><div class="hscroll">' + recent.map(function (p, i) { return card(p, i); }).join('') + '</div></section>' : '') +
      '<section class="wrap sec"><div class="sec-h"><h2>' + t('forYou') + '</h2></div><div class="grid" id="jfy">' + jfy.slice(0, 12).map(function (p, i) { return card(p, i); }).join('') + '</div>' +
      '<div class="morewrap"><button class="btn ghost" id="moreBtn" data-act="more"' + (jfy.length <= 12 ? ' hidden' : '') + '>' + t('loadMore') + '</button></div></section>';
  };
  V.moreHTML = function () {
    var jfy = P.slice().sort(function (a, b) { return b.reviews - a.reviews; });
    return { html: jfy.slice(0, V.jfy).map(function (p, i) { return card(p, i); }).join(''), done: V.jfy >= jfy.length };
  };

  /* ---------- search / category ---------- */
  function filterState(r) {
    var q = r.q;
    return { q: (q.q || '').trim(), cat: q.cat || '', sort: q.sort || 'rel', min: +q.min || 0, max: +q.max || 0, r: +q.r || 0, br: (q.br || '').split(',').filter(Boolean), free: q.free === '1', stock: q.stock === '1' };
  }
  function matches(p, q) {
    q = q.toLowerCase();
    return p.name.en.toLowerCase().indexOf(q) > -1 || p.name.bn.indexOf(q) > -1 || p.brand.toLowerCase().indexOf(q) > -1 || U.catOf(p.cat).en.toLowerCase().indexOf(q) > -1 || U.catOf(p.cat).bn.indexOf(q) > -1;
  }
  V.search = function (r) {
    var f = filterState(r);
    var base = P.filter(function (p) { return (!f.cat || p.cat === f.cat) && (!f.q || matches(p, f.q)); });
    var res = base.filter(function (p) {
      return (!f.min || p.price >= f.min) && (!f.max || p.price <= f.max) && (!f.r || p.rating >= f.r) && (!f.br.length || f.br.indexOf(p.brand) > -1) && (!f.free || p.free) && (!f.stock || p.stock > 0);
    });
    var sorts = { pa: function (a, b) { return a.price - b.price; }, pd: function (a, b) { return b.price - a.price; }, rt: function (a, b) { return b.rating - a.rating; }, dc: function (a, b) { return disc(b) - disc(a); }, rv: function (a, b) { return b.reviews - a.reviews; } };
    if (sorts[f.sort]) res = res.slice().sort(sorts[f.sort]);
    var title = f.q ? t('resultsFor', esc(f.q)) : f.cat ? esc(tx(U.catOf(f.cat))) : f.br.length ? esc(f.br[0]) : t('allProducts');
    var active = f.min || f.max || f.r || f.br.length || f.free || f.stock;
    return '<div class="wrap sr"><aside class="filters side" data-ctx="side">' + V.filtersHTML(r, base) + '</aside><div class="sr-main">' +
      '<div class="sr-h"><div><h1>' + title + '</h1><span class="muted">' + t('nResults', fmt(res.length)) + '</span></div>' +
      '<div class="sr-t"><button class="btn ghost sm filt-btn" data-act="filters">' + ico('sliders') + t('filters') + (active ? ' •' : '') + '</button>' +
      '<label class="sel"><span class="sr-only">' + t('sortBy') + '</span><select id="sortSel" data-sort>' +
      [['rel', 'sRel'], ['pa', 'sPa'], ['pd', 'sPd'], ['rt', 'sRt'], ['dc', 'sDc'], ['rv', 'sRv']].map(function (s) { return '<option value="' + s[0] + '"' + (f.sort === s[0] ? ' selected' : '') + '>' + t(s[1]) + '</option>'; }).join('') + '</select></label></div></div>' +
      (res.length ? '<div class="grid">' + res.map(function (p, i) { return card(p, i); }).join('') + '</div>' :
        '<div class="empty">' + ico('search') + '<h2>' + t('noRes') + '</h2><p>' + t('noResP') + '</p><a class="btn cta" href="#/search" data-go="/search">' + t('clearAll') + '</a></div>') +
      '</div></div>';
  };
  V.filtersHTML = function (r, base) {
    var f = filterState(r);
    if (!base) base = P.filter(function (p) { return (!f.cat || p.cat === f.cat) && (!f.q || matches(p, f.q)); });
    var brands = Object.keys(base.reduce(function (a, p) { a[p.brand] = (a[p.brand] || 0) + 1; return a; }, {})).sort();
    var textOnly = P.filter(function (p) { return !f.q || matches(p, f.q); });
    function link(cat) { return '#/search?' + qs({ q: f.q, cat: cat, sort: f.sort === 'rel' ? '' : f.sort }); }
    return '<div class="f-blk"><h3>' + t('category') + '</h3><ul class="f-cats"><li><a href="' + link('') + '" data-go="/search?' + qs({ q: f.q }) + '" class="' + (f.cat ? '' : 'on') + '">' + t('all') + ' <span>' + fmt(textOnly.length) + '</span></a></li>' +
      CATS.map(function (c) {
        var n = textOnly.filter(function (p) { return p.cat === c.id; }).length;
        return n ? '<li><a href="' + link(c.id) + '" data-go="/search?' + qs({ q: f.q, cat: c.id }) + '" class="' + (f.cat === c.id ? 'on' : '') + '">' + esc(tx(c)) + ' <span>' + fmt(n) + '</span></a></li>' : '';
      }).join('') + '</ul></div>' +
      '<div class="f-blk"><h3>' + t('price') + '</h3><div class="f-price"><input type="number" inputmode="numeric" min="0" placeholder="৳ ' + t('min') + '" data-f="min" value="' + (f.min || '') + '" aria-label="' + t('min') + '"><span>–</span><input type="number" inputmode="numeric" min="0" placeholder="৳ ' + t('max') + '" data-f="max" value="' + (f.max || '') + '" aria-label="' + t('max') + '"></div></div>' +
      '<div class="f-blk"><h3>' + t('rating') + '</h3>' + [0, 4, 3].map(function (n) {
        return '<label class="chk"><input type="radio" name="fr' + (r.ctx || '') + '" data-f="r" value="' + n + '"' + (f.r === n ? ' checked' : '') + '><span>' + (n ? stars(n) + ' ' + t('andUp') : t('any')) + '</span></label>';
      }).join('') + '</div>' +
      '<div class="f-blk"><h3>' + t('brand') + '</h3>' + brands.map(function (b) {
        return '<label class="chk"><input type="checkbox" data-f="br" value="' + esc(b) + '"' + (f.br.indexOf(b) > -1 ? ' checked' : '') + '><span>' + esc(b) + '</span></label>';
      }).join('') + '</div>' +
      '<div class="f-blk"><h3>' + t('delivery') + '</h3><label class="chk"><input type="checkbox" data-f="free"' + (f.free ? ' checked' : '') + '><span>' + t('freeDel') + '</span></label><label class="chk"><input type="checkbox" data-f="stock"' + (f.stock ? ' checked' : '') + '><span>' + t('inStockOnly') + '</span></label></div>' +
      '<a class="linkb" href="#/search?' + qs({ q: f.q, cat: f.cat }) + '" data-go="/search?' + qs({ q: f.q, cat: f.cat }) + '">' + t('clearFilters') + '</a>';
  };

  /* ---------- product ---------- */
  function sizeLabel(p) { return p.sizeKind === 'shoe' ? t('sizeEU') : p.sizeKind === 'storage' ? t('storage') : t('size'); }
  function rvList(p) {
    var all = (S.reviews[p.id] || []).concat(G.reviewsFor(p));
    return all.map(function (r) {
      return '<article class="rv"><div class="rv-h"><span class="av">' + esc(tx(r.name).charAt(0)) + '</span><b>' + esc(tx(r.name)) + '</b>' +
        (r.verified ? '<span class="vp">' + ico('check') + t('verifiedBuyer') + '</span>' : '') + '</div><div class="rv-s">' + stars(r.star) + '<span>' + (r.daysAgo ? t('daysAgo', fmt(r.daysAgo)) : t('today')) + '</span></div><p>' + esc(tx(r.text)) + '</p></article>';
    }).join('');
  }
  V.rvList = rvList;

  V.fbtPick = function (p) {
    var same = P.filter(function (x) { return x.cat === p.cat && x.id !== p.id; });
    var oth = P.filter(function (x) { return x.cat !== p.cat && x.id !== p.id && x.price < p.price * 1.2; });
    return same.concat(oth).slice(0, 2);
  };

  V.product = function (id) {
    var p = byId(id);
    if (!p) return V.notFound();
    pv.color = 0; pv.size = U.defSize(p); pv.qty = 1;
    S.recent = [p.id].concat(S.recent.filter(function (x) { return x !== p.id; })).slice(0, 10);
    U.save();
    var ck = p.cols[0], c = COL[ck].c, d = disc(p), z = U.zone(S.loc.dist), w = S.wish.indexOf(p.id) > -1, cmp = S.compare.indexOf(p.id) > -1;
    var spec = G.SPEC[p.cat] || [];
    var fbt = V.fbtPick(p), fbtAll = [p].concat(fbt);
    var more = P.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).concat(P.filter(function (x) { return x.cat !== p.cat && x.id !== p.id; })).slice(0, 10);
    var split = G.ratingSplit(p);
    return '<section class="wrap pdp"><div class="pdp-gal"><div class="gal-top"><button class="rbtn" data-act="back" aria-label="' + t('back') + '">' + ico('back') + '</button>' +
      '<div class="gal-top-r"><button class="rbtn heart' + (w ? ' on' : '') + '" data-act="wish" data-id="' + p.id + '" aria-label="' + t('wishlist') + '" aria-pressed="' + w + '">' + ico('heart') + '</button>' +
      '<button class="rbtn" data-act="share" aria-label="' + t('share') + '">' + ico('share') + '</button></div></div>' +
      '<div class="gal-view" id="galView" style="--tint:' + tint(ck) + '"><div class="gal-track" id="galTrack">' +
      '<div class="gal-slide"><div class="v360" id="v360" role="img" aria-label="' + t('dragHint') + '"></div><div class="ring" aria-hidden="true"></div>' +
      '<div class="ring-ctl"><button data-act="rot" data-d="-1" aria-label="' + t('rotL') + '">' + ico('back') + '</button><button data-act="rot" data-d="1" aria-label="' + t('rotR') + '">' + ico('chev') + '</button></div></div>' +
      '<div class="gal-slide studio"><div class="disc"></div>' + shapeSVG(p.shape, c, true, 'gs studio-s') + '</div>' +
      '<div class="gal-slide detail"><div class="zoomwrap">' + shapeSVG(p.shape, c, true, 'gs zoom-s') + '</div><ul class="callouts">' +
      spec.slice(0, 3).map(function (r) { return '<li><b>' + lang2(r, 0) + '</b>' + lang2(r, 2) + '</li>'; }).join('') + '</ul></div>' +
      '</div>' + (d ? '<span class="badge sale lg">-' + fmt(d) + '%</span>' : '') + '<span class="hint" id="galHint">' + t('dragHint') + '</span></div>' +
      '<div class="dots" role="tablist">' + [t('view360'), t('studio'), t('details')].map(function (l, i) { return '<button class="' + (i ? '' : 'on') + '" data-act="slide" data-i="' + i + '" aria-label="' + l + '"></button>'; }).join('') + '</div></div>' +

      '<div class="pdp-info"><div class="brandrow"><span class="bav">' + esc(p.brand.charAt(0)) + '</span><b>' + esc(p.brand) + '</b><span class="vk">' + ico('verified') + '</span><span class="rate">' + ico('star') + p.rating.toFixed(1) + '<small>(' + fmt(p.reviews) + ')</small></span></div>' +
      '<h1 class="p-title">' + esc(tx(p.name)) + '</h1>' +
      '<div class="p-price"><b>' + money(p.price) + '</b>' + (p.old > p.price ? '<s>' + money(p.old) + '</s><span class="save">' + t('save', money(p.old - p.price)) + '</span>' : '') + '</div>' +
      (p.flash ? '<div class="flashnote">' + ico('bolt') + '<span>' + t('flashEnds') + '</span>' + U.cdHTML(U.nextEnd()) + '</div>' : '') +
      '<div class="opt"><div class="opt-h">' + t('colour') + ': <b id="colName">' + esc(tx(COL[ck])) + '</b></div><div class="swatches">' +
      p.cols.map(function (k, i) { return '<button class="sw' + (i ? '' : ' on') + '" data-act="color" data-i="' + i + '" style="--c:' + COL[k].c + '" aria-label="' + esc(tx(COL[k])) + '"></button>'; }).join('') + '</div></div>' +
      (p.sizes ? '<div class="opt"><div class="opt-h">' + sizeLabel(p) + (p.sizeKind !== 'storage' ? ' <button class="linkb" data-act="sizeguide" data-id="' + p.id + '">' + t('sizeGuide') + '</button>' : '') + '</div><div class="pills">' +
        p.sizes.map(function (s) { return '<button class="pill' + (s === pv.size ? ' on' : '') + '" data-act="size" data-s="' + esc(s) + '">' + esc(s) + '</button>'; }).join('') + '</div></div>' : '') +
      '<div class="opt qtyrow"><div class="opt-h">' + t('qty') + '</div><div class="qty"><button data-act="pq" data-d="-1" aria-label="−">' + ico('minus') + '</button><b id="pq">1</b><button data-act="pq" data-d="1" aria-label="+">' + ico('plus') + '</button></div>' +
      '<span class="stock' + (p.stock <= 10 ? ' low' : '') + '">' + (p.stock <= 10 ? t('onlyLeft', fmt(p.stock)) : t('inStock')) + '</span></div>' +
      '<div class="deliv"><div>' + ico('pin') + '<span>' + t('deliverTo') + ' <b>' + esc(U.distName(S.loc.dist)) + '</b> · <button class="linkb" data-act="loc">' + t('change') + '</button></span></div>' +
      '<div>' + ico('truck') + '<span>' + t('eta') + ': <b>' + U.etaText(z) + '</b> · ' + (p.free ? t('freeDel') : money(z.fee)) + '</span></div>' +
      '<div>' + ico('cash') + '<span>' + t('codAvail') + '</span></div><div>' + ico('ret') + '<span>' + t('ret7') + '</span></div><div>' + ico('shield') + '<span>' + t('soldBy') + ' <b>' + esc(p.seller) + '</b></span></div></div>' +
      '<div class="row-btns"><button class="btn dark" data-act="buy">' + t('buyNow') + '</button><button class="btn ghost' + (cmp ? ' on' : '') + '" data-act="compare" data-id="' + p.id + '">' + ico('compare') + (cmp ? t('inCompare') : t('compare')) + '</button></div>' +
      '<details class="acc" open><summary>' + t('characteristics') + ico('down') + '</summary><table class="spec">' + spec.map(function (r) { return '<tr><th>' + lang2(r, 0) + '</th><td>' + lang2(r, 2) + '</td></tr>'; }).join('') + '</table></details>' +
      '<details class="acc"><summary>' + t('description') + ico('down') + '</summary><p>' + lang2(G.DESC[p.cat], 0) + '</p></details>' +
      '<details class="acc"><summary>' + t('delReturns') + ico('down') + '</summary><p>' + t('delReturnsP') + '</p></details></div></section>' +

      '<section class="wrap sec fbt"><h2>' + t('fbt') + '</h2><div class="fbt-row">' + fbtAll.map(function (x, i) {
        return '<label class="fbt-i"><input type="checkbox" data-fbt="' + x.id + '" checked' + (i === 0 ? ' disabled' : '') + '><span class
