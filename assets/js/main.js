/**
 * main.js — Application Orchestration & Micro-Interactions
 * 
 * - Magnetic spring physics on primary CTA buttons
 * - WCAG 2.2.2 compliant Pause/Resume physics toggle
 * - Responsive mobile navigation drawer with focus management
 * - Real-time Visakhapatnam IST clock
 * - Scroll spy and semantic section transitions
 */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. MAGNETIC BUTTON MICRO-INTERACTIONS ---
  function initMagneticButtons() {
    if (reducedMotion || !window.matchMedia('(hover: hover)').matches) return;

    var magneticButtons = document.querySelectorAll('.btn-magnetic');

    magneticButtons.forEach(function (btn) {
      var bounding = null;
      var active = false;
      var currentX = 0;
      var currentY = 0;
      var targetX = 0;
      var targetY = 0;
      var rAF = null;

      function updateSpring() {
        if (!active && Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
          btn.style.transform = '';
          currentX = 0;
          currentY = 0;
          rAF = null;
          return;
        }

        // Spring easing
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;

        btn.style.transform = 'translate3d(' + currentX.toFixed(2) + 'px, ' + currentY.toFixed(2) + 'px, 0)';
        rAF = requestAnimationFrame(updateSpring);
      }

      btn.addEventListener('pointerenter', function () {
        bounding = btn.getBoundingClientRect();
        active = true;
        if (!rAF) rAF = requestAnimationFrame(updateSpring);
      });

      btn.addEventListener('pointermove', function (e) {
        if (!bounding) bounding = btn.getBoundingClientRect();
        var centerX = bounding.left + bounding.width * 0.5;
        var centerY = bounding.top + bounding.height * 0.5;

        // Pull strength (max ~14px displacement)
        targetX = (e.clientX - centerX) * 0.28;
        targetY = (e.clientY - centerY) * 0.28;
      });

      btn.addEventListener('pointerleave', function () {
        active = false;
        targetX = 0;
        targetY = 0;
      });
    });
  }

  // --- 2. GLOBAL AMBIENT MOTION PAUSE TOGGLE (WCAG 2.2.2) ---
  function initMotionToggle() {
    var toggleBtn = document.getElementById('pause-motion-btn');
    if (!toggleBtn) return;

    var isPaused = reducedMotion;

    function updateButtonState() {
      var icon = toggleBtn.querySelector('.icon');
      var label = toggleBtn.querySelector('.label');

      if (isPaused) {
        if (icon) icon.textContent = '▶';
        if (label) label.textContent = 'Resume Motion';
        toggleBtn.setAttribute('aria-label', 'Resume orbital physics and starfield motion');
        document.body.classList.add('motion-paused');
      } else {
        if (icon) icon.textContent = '⏸';
        if (label) label.textContent = 'Pause Motion';
        toggleBtn.setAttribute('aria-label', 'Pause orbital physics and starfield motion');
        document.body.classList.remove('motion-paused');
      }
    }

    toggleBtn.addEventListener('click', function () {
      isPaused = !isPaused;
      updateButtonState();

      if (isPaused) {
        if (window.StarfieldAPI) window.StarfieldAPI.pause();
        if (window.OrbitSystemAPI) window.OrbitSystemAPI.pause();
      } else {
        if (window.StarfieldAPI) window.StarfieldAPI.resume();
        if (window.OrbitSystemAPI) window.OrbitSystemAPI.resume();
      }
    });

    updateButtonState();
  }

  // --- 3. MOBILE NAVIGATION DRAWER ---
  function initMobileNav() {
    var toggleBtn = document.getElementById('mobile-nav-toggle');
    var drawer = document.getElementById('mobile-nav-drawer');
    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');

      var firstLink = drawer.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', function () {
      var isOpen = drawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close when clicking any nav link
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });

    // Esc key closes drawer
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // --- 4. VISAKHAPATNAM (IST) LIVE CLOCK ---
  function initClock() {
    var clockEl = document.getElementById('ist-clock');
    if (!clockEl) return;

    function update() {
      // Format time in Indian Standard Time (UTC+5:30)
      var now = new Date();
      var istOffset = 5.5 * 60 * 60 * 1000;
      var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      var istTime = new Date(utc + istOffset);

      var hours = String(istTime.getHours()).padStart(2, '0');
      var minutes = String(istTime.getMinutes()).padStart(2, '0');
      var seconds = String(istTime.getSeconds()).padStart(2, '0');

      clockEl.textContent = hours + ':' + minutes + ':' + seconds + ' IST';
    }

    update();
    setInterval(update, 1000);
  }

  // --- 5. REVEAL ANIMATIONS ON SCROLL ---
  function initScrollReveals() {
    var revealElements = document.querySelectorAll('.flight-beacon, .stack-orbit-card, .cred-item, .calm-reveal');

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- 6. COPYRIGHT YEAR ---
  function initYear() {
    var yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Bootstrapping
  document.addEventListener('DOMContentLoaded', function () {
    initMagneticButtons();
    initMotionToggle();
    initMobileNav();
    initClock();
    initScrollReveals();
    initYear();
  });
})();
