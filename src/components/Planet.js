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
    color: new THREE.Vector3(0.12, 0.65, 0.82),       // Natural azure/marine horizon
    twilight: new THREE.Vector3(0.92, 0.45, 0.12),    // Golden sunset twilight
    power: 5.5,
    intensity: 0.65
  },
  csharp: {
    color: new THREE.Vector3(0.72, 0.48, 0.22),      // Amber Jovian upper haze
    twilight: new THREE.Vector3(0.95, 0.55, 0.15),    // Warm terracotta twilight
    power: 5.0,
    intensity: 0.55
  },
  rust: {
    color: new THREE.Vector3(0.85, 0.42, 0.15),      // Scorched terracotta dust
    twilight: new THREE.Vector3(0.25, 0.55, 0.88),    // Martian blue sunset
    power: 5.8,
    intensity: 0.48
  },
  typescript: {
    color: new THREE.Vector3(0.25, 0.75, 0.95),      // Cryogenic cyan mist
    twilight: new THREE.Vector3(0.35, 0.82, 1.0),     // Electric azure
    power: 5.2,
    intensity: 0.58
  },
  cpp: {
    color: new THREE.Vector3(0.88, 0.25, 0.12),      // Volcanic cinder haze
    twilight: new THREE.Vector3(1.0, 0.40, 0.08),     // Thermal flare
    power: 5.8,
    intensity: 0.50
  }
};

export function createPlanet(config) {
  const planetId = (config.id || config.name).toLowerCase();
  const group = new THREE.Group();
  group.name = `Planet_${config.name}`;

  // 1. Procedural Planet Core Mesh (100% GPU Custom Shader)
  const shaderDef = PLANET_SHADERS[planetId] || PythonPlanetShader;
  const geometry = new THREE.SphereGeometry(config.radius, 96, 96);
  
  const surfaceMaterial = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(shaderDef.uniforms),
    vertexShader: shaderDef.vertexShader,
    fragmentShader: shaderDef.fragmentShader
  });

  const surfaceMesh = new THREE.Mesh(geometry, surfaceMaterial);
  surfaceMesh.castShadow = false;
  surfaceMesh.receiveShadow = false;
  surfaceMesh.userData = {
    isPlanet: true,
    planetId: config.id,
    name: config.name,
    orbitRadius: config.orbitRadius,
    priority: config.priority
  };
  group.add(surfaceMesh);

  // 2. Directional Rayleigh Atmosphere Shell (Whisper-thin 2.2% hull)
  const atmoConfig = ATMOSPHERE_PALETTES[planetId] || ATMOSPHERE_PALETTES.python;
  const atmoGeo = new THREE.SphereGeometry(config.radius * 1.022, 64, 64);
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
      atmoUniforms.uAtmosphereIntensity.value = active ? atmoConfig.intensity * 2.0 : atmoConfig.intensity;
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

      // Update shader uniforms (convert time from milliseconds to seconds)
      const timeSec = time * 0.001;
      if (surfaceMaterial.uniforms.uTime) {
        surfaceMaterial.uniforms.uTime.value = timeSec;
      }
      if (surfaceMaterial.uniforms.uSunPosition) {
        surfaceMaterial.uniforms.uSunPosition.value.copy(sunPosition);
      }
      if (surfaceMaterial.uniforms.uPlanetPosition) {
        surfaceMaterial.uniforms.uPlanetPosition.value.copy(group.position);
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
