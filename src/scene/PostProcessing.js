/**
 * PostProcessing.js — Cinematic Post-Processing Pipeline (pmndrs/postprocessing)
 * 
 * - RenderPass: Scene render to HalfFloat framebuffer
 * - Selective HDR Bloom (restrained luminance threshold for core and corona)
 * - Light cinematic vignette
 * - SMAA edge antialiasing
 * - Graceful cleanup & intentional fallback
 */

import * as THREE from 'three';
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  VignetteEffect,
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

    // 2. Selective Restrained HDR Bloom
    bloomEffect = new BloomEffect({
      luminanceThreshold: 0.85,
      luminanceSmoothing: 0.2,
      intensity: 1.0,
      mipmapBlur: true
    });

    // 3. Subtle Lens Vignette
    const vignetteEffect = new VignetteEffect({
      esv: false,
      offset: 0.32,
      darkness: 0.42
    });

    // 4. SMAA Antialiasing Pass
    const smaaEffect = new SMAAEffect();

    // Combine compatible effects into a single GPU pass to maximize performance
    const effectPass = new EffectPass(
      camera,
      bloomEffect,
      vignetteEffect,
      smaaEffect
    );
    composer.addPass(effectPass);
  } catch (err) {
    console.warn('Post-processing fallback to standard pipeline:', err);
    if (composer) {
      try { composer.dispose(); } catch (_) {}
      composer = null;
    }
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
        bloomEffect.intensity = 0.6;
      } else if (level === 'medium') {
        bloomEffect.intensity = 0.85;
      } else {
        bloomEffect.intensity = 1.0;
      }
    },
    resize(width, height) {
      if (composer) {
        composer.setSize(width, height);
      }
    },
    render(dt) {
      if (isPostProcessingEnabled && composer) {
        try {
          composer.render(dt);
        } catch (err) {
          console.warn('Post-processing runtime error, falling back to standard renderer:', err);
          isPostProcessingEnabled = false;
          try { composer.dispose(); } catch (_) {}
          composer = null;
          renderer.render(scene, camera);
        }
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
