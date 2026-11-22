/**
 * Planet.js — Cinematic Sci-Fi Procedural Planetary Worlds (100% GPU Shaders)
 */

import * as THREE from 'three';
import { AtmosphereShader } from '../shaders/atmosphereShader.js';
import { RingShader } from '../shaders/ringShader.js';
import {
  PythonPlanetShader,
  CSharpPlanetShader,
  RustPlanetShader,
  TypeScriptPlanetShader,
  CppPlanetShader
} from '../shaders/planetShaders.js';

// Map of planet IDs to their custom procedural GPU shaders
const PLANET_SHADERS = {
  python: PythonPlanetShader,
  csharp: CSharpPlanetShader,
  rust: RustPlanetShader,
  typescript: TypeScriptPlanetShader,
  cpp: CppPlanetShader
};

// Atmospheric twilight palettes per world
const ATMOSPHERE_PALETTES = {
  python: {
    color: new THREE.Vector3(0.0, 0.90, 0.60),       // Emerald horizon
    twilight: new THREE.Vector3(0.20, 1.0, 0.45),    // Bioluminescent green twilight
    power: 3.6,
    intensity: 1.8
  },
  csharp: {
    color: new THREE.Vector3(0.66, 0.33, 0.97),      // Electric Amethyst haze
    twilight: new THREE.Vector3(0.85, 0.45, 1.0),    // Royal violet twilight
    power: 3.2,
    intensity: 1.8
  },
  rust: {
    color: new THREE.Vector3(0.98, 0.45, 0.09),      // Scorched copper dust
    twilight: new THREE.Vector3(1.0, 0.25, 0.05),    // Volcanic crimson
    power: 4.0,
    intensity: 1.7
  },
  typescript: {
    color: new THREE.Vector3(0.0, 0.94, 1.0),        // Cryogenic cyan
    twilight: new THREE.Vector3(0.15, 0.75, 1.0),    // Electric azure
    power: 3.4,
    intensity: 1.8
  },
  cpp: {
    color: new THREE.Vector3(0.94, 0.25, 0.25),      // Incandescent crimson
    twilight: new THREE.Vector3(1.0, 0.45, 0.15),    // Thermal flare
    power: 4.2,
    intensity: 2.0
  }
};

