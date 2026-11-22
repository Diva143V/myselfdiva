/**
 * UniverseScene.js — Three.js Scene Graph, Celestial Bodies & Camera Orchestration
 * 
 * Features:
 * - Dynamic galaxy generation from GALAXY_CONFIG
 * - Strict separation of raycast picking vector from parallax vector (P0 fix)
 * - Safe cold-load initialization at Hero vantage without scene ejection
 * - Dual camera navigation model: Guided Mode (scroll/route) & Explore Mode (bounded orbit/zoom)
 * - Dynamic target-relative framing composed for reading card clearance (25-35 deg elevation)
 * - Time-based exponential damping: 1 - exp(-lambda * dt) (P2 fix)
 */

import * as THREE from 'three';
import gsap from 'gsap';
import { GALAXY_CONFIG } from '../config/galaxyConfig.js';
import { createStarfield } from '../components/Starfield.js';
import { createSun } from '../components/Sun.js';
import { createPlanet } from '../components/Planet.js';
import { createMoon } from '../components/Moon.js';

export class UniverseScene {
  constructor(canvasContainer, labelContainer) {
    this.container = canvasContainer;
    this.labelContainer = labelContainer;

    // Viewport dimensions
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = window.innerWidth < 768;

    // Device Pixel Ratio capped at 2 (desktop) / 1.5 (mobile)
    this.maxDpr = this.isMobile ? 1.5 : 2.0;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);

