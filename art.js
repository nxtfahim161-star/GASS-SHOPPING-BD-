/* Product artwork: flat SVG silhouettes and a layered 3D turntable that rotates on drag.
   No images are used, so the whole site works offline and loads instantly. */
(function (G) {
  'use strict';

  var SH = {
    hoodie: {
      b: '<path class="f" d="M72 30Q100 14 128 30L154 42L186 82L170 152L150 142V184H50V142L30 152L14 82L46 42Z"/>',
      d: '<path class="d" d="M76 32Q100 62 124 32"/><path class="d" d="M92 56V86M108 56V86"/><rect class="d" x="70" y="124" width="60" height="30" rx="8"/><path class="d" d="M50 142V184M150 142V184"/>'
    },
    tee: {
      b: '<path class="f" d="M64 34L84 26Q100 44 116 26L136 34L178 62L160 94L140 84V178H60V84L40 94L22 62Z"/>',
      d: '<path class="d" d="M84 26Q100 44 116 26"/><path class="d" d="M62 166H138"/><path class="d" d="M60 84V178M140 84V178"/>'
    },
    shoe: {
      b: '<path class="f" d="M12 132V104Q12 94 24 92L58 86Q76 84 88 70L100 56Q108 50 118 58L134 82Q146 98 170 106Q190 112 190 130V142Q190 150 182 150H20Q12 150 12 142Z"/>',
      d: '<path class="d" d="M12 138H190"/><path class="d" d="M98 62L112 74M110 54L124 68M88 72L102 84"/><path class="d" d="M58 86Q64 108 80 120"/>'
    },
    headphones: {
      b: '<path class="s" d="M42 118A58 58 0 0 1 158 118"/><rect class="f" x="26" y="108" width="34" height="58" rx="14"/><rect class="f" x="140" y="108" width="34" height="58" rx="14"/>',
      d: '<path class="d" d="M36 126V148M164 126V148"/>'
    },
    watch: {
      b: '<rect class="f" x="82" y="14" width="36" height="52" rx="10"/><rect class="f" x="82" y="134" width="36" height="52" rx="10"/><circle class="f" cx="100" cy="100" r="46"/><rect class="f" x="144" y="92" width="9" height="16" rx="3"/>',
      d: '<circle class="d" cx="100" cy="100" r="36"/><path class="d" d="M100 100V74M100 100L118 110"/><path class="d" d="M100 30V38M100 162V170"/>'
    },
    phone: {
      b: '<rect class="f" x="56" y="12" width="88" height="176" rx="18"/>',
      d: '<rect class="d" x="63" y="19" width="74" height="162" rx="12"/><path class="d" d="M90 28H110"/><circle class="d" cx="100" cy="168" r="4"/>'
    },
    laptop: {
      b: '<rect class="f" x="34" y="38" width="132" height="90" rx="8"/><path class="f" d="M14 136H186L176 154Q174 160 166 160H34Q26 160 24 154Z"/>',
      d: '<rect class="d" x="42" y="46" width="116" height="74" rx="4"/><path class="d" d="M86 148H114"/>'
    },
    bag: {
      b: '<path class="s" d="M82 44V34Q82 22 100 22T118 34V44"/><rect class="f" x="50" y="40" width="100" height="142" rx="30"/>',
      d: '<rect class="d" x="66" y="112" width="68" height="46" rx="12"/><path class="d" d="M66 92H134M84 112V158"/><path class="d" d="M100 50V74"/>'
    },
    bottle: {
      b: '<rect class="f" x="86" y="12" width="28" height="24" rx="6"/><rect class="f" x="72" y="34" width="56" height="150" rx="20"/>',
      d: '<rect class="d" x="80" y="84" width="40" height="56" rx="8"/><path class="d" d="M88 100H112M88 112H112M88 124H104"/>'
    },
    kettle: {
      b: '<path class="s" d="M146 84Q184 92 176 140Q172 156 150 154"/><path class="f" d="M58 70H142L152 168Q153 182 140 182H60Q47 182 48 168Z"/><rect class="f" x="72" y="52" width="56" height="20" rx="8"/><path class="f" d="M52 92L28 66L40 60L62 80Z"/>',
      d: '<path class="d" d="M64 110H136M62 150H138"/><circle class="d" cx="100" cy="62" r="3"/>'
    },
    lamp: {
      b: '<path class="f" d="M62 36H138L162 104H38Z"/><rect class="f" x="95" y="104" width="10" height="64"/><ellipse class="f" cx="100" cy="174" rx="40" ry="10"/>',
      d: '<path class="d" d="M70 50L56 94M130 50L144 94"/>'
    },
    book: {
      b: '<rect class="f" x="46" y="20" width="108" height="160" rx="8"/>',
      d: '<path class="d" d="M62 20V180"/><rect class="d" x="76" y="44" width="62" height="34" rx="4"/><path class="d" d="M76 96H138M76 108H120"/>'
    },
    jar: {
      b: '<rect class="f" x="64" y="26" width="72" height="28" rx="8"/><rect class="f" x="54" y="52" width="92" height="126" rx="22"/>',
      d: '<rect class="d" x="66" y="86" width="68" height="62" rx="10"/><path class="d" d="M76 104H124M76 118H110"/>'
    },
    ball: {
      b: '<circle class="f" cx="100" cy="100" r="74"/>',
      d: '<path class="d" d="M100 26V174M26 100H174"/><path class="d" d="M48 48Q100 100 48 152M152 48Q100 100 152 152"/>'
    },
    speaker: {
      b: '<rect class="f" x="48" y="24" width="104" height="152" rx="22"/>',
      d: '<circle class="d" cx="100" cy="68" r="14"/><circle class="d" cx="100" cy="124" r="30"/><circle class="d" cx="100" cy="124" r="16"/>'
    },
    appliance: {
      b: '<rect class="f" x="40" y="40" width="120" height="132" rx="28"/><rect class="f" x="62" y="26" width="76" height="20" rx="8"/>',
      d: '<circle class="d" cx="100" cy="102" r="34"/><circle class="d" cx="100" cy="102" r="20"/><path class="d" d="M70 154H130"/>'
    }
  };

  G.shapeSVG = function (shape, color, detail, cls) {
    var s = SH[shape] || SH.jar;
    return '<svg class="shp ' + (cls || '') + '" viewBox="0 0 200 200" style="--pc:' + color + '" aria-hidden="true">' + s.b + (detail === false ? '' : s.d) + '</svg>';
  };

  /* Layered turntable. Sixteen copies of the silhouette sit at slightly different depths,
     so rotating the stage reads as a solid object. */
  G.mount360 = function (host, shape, color, opts) {
    opts = opts || {};
    var N = opts.layers || 16, gap = opts.gap || 2.4;
    var angle = opts.start == null ? -28 : opts.start, speed = opts.speed == null ? 0.32 : opts.speed;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var auto = !reduce, drag = null, resume = 0, raf = 0, dead = false, stage;

    function build(c) {
      var h = '';
      for (var i = 0; i < N; i++) {
        var f = i / (N - 1), z = (i - (N - 1) / 2) * gap;
        var shade = Math.round(58 + 42 * f);
        h += '<div class="v-layer" style="transform:translateZ(' + z.toFixed(2) + 'px)">' +
          G.shapeSVG(shape, 'color-mix(in srgb,' + c + ' ' + shade + '%,#000)', i === N - 1) + '</div>';
      }
      stage.innerHTML = h;
    }
    host.innerHTML = '<div class="v-stage"></div>';
    stage = host.firstChild;
    build(color);

    function paint() { stage.style.transform = 'rotateX(-7deg) rotateY(' + angle.toFixed(1) + 'deg)'; }
    function loop(ts) {
      if (dead) return;
      if (auto && !drag && ts > resume) { angle += speed; paint(); }
      raf = requestAnimationFrame(loop);
    }
    paint();
    raf = requestAnimationFrame(loop);

    if (opts.drag !== false) {
      host.addEventListener('pointerdown', function (e) {
        drag = { x: e.clientX, a: angle };
        try { host.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ }
        host.classList.add('grab');
      });
      host.addEventListener('pointermove', function (e) {
        if (!drag) return;
        angle = drag.a + (e.clientX - drag.x) * 0.7;
        paint();
      });
      var end = function () { drag = null; resume = performance.now() + 2500; host.classList.remove('grab'); };
      host.addEventListener('pointerup', end);
      host.addEventListener('pointercancel', end);
    }

    return {
      step: function (d) {
        var from = angle, to = angle + d * 40, t0 = performance.now();
        resume = t0 + 3000;
        (function anim(now) {
          var k = Math.min(1, (now - t0) / 380), e = 1 - Math.pow(1 - k, 3);
          angle = from + (to - from) * e;
          paint();
          if (k < 1 && !dead) requestAnimationFrame(anim);
        })(t0);
      },
      setColor: function (c) { build(c); },
      destroy: function () { dead = true; cancelAnimationFrame(raf); }
    };
  };

  G.boxSVG = function () {
    return '<svg class="bx" viewBox="0 0 200 200" aria-hidden="true">' +
      '<g class="bx-body"><rect x="40" y="94" width="120" height="82" rx="10" fill="var(--brand)"/><rect x="92" y="94" width="16" height="82" fill="var(--cta)"/></g>' +
      '<g class="bx-lid"><rect x="30" y="66" width="140" height="32" rx="9" fill="var(--brand)"/><rect x="92" y="66" width="16" height="32" fill="var(--cta)"/>' +
      '<path d="M100 66C80 40 54 46 62 60C68 70 92 66 100 66ZM100 66C120 40 146 46 138 60C132 70 108 66 100 66Z" fill="none" stroke="var(--cta)" stroke-width="8" stroke-linejoin="round"/></g>' +
      '<text class="bx-q" x="100" y="150" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-weight="800" font-size="40" fill="var(--cta)">?</text></svg>';
  };
})(window.GASS = window.GASS || {});
