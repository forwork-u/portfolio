// ===== 制作物 詳細ページ（動きのみ。テキスト・画像・リンクは各 work0X.html に直接記載） =====
(function () {
  'use strict';

  // --- ヘッダー：スクロールで背景を表示 ---
  var header = document.getElementById('js-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- スクロールで要素をフェードイン ---
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var sibs = Array.prototype.filter.call(e.target.parentElement.children, function (c) {
        return c.classList.contains('js-reveal');
      });
      e.target.style.transitionDelay = (Math.max(0, sibs.indexOf(e.target)) % 4) * 0.12 + 's';
      e.target.classList.add('is-show');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.js-reveal').forEach(function (el) { io.observe(el); });

  // --- Page Top ---
  document.getElementById('js-pagetop').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- 開いた時の動き ---
  setTimeout(function () { document.body.classList.add('is-loaded'); }, 150);
})();
