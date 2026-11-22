/**
 * Moon.js — Photorealistic Celestial Moons with Procedural Crater Shaders,
 * Host Planetshine, and Discrete Ground Station Telemetry Outposts.
 */

import * as THREE from 'three';
import { MoonShader } from '../shaders/moonShader.js';

// Stack color palette mapping for beacons & ground stations
const STACK_BEACON_COLORS = {
  python: 0x00e599,     // Electric Emerald (Griffin, SyGriffin, Sita)
  csharp: 0xa855f7,     // Vivid Amethyst (LiveSubs)
  'c#': 0xa855f7,
  'c# / .net': 0xa855f7,
  rust: 0xf97316,       // Scorched Orange (Knox)
  typescript: 0x00f0ff, // Cryogenic Cyan (myselfdiva)
  cpp: 0xef4444,        // Incandescent Vermilion (Polaris, HackMe)
  'c++': 0xef4444
};

const TERRAIN_TYPE_MAP = {
  anorthosite: 0,
  europa_ice: 1,
  volcanic_iron: 2,
  regolith_crater: 3
};

export function createMoon(config, parentPlanet) {
  const group = new THREE.Group();
  group.name = 'Moon_' + config.id;

  const radius = config.radius || 1.6;
  const parentStack = (parentPlanet.config.id || parentPlanet.config.name || 'python').toLowerCase();
  const beaconHex = STACK_BEACON_COLORS[parentStack] || 0xf59e0b;
  const parentPlanetColor = parentPlanet.config.color || 0x94a3b8;

  // 1. High-Density Spherical Geometry for Procedural Crater Shader
  // 64x48 segments provide silky smooth spherical silhouette at 60fps
  const geometry = new THREE.SphereGeometry(radius, 64, 48);

  // 2. Clone Uniforms and Configure Procedural Lunar Shader
  const uniforms = THREE.UniformsUtils.clone(MoonShader.uniforms);
  uniforms.uBeaconColor.value.set(beaconHex);
  uniforms.uPlanetColor.value.set(parentPlanetColor);

  const terrainIndex = TERRAIN_TYPE_MAP[config.terrainType] !== undefined
    ? TERRAIN_TYPE_MAP[config.terrainType]
    : (parentStack === 'csharp' ? 0 : (parentStack === 'rust' ? 2 : (parentStack === 'typescript' ? 1 : 0)));
  uniforms.uTerrainType.value = terrainIndex;

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: MoonShader.vertexShader,
    fragmentShader: MoonShader.fragmentShader
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = {
    isMoon: true,
    moonId: config.id,
    config: config
  };
  group.add(mesh);

  // 3. Discrete Surface Research Station Outpost Fixture
  // Localized physical telemetry array placed at the outpost coordinates
  const outpostDir = new THREE.Vector3(0.52, 0.38, 0.76).normalize();
  const stationGroup = new THREE.Group();
  stationGroup.position.copy(outpostDir.clone().multiplyScalar(radius * 0.99));
  stationGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), outpostDir);

  const mastGeo = new THREE.CylinderGeometry(radius * 0.015, radius * 0.025, radius * 0.14, 6);
  const mastMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
  const mastMesh = new THREE.Mesh(mastGeo, mastMat);
  mastMesh.position.y = radius * 0.07;
  stationGroup.add(mastMesh);

  const dishGeo = new THREE.ConeGeometry(radius * 0.06, radius * 0.035, 8, 1, true);
  const dishMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0, side: THREE.DoubleSide });
  const dishMesh = new THREE.Mesh(dishGeo, dishMat);
  dishMesh.position.y = radius * 0.14;
  dishMesh.rotation.x = Math.PI;
  stationGroup.add(dishMesh);

  const beaconGeo = new THREE.SphereGeometry(radius * 0.038, 8, 8);
  const beaconMat = new THREE.MeshBasicMaterial({ color: beaconHex });
  const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
  beaconMesh.position.y = radius * 0.17;
  stationGroup.add(beaconMesh);

  group.add(stationGroup);

  // 4. Luminous Orbit Ribbon around parent planet
  const trailSegments = 84;
  const trailPoints = [];
  const trailColors = [];
  const baseColor = new THREE.Color(beaconHex);
  const dimColor = new THREE.Color(0x334155);

  for (let i = 0; i <= trailSegments; i++) {
    const theta = (i / trailSegments) * Math.PI * 2;
    trailPoints.push(new THREE.Vector3(
      Math.cos(theta) * config.orbitRadius,
      Math.sin(theta) * config.orbitRadius * (config.inclination || 0.1),
      Math.sin(theta) * config.orbitRadius
    ));

    const c = dimColor.clone().lerp(baseColor, Math.sin(theta * 2.0) * 0.3 + 0.3);
    trailColors.push(c.r, c.g, c.b);
  }

  const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
  trailGeo.setAttribute('color', new THREE.Float32BufferAttribute(trailColors, 3));

  const trailMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: config.isMajor ? 0.55 : 0.25,
    depthWrite: false
  });
  const trailLine = new THREE.Line(trailGeo, trailMat);

  let currentAngle = config.initialAngle || Math.random() * Math.PI * 2;
  const orbitRadius = config.orbitRadius;
  const orbitSpeed = config.orbitSpeed;

  return {
    group,
    mesh,
    material,
    stationGroup,
    trailLine,
    config,
    parentPlanet,
    highlight(active) {
      trailMat.opacity = active ? 0.95 : (config.isMajor ? 0.55 : 0.25);
      material.uniforms.uHighlight.value = active ? 1.0 : 0.0;
    },
    update(dt, time = 0, sunPosition = new THREE.Vector3(0, 0, 0)) {
      currentAngle += orbitSpeed * dt;

      // Axial planetary rotation & slight precession
      mesh.rotation.y += 0.45 * dt;
      mesh.rotation.x = Math.sin(time * 0.4) * 0.08;

      // Pulse the physical outpost beacon
      const pulse = 1.0 + Math.sin(time * 3.8) * 0.28;
      beaconMesh.scale.setScalar(pulse);

      // Local coordinate relative to parent planet
      const localX = Math.cos(currentAngle) * orbitRadius;
      const localY = Math.sin(currentAngle) * orbitRadius * (config.inclination || 0.1);
      const localZ = Math.sin(currentAngle) * orbitRadius;

      group.position.set(localX, localY, localZ);

      // Update shader uniforms
      material.uniforms.uTime.value = time;
      material.uniforms.uSunPosition.value.copy(sunPosition);

      const parentPos = parentPlanet.getPosition ? parentPlanet.getPosition() : parentPlanet.group.position;
      material.uniforms.uPlanetPosition.value.copy(parentPos);
    },
    getPosition() {
      const worldPos = new THREE.Vector3();
      group.getWorldPosition(worldPos);
      return worldPos;
    }
  };
}
