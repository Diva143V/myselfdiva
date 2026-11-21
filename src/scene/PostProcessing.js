/**
 * PostProcessing.js — Cinematic Post-Processing Pipeline (pmndrs/postprocessing)
 * 
 * Merged into a single pass:
 * - Selective HDR Bloom (luminance threshold catches Sun core, corona, and lava veins)
 * - SMAA edge antialiasing
 * - Subtle peripheral chromatic aberration
 * - Light cinematic vignette
 */

import * as THREE from 'three';
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  VignetteEffect,
  ChromaticAberrationEffect,
  SMAAEffect
} from 'postprocessing';

export function setupPostProcessing(renderer, scene, camera) {
  let composer = null;
  let bloomEffect = null;
  let isPostProcessingEnabled = true;

  try {
    composer = new EffectComposer(renderer, {
      multisampling: 0, // Handled cleanly by SMAA
      frameBufferType: THREE.HalfFloatType
    });

    // 1. Scene Render Pass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // 2. Selective HDR Bloom
    bloomEffect = new BloomEffect({
      luminanceThreshold: 0.82,
      luminanceSmoothing: 0.25,
      intensity: 1.6,
      mipmapBlur: true
    });

    // 3. Subtle Lens Vignette
    const vignetteEffect = new VignetteEffect({
      esv: false,
      offset: 0.28,
      darkness: 0.48
    });

    // 4. Peripheral Chromatic Aberration
    const chromaticAberrationEffect = new ChromaticAberrationEffect({
      offset: new THREE.Vector2(0.0012, 0.0012),
      radialModulation: true,
      modulationOffset: 0.25
    });

    // 5. SMAA Antialiasing Pass
    const smaaEffect = new SMAAEffect();

    // Combine all effects into a single GPU pass to maximize performance
    const effectPass = new EffectPass(
      camera,
      bloomEffect,
      chromaticAberrationEffect,
      vignetteEffect,
      smaaEffect
    );
    composer.addPass(effectPass);
  } catch (err) {
    console.warn('Post-processing fallback to standard pipeline:', err);
    isPostProcessingEnabled = false;
  }

  return {
    composer,
    isEnabled() {
      return isPostProcessingEnabled;
    },
    setQuality(level) {
      // Adaptive quality governor levels: 'high', 'medium', 'low'
      if (!isPostProcessingEnabled || !bloomEffect) return;
      if (level === 'low') {
        bloomEffect.intensity = 0.8;
      } else if (level === 'medium') {
        bloomEffect.intensity = 1.2;
      } else {
        bloomEffect.intensity = 1.6;
      }
    },
    resize(width, height) {
      if (composer) {
        composer.setSize(width, height);
      }
    },
    render(dt) {
      if (isPostProcessingEnabled && composer) {
        composer.render(dt);
      } else {
        renderer.render(scene, camera);
      }
    },
    dispose() {
      if (composer) {
        composer.dispose();
      }
    }
  };
}
