/* Howie Wang — portfolio
   Progressive enhancement only: the page is fully readable without this file. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Nav: hairline appears once the page has scrolled
     --------------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('nav-open'));
  });
  mobileMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 734) setMenu(false);
  });

  /* ---------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Stat counters
     --------------------------------------------------------------------- */
  /* The markup already contains the final numbers, so the page is correct
     without JavaScript. We only count up when motion is allowed. */
  var counters = document.querySelectorAll('[data-count]');

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (!isFinite(target)) return;
    var duration = 1400;
    var start = null;
    var done = false;
    function finish() { if (!done) { done = true; el.textContent = String(target); } }
    function frame(ts) {
      if (done) return;
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      el.textContent = String(Math.round(easeOutCubic(p) * target));
      if (p < 1) requestAnimationFrame(frame); else finish();
    }
    el.textContent = '0';
    requestAnimationFrame(frame);
    setTimeout(finish, duration + 400); /* safety net if rAF is throttled */
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }
})();
