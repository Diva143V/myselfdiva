/**
 * Planet.js — Cinematic PBR Planetary World with Atmosphere & Clouds
 */

import * as THREE from 'three';
import { AtmosphereShader } from '../shaders/atmosphereShader.js';

export function createPlanet(config) {
  const group = new THREE.Group();
  group.name = 'Planet_' + config.name;

  // 1. Core Planetary Sphere (PBR Material)
  const segments = config.isGasGiant ? 64 : 48;
  const geometry = new THREE.SphereGeometry(config.radius, segments, segments);

  let material;
  if (config.materialProps.isVolcanic) {
    material = new THREE.MeshStandardMaterial({
      map: config.textures.colorMap,
      emissiveMap: config.textures.emissiveMap,
      emissive: new THREE.Color(0xff4400),
      emissiveIntensity: 2.5,
      roughness: 0.9,
      metalness: 0.15
    });
  } else {
    material = new THREE.MeshStandardMaterial({
      map: config.textures.colorMap,
      normalMap: config.textures.normalMap || null,
      normalScale: new THREE.Vector2(1.2, 1.2),
      roughnessMap: config.textures.roughnessMap || null,
      roughness: config.roughness !== undefined ? config.roughness : 0.65,
      metalness: config.metalness !== undefined ? config.metalness : 0.1
    });
  }

  const surfaceMesh = new THREE.Mesh(geometry, material);
  surfaceMesh.castShadow = true;
  surfaceMesh.receiveShadow = true;
  group.add(surfaceMesh);

  // 2. Clouds Shell (For Ocean World and Gas Giant)
  let cloudMesh = null;
  if (config.hasClouds && config.textures.cloudMap) {
    const cloudGeo = new THREE.SphereGeometry(config.radius * 1.018, segments, segments);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: config.textures.cloudMap,
      transparent: true,
      opacity: 0.88,
      blending: THREE.NormalBlending,
      roughness: 0.9,
      depthWrite: false
    });
    cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    group.add(cloudMesh);
  }

  // 3. Atmosphere Fresnel Rim-Glow Shell (Back-Face)
  const atmoGeo = new THREE.SphereGeometry(config.radius * 1.045, 48, 48);
  const atmoMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: config.atmosphereColor || [0.2, 0.7, 1.0] },
      uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
      uAtmospherePower: { value: 3.2 },
      uAtmosphereIntensity: { value: 1.4 }
    },
    vertexShader: AtmosphereShader.vertexShader,
    fragmentShader: AtmosphereShader.fragmentShader,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });
  const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
  group.add(atmoMesh);

  // 4. Planetary Rings (For TypeScript Icy World)
  let ringMesh = null;
  if (config.hasRings && config.textures.ringMap) {
    const ringGeo = new THREE.RingGeometry(config.radius * 1.45, config.radius * 2.5, 64);
    // Align ring with planetary equatorial plane
    ringGeo.rotateX(Math.PI * 0.5);

    const ringMat = new THREE.MeshStandardMaterial({
      map: config.textures.ringMap,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.82,
      roughness: 0.4,
      metalness: 0.1,
      depthWrite: false
    });
    ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.z = 0.22; // Ring tilt
    group.add(ringMesh);
  }

  // 5. Orbit Path Line (Subtle 3D ring with depth)
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
    opacity: 0.14,
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
    highlight(active) {
      orbitMat.color.set(active ? 0xf59e0b : 0x94a3b8);
      orbitMat.opacity = active ? 0.6 : 0.14;
    },
    update(dt) {
      // Keplerian orbit motion
      currentAngle += orbitSpeed * dt;
      const x = Math.cos(currentAngle) * orbitRadius;
      const y = Math.sin(currentAngle) * orbitRadius * (config.inclination || 0.05);
      const z = Math.sin(currentAngle) * orbitRadius;

      group.position.set(x, y, z);

      // Axial planetary rotation
      surfaceMesh.rotation.y += rotationSpeed * dt;

      // Differential cloud drift
      if (cloudMesh) {
        cloudMesh.rotation.y += (rotationSpeed * 1.35) * dt;
      }
    },
    getPosition() {
      return group.position;
    }
  };
}