export function createPlanet(config) {
  const group = new THREE.Group();
  group.name = 'Planet_' + config.name;

  const planetId = (config.id || config.name).toLowerCase();
  const shaderDef = PLANET_SHADERS[planetId] || PythonPlanetShader;

  // 1. Core Planetary Sphere with Custom GPU Shader
  const segments = config.isGasGiant ? 72 : 56;
  const geometry = new THREE.SphereGeometry(config.radius, segments, segments);

  const surfaceUniforms = THREE.UniformsUtils.clone(shaderDef.uniforms);
  if (config.hasRings) {
    surfaceUniforms.uRingInnerRadius = { value: config.radius * 1.45 };
    surfaceUniforms.uRingOuterRadius = { value: config.radius * 2.5 };
  }

  const surfaceMaterial = new THREE.ShaderMaterial({
    uniforms: surfaceUniforms,
    vertexShader: shaderDef.vertexShader,
    fragmentShader: shaderDef.fragmentShader
  });

  const surfaceMesh = new THREE.Mesh(geometry, surfaceMaterial);
  surfaceMesh.castShadow = true;
  surfaceMesh.receiveShadow = true;
  surfaceMesh.userData = {
    isPlanet: true,
    planetId: planetId,
    config: config
  };
  group.add(surfaceMesh);

  // 2. Directional Rayleigh Atmosphere Shell (Back-Face)
  const atmoConfig = ATMOSPHERE_PALETTES[planetId] || ATMOSPHERE_PALETTES.python;
  const atmoGeo = new THREE.SphereGeometry(config.radius * 1.038, 48, 48);
  const atmoUniforms = THREE.UniformsUtils.clone(AtmosphereShader.uniforms);
  atmoUniforms.uColor.value.copy(atmoConfig.color);
  atmoUniforms.uTwilightColor.value.copy(atmoConfig.twilight);
  atmoUniforms.uAtmospherePower.value = atmoConfig.power;
  atmoUniforms.uAtmosphereIntensity.value = atmoConfig.intensity;

  const atmoMat = new THREE.ShaderMaterial({
    uniforms: atmoUniforms,
    vertexShader: AtmosphereShader.vertexShader,
    fragmentShader: AtmosphereShader.fragmentShader,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });
  const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
  group.add(atmoMesh);

  // 3. Planetary Rings (For TypeScript Icy World) with Planet Shadow Casting
  let ringMesh = null;
  let ringMaterial = null;
  if (config.hasRings) {
    const innerR = config.radius * 1.45;
    const outerR = config.radius * 2.5;
    const ringGeo = new THREE.RingGeometry(innerR, outerR, 96);
    ringGeo.rotateX(Math.PI * 0.5); // Align with equatorial plane

    const ringUniforms = THREE.UniformsUtils.clone(RingShader.uniforms);
    ringUniforms.uPlanetRadius.value = config.radius;
    ringUniforms.uInnerRadius.value = innerR;
    ringUniforms.uOuterRadius.value = outerR;

    ringMaterial = new THREE.ShaderMaterial({
      uniforms: ringUniforms,
      vertexShader: RingShader.vertexShader,
      fragmentShader: RingShader.fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false
    });

    ringMesh = new THREE.Mesh(ringGeo, ringMaterial);
    ringMesh.rotation.z = 0.22; // Axial tilt
    group.add(ringMesh);
  }

  // 4. Orbit Path Line (3D fading circle with depth)
  const orbitPoints = [];
  const orbitSegments = 128;
  for (let i = 0; i <= orbitSegments; i++) {
    const theta = (i / orbitSegments) * Math.PI * 2;
    orbitPoints.push(new THREE.Vector3(
      Math.cos(theta) * config.orbitRadius,
      Math.sin(theta) * config.orbitRadius * (config.inclination || 0.05),
      Math.sin(theta) * config.orbitRadius
    ));
  }
  const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
  const orbitMat = new THREE.LineBasicMaterial({
    color: 0x94a3b8,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });
  const orbitLine = new THREE.Line(orbitGeo, orbitMat);
  orbitLine.matrixAutoUpdate = false;
  orbitLine.updateMatrix();

  // Internal state
  let currentAngle = config.initialAngle || 0;
  const orbitRadius = config.orbitRadius;
  const orbitSpeed = config.orbitSpeed;
  const rotationSpeed = config.rotationSpeed || 0.004;

  return {
    group,
    orbitLine,
    config,
    mesh: surfaceMesh,
    atmoMesh,
    ringMesh,
    surfaceMaterial,
    highlight(active) {
      orbitMat.color.set(active ? (config.color || 0xf59e0b) : 0x94a3b8);
      orbitMat.opacity = active ? 0.85 : 0.18;
      atmoUniforms.uAtmosphereIntensity.value = active ? atmoConfig.intensity * 2.2 : atmoConfig.intensity;
    },
    update(dt, time = 0, sunPosition = new THREE.Vector3(0, 0, 0)) {
      // Keplerian orbit motion
      currentAngle += orbitSpeed * dt;
      const x = Math.cos(currentAngle) * orbitRadius;
      const y = Math.sin(currentAngle) * orbitRadius * (config.inclination || 0.05);
      const z = Math.sin(currentAngle) * orbitRadius;

      group.position.set(x, y, z);

      // Axial planetary rotation
      surfaceMesh.rotation.y += rotationSpeed * dt;

      // Update shader uniforms
      if (surfaceMaterial.uniforms.uTime) {
        surfaceMaterial.uniforms.uTime.value = time;
      }
      if (surfaceMaterial.uniforms.uSunPosition) {
        surfaceMaterial.uniforms.uSunPosition.value.copy(sunPosition);
      }

      // Update atmosphere uniforms
      atmoUniforms.uSunPosition.value.copy(sunPosition);

      // Update ring uniforms
      if (ringMaterial) {
        ringMaterial.uniforms.uSunPosition.value.copy(sunPosition);
        ringMaterial.uniforms.uPlanetPosition.value.copy(group.position);
      }
    },
    getPosition() {
      return group.position;
    }
  };
}
