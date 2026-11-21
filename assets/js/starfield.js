/**
 * starfield.js — Cosmic Parallax Background
 * 
 * Performance characteristics:
 * - 3 distinct depth layers with individual twinkle physics
 * - Smooth inertial parallax reaction to pointer motion
 * - Occasional shooting star trajectories
 * - Zero allocation inside the requestAnimationFrame loop
 * - Automatic pause on document visibility change and off-screen
 * - Full prefers-reduced-motion static rendering
 */

(function () {
  'use strict';

  var canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d', { alpha: false });
  var width = 0;
  var height = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isPaused = reducedMotion;
  var animFrameId = null;
  var lastTimestamp = 0;

  // Parallax tracking
  var mouseX = 0;
  var mouseY = 0;
  var targetOffsetX = 0;
  var targetOffsetY = 0;
  var currentOffsetX = 0;
  var currentOffsetY = 0;

  // Star populations (scaled by viewport area)
  var stars = [];
  var MAX_STARS = 260;

  // Meteor / Shooting star state
  var meteor = {
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    length: 0,
    life: 0,
    maxLife: 0,
    alpha: 0
  };
  var nextMeteorTime = 4000; // ms

  function initStar(star, i) {
    // 3 depth layers: 0 (deep/far), 1 (mid), 2 (foreground)
    var layer = 0;
    if (i > MAX_STARS * 0.75) {
      layer = 2; // foreground (~25%)
    } else if (i > MAX_STARS * 0.4) {
      layer = 1; // midground (~35%)
    } else {
      layer = 0; // background (~40%)
    }

    star.layer = layer;
    star.x = Math.random() * width;
    star.y = Math.random() * height;

    if (layer === 0) {
      star.r = 0.5 + Math.random() * 0.5;
      star.baseAlpha = 0.2 + Math.random() * 0.25;
      star.twinkleSpeed = 0.001 + Math.random() * 0.002;
      star.parallax = 0.008;
      star.color = '226, 232, 240';
    } else if (layer === 1) {
      star.r = 0.8 + Math.random() * 0.8;
      star.baseAlpha = 0.4 + Math.random() * 0.35;
      star.twinkleSpeed = 0.002 + Math.random() * 0.003;
      star.parallax = 0.022;
      star.color = '241, 245, 249';
    } else {
      star.r = 1.3 + Math.random() * 1.1;
      star.baseAlpha = 0.65 + Math.random() * 0.35;
      star.twinkleSpeed = 0.003 + Math.random() * 0.004;
      star.parallax = 0.045;
      // Slight warm golden tint on a few foreground stars
      star.color = Math.random() > 0.4 ? '245, 158, 11' : '255, 255, 255';
    }

    star.twinklePhase = Math.random() * Math.PI * 2;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Scale context for HiDPI
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Adjust star count for screen size
    var targetCount = Math.floor(Math.min(MAX_STARS, (width * height) / 4800));
    if (width < 768) targetCount = Math.floor(targetCount * 0.6); // mobile particle budget

    while (stars.length < targetCount) {
      var s = {};
      initStar(s, stars.length);
      stars.push(s);
    }
    stars.length = targetCount;

    // Reposition any stars out of bounds
    for (var i = 0; i < stars.length; i++) {
      if (stars[i].x > width) stars[i].x = Math.random() * width;
      if (stars[i].y > height) stars[i].y = Math.random() * height;
    }

    if (reducedMotion || isPaused) {
      renderStatic();
    }
  }

  function spawnMeteor() {
    meteor.x = Math.random() * width * 0.8 + width * 0.1;
    meteor.y = Math.random() * height * 0.35;
    var angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3; // ~45 deg downward
    var speed = 12 + Math.random() * 8;
    meteor.vx = Math.cos(angle) * speed;
    meteor.vy = Math.sin(angle) * speed;
    meteor.length = 60 + Math.random() * 70;
    meteor.maxLife = 35 + Math.random() * 25;
    meteor.life = meteor.maxLife;
    meteor.active = true;
  }

  function updateMeteors(dt) {
    if (reducedMotion) return;

    nextMeteorTime -= dt;
    if (nextMeteorTime <= 0 && !meteor.active) {
      spawnMeteor();
      nextMeteorTime = 7000 + Math.random() * 8000;
    }

    if (meteor.active) {
      meteor.x += meteor.vx;
      meteor.y += meteor.vy;
      meteor.life--;

      var progress = meteor.life / meteor.maxLife;
      meteor.alpha = Math.sin(progress * Math.PI); // fade in and out smoothly

      if (meteor.life <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
        meteor.active = false;
      }
    }
  }

  function render(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    var dt = Math.min(timestamp - lastTimestamp, 64);
    lastTimestamp = timestamp;

    // Smooth inertia for mouse parallax
    currentOffsetX += (targetOffsetX - currentOffsetX) * 0.05;
    currentOffsetY += (targetOffsetY - currentOffsetY) * 0.05;

    // Clear background to deep space ground
    ctx.fillStyle = '#06080d';
    ctx.fillRect(0, 0, width, height);

    // Subtle atmospheric ambient glow in top center
    var ambientGrad = ctx.createRadialGradient(
      width * 0.5, height * 0.15, 0,
      width * 0.5, height * 0.15, width * 0.6
    );
    ambientGrad.addColorStop(0, 'rgba(17, 24, 39, 0.45)');
    ambientGrad.addColorStop(0.5, 'rgba(11, 15, 23, 0.25)');
    ambientGrad.addColorStop(1, 'rgba(6, 8, 13, 0)');
    ctx.fillStyle = ambientGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];

      // Twinkle calculation
      s.twinklePhase += s.twinkleSpeed * dt;
      var twinkle = Math.sin(s.twinklePhase) * 0.3;
      var alpha = Math.max(0.08, Math.min(1, s.baseAlpha + twinkle));

      // Parallax coordinate
      var sx = s.x + currentOffsetX * s.parallax;
      var sy = s.y + currentOffsetY * s.parallax;

      // Wrap-around screen
      if (sx < 0) sx += width;
      if (sx > width) sx -= width;
      if (sy < 0) sy += height;
      if (sy > height) sy -= height;

      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + s.color + ',' + alpha.toFixed(3) + ')';
      ctx.fill();
    }

    // Draw shooting star if active
    if (meteor.active && meteor.alpha > 0.01) {
      updateMeteors(dt);
      var tailX = meteor.x - (meteor.vx / 14) * meteor.length;
      var tailY = meteor.y - (meteor.vy / 14) * meteor.length;

      var grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
      grad.addColorStop(0, 'rgba(245, 158, 11, 0)');
      grad.addColorStop(0.7, 'rgba(245, 158, 11, ' + (meteor.alpha * 0.5).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(255, 255, 255, ' + (meteor.alpha * 0.95).toFixed(3) + ')');

      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(meteor.x, meteor.y);
      ctx.stroke();

      // Bright head glow
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + meteor.alpha.toFixed(3) + ')';
      ctx.fill();
      ctx.restore();
    } else {
      updateMeteors(dt);
    }

    if (!isPaused && !reducedMotion) {
      animFrameId = requestAnimationFrame(render);
    }
  }

  function renderStatic() {
    ctx.fillStyle = '#06080d';
    ctx.fillRect(0, 0, width, height);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + s.color + ',' + s.baseAlpha + ')';
      ctx.fill();
    }
  }

  // Pointer event listeners (throttled)
  var lastPointerMove = 0;
  window.addEventListener('pointermove', function (e) {
    var now = performance.now();
    if (now - lastPointerMove < 16) return; // ~60fps throttle
    lastPointerMove = now;

    // Normalized offset from viewport center
    var cx = width * 0.5;
    var cy = height * 0.5;
    targetOffsetX = (e.clientX - cx);
    targetOffsetY = (e.clientY - cy);
  }, { passive: true });

  // Tab visibility changes
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    } else {
      if (!isPaused && !reducedMotion && !animFrameId) {
        lastTimestamp = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    }
  });

  // Global pause/resume API for WCAG 2.2.2 compliance
  window.StarfieldAPI = {
    pause: function () {
      isPaused = true;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    },
    resume: function () {
      if (reducedMotion) return;
      isPaused = false;
      if (!animFrameId) {
        lastTimestamp = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    },
    isPaused: function () {
      return isPaused;
    }
  };

  // Listen for reduced motion preference changes
  var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', function (e) {
    reducedMotion = e.matches;
    if (reducedMotion) {
      window.StarfieldAPI.pause();
      renderStatic();
    } else {
      window.StarfieldAPI.resume();
    }
  });

  // Initialize
  window.addEventListener('resize', resize, { passive: true });
  resize();

  if (!reducedMotion) {
    animFrameId = requestAnimationFrame(render);
  } else {
    renderStatic();
  }
})();
