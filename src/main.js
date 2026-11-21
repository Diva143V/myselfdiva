/**
 * main.js — Application Orchestrator & WebGL 3D Universe Runtime
 */

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

  // Register celestial bodies with priority-weighted collision culling
  labelManager.register('sun', 'Sun // Diwakar', 'sun', 100, () => universeScene.sun.group.position, (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-planet', { detail: { planetId: id } }));
  });

  // 5 Planets
  labelManager.register('python', 'Python (Orbit 1)', 'planet', 80, () => universeScene.planets.python.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-planet', { detail: { planetId: id } }));
  });
  labelManager.register('csharp', 'C# / .NET (Orbit 2)', 'planet', 80, () => universeScene.planets.csharp.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-planet', { detail: { planetId: id } }));
  });
  labelManager.register('rust', 'Rust (Orbit 3)', 'planet', 80, () => universeScene.planets.rust.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-planet', { detail: { planetId: id } }));
  });
  labelManager.register('typescript', 'TypeScript (Orbit 4)', 'planet', 80, () => universeScene.planets.typescript.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-planet', { detail: { planetId: id } }));
  });
  labelManager.register('cpp', 'C++ (Orbit 5)', 'planet', 80, () => universeScene.planets.cpp.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-planet', { detail: { planetId: id } }));
  });

  // 4 Major Moons (Higher priority than minor moons)
  labelManager.register('livesubs', 'LiveSubs', 'moon-major', 90, () => universeScene.moons.livesubs.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
  });
  labelManager.register('griffin', 'Griffin Bio', 'moon-major', 90, () => universeScene.moons.griffin.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
  });
  labelManager.register('knox', 'Knox', 'moon-major', 90, () => universeScene.moons.knox.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
  });
  labelManager.register('sygriffin', 'SyGriffin', 'moon-major', 90, () => universeScene.moons.sygriffin.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
  });

  // Minor Moons
  labelManager.register('polaris', 'Polaris', 'moon-minor', 50, () => universeScene.moons.polaris.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
  });
  labelManager.register('sita', 'Sita', 'moon-minor', 50, () => universeScene.moons.sita.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
  });
  labelManager.register('myselfdiva', 'myselfdiva', 'moon-minor', 50, () => universeScene.moons.myselfdiva.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
  });
  labelManager.register('hackme', 'HackMe', 'moon-minor', 50, () => universeScene.moons.hackme.getPosition(), (id) => {
    window.dispatchEvent(new CustomEvent('universe:select-moon', { detail: { moonId: id } }));
  });

  // 5. Initialize Probe Modal
  const probeModal = new ProbeModal(universeScene);

  // 6. Initialize Flight Controller & Choreography
  const flightController = new FlightController(universeScene, probeModal);

  // Expose for runtime telemetry & benchmark testing
  window.__UNIVERSE__ = {
    universeScene,
    postProcessing,
    governor,
    labelManager,
    flightController,
    probeModal
  };

  // 7. Render Loop with Delta Time and Zero Allocation
  let animId = null;
  let lastTime = performance.now();
  let isRunning = true;

  function renderLoop(now) {
    if (!isRunning) return;

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    // Monitor performance
    governor.tick(now);

    // Update scene physics
    universeScene.update(dt, now);

    // Update collision-free 3D labels
    labelManager.update(universeScene.camera, universeScene.width, universeScene.height);

    // Post-processing render
    postProcessing.render(dt);

    animId = requestAnimationFrame(renderLoop);
  }

  animId = requestAnimationFrame(renderLoop);

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
    } else {
      isRunning = true;
      lastTime = performance.now();
      animId = requestAnimationFrame(renderLoop);
    }
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    universeScene.resize();
    postProcessing.resize(universeScene.width, universeScene.height);
  }, { passive: true });

  // WCAG 2.2.2 Pause Motion Button
  const pauseBtn = document.getElementById('pause-motion-btn');
  if (pauseBtn) {
    let paused = false;
    pauseBtn.addEventListener('click', () => {
      paused = !paused;
      if (paused) {
        isRunning = false;
        pauseBtn.querySelector('.label').textContent = 'Resume Flight';
        pauseBtn.setAttribute('aria-label', 'Resume orbital 3D flight');
      } else {
        isRunning = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(renderLoop);
        pauseBtn.querySelector('.label').textContent = 'Pause Flight';
        pauseBtn.setAttribute('aria-label', 'Pause orbital 3D flight');
      }
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
