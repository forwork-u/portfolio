// ===== トップページ =====
(function () {
  'use strict';

  var HEADER_OFFSET = 70;

  // --- ヘッダー：スクロールで背景を表示 ---
  var header = document.getElementById('js-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- スクロールで要素をフェードイン ---
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var sibs = Array.prototype.filter.call(e.target.parentElement.children, function (c) {
        return c.classList.contains('js-reveal');
      });
      var i = Math.max(0, sibs.indexOf(e.target));
      e.target.style.transitionDelay = (i % 4) * 0.12 + 's';
      e.target.classList.add('is-show');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('.js-reveal').forEach(function (el) { io.observe(el); });

  // --- ページ内リンク：スムーススクロール ---
  function scrollToId(id, smooth) {
    var el = document.getElementById(id);
    if (!el) return;
    var y = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
  }
  document.querySelectorAll('.js-scroll').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      e.preventDefault();
      scrollToId(id, true);
    });
  });

  // --- KV アニメーション ---
  var bg = document.getElementById('js-bg');
  var kv = document.querySelector('.kv');
  function playKV() {
    setTimeout(function () { bg.classList.add('is-dot'); }, 500);
    setTimeout(function () { bg.classList.add('is-open'); }, 1250);
    setTimeout(function () { kv.classList.add('is-show'); }, 2300);
  }

  // --- ローディング ---
  var loader = document.getElementById('js-loader');
  var pctEl = document.getElementById('js-pct');
  var hash = location.hash.slice(1);

  if (hash && hash !== 'top' && document.getElementById(hash)) {
    // アンカー付きで来た場合はローディングを省略して該当位置へ
    loader.remove();
    playKV();
    setTimeout(function () { scrollToId(hash, false); }, 60);
  } else {
    var start = performance.now(), dur = 1800;
    var tick = function (t) {
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      pctEl.textContent = String(Math.round(eased * 100)).padStart(2, '0');
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(function () { loader.classList.add('is-lifted'); playKV(); }, 250);
        setTimeout(function () { loader.remove(); }, 1000);
      }
    };
    requestAnimationFrame(tick);
  }
})();
