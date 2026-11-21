/**
 * Sun.js — Central Star with Convective Shader, Physical Light & Corona
 */

import * as THREE from 'three';
import { SunShader } from '../shaders/sunShader.js';

export function createSun(radius = 24) {
  const group = new THREE.Group();
  group.name = 'Sun';

  // 1. Physically Motivated Central PointLight
  // Soft falloff across the entire solar system
  const sunLight = new THREE.PointLight(0xfffaed, 2.8, 1800, 1.2);
  sunLight.position.set(0, 0, 0);
  group.add(sunLight);

  // 2. Convective Granulation Photosphere Sphere
  const geometry = new THREE.SphereGeometry(radius, 64, 48);
  const material = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(SunShader.uniforms),
    vertexShader: SunShader.vertexShader,
    fragmentShader: SunShader.fragmentShader
  });

  const photosphere = new THREE.Mesh(geometry, material);
  group.add(photosphere);

  // 3. Multi-Layer Additive Corona Billboards
  const coronaCanvas = document.createElement('canvas');
  coronaCanvas.width = 512;
  coronaCanvas.height = 512;
  const cCtx = coronaCanvas.getContext('2d');
  
  const radGrad = cCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
  radGrad.addColorStop(0, 'rgba(255, 250, 230, 0.95)');
  radGrad.addColorStop(0.18, 'rgba(245, 158, 11, 0.7)');
  radGrad.addColorStop(0.45, 'rgba(217, 119, 6, 0.28)');
  radGrad.addColorStop(0.75, 'rgba(180, 83, 9, 0.08)');
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  cCtx.fillStyle = radGrad;
  cCtx.fillRect(0, 0, 512, 512);

  const coronaTexture = new THREE.CanvasTexture(coronaCanvas);
  const coronaMat = new THREE.SpriteMaterial({
    map: coronaTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.85,
    depthWrite: false
  });

  const coronaSprite = new THREE.Sprite(coronaMat);
  coronaSprite.scale.set(radius * 4.6, radius * 4.6, 1);
  group.add(coronaSprite);

  // Anamorphic horizontal flare streak
  const streakCanvas = document.createElement('canvas');
  streakCanvas.width = 512;
  streakCanvas.height = 128;
  const sCtx = streakCanvas.getContext('2d');
  const streakGrad = sCtx.createRadialGradient(256, 64, 0, 256, 64, 256);
  streakGrad.addColorStop(0, 'rgba(255, 240, 200, 0.65)');
  streakGrad.addColorStop(0.2, 'rgba(245, 158, 11, 0.35)');
  streakGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
  sCtx.fillStyle = streakGrad;
  sCtx.fillRect(0, 0, 512, 128);

  const streakTexture = new THREE.CanvasTexture(streakCanvas);
  const streakMat = new THREE.SpriteMaterial({
    map: streakTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.45,
    depthWrite: false
  });
  const streakSprite = new THREE.Sprite(streakMat);
  streakSprite.scale.set(radius * 9.0, radius * 1.8, 1);
  group.add(streakSprite);

  return {
    group,
    light: sunLight,
    mesh: photosphere,
    update(time, camera) {
      material.uniforms.uTime.value = time;
      // Gentle breathing pulse
      const pulse = 1.0 + Math.sin(time * 1.4) * 0.035;
      coronaSprite.scale.set(radius * 4.6 * pulse, radius * 4.6 * pulse, 1);
    }
  };
}