    // 1. Scene & Camera Setup (Deep space chiaroscuro fog)
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x04060a, 0.00035);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.5, 3500);
    this.camera.position.set(0, 180, 420); // Initial deep-space overview
    this.camera.up.set(0, 1, 0);

    // 2. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false, // Handled by SMAA in post-processing
      stencil: false,
      depth: true,
      alpha: false
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // 3. Cosmic Fill Light
    const ambientLight = new THREE.AmbientLight(0x040712, 0.18);
    this.scene.add(ambientLight);

    // 4. Starfield & Nebulae
    this.starfield = createStarfield(this.isMobile ? 1800 : 3400);
    this.scene.add(this.starfield.group);

    // 5. Central Sun (Authored from config)
    this.sun = createSun(GALAXY_CONFIG.sun.radius);
    this.scene.add(this.sun.group);

    // 6. Planetary Systems & Moons dynamically constructed from GALAXY_CONFIG
    this.planets = {};
    this.moons = {};
    this.clickableObjects = [];
    this.setupPlanetarySystem();

    // 7. Interaction Vectors — Strict P0 Separation
    this.raycaster = new THREE.Raycaster();
    this.pickingPointer = new THREE.Vector2(-999, -999); // Screen picking sentinel
    this.parallax = new THREE.Vector2(0, 0);             // Parallax strictly (0, 0) on cold load
    this.hasPointerMoved = false;
    this.isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    this.hoveredObject = null;
    this.focusedTarget = null; // When camera focuses on a body

    // 8. Dual Navigation Model: Guided vs Explore
    this.mode = 'guided'; // 'guided' | 'explore'
    this.exploreTarget = new THREE.Vector3(0, 0, 0);
    this.exploreSpherical = new THREE.Spherical(420, Math.PI * 0.35, 0);
    this.isDragging = false;
    this.previousPointerPos = { x: 0, y: 0 };

    // 9. Flight Spline for Guided Tour Overview
    this.flightSpline = this.createFlightSpline();
    this.splineProgress = 0;

    // Camera target vectors (reused to prevent GC)
    this.currentCamPos = new THREE.Vector3().copy(this.camera.position);
    this.targetCamPos = new THREE.Vector3().copy(this.camera.position);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.tempVec = new THREE.Vector3();

    // Staged Ignition Sequence
    this.ignitionProgress = 0.0;
    this.isIgnited = false;

    // Moon Night Mode State
    this.activeNightMoon = null;
    this.nightTween = null;

    this.bindEvents();
  }

  setupPlanetarySystem() {
    // Construct Planets from GALAXY_CONFIG
    GALAXY_CONFIG.planets.forEach(pConfig => {
      const planet = createPlanet(pConfig);
      this.planets[pConfig.id] = planet;
      this.scene.add(planet.group);
      this.scene.add(planet.orbitLine);
      this.clickableObjects.push(planet.mesh);
    });

    // Construct Moons from GALAXY_CONFIG
    GALAXY_CONFIG.moons.forEach(mConfig => {
      const parentPlanet = this.planets[mConfig.parentPlanetId];
      if (!parentPlanet) return;

      const moon = createMoon(mConfig, parentPlanet);
      this.moons[mConfig.id] = moon;
      this.scene.add(moon.group);
      this.scene.add(moon.trailLine);
      this.clickableObjects.push(moon.mesh);
    });
  }

  createFlightSpline() {
    const waypoints = GALAXY_CONFIG.splineWaypoints.map(
      wp => new THREE.Vector3(wp.x, wp.y, wp.z)
    );
    return new THREE.CatmullRomCurve3(waypoints, false, 'centripetal', 0.5);
  }

  bindEvents() {
    const canvas = this.renderer.domElement;
    const activeTouches = new Map();
    let initialPinchDist = 0;
    let initialRadius = 0;

    // Pointer move listener with P0 clamp, coarse check, and Explore orbit/pinch
    let lastMove = 0;
    window.addEventListener('pointermove', (e) => {
      const now = performance.now();
      if (now - lastMove < 16) return;
      lastMove = now;

      // Screen picking NDC
      this.pickingPointer.x = (e.clientX / this.width) * 2 - 1;
      this.pickingPointer.y = -(e.clientY / this.height) * 2 + 1;
      this.hasPointerMoved = true;

      // Parallax strictly clamped and disabled on coarse pointers
      if (!this.isCoarsePointer) {
        this.parallax.x = THREE.MathUtils.clamp(this.pickingPointer.x, -1, 1);
        this.parallax.y = THREE.MathUtils.clamp(this.pickingPointer.y, -1, 1);
      }

      // Handle Explore mode touch pinch-to-zoom
      if (this.mode === 'explore' && activeTouches.has(e.pointerId)) {
        activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activeTouches.size === 2 && initialPinchDist > 0) {
          const [t1, t2] = Array.from(activeTouches.values());
          const currentDist = Math.hypot(t1.x - t2.x, t1.y - t2.y);
          if (currentDist > 0) {
            const pinchScale = initialPinchDist / currentDist;
            this.exploreSpherical.radius = THREE.MathUtils.clamp(
              initialRadius * pinchScale,
              35,
              800
            );
            this.updateExploreCameraPosition();
          }
          return;
        }
      }

      // Handle Explore mode single-pointer orbit drag
      if (this.mode === 'explore' && this.isDragging) {
        const deltaX = e.clientX - this.previousPointerPos.x;
        const deltaY = e.clientY - this.previousPointerPos.y;
        this.previousPointerPos = { x: e.clientX, y: e.clientY };

        const rotateSpeed = 0.005;
        this.exploreSpherical.theta -= deltaX * rotateSpeed;
        this.exploreSpherical.phi -= deltaY * rotateSpeed;
        this.exploreSpherical.phi = THREE.MathUtils.clamp(this.exploreSpherical.phi, 0.15, Math.PI - 0.2);
        this.updateExploreCameraPosition();
      }
    }, { passive: true });

    // Explore mode pointer down / up / cancel
    canvas.addEventListener('pointerdown', (e) => {
      if (this.mode === 'explore') {
        activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (activeTouches.size === 1) {
          this.isDragging = true;
          this.previousPointerPos = { x: e.clientX, y: e.clientY };
        } else if (activeTouches.size === 2) {
          this.isDragging = false;
          const [t1, t2] = Array.from(activeTouches.values());
          initialPinchDist = Math.hypot(t1.x - t2.x, t1.y - t2.y);
          initialRadius = this.exploreSpherical.radius;
        }
      }
    });

    const onPointerUpOrCancel = (e) => {
      activeTouches.delete(e.pointerId);
      if (activeTouches.size === 0) {
        this.isDragging = false;
        initialPinchDist = 0;
      } else if (activeTouches.size === 1) {
        const remaining = Array.from(activeTouches.values())[0];
        this.previousPointerPos = { x: remaining.x, y: remaining.y };
        this.isDragging = true;
      }
    };

    window.addEventListener('pointerup', onPointerUpOrCancel);
    window.addEventListener('pointercancel', onPointerUpOrCancel);

    // Wheel zoom dolly in Explore mode (does not disable browser page zoom outside canvas)
    canvas.addEventListener('wheel', (e) => {
      if (this.mode === 'explore') {
        e.preventDefault();
        const dollyScale = e.deltaY > 0 ? 1.08 : 0.92;
        this.exploreSpherical.radius = THREE.MathUtils.clamp(
          this.exploreSpherical.radius * dollyScale,
          35,
          800
        );
        this.updateExploreCameraPosition();
      }
    }, { passive: false });

    // Pointer click for raycast selection
    window.addEventListener('click', (e) => {
      if (e.target.closest('button, a, dialog, input, .ui-panel, .explore-hud')) return;
      if (this.pickingPointer.x === -999) return;

      this.raycaster.setFromCamera(this.pickingPointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.clickableObjects);

      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData.isMoon) {
          window.dispatchEvent(new CustomEvent('universe:select-moon', {
            detail: { moonId: obj.userData.moonId }
          }));
        } else if (obj.parent && obj.parent.name.startsWith('Planet_')) {
          const planetId = obj.parent.name.replace('Planet_', '').toLowerCase();
          window.dispatchEvent(new CustomEvent('universe:select-planet', {
            detail: { planetId }
          }));
        }
      }
    });

    // Escape key exits Explore mode and returns to Guided mode
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mode === 'explore') {
        this.setMode('guided');
      }
    });

    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  setMode(mode) {
    if (this.mode === mode) return;
    this.mode = mode;
    window.dispatchEvent(new CustomEvent('universe:mode-changed', { detail: { mode } }));

    if (mode === 'explore') {
      // If no target is explicitly focused, ensure exploreTarget centers on the solar origin (0, 0, 0)
      if (!this.focusedTarget) {
        this.exploreTarget.set(0, 0, 0);
      }
      // Sync explore spherical from current camera position
      const offset = new THREE.Vector3().subVectors(this.currentCamPos, this.exploreTarget);
      this.exploreSpherical.setFromVector3(offset);
      this.exploreSpherical.radius = THREE.MathUtils.clamp(this.exploreSpherical.radius, 35, 800);
      this.exploreSpherical.phi = THREE.MathUtils.clamp(this.exploreSpherical.phi, 0.15, Math.PI - 0.2);
    } else {
      this.clearFocus();
    }
  }

  updateExploreCameraPosition() {
    this.exploreSpherical.makeSafe();
    this.targetCamPos.setFromSpherical(this.exploreSpherical).add(this.exploreTarget);
    this.targetLookAt.copy(this.exploreTarget);
  }

  // Explore HUD Operations
  zoomIn() {
    this.exploreSpherical.radius = Math.max(35, this.exploreSpherical.radius * 0.8);
    this.updateExploreCameraPosition();
  }

  zoomOut() {
    this.exploreSpherical.radius = Math.min(800, this.exploreSpherical.radius * 1.25);
    this.updateExploreCameraPosition();
  }

  resetHome() {
    this.clearFocus();
    this.exploreTarget.set(0, 0, 0);
    this.exploreSpherical.set(420, Math.PI * 0.35, 0);
    this.updateExploreCameraPosition();
  }

  setFlightProgress(progress) {
    this.splineProgress = THREE.MathUtils.clamp(progress, 0, 1);
  }

  setQualityScale(scale) {
    const effectiveDpr = Math.max(1, this.dpr * scale);
    this.renderer.setPixelRatio(effectiveDpr);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 768;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  /**
   * Composed target-relative camera framing
   * Keeps target composed at 25-35 deg elevation with reading card clearance
   */
  calculateComposedFraming(targetObj, cameraFraming) {
    const bodyPos = targetObj.getPosition();
    const elevDeg = cameraFraming?.elevationDeg || 30;
    const elevRad = (elevDeg * Math.PI) / 180;
    const dist = cameraFraming?.distance || 38;

    const isDesktop = this.width >= 768;

    // Angle relative to central star
    const bodyAngle = Math.atan2(bodyPos.z, bodyPos.x);
    const camAngle = bodyAngle + 0.45; // 3/4 vantage showing illuminated limb

    const camX = bodyPos.x + Math.cos(camAngle) * dist * Math.cos(elevRad);
    const camY = bodyPos.y + dist * Math.sin(elevRad);
    const camZ = bodyPos.z + Math.sin(camAngle) * dist * Math.cos(elevRad);
    const cameraPos = new THREE.Vector3(camX, camY, camZ);

    const lookTarget = bodyPos.clone();
    if (isDesktop) {
      // True camera right vector: cross(forward, up)
      // Looking to the RIGHT of the target causes Three.js camera to pan right,
      // composing the celestial body gracefully on the LEFT in the open scene area,
      // completely clear of the right-docked reading card
      const forward = new THREE.Vector3().subVectors(bodyPos, cameraPos).normalize();
      const camRight = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
      lookTarget.addScaledVector(camRight, dist * 0.32);
    }

    return {
      cameraPos,
      lookAt: lookTarget
    };
  }

  enterNightMode(moonObj) {
    if (this.nightTween) this.nightTween.kill();
    this.activeNightMoon = moonObj;

    this.nightTween = gsap.timeline({ defaults: { duration: 1.2, ease: 'power2.out' } });
    if (this.sun.light) {
      this.nightTween.to(this.sun.light, { intensity: 0.55 }, 0);
    }
    if (this.sun.coronaSprite?.material) {
      this.nightTween.to(this.sun.coronaSprite.material, { opacity: 0.12 }, 0);
    }
    if (this.renderer) {
      this.nightTween.to(this.renderer, { toneMappingExposure: 0.92 }, 0);
    }
    if (moonObj.material) {
      this.nightTween.to(moonObj.material, { emissiveIntensity: 0.9 }, 0);
    }
  }

  exitNightMode() {
    if (!this.activeNightMoon) return;
    if (this.nightTween) this.nightTween.kill();

    const prevMoon = this.activeNightMoon;
    this.activeNightMoon = null;

    this.nightTween = gsap.timeline({ defaults: { duration: 0.9, ease: 'power2.inOut' } });
    if (this.sun.light) {
      this.nightTween.to(this.sun.light, { intensity: 2.8 }, 0);
    }
    if (this.sun.coronaSprite?.material) {
      this.nightTween.to(this.sun.coronaSprite.material, { opacity: 0.50 }, 0);
    }
    if (this.renderer) {
      this.nightTween.to(this.renderer, { toneMappingExposure: 1.08 }, 0);
    }
    if (prevMoon.material) {
      this.nightTween.to(prevMoon.material, { emissiveIntensity: 0 }, 0);
    }
  }

  focusOnBody(bodyInput, customFraming) {
    if (bodyInput === 'sun') {
      this.exitNightMode();
      this.focusedTarget = {
        getPosition: () => new THREE.Vector3(0, 0, 0),
        offset: new THREE.Vector3(0, 28, 65),
        isSun: true
      };
      this.exploreTarget.set(0, 0, 0);
      return;
    }

    let targetObj = null;
    let isMoon = false;
    if (typeof bodyInput === 'string') {
      targetObj = this.moons[bodyInput] || this.planets[bodyInput];
      isMoon = !!this.moons[bodyInput];
    } else if (bodyInput && typeof bodyInput.getPosition === 'function') {
      targetObj = bodyInput;
      isMoon = !!(targetObj.mesh?.userData?.isMoon || targetObj.config?.parentPlanetId);
    } else if (bodyInput?.id) {
      targetObj = this.moons[bodyInput.id] || this.planets[bodyInput.id];
      isMoon = !!this.moons[bodyInput.id];
    }

    if (!targetObj) return;

    if (isMoon) {
      if (this.activeNightMoon !== targetObj) {
        this.enterNightMode(targetObj);
      }
    } else {
      this.exitNightMode();
    }

    this.focusedTarget = {
      targetObj,
      customFraming,
      getPosition: () => targetObj.getPosition()
    };
    this.exploreTarget.copy(targetObj.getPosition());
  }

  clearFocus() {
    this.focusedTarget = null;
    this.exitNightMode();
  }

  update(dt, time) {
    // 1. Central Sun Convection & Pulse
    this.sun.update(time, this.camera);

    // 2. Starfield Subtle Twinkle
    this.starfield.update(time);

    // 3. Update Planetary Keplerian Orbits
    Object.values(this.planets).forEach(planet => planet.update(dt));
    Object.values(this.moons).forEach(moon => moon.update(dt));

    // 4. Interactive Hover Raycast
    if (this.hasPointerMoved && this.pickingPointer.x !== -999) {
      this.raycaster.setFromCamera(this.pickingPointer, this.camera);
      const hits = this.raycaster.intersectObjects(this.clickableObjects);
      if (hits.length > 0) {
        const hit = hits[0].object;
        if (this.hoveredObject !== hit) {
          this.hoveredObject = hit;
          document.body.style.cursor = 'pointer';
        }
      } else {
        if (this.hoveredObject) {
          document.body.style.cursor = 'default';
          this.hoveredObject = null;
        }
      }
    }

    // 5. Camera Motion Logic (Guided vs Explore)
    if (this.mode === 'explore') {
      // Free bounded exploration
      this.updateExploreCameraPosition();
    } else {
      // Guided Tour
      if (this.focusedTarget) {
        if (this.focusedTarget.isSun) {
          this.targetCamPos.set(0, 28, 65);
          this.targetLookAt.set(0, 0, 0);
        } else {
          const framing = this.calculateComposedFraming(
            this.focusedTarget.targetObj,
            this.focusedTarget.customFraming
          );
          this.targetCamPos.copy(framing.cameraPos);
          this.targetLookAt.copy(framing.lookAt);
        }
      } else {
        // Spline-driven flight path scrubbed by ScrollTrigger
        const splinePoint = this.flightSpline.getPointAt(this.splineProgress);

        // Safe parallax offset: initialized to 0, clamped [-1, 1], 0 for coarse pointers
        const parallaxX = this.hasPointerMoved ? this.parallax.x * 12 : 0;
        const parallaxY = this.hasPointerMoved ? this.parallax.y * 8 : 0;
        this.targetCamPos.copy(splinePoint).add(
          this.tempVec.set(parallaxX, parallaxY, 0)
        );

        // Look slightly ahead on the spline
        const lookProgress = Math.min(1.0, this.splineProgress + 0.08);
        const splineLook = this.flightSpline.getPointAt(lookProgress);

        if (this.splineProgress < 0.12) {
          this.targetLookAt.set(0, -30, 0); // Focus slightly below celestial plane so Sun/planets sit in upper quadrant
        } else {
          this.targetLookAt.copy(splineLook);
        }
      }
    }

    // 6. Time-based Exponential Damping: 1 - exp(-lambda * dt) (Frame-rate independent)
    const dtClamped = Math.min(dt, 0.1);
    const camDamping = 1 - Math.exp(-4.5 * dtClamped);
    const lookDamping = 1 - Math.exp(-5.5 * dtClamped);

    this.currentCamPos.lerp(this.targetCamPos, camDamping);
    this.currentLookAt.lerp(this.targetLookAt, lookDamping);

    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);
  }

  dispose() {
    this.renderer.dispose();
    this.scene.clear();
  }
}
