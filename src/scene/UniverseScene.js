/**
 * UniverseScene.js — Three.js Scene Graph, Celestial Bodies & Camera Orchestration
 */

import * as THREE from 'three';
import { createStarfield } from '../components/Starfield.js';
import { createSun } from '../components/Sun.js';
import { createPlanet } from '../components/Planet.js';
import { createMoon } from '../components/Moon.js';
import {
  createPythonPlanetTextures,
  createCloudTexture,
  createCSharpGasGiantTextures,
  createRustPlanetTextures,
  createTypeScriptPlanetTextures,
  createCppPlanetTextures
} from '../procedural/planetTextures.js';

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

    // 1. Scene & Camera Setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x06080d, 0.00045);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.5, 3500);
    this.camera.position.set(0, 180, 420); // Initial deep-space overview

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

    // 3. Subtle Cosmic Ambient Fill
    const ambientLight = new THREE.AmbientLight(0x090d18, 0.35);
    this.scene.add(ambientLight);

    // 4. Starfield & Deep Space Nebulae
    this.starfield = createStarfield(this.isMobile ? 1800 : 3400);
    this.scene.add(this.starfield.group);

    // 5. Central Sun (Diwakar)
    this.sun = createSun(22);
    this.scene.add(this.sun.group);

    // 6. Planetary Systems & Moons
    this.planets = {};
    this.moons = {};
    this.clickableObjects = [];
    this.setupPlanetsAndMoons();

    // 7. Raycaster for Interactive Hover & Selection
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.hoveredObject = null;
    this.focusedTarget = null; // When camera focuses on a body

    // 8. Camera Flight Spline (Cinematic Scroll Path)
    this.flightSpline = this.createFlightSpline();
    this.splineProgress = 0; // 0 to 1 scrubbed by ScrollTrigger

    // Camera target vectors (reused to prevent GC)
    this.currentCamPos = new THREE.Vector3().copy(this.camera.position);
    this.targetCamPos = new THREE.Vector3().copy(this.camera.position);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.tempVec = new THREE.Vector3();

    // Staged Ignition Sequence
    this.ignitionProgress = 0.0;
    this.isIgnited = false;

    this.bindEvents();
  }

  setupPlanetsAndMoons() {
    // Texture generators (procedural PBR sets)
    const pythonTex = createPythonPlanetTextures(1024, 512);
    const pythonCloudTex = createCloudTexture(1024, 512);
    const csharpTex = createCSharpGasGiantTextures(1024, 512);
    const rustTex = createRustPlanetTextures(1024, 512);
    const typeScriptTex = createTypeScriptPlanetTextures(1024, 512);
    const cppTex = createCppPlanetTextures(1024, 512);

    // --- PLANET 1: PYTHON (Ocean World) ---
    const python = createPlanet({
      name: 'Python',
      id: 'python',
      orbitIndex: 1,
      radius: 9.5,
      orbitRadius: 95,
      orbitSpeed: 0.0035,
      initialAngle: 0.6,
      inclination: 0.04,
      rotationSpeed: 0.004,
      hasClouds: true,
      atmosphereColor: [0.22, 0.74, 0.97],
      textures: {
        colorMap: pythonTex.colorMap,
        normalMap: pythonTex.normalMap,
        roughnessMap: pythonTex.roughnessMap,
        cloudMap: pythonCloudTex
      },
      materialProps: {}
    });
    this.planets.python = python;
    this.scene.add(python.group);
    this.scene.add(python.orbitLine);
    this.clickableObjects.push(python.mesh);

    // Moons of Python: Griffin Bio, SyGriffin, Polaris, Sita
    this.addMoon({
      id: 'griffin',
      name: 'Griffin Bio',
      parentPlanet: python,
      isMajor: true,
      caseNumber: '02',
      radius: 2.1,
      orbitRadius: 22,
      orbitSpeed: 0.012,
      initialAngle: 0.8,
      inclination: 0.12
    });

    this.addMoon({
      id: 'sygriffin',
      name: 'SyGriffin',
      parentPlanet: python,
      isMajor: true,
      caseNumber: '04',
      radius: 1.8,
      orbitRadius: 32,
      orbitSpeed: 0.008,
      initialAngle: 2.6,
      inclination: -0.15
    });

    this.addMoon({
      id: 'polaris',
      name: 'Polaris (Kg-Library-API)',
      parentPlanet: python,
      isMajor: false,
      radius: 1.3,
      orbitRadius: 42,
      orbitSpeed: 0.0055,
      initialAngle: 4.1,
      inclination: 0.08
    });

    this.addMoon({
      id: 'sita',
      name: 'Sita',
      parentPlanet: python,
      isMajor: false,
      radius: 1.2,
      orbitRadius: 50,
      orbitSpeed: 0.0042,
      initialAngle: 5.4,
      inclination: -0.09
    });

    // --- PLANET 2: C# / .NET (Banded Gas Giant) ---
    const csharp = createPlanet({
      name: 'C# / .NET',
      id: 'csharp',
      orbitIndex: 2,
      radius: 14.5,
      orbitRadius: 180,
      orbitSpeed: 0.0022,
      initialAngle: 2.3,
      inclination: -0.06,
      rotationSpeed: 0.007,
      isGasGiant: true,
      atmosphereColor: [0.96, 0.62, 0.04],
      textures: {
        colorMap: csharpTex.colorMap
      },
      materialProps: { roughness: 0.55 }
    });
    this.planets.csharp = csharp;
    this.scene.add(csharp.group);
    this.scene.add(csharp.orbitLine);
    this.clickableObjects.push(csharp.mesh);

    // Moon of C#: LiveSubs
    this.addMoon({
      id: 'livesubs',
      name: 'LiveSubs',
      parentPlanet: csharp,
      isMajor: true,
      caseNumber: '01',
      radius: 2.3,
      orbitRadius: 28,
      orbitSpeed: 0.011,
      initialAngle: 1.2,
      inclination: 0.18
    });

    // --- PLANET 3: RUST (Rusted Desert World) ---
    const rust = createPlanet({
      name: 'Rust',
      id: 'rust',
      orbitIndex: 3,
      radius: 8.8,
      orbitRadius: 265,
      orbitSpeed: 0.0016,
      initialAngle: 4.2,
      inclination: 0.08,
      rotationSpeed: 0.0035,
      atmosphereColor: [0.98, 0.45, 0.15],
      textures: {
        colorMap: rustTex.colorMap,
        normalMap: rustTex.normalMap
      },
      materialProps: { roughness: 0.88, metalness: 0.22 }
    });
    this.planets.rust = rust;
    this.scene.add(rust.group);
    this.scene.add(rust.orbitLine);
    this.clickableObjects.push(rust.mesh);

    // Moon of Rust: Knox
    this.addMoon({
      id: 'knox',
      name: 'Knox',
      parentPlanet: rust,
      isMajor: true,
      caseNumber: '03',
      radius: 2.2,
      orbitRadius: 25,
      orbitSpeed: 0.013,
      initialAngle: 3.1,
      inclination: -0.14
    });

    // --- PLANET 4: TYPESCRIPT (Icy Blue Ringed World) ---
    const typeScript = createPlanet({
      name: 'TypeScript',
      id: 'typescript',
      orbitIndex: 4,
      radius: 9.2,
      orbitRadius: 350,
      orbitSpeed: 0.0012,
      initialAngle: 5.1,
      inclination: -0.05,
      rotationSpeed: 0.004,
      hasRings: true,
      atmosphereColor: [0.55, 0.75, 1.0],
      textures: {
        colorMap: typeScriptTex.colorMap,
        normalMap: typeScriptTex.normalMap,
        ringMap: typeScriptTex.ringMap
      },
      materialProps: { roughness: 0.32, metalness: 0.08 }
    });
    this.planets.typescript = typeScript;
    this.scene.add(typeScript.group);
    this.scene.add(typeScript.orbitLine);
    this.clickableObjects.push(typeScript.mesh);

    // Moon of TypeScript: myselfdiva
    this.addMoon({
      id: 'myselfdiva',
      name: 'myselfdiva',
      parentPlanet: typeScript,
      isMajor: false,
      radius: 1.4,
      orbitRadius: 24,
      orbitSpeed: 0.014,
      initialAngle: 2.1,
      inclination: 0.1
    });

    // --- PLANET 5: C++ (Volcanic Molten Lava World) ---
    const cpp = createPlanet({
      name: 'C++',
      id: 'cpp',
      orbitIndex: 5,
      radius: 8.5,
      orbitRadius: 435,
      orbitSpeed: 0.0009,
      initialAngle: 1.5,
      inclination: 0.07,
      rotationSpeed: 0.003,
      atmosphereColor: [0.92, 0.35, 0.08],
      textures: {
        colorMap: cppTex.colorMap,
        emissiveMap: cppTex.emissiveMap
      },
      materialProps: { isVolcanic: true }
    });
    this.planets.cpp = cpp;
    this.scene.add(cpp.group);
    this.scene.add(cpp.orbitLine);
    this.clickableObjects.push(cpp.mesh);

    // Moon of C++: HackMe 2024
    this.addMoon({
      id: 'hackme',
      name: 'HackMe 2024',
      parentPlanet: cpp,
      isMajor: false,
      radius: 1.3,
      orbitRadius: 22,
      orbitSpeed: 0.016,
      initialAngle: 0.4,
      inclination: -0.12
    });
  }

  addMoon(config) {
    const moon = createMoon(config, config.parentPlanet);
    this.moons[config.id] = moon;
    this.scene.add(moon.group);
    this.scene.add(moon.trailLine);
    this.clickableObjects.push(moon.mesh);
  }

  createFlightSpline() {
    // 3D Camera spline trajectory weaving through the planetary system
    const waypoints = [
      new THREE.Vector3(0, 180, 420),      // Step 0: Hero high vantage point
      new THREE.Vector3(45, 65, 175),      // Step 1: Descending towards Orbit 1 (Python / Griffin)
      new THREE.Vector3(120, 45, 120),     // Step 2: Gliding along Orbit 2 (C# / LiveSubs)
      new THREE.Vector3(160, 50, -80),     // Step 3: Banking past Orbit 3 (Rust / Knox)
      new THREE.Vector3(-120, 75, -220),   // Step 4: Outer approach across TypeScript & C++
      new THREE.Vector3(0, 240, 560)       // Step 5: Calm sections wide-angle overview
    ];

    return new THREE.CatmullRomCurve3(waypoints, false, 'centripetal', 0.5);
  }

  bindEvents() {
    // Throttled mouse move for raycasting & subtle camera tilt
    let lastMove = 0;
    window.addEventListener('pointermove', (e) => {
      const now = performance.now();
      if (now - lastMove < 16) return;
      lastMove = now;

      this.mouse.x = (e.clientX / this.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.height) * 2 + 1;
    }, { passive: true });

    // Pointer click for raycast selection
    window.addEventListener('click', (e) => {
      // Ignore clicks on UI cards or buttons
      if (e.target.closest('button, a, dialog, input, .ui-panel')) return;

      this.raycaster.setFromCamera(this.mouse, this.camera);
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

    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  focusOnBody(bodyId) {
    let targetObj = this.moons[bodyId] || this.planets[bodyId];
    if (bodyId === 'sun') {
      this.focusedTarget = {
        getPosition: () => new THREE.Vector3(0, 0, 0),
        offset: new THREE.Vector3(0, 28, 65)
      };
      return;
    }

    if (!targetObj) return;

    const offsetDist = targetObj.config.radius * 3.8 + 14;
    this.focusedTarget = {
      targetObj,
      getPosition: () => targetObj.getPosition(),
      offset: new THREE.Vector3(offsetDist * 0.7, offsetDist * 0.45, offsetDist)
    };

    if (targetObj.highlight) {
      targetObj.highlight(true);
    }
  }

  clearFocus() {
    if (this.focusedTarget && this.focusedTarget.targetObj && this.focusedTarget.targetObj.highlight) {
      this.focusedTarget.targetObj.highlight(false);
    }
    this.focusedTarget = null;
  }

  setFlightProgress(progress) {
    this.splineProgress = Math.max(0, Math.min(1, progress));
  }

  setQualityScale(scale) {
    this.renderer.setPixelRatio(this.dpr * scale);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = window.innerWidth < 768;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  update(dt, timestamp) {
    // 1. Advance Celestial Orbits
    Object.values(this.planets).forEach(p => p.update(dt));
    Object.values(this.moons).forEach(m => m.update(dt));

    // 2. Sun Convection Granulation
    this.sun.update(timestamp * 0.001, this.camera);
    this.starfield.update(timestamp * 0.001);

    // 3. Raycast Hover Feedback
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.clickableObjects);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (this.hoveredObject !== hit) {
        if (this.hoveredObject && this.hoveredObject.userData.highlightFn) {
          this.hoveredObject.userData.highlightFn(false);
        }
        this.hoveredObject = hit;
        document.body.style.cursor = 'pointer';
      }
    } else {
      if (this.hoveredObject) {
        document.body.style.cursor = 'default';
        this.hoveredObject = null;
      }
    }

    // 4. Camera Position Interpolation
    if (this.focusedTarget) {
      // Zoomed in on a focused planet or moon
      const bodyPos = this.focusedTarget.getPosition();
      this.targetCamPos.copy(bodyPos).add(this.focusedTarget.offset);
      this.targetLookAt.copy(bodyPos);

      this.currentCamPos.lerp(this.targetCamPos, 0.06);
      this.currentLookAt.lerp(this.targetLookAt, 0.07);
    } else {
      // Camera flying along spline scrubbed by ScrollTrigger
      const splinePoint = this.flightSpline.getPointAt(this.splineProgress);
      // Subtle mouse parallax tilt
      this.targetCamPos.copy(splinePoint).add(
        this.tempVec.set(this.mouse.x * 12, this.mouse.y * 8, 0)
      );

      // Look slightly ahead on the spline
      const lookProgress = Math.min(1.0, this.splineProgress + 0.08);
      const splineLook = this.flightSpline.getPointAt(lookProgress);
      // When at the start, look directly at the Sun
      if (this.splineProgress < 0.15) {
        this.targetLookAt.set(0, 0, 0);
      } else {
        this.targetLookAt.copy(splineLook);
      }

      this.currentCamPos.lerp(this.targetCamPos, 0.08);
      this.currentLookAt.lerp(this.targetLookAt, 0.08);
    }

    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);
  }

  dispose() {
    this.renderer.dispose();
    this.scene.clear();
  }
}
