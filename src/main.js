/**
 * main.js — Application Orchestrator & WebGL 3D Universe Runtime
 * 
 * - Single source of truth for runtime render state (tab visibility + user pause)
 * - Dynamic celestial label registration from GALAXY_CONFIG
 * - Guided Mode vs Explore Mode HUD integration
 * - Mobile responsive navigation menu handler
 * - Robust error handling and WCAG 2.2 compliant state controls
 */

import { GALAXY_CONFIG } from './config/galaxyConfig.js';
import { UniverseScene } from './scene/UniverseScene.js';
import { setupPostProcessing } from './scene/PostProcessing.js';
import { AdaptiveGovernor } from './interaction/AdaptiveGovernor.js';
import { LabelManager } from './components/LabelManager.js';
import { ProbeModal } from './interaction/ProbeModal.js';
import { FlightController } from './interaction/FlightController.js';

// Detect WebGL2 support
function isWebGL2Available() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch (e) {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvasContainer = document.getElementById('webgl-universe-container');
  const labelContainer = document.getElementById('labels-3d-overlay');

  if (!canvasContainer || !labelContainer) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fallback to static complete version if WebGL2 is missing or reduced motion is set
  if (!isWebGL2Available() || reducedMotion) {
    document.body.classList.add('is-static-fallback');
    console.info('Serving static complete version (WebGL fallback / prefers-reduced-motion active).');
    initStaticFallback();
    return;
  }

  // 1. Initialize Universe 3D Scene
  const universeScene = new UniverseScene(canvasContainer, labelContainer);

  // 2. Initialize Post-Processing Pipeline
  const postProcessing = setupPostProcessing(
    universeScene.renderer,
    universeScene.scene,
    universeScene.camera
  );

  // 3. Initialize Adaptive Quality Governor
  const governor = new AdaptiveGovernor({
    onQualityChange: (tier, scale) => {
      universeScene.setQualityScale(scale);
      postProcessing.setQuality(tier);
      console.info(`Adaptive Governor: Quality adjusted to [${tier}] (scale: ${scale})`);
    }
  });

  // 4. Initialize 3D Label Manager with Collision Avoidance
  const labelManager = new LabelManager(labelContainer);

  // Dynamically register central Sun from GALAXY_CONFIG
  labelManager.register(
    GALAXY_CONFIG.sun.id,
    GALAXY_CONFIG.sun.name,
    'sun',
    GALAXY_CONFIG.sun.priority,
    () => universeScene.sun.group.position,
    (id) => {
      window.dispatchEvent(new CustomEvent('universe:select-planet', { detail: { planetId: id } }));
    }
  );

  // Dynamically register Planets from GALAXY_CONFIG
  GALAXY_CONFIG.planets.forEach(p => {
    labelManager.register(
      p.id,
      `${p.name} (Orbit ${p.orbitIndex})`,
      'planet',
      p.priority,
      () => universeScene.planets[p.id].getPosition(),
      (id) => {
        window.dispatchEvent(new CustomEvent('universe:select-planet', { detail: { planetId: id } }));
      }
    );
  });

  // Dynamically register Moons from GALAXY_CONFIG
  GALAXY_CONFIG.moons.forEach(m => {
    const type = m.isMajor ? 'moon-major' : 'moon-minor';
    labelManager.register(
      m.id,
      m.name,
      type,
      m.priority,
      () => universeScene.moons[m.id].getPosition(),
      (id) => {
        window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
      }
    );
  });

  // 5. Initialize Probe Modal
  const probeModal = new ProbeModal(universeScene);

  // 6. Initialize Flight Controller & Choreography
  const flightController = new FlightController(universeScene, probeModal);

  // 7. Setup Explore Mode HUD & Controls
  setupExploreHUD(universeScene, probeModal);

  // 8. Setup Mobile Destination Navigation Menu
  setupMobileNav();

  // Expose for runtime telemetry & benchmark testing
  window.__UNIVERSE__ = {
    universeScene,
    postProcessing,
    governor,
    labelManager,
    flightController,
    probeModal
  };

  // 9. Render Loop with Delta Time and Unified State Decision
  let animId = null;
  let lastTime = performance.now();
  let isRunning = false;
  let isUserPaused = false;
  let isTabHidden = document.hidden;

  function renderLoop(now) {
    if (!isRunning) return;

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    // Monitor performance
    governor.tick(now);

    // Update scene physics & Keplerian positions
    universeScene.update(dt, now);

    // Update collision-free 3D labels with UI exclusion culling
    labelManager.update(universeScene.camera, universeScene.width, universeScene.height);

    // Post-processing render
    postProcessing.render(dt);

    animId = requestAnimationFrame(renderLoop);
  }

  function updateRunState() {
    const shouldRun = !isUserPaused && !isTabHidden;

    if (shouldRun && !isRunning) {
      isRunning = true;
      lastTime = performance.now();
      governor.resumeClock(lastTime);
      animId = requestAnimationFrame(renderLoop);
    } else if (!shouldRun && isRunning) {
      isRunning = false;
      governor.notifySuspension();
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }
  }

  // Start initial loop
  updateRunState();

  // Unified Tab Visibility Change Handler
  document.addEventListener('visibilitychange', () => {
    isTabHidden = document.hidden;
    updateRunState();
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    universeScene.resize();
    postProcessing.resize(universeScene.width, universeScene.height);
    labelManager.remeasure();
  }, { passive: true });

  // WCAG 2.2.2 Pause Motion Button
  const pauseBtn = document.getElementById('pause-motion-btn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isUserPaused = !isUserPaused;
      if (isUserPaused) {
        pauseBtn.querySelector('.label').textContent = 'Resume Flight';
        pauseBtn.setAttribute('aria-label', 'Resume orbital 3D flight');
        pauseBtn.classList.add('is-paused');
      } else {
        pauseBtn.querySelector('.label').textContent = 'Pause Flight';
        pauseBtn.setAttribute('aria-label', 'Pause orbital 3D flight');
        pauseBtn.classList.remove('is-paused');
      }
      updateRunState();
    });
  }

  // Visakhapatnam Clock
  const clockEl = document.getElementById('ist-clock');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const ist = new Date(utc + istOffset);
      const pad = (n) => String(n).padStart(2, '0');
      clockEl.textContent = `${pad(ist.getHours())}:${pad(ist.getMinutes())}:${pad(ist.getSeconds())} IST`;
    };
    updateClock();
    setInterval(updateClock, 1000);
  }
});

