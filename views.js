/* Views part 1 of 4. */
(function (G) {
  'use strict';
  var U = G.U, V = G.V = {};
  var $ = U.$, esc = U.esc, t = U.t, tx = U.tx, fmt = U.fmt, money = U.money, ico = U.ico, S = U.S, stars = U.stars, tint = U.tint, disc = U.disc, byId = U.byId;
  var COL = G.COL, CATS = G.CATS, P = G.PRODUCTS, shapeSVG = G.shapeSVG;
  var pv = V.pv = { color: 0, size: '', qty: 1 };
  V.jfy = 12;
  V._ = {};


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
  V._.card = card; V._.empty = empty; V._.lang2 = lang2; V._.voucherTk = voucherTk;
})(window.GASS = window.GASS || {});
                                /* Views part 2 of 4. */
(function (G) {
  'use strict';
  var U = G.U, V = G.V;
  var $ = U.$, esc = U.esc, t = U.t, tx = U.tx, fmt = U.fmt, money = U.money, ico = U.ico, S = U.S, stars = U.stars, tint = U.tint, disc = U.disc, byId = U.byId;
  var COL = G.COL, CATS = G.CATS, P = G.PRODUCTS, shapeSVG = G.shapeSVG;
  var pv = V.pv;
  var card = V._.card, lang2 = V._.lang2;

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
        return '<label class="fbt-i"><input type="checkbox" data-fbt="' + x.id + '" checked' + (i === 0 ? ' disabled' : '') + '><span class="fbt-img" style="--tint:' + tint(x.cols[0]) + '">' + shapeSVG(x.shape, COL[x.cols[0]].c, false) + '</span><span class="fbt-n">' + esc(tx(x.name)) + '</span><b>' + money(x.price) + '</b></label>' + (i < 2 ? '<span class="fplus">+</span>' : '');
      }).join('') + '<div class="fbt-sum"><div>' + t('total') + ': <b id="fbtTot">' + money(fbtAll.reduce(function (a, x) { return a + x.price; }, 0)) + '</b></div><button class="btn cta" data-act="fbtAdd">' + t('addSel') + '</button></div></div></section>' +

      '<section class="wrap sec reviews"><h2>' + t('reviews') + '</h2><div class="rv-top"><div class="rv-sum"><b class="big">' + fmt(p.rating.toFixed(1)) + '</b>' + stars(p.rating) + '<span>' + t('nRatings', fmt(p.reviews)) + '</span></div>' +
      '<div class="rv-bars">' + split.map(function (pc, i) { return '<div><span>' + fmt(5 - i) + '★</span><div class="bar"><i style="width:' + pc + '%"></i></div><span>' + fmt(pc) + '%</span></div>'; }).join('') + '</div>' +
      '<button class="btn ghost" data-act="writeRv">' + t('writeRv') + '</button></div>' +
      '<div class="rv-form" id="rvForm" hidden><div class="star-pick" id="starPick" role="radiogroup" aria-label="' + t('rating') + '">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" class="on" data-act="pickStar" data-n="' + n + '" aria-label="' + n + '">★</button>'; }).join('') + '</div>' +
      '<textarea id="rvText" rows="3" placeholder="' + t('rvPh') + '"></textarea><button class="btn cta" data-act="sendRv" data-id="' + p.id + '">' + t('submit') + '</button></div>' +
      '<div class="rv-list" id="rvList">' + rvList(p) + '</div></section>' +
      '<section class="wrap sec"><div class="sec-h"><h2>' + t('recommended') + '</h2></div><div class="hscroll">' + more.map(function (x, i) { return card(x, i); }).join('') + '</div></section>' +
      '<div class="buybar" role="group"><button class="btn dark" data-act="ar">' + ico('cube') + t('arView') + '</button><button class="btn cta" id="addBtn" data-act="add">' + ico('plus') + t('addCart') + '</button></div>';
  };

  V.after = {};
  V.after.product = function (r) {
    var p = byId(r.parts[1]);
    if (!p) return;
    V.v360 = G.mount360($('#v360'), p.shape, COL[p.cols[0]].c);
  };

  /* ---------- cart ---------- */
})(window.GASS = window.GASS || {});
        /* Views part 3 of 4. */
