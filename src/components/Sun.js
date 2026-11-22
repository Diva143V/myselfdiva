/**
 * Sun.js — Solar Component with Photorealistic Granulation & Calibrated Corona
 */

import * as THREE from 'three';
import { SunShader } from '../shaders/sunShader.js';

export function createSun(radius = 36) {
  const group = new THREE.Group();

  // 1. Central Point Light for planetary illumination
  const sunLight = new THREE.PointLight(0xfff5e6, 3.2, 0, 0);
  sunLight.position.set(0, 0, 0);
  group.add(sunLight);

  // 2. Photosphere Mesh with Procedural Convective Granulation (Zero Black Spots)
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(SunShader.uniforms),
    vertexShader: SunShader.vertexShader,
    fragmentShader: SunShader.fragmentShader
  });

  const photosphere = new THREE.Mesh(geometry, material);
  group.add(photosphere);

  // 3. Multi-Stage Solar Corona (Inner K-Corona & Outer Magnetic Streamers)
  // Photosphere limb is at radius / (radius * 2.8) ~= 0.357 of the corona canvas
  const coronaCanvas = document.createElement('canvas');
  coronaCanvas.width = 512;
  coronaCanvas.height = 512;
  const cCtx = coronaCanvas.getContext('2d');
  
  const radGrad = cCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
  // Radiant incandescent solar glow envelope
  radGrad.addColorStop(0, 'rgba(255, 245, 210, 0.16)');       // Warm incandescent core glow
  radGrad.addColorStop(0.32, 'rgba(255, 220, 120, 0.28)');    // Chromospheric golden rim
  radGrad.addColorStop(0.385, 'rgba(255, 185, 45, 0.68)');    // Radiant limb corona ring
  radGrad.addColorStop(0.55, 'rgba(245, 135, 18, 0.32)');     // Intermediate corona flare
  radGrad.addColorStop(0.78, 'rgba(195, 70, 5, 0.08)');       // Soft magnetic streamers falloff
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  cCtx.fillStyle = radGrad;
  cCtx.fillRect(0, 0, 512, 512);

  // Paint magnetic filamentary rays radiating outwards beyond the limb
  cCtx.save();
  cCtx.translate(256, 256);
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const len = 135 + Math.sin(i * 3.7) * 75;
    const rayGrad = cCtx.createLinearGradient(0, 0, Math.cos(angle) * len, Math.sin(angle) * len);
    rayGrad.addColorStop(0, 'rgba(255, 210, 100, 0.14)');
    rayGrad.addColorStop(0.4, 'rgba(255, 160, 30, 0.10)');
    rayGrad.addColorStop(1, 'rgba(255, 90, 10, 0)');
    cCtx.strokeStyle = rayGrad;
    cCtx.lineWidth = 2 + (i % 3);
    cCtx.beginPath();
    cCtx.moveTo(Math.cos(angle) * 98, Math.sin(angle) * 98); // Start at solar limb
    cCtx.lineTo(Math.cos(angle) * (98 + len), Math.sin(angle) * (98 + len));
    cCtx.stroke();
  }
  cCtx.restore();

  const coronaTexture = new THREE.CanvasTexture(coronaCanvas);
  const coronaMat = new THREE.SpriteMaterial({
    map: coronaTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.45,
    depthWrite: false
  });

  const coronaSprite = new THREE.Sprite(coronaMat);
  coronaSprite.scale.set(radius * 2.6, radius * 2.6, 1);
  group.add(coronaSprite);

  // Anamorphic horizontal flare streak
  const streakCanvas = document.createElement('canvas');
  streakCanvas.width = 512;
  streakCanvas.height = 128;
  const sCtx = streakCanvas.getContext('2d');
  const streakGrad = sCtx.createRadialGradient(256, 64, 0, 256, 64, 256);
  streakGrad.addColorStop(0, 'rgba(255, 235, 190, 0.28)');
  streakGrad.addColorStop(0.20, 'rgba(245, 150, 15, 0.15)');
  streakGrad.addColorStop(0.75, 'rgba(0, 0, 0, 0)');
  sCtx.fillStyle = streakGrad;
  sCtx.fillRect(0, 0, 512, 128);

  const streakTexture = new THREE.CanvasTexture(streakCanvas);
  const streakMat = new THREE.SpriteMaterial({
    map: streakTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });
  const streakSprite = new THREE.Sprite(streakMat);
  streakSprite.scale.set(radius * 5.8, radius * 1.2, 1);
  group.add(streakSprite);

  return {
    group,
    light: sunLight,
    mesh: photosphere,
    coronaSprite,
    streakSprite,
    update(time, camera, hasFocusedTarget = false) {
      const timeSec = time * 0.001;
      material.uniforms.uTime.value = timeSec;

      // Proximity exposure governor:
      // When user is inspecting a planet/moon, shrink corona so it never blinds the view
      const targetScaleMult = hasFocusedTarget ? 1.6 : 2.8;
      const targetOpacity = hasFocusedTarget ? 0.18 : 0.55;

      const pulse = 1.0 + Math.sin(timeSec * 1.4) * 0.03;
      const curScale = radius * targetScaleMult * pulse;

      coronaSprite.scale.set(curScale, curScale, 1);
      coronaMat.opacity = THREE.MathUtils.lerp(coronaMat.opacity, targetOpacity, 0.08);
      streakMat.opacity = THREE.MathUtils.lerp(streakMat.opacity, hasFocusedTarget ? 0.08 : 0.32, 0.08);
    }
  };
}