function setupExploreHUD(universeScene, probeModal) {
  const toggleBtn = document.getElementById('hud-mode-toggle');
  const controlsGroup = document.getElementById('hud-controls-group');
  const zoomInBtn = document.getElementById('hud-zoom-in');
  const zoomOutBtn = document.getElementById('hud-zoom-out');
  const focusBtn = document.getElementById('hud-focus');
  const homeBtn = document.getElementById('hud-home');
  const exitBtn = document.getElementById('hud-exit');
  const jumpSelect = document.getElementById('hud-celestial-select');

  if (!toggleBtn) return;

  // Populate celestial quick jump selector from GALAXY_CONFIG
  if (jumpSelect && jumpSelect.options.length <= 1) {
    const sunOpt = document.createElement('option');
    sunOpt.value = GALAXY_CONFIG.sun.id;
    sunOpt.textContent = `★ ${GALAXY_CONFIG.sun.name}`;
    jumpSelect.appendChild(sunOpt);

    const planetGroup = document.createElement('optgroup');
    planetGroup.label = 'Language Planets';
    GALAXY_CONFIG.planets.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `♁ ${p.name} (Orbit ${p.orbitIndex})`;
      planetGroup.appendChild(opt);
    });
    jumpSelect.appendChild(planetGroup);

    const moonGroup = document.createElement('optgroup');
    moonGroup.label = 'Project Moons';
    GALAXY_CONFIG.moons.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `☾ ${m.name}${m.isMajor ? ' [Case Study]' : ''}`;
      moonGroup.appendChild(opt);
    });
    jumpSelect.appendChild(moonGroup);

    jumpSelect.addEventListener('change', () => {
      const targetId = jumpSelect.value;
      if (targetId) {
        universeScene.focusOnBody(targetId);
        if (probeModal) {
          probeModal.open(targetId);
        }
      }
    });
  }

  function updateHUDView(mode) {
    const isExplore = mode === 'explore';
    toggleBtn.setAttribute('aria-pressed', isExplore ? 'true' : 'false');
    const labelSpan = toggleBtn.querySelector('.hud-mode-text');
    if (labelSpan) {
      labelSpan.textContent = isExplore ? 'Explore Mode Active' : 'Explore Galaxy';
    }
    toggleBtn.classList.toggle('is-active', isExplore);
    if (controlsGroup) {
      if (isExplore) {
        controlsGroup.removeAttribute('hidden');
      } else {
        controlsGroup.setAttribute('hidden', '');
      }
    }
    document.body.classList.toggle('is-explore-mode', isExplore);
  }

  toggleBtn.addEventListener('click', () => {
    const nextMode = universeScene.mode === 'explore' ? 'guided' : 'explore';
    universeScene.setMode(nextMode);
  });

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => universeScene.zoomIn());
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => universeScene.zoomOut());
  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      // Re-center on currently focused target or central Sun
      if (universeScene.focusedTarget?.targetObj) {
        universeScene.exploreTarget.copy(universeScene.focusedTarget.getPosition());
      } else {
        universeScene.exploreTarget.set(0, 0, 0);
      }
      universeScene.updateExploreCameraPosition();
    });
  }
  if (homeBtn) homeBtn.addEventListener('click', () => universeScene.resetHome());
  if (exitBtn) exitBtn.addEventListener('click', () => universeScene.setMode('guided'));

  window.addEventListener('universe:mode-changed', (e) => {
    updateHUDView(e.detail.mode);
  });
}

function setupMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
    navLinks.classList.toggle('is-open', !isExpanded);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    });
  });
}

function initStaticFallback() {
  const probeModal = document.getElementById('probe-modal');
  if (probeModal) {
    document.querySelectorAll('[data-inspect-celestial]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        probeModal.showModal();
      });
    });
  }
}