(function (G) {
  'use strict';
  var U = G.U, V = G.V;
  var $ = U.$, esc = U.esc, t = U.t, tx = U.tx, fmt = U.fmt, money = U.money, ico = U.ico, S = U.S, stars = U.stars, tint = U.tint, disc = U.disc, byId = U.byId;
  var COL = G.COL, CATS = G.CATS, P = G.PRODUCTS, shapeSVG = G.shapeSVG;
  var pv = V.pv;
  var card = V._.card, empty = V._.empty;

  function cartLine(x, compact) {
    var l = x.l, p = x.p, c = p.cols[l.color] || p.cols[0];
    return '<div class="cl"><a class="cl-img" href="#/p/' + p.id + '" data-go="/p/' + p.id + '" style="--tint:' + tint(c) + '">' + shapeSVG(p.shape, COL[c].c, false) + '</a><div class="cl-b">' +
      '<a class="cl-t" href="#/p/' + p.id + '" data-go="/p/' + p.id + '">' + esc(tx(p.name)) + '</a><div class="cl-m">' + esc(tx(COL[c])) + (l.size ? ' · ' + esc(l.size) : '') + '</div>' +
      '<div class="cl-p">' + money(p.price) + (p.old > p.price ? '<s>' + money(p.old) + '</s>' : '') + '</div>' +
      '<div class="cl-a"><div class="qty sm"><button data-act="cq" data-k="' + esc(l.k) + '" data-d="-1" aria-label="−">' + ico('minus') + '</button><b>' + fmt(l.qty) + '</b><button data-act="cq" data-k="' + esc(l.k) + '" data-d="1" aria-label="+">' + ico('plus') + '</button></div>' +
      (compact ? '' : '<button class="linkb" data-act="csave" data-k="' + esc(l.k) + '">' + t('saveLater') + '</button>') +
      '<button class="linkb danger" data-act="crm" data-k="' + esc(l.k) + '">' + ico('trash') + t('remove') + '</button></div></div><div class="cl-tot">' + money(p.price * l.qty) + '</div></div>';
  }
  V.cartLines = function (tt, compact) { return tt.lines.map(function (x) { return cartLine(x, compact); }).join(''); };

  V.voucherBox = function (tt) {
    var msg = '';
    if (tt.v) {
      if (tt.why === 'min') msg = '<p class="vmsg warn">' + t('vMin', money(tt.v.min)) + '</p>';
      else if (tt.why === 'pay') msg = '<p class="vmsg warn">' + t('vPay') + '</p>';
      else msg = '<p class="vmsg ok">' + ico('check') + t('vApplied', tt.v.code) + ' <button class="linkb" data-act="vClear">' + t('remove') + '</button></p>';
    }
    var mine = S.vouchers.map(function (c) { return G.VOUCHERS.filter(function (v) { return v.code === c; })[0]; }).filter(Boolean);
    return '<div class="vbox"><form class="vform" id="vForm"><input id="vIn" type="text" placeholder="' + t('vPh') + '" autocomplete="off" aria-label="' + t('vPh') + '"><button class="btn sm dark" type="submit">' + t('apply') + '</button></form>' + msg +
      (mine.length ? '<div class="vchips">' + mine.map(function (v) { return '<button class="vchip' + (S.applied === v.code ? ' on' : '') + '" data-act="vPick" data-code="' + v.code + '" title="' + esc(tx(v)) + '">' + v.code + '</button>'; }).join('') + '</div>' : '') + '</div>';
  };

  V.summary = function (tt) {
    var left = Math.max(0, 1500 - tt.sub);
    return '<div class="sum"><h3>' + t('summary') + '</h3>' +
      (tt.count && left > 0 ? '<div class="fs"><span>' + t('freeLeft', money(left)) + '</span><div class="bar"><i style="width:' + Math.min(100, tt.sub / 15) + '%"></i></div></div>' : (tt.count ? '<div class="fs ok">' + ico('check') + t('freeGot') + '</div>' : '')) +
      '<dl><div><dt>' + t('subtotal') + ' (' + fmt(tt.count) + ')</dt><dd>' + money(tt.sub) + '</dd></div>' +
      (tt.off ? '<div class="save"><dt>' + t('voucher') + '</dt><dd>−' + money(tt.off) + '</dd></div>' : '') +
      '<div><dt>' + t('deliveryFee') + (tt.exp ? ' · ' + t('express') : '') + '</dt><dd>' + (tt.ship ? money(tt.ship) : t('free')) + '</dd></div>' +
      '<div class="grand"><dt>' + t('total') + '</dt><dd>' + money(tt.total) + '</dd></div></dl>' +
      '<p class="muted sm">' + t('eta') + ': ' + U.etaText(tt.z, tt.exp) + ' · ' + esc(U.distName(S.loc.dist)) + ' <button class="linkb" data-act="loc">' + t('change') + '</button></p></div>';
  };

  V.cart = function () {
    var tt = U.totals();
    if (!tt.count) return empty('cart', t('cartEmpty'), t('cartEmptyP'), '<a class="btn cta" href="#/" data-go="/">' + t('startShop') + '</a>');
    return '<div class="wrap cartp"><h1>' + t('cart') + ' <small>(' + fmt(tt.count) + ')</small></h1><div class="cart-g"><div class="cart-l">' + V.cartLines(tt, false) + '</div><aside class="cart-r">' + V.voucherBox(tt) + V.summary(tt) +
      '<a class="btn cta wide" href="#/checkout" data-go="/checkout">' + t('checkout') + '</a><a class="linkb ctr" href="#/" data-go="/">' + t('continue') + '</a></aside></div></div>';
  };

  V.drawer = function () {
    var tt = U.totals();
    return '<div class="sh-h"><h3>' + t('cart') + ' (' + fmt(tt.count) + ')</h3><button class="ib" data-act="closeLayer" aria-label="' + t('close') + '">' + ico('close') + '</button></div>' +
      (tt.count ? '<div class="sh-b cl-list">' + V.cartLines(tt, true) + '</div><div class="sh-f"><div class="dsum"><span>' + t('subtotal') + '</span><b>' + money(tt.sub) + '</b></div>' +
        '<div class="two"><a class="btn ghost" href="#/cart" data-go="/cart">' + t('viewCart') + '</a><a class="btn cta" href="#/checkout" data-go="/checkout">' + t('checkout') + '</a></div></div>' :
        '<div class="sh-b"><div class="empty sm">' + ico('cart') + '<p>' + t('cartEmpty') + '</p><a class="btn cta" href="#/" data-go="/">' + t('startShop') + '</a></div></div>');
  };

  /* ---------- checkout ---------- */
  V.payBox = function () {
    var p = S.pay;
    if (p === 'cod') return '<p class="muted">' + t('codNote') + '</p>';
    if (p === 'card') return '<div class="fgrid"><label class="fld full"><span>' + t('cardNo') + '</span><input id="cNo" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" autocomplete="off"></label><label class="fld"><span>' + t('expiry') + '</span><input id="cExp" inputmode="numeric" maxlength="5" placeholder="MM/YY" autocomplete="off"></label><label class="fld"><span>CVV</span><input id="cCvv" inputmode="numeric" maxlength="3" placeholder="123" autocomplete="off"></label></div><p class="muted sm">' + t('demoPay') + '</p>';
    return '<div class="fgrid"><label class="fld full"><span>' + (p === 'bkash' ? 'bKash' : 'Nagad') + ' ' + t('number') + '</span><input id="wNo" inputmode="tel" maxlength="11" placeholder="01XXXXXXXXX" autocomplete="off"></label></div><p class="muted sm">' + t('demoPay') + '</p>';
  };
  V.coSum = function () {
    var tt = U.totals();
    return '<h3>' + t('yourOrder') + '</h3><div class="mini">' + tt.lines.map(function (x) {
      var c = x.p.cols[x.l.color] || x.p.cols[0];
      return '<div class="mi"><span class="mi-img" style="--tint:' + tint(c) + '">' + shapeSVG(x.p.shape, COL[c].c, false) + '<em>' + fmt(x.l.qty) + '</em></span><span class="mi-n">' + esc(tx(x.p.name)) + '</span><b>' + money(x.p.price * x.l.qty) + '</b></div>';
    }).join('') + '</div>' + V.voucherBox(tt) + V.summary(tt) +
      '<button class="btn cta wide" id="placeBtn" data-act="place">' + t('placeOrder') + ' · ' + money(tt.total) + '</button><p class="muted sm ctr">' + t('terms') + '</p>';
  };
  V.checkout = function () {
    var tt = U.totals();
    if (!tt.count) return empty('cart', t('cartEmpty'), t('cartEmptyP'), '<a class="btn cta" href="#/" data-go="/">' + t('startShop') + '</a>');
    var a = S.addr, z = tt.z, g = G.GEO.filter(function (x) { return x.id === S.loc.div; })[0];
    function pay(id, label, sub) { return '<label class="rad' + (S.pay === id ? ' on' : '') + '"><input type="radio" name="pay" value="' + id + '"' + (S.pay === id ? ' checked' : '') + '><span><b>' + label + '</b><small>' + sub + '</small></span></label>'; }
    return '<div class="wrap co"><h1>' + t('checkout') + '</h1><div class="demo-note">' + ico('shield') + '<span>' + t('demoNote') + '</span></div><div class="co-g"><div class="co-main">' +
      '<section class="co-sec"><h2><i>1</i>' + t('coAddr') + '</h2><div class="fgrid">' +
      '<label class="fld"><span>' + t('fullName') + '</span><input id="aName" autocomplete="name" value="' + esc(a.name || (S.user ? S.user.name : '')) + '"></label>' +
      '<label class="fld"><span>' + t('mobile') + '</span><input id="aPhone" inputmode="tel" maxlength="14" placeholder="01XXXXXXXXX" autocomplete="tel" value="' + esc(a.phone) + '"></label>' +
      '<label class="fld"><span>' + t('division') + '</span><select id="aDiv">' + G.GEO.map(function (x) { return '<option value="' + x.id + '"' + (x.id === S.loc.div ? ' selected' : '') + '>' + esc(tx(x)) + '</option>'; }).join('') + '</select></label>' +
      '<label class="fld"><span>' + t('district') + '</span><select id="aDist">' + V.distOpts(S.loc.div, S.loc.dist) + '</select></label>' +
      '<label class="fld full"><span>' + t('addrLine') + '</span><textarea id="aLine" rows="2" placeholder="' + t('addrPh') + '" autocomplete="street-address">' + esc(a.line) + '</textarea></label>' +
      '<div class="fld full"><span>' + t('label') + '</span><div class="pills"><button type="button" class="pill' + (a.label === 'home' ? ' on' : '') + '" data-act="aLabel" data-v="home">' + t('home') + '</button><button type="button" class="pill' + (a.label === 'office' ? ' on' : '') + '" data-act="aLabel" data-v="office">' + t('office') + '</button></div></div></div></section>' +
      '<section class="co-sec"><h2><i>2</i>' + t('coDel') + '</h2><div class="rads" id="delRads">' +
      '<label class="rad' + (S.ship === 'std' ? ' on' : '') + '"><input type="radio" name="ship" value="std"' + (S.ship === 'std' ? ' checked' : '') + '><span><b>' + t('standard') + '</b><small>' + U.etaText(z) + '</small></span><em>' + (tt.free ? t('free') : money(z.fee)) + '</em></label>' +
      (z.exp ? '<label class="rad' + (S.ship === 'exp' ? ' on' : '') + '"><input type="radio" name="ship" value="exp"' + (S.ship === 'exp' ? ' checked' : '') + '><span><b>' + t('express') + '</b><small>' + U.etaText(z, true) + '</small></span><em>+' + money(z.exp) + '</em></label>' : '<p class="muted sm">' + t('noExp') + '</p>') + '</div></section>' +
      '<section class="co-sec"><h2><i>3</i>' + t('coPay') + '</h2><div class="rads" id="payRads">' + pay('cod', t('cod'), t('codSub')) + pay('bkash', 'bKash', t('mfsSub')) + pay('nagad', 'Nagad', t('mfsSub')) + pay('card', t('card'), 'Visa / Mastercard') + '</div><div class="paybox" id="payBox">' + V.payBox() + '</div></section>' +
      '<p class="err" id="coErr" role="alert" hidden></p></div><aside class="co-sum" id="coSum">' + V.coSum() + '</aside></div></div>';
  };
  V.distOpts = function (div, sel) {
    var g = G.GEO.filter(function (x) { return x.id === div; })[0] || G.GEO[0];
    return g.d.map(function (d) { return '<option value="' + esc(d[0]) + '"' + (d[0] === sel ? ' selected' : '') + '>' + esc(S.lang === 'bn' ? d[1] : d[0]) + '</option>'; }).join('');
  };

  /* ---------- orders ---------- */
})(window.GASS = window.GASS || {});
    /* Views part 4 of 4. */
(function (G) {
  'use strict';
  var U = G.U, V = G.V;
  var $ = U.$, esc = U.esc, t = U.t, tx = U.tx, fmt = U.fmt, money = U.money, ico = U.ico, S = U.S, stars = U.stars, tint = U.tint, disc = U.disc, byId = U.byId;
  var COL = G.COL, CATS = G.CATS, P = G.PRODUCTS, shapeSVG = G.shapeSVG;
  var pv = V.pv;
  var card = V._.card, empty = V._.empty, voucherTk = V._.voucherTk;

  var STEPS = ['st1', 'st2', 'st3', 'st4', 'st5', 'st6'];
  V.orderStep = function (o) { return Math.min(5, Math.floor((Date.now() - o.at) / 25000) + (o.boost || 0)); };
  function orderCard(o, open) {
    var step = V.orderStep(o), pct = step / 5 * 100;
    var dt = new Date(o.at).toLocaleDateString(S.lang === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return '<article class="ord" data-oid="' + o.id + '"><div class="ord-h"><div><b>#' + o.id + '</b><span class="muted">' + dt + ' · ' + t('payBy') + ' ' + esc(o.payLabel) + '</span></div><span class="status s' + step + '">' + t(STEPS[step]) + '</span></div>' +
      '<div class="ord-items">' + o.items.map(function (i) {
        var p = byId(i.id); if (!p) return '';
        var c = p.cols[i.color] || p.cols[0];
        return '<a class="oi" href="#/p/' + p.id + '" data-go="/p/' + p.id + '" style="--tint:' + tint(c) + '" title="' + esc(tx(p.name)) + '">' + shapeSVG(p.shape, COL[c].c, false) + '<em>×' + fmt(i.qty) + '</em></a>';
      }).join('') + '<div class="ord-t"><span class="muted">' + t('total') + '</span><b>' + money(o.total) + '</b></div></div>' +
      '<details class="acc"' + (open ? ' open' : '') + '><summary>' + t('track') + ico('down') + '</summary>' +
      '<ol class="tl" style="--p:' + pct + '%">' + STEPS.map(function (s, i) {
        var when = i <= step ? new Date(o.at + i * 25000 * 6).toLocaleTimeString(S.lang === 'bn' ? 'bn-BD' : 'en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
        return '<li class="' + (i < step ? 'done' : i === step ? 'now' : '') + '"><i>' + (i < step ? ico('check') : '') + '</i><span><b>' + t(s) + '</b><small>' + (i === 4 && step < 5 ? t('stDesc5') : when) + '</small></span></li>';
      }).join('') + '</ol><div class="ord-a">' + (step < 5 ? '<button class="btn sm ghost" data-act="skip" data-id="' + o.id + '">' + ico('bolt') + t('skipDemo') + '</button>' : '') +
      '<button class="btn sm ghost" data-act="reorder" data-id="' + o.id + '">' + t('buyAgain') + '</button></div></details></article>';
  }
  V.ordersList = function (openSet) {
    return S.orders.map(function (o) { return orderCard(o, openSet ? openSet.indexOf(o.id) > -1 : S.orders[0] === o); }).join('');
  };
  V.orders = function () {
    if (!S.orders.length) return empty('box', t('noOrders'), t('noOrdersP'), '<a class="btn cta" href="#/" data-go="/">' + t('startShop') + '</a>');
    return '<div class="wrap ordp"><h1>' + t('orders') + '</h1><div id="ordersList">' + V.ordersList() + '</div></div>';
  };

  /* ---------- wishlist, compare, deals, vouchers, account ---------- */
  V.wishlist = function () {
    var items = S.wish.map(byId).filter(Boolean);
    if (!items.length) return empty('heart', t('wishEmpty'), t('wishEmptyP'), '<a class="btn cta" href="#/" data-go="/">' + t('startShop') + '</a>');
    return '<div class="wrap"><div class="sr-h"><h1>' + t('wishlist') + ' <small>(' + fmt(items.length) + ')</small></h1><button class="btn ghost sm" data-act="wishAll">' + t('addAll') + '</button></div><div class="grid">' + items.map(function (p, i) { return card(p, i); }).join('') + '</div></div>';
  };
  V.compare = function () {
    var items = S.compare.map(byId).filter(Boolean);
    if (!items.length) return empty('compare', t('cmpEmpty'), t('cmpEmptyP'), '<a class="btn cta" href="#/" data-go="/">' + t('startShop') + '</a>');
    function row(label, fn) { return '<tr><th scope="row">' + label + '</th>' + items.map(function (p) { return '<td>' + fn(p) + '</td>'; }).join('') + '</tr>'; }
    return '<div class="wrap"><h1>' + t('compare') + '</h1><div class="tscroll"><table class="cmp"><thead><tr><th></th>' + items.map(function (p) {
      var c = p.cols[0];
      return '<th><a class="cmp-i" href="#/p/' + p.id + '" data-go="/p/' + p.id + '" style="--tint:' + tint(c) + '">' + shapeSVG(p.shape, COL[c].c, false) + '</a><a class="cmp-n" href="#/p/' + p.id + '" data-go="/p/' + p.id + '">' + esc(tx(p.name)) + '</a><button class="linkb danger" data-act="compare" data-id="' + p.id + '">' + t('remove') + '</button></th>';
    }).join('') + '</tr></thead><tbody>' +
      row(t('price'), function (p) { return '<b>' + money(p.price) + '</b>' + (p.old > p.price ? ' <s>' + money(p.old) + '</s>' : ''); }) +
      row(t('rating'), function (p) { return stars(p.rating) + ' ' + fmt(p.rating.toFixed(1)) + ' (' + fmt(p.reviews) + ')'; }) +
      row(t('brand'), function (p) { return esc(p.brand); }) +
      row(t('category'), function (p) { return esc(tx(U.catOf(p.cat))); }) +
      row(t('colour'), function (p) { return '<span class="dots-c">' + p.cols.map(function (k) { return '<i style="--c:' + COL[k].c + '"></i>'; }).join('') + '</span>'; }) +
      row(t('stock'), function (p) { return p.stock <= 10 ? t('onlyLeft', fmt(p.stock)) : t('inStock'); }) +
      row(t('delivery'), function (p) { return p.free ? t('freeDel') : money(U.zone(S.loc.dist).fee); }) +
      row(t('soldBy'), function (p) { return esc(p.seller); }) +
      row('', function (p) { return '<button class="btn cta sm" data-act="quick" data-id="' + p.id + '">' + t('addCart') + '</button>'; }) +
      '</tbody></table></div></div>';
  };
  V.deals = function (r) {
    var cat = r.q.cat || '';
    var flash = P.filter(function (p) { return p.flash && (!cat || p.cat === cat); });
    var big = P.filter(function (p) { return disc(p) >= 30 && !p.flash; }).sort(function (a, b) { return disc(b) - disc(a); });
    var cats = CATS.filter(function (c) { return P.some(function (p) { return p.flash && p.cat === c.id; }); });
    return '<div class="wrap"><div class="deal-h"><div><span class="eyebrow">' + t('flashLive') + '</span><h1>' + t('flash') + '</h1></div>' + U.cdHTML(U.nextEnd()) + '</div>' +
      '<div class="chips"><a class="chip' + (cat ? '' : ' on') + '" href="#/deals" data-go="/deals">' + t('all') + '</a>' + cats.map(function (c) { return '<a class="chip' + (cat === c.id ? ' on' : '') + '" href="#/deals?cat=' + c.id + '" data-go="/deals?cat=' + c.id + '">' + esc(tx(c)) + '</a>'; }).join('') + '</div>' +
      '<div class="grid">' + flash.map(function (p, i) { return card(p, i, true); }).join('') + '</div>' +
      '<section class="sec"><div class="sec-h"><h2>' + t('bigDisc') + '</h2></div><div class="grid">' + big.slice(0, 8).map(function (p, i) { return card(p, i); }).join('') + '</div></section></div>';
  };
  V.vouchers = function () {
    return '<div class="wrap"><h1>' + t('vouchers') + '</h1><p class="muted">' + t('vouchersP') + '</p><div class="tks big">' + G.VOUCHERS.map(voucherTk).join('') + '</div>' +
      '<button class="promo mb wide" data-act="mystery"><span class="promo-art">' + G.boxSVG() + '</span><span><b>' + t('mbPromoT') + '</b><small>' + t('mbPromoP') + '</small></span></button></div>';
  };
  V.account = function () {
    if (!S.user) {
      return '<div class="wrap narrow"><h1>' + t('login') + '</h1><div class="panel"><p class="muted">' + t('demoLogin') + '</p>' + V.loginForm() + '</div></div>';
    }
    return '<div class="wrap narrow"><div class="prof"><span class="av lg">' + esc(S.user.name.charAt(0).toUpperCase()) + '</span><div><h1>' + esc(S.user.name) + '</h1><span class="muted">' + t('memberDemo') + '</span></div></div>' +
      '<div class="tiles"><a href="#/orders" data-go="/orders"><b>' + fmt(S.orders.length) + '</b><span>' + t('orders') + '</span></a><a href="#/wishlist" data-go="/wishlist"><b>' + fmt(S.wish.length) + '</b><span>' + t('wishlist') + '</span></a><a href="#/vouchers" data-go="/vouchers"><b>' + fmt(S.vouchers.length) + '</b><span>' + t('vouchers') + '</span></a><div><b>' + fmt(S.coins) + '</b><span>' + t('coins') + '</span></div></div>' +
      '<div class="panel"><h3>' + t('deliverTo') + '</h3><p>' + esc(U.distName(S.loc.dist)) + ', ' + esc(U.divName(S.loc.div)) + ' <button class="linkb" data-act="loc">' + t('change') + '</button></p></div>' +
      '<div class="panel"><h3>' + t('prefs') + '</h3><div class="two"><button class="btn ghost" data-act="lang">' + (S.lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন') + '</button><button class="btn ghost" data-act="theme">' + t('theme') + '</button></div></div>' +
      '<button class="btn ghost wide" data-act="logout">' + t('logout') + '</button></div>';
  };
  V.loginForm = function () {
    return '<form id="loginForm" class="fgrid one"><label class="fld"><span>' + t('fullName') + '</span><input id="lgName" data-focus autocomplete="name" placeholder="Rafi Ahmed"></label><label class="fld"><span>' + t('mobileOrEmail') + '</span><input id="lgId" autocomplete="username" placeholder="01XXXXXXXXX"></label><button class="btn cta wide" type="submit">' + t('login') + '</button></form>';
  };
  V.notFound = function () { return empty('search', t('nf'), t('nfP'), '<a class="btn cta" href="#/" data-go="/">' + t('startShop') + '</a>'); };

  /* ---------- layers ---------- */
  V.locHTML = function () {
    return '<div class="sh-h"><h3>' + t('chooseLoc') + '</h3><button class="ib" data-act="closeLayer" aria-label="' + t('close') + '">' + ico('close') + '</button></div><div class="sh-b"><p class="muted">' + t('locHelp') + '</p>' +
      '<label class="fld"><span>' + t('division') + '</span><select id="lcDiv" data-focus>' + G.GEO.map(function (g) { return '<option value="' + g.id + '"' + (g.id === S.loc.div ? ' selected' : '') + '>' + esc(tx(g)) + '</option>'; }).join('') + '</select></label>' +
      '<label class="fld"><span>' + t('district') + '</span><select id="lcDist">' + V.distOpts(S.loc.div, S.loc.dist) + '</select></label><div class="loc-prev" id="lcPrev">' + V.locPrev(S.loc.dist) + '</div></div>' +
      '<div class="sh-f"><button class="btn cta wide" data-act="applyLoc">' + t('apply') + '</button></div>';
  };
  V.locPrev = function (d) {
    var z = U.zone(d);
    return ico('truck') + '<span>' + t('eta') + ': <b>' + U.etaText(z) + '</b><br>' + t('stdFee') + ': <b>' + money(z.fee) + '</b> · ' + (z.exp ? t('expAvail') : t('noExp')) + '</span>';
  };
  V.loginHTML = function () {
    return '<div class="sh-h"><h3>' + t('login') + '</h3><button class="ib" data-act="closeLayer" aria-label="' + t('close') + '">' + ico('close') + '</button></div><div class="sh-b"><p class="muted">' + t('demoLogin') + '</p>' + V.loginForm() + '</div>';
  };
  V.catsHTML = function () {
    return '<div class="sh-h"><h3>' + t('allCats') + '</h3><button class="ib" data-act="closeLayer" aria-label="' + t('close') + '">' + ico('close') + '</button></div><div class="sh-b"><div class="catlist">' +
      CATS.map(function (c) { return '<a href="#/search?cat=' + c.id + '" data-go="/search?cat=' + c.id + '"><span class="cat-i" style="--tint:' + tint(c.col) + '">' + shapeSVG(c.shape, COL[c.col].c, false) + '</span>' + esc(tx(c)) + ico('chev') + '</a>'; }).join('') + '</div></div>';
  };
  V.sizeHTML = function (p) {
    var rows = p.sizeKind === 'shoe' ? [['39', '24.5'], ['40', '25.2'], ['41', '25.9'], ['42', '26.6'], ['43', '27.3'], ['44', '28.0']] : [['XS', '86 / 64'], ['S', '92 / 66'], ['M', '98 / 68'], ['L', '104 / 70'], ['XL', '110 / 72']];
    return '<div class="sh-h"><h3>' + t('sizeGuide') + '</h3><button class="ib" data-act="closeLayer" aria-label="' + t('close') + '">' + ico('close') + '</button></div><div class="sh-b"><table class="spec szg"><thead><tr><th>' + (p.sizeKind === 'shoe' ? 'EU' : t('size')) + '</th><th>' + (p.sizeKind === 'shoe' ? t('footLen') : t('chestLen')) + '</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table><p class="muted sm">' + t('sizeTip') + '</p></div>';
  };
  V.mysteryHTML = function () {
    return '<div class="sh-h"><h3>' + t('mystery') + '</h3><button class="ib" data-act="closeLayer" aria-label="' + t('close') + '">' + ico('close') + '</button></div><div class="sh-b mb-b"><div class="mb-box" id="mbBox">' + G.boxSVG() + '</div><div id="mbOut"><p class="muted">' + t('mbIntro') + '</p></div></div><div class="sh-f"><button class="btn cta wide" id="mbBtn" data-act="shake">' + t('mbShake') + '</button></div>';
  };
  V.filterSheet = function (r) {
    r.ctx = 'm';
    return '<div class="sh-h"><h3>' + t('filters') + '</h3><button class="ib" data-act="closeLayer" aria-label="' + t('close') + '">' + ico('close') + '</button></div><div class="sh-b filters" data-ctx="m">' + V.filtersHTML(r) + '</div><div class="sh-f"><button class="btn cta wide" data-act="closeLayer">' + t('showRes') + '</button></div>';
  };
  V.arHTML = function () {
    return '<div class="ar"><div class="ar-wall"></div><div class="ar-floor"><div class="ar-grid"></div></div>' +
      '<div class="ar-hud hd"><button class="rbtn" data-act="closeLayer" aria-label="' + t('close') + '">' + ico('close') + '</button><span class="ar-tag">AR · ' + t('arDemo') + '</span><span class="sp"></span></div>' +
      '<div class="ar-ret" id="arRet"><i></i><i></i><i></i><i></i></div>' +
      '<div class="ar-obj" id="arObj" hidden><div class="v360" id="arV"></div><div class="ar-shadow"></div></div>' +
      '<div class="ar-msg" id="arMsg">' + t('arScan') + '</div>' +
      '<div class="ar-hud bot"><label class="ar-sc"><span class="sr-only">' + t('arSize') + '</span><input type="range" id="arScale" min="55" max="150" value="100"></label><button class="btn cta" id="arBtn" data-act="arPlace" disabled>' + t('arPlace') + '</button></div></div>';
  };
  V.successHTML = function (o) {
    return '<div class="sh-b ok-b"><div class="ok-i">' + ico('check') + '</div><h2>' + t('okT') + '</h2><p class="muted">' + t('okP', esc(o.name)) + '</p><div class="ok-id">#' + o.id + '</div>' +
      '<p class="muted sm">' + t('okCoins', fmt(o.coins)) + '</p><div class="two"><a class="btn cta" href="#/orders" data-go="/orders">' + t('track') + '</a><a class="btn ghost" href="#/" data-go="/">' + t('continue') + '</a></div></div>';
  };
  V.processHTML = function () { return '<div class="sh-b ok-b"><div class="spin"></div><h3>' + t('processing') + '</h3><p class="muted">' + t('processingP') + '</p></div>'; };
})(window.GASS = window.GASS || {});
      
