/**
 * LabelManager.js — 3D-Projected HTML Labels with Screen-Space Collision Culling
 * 
 * Features:
 * - Projects 3D world positions to 2D screen coordinates
 * - Centered visual transform strictly matches 2D collision bounding box
 * - Exclusion zones prevent overlap with Header, Hero copy, and Active Flight cards
 * - Frustum & depth culling
 * - Dynamic font-load and resize re-measurement
 * - WCAG / ARIA compliant focus management (hidden labels removed from Tab order)
 */

import * as THREE from 'three';

export class LabelManager {
  constructor(container) {
    this.container = container;
    this.items = []; // { id, priority, getPosition(), element, width, height, basePriority }
    this.tempVec = new THREE.Vector3();
    this.visibleRects = [];
    this.exclusionZones = [];
    this.selectedId = null;

    // Re-measure after web fonts load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => this.remeasure());
    }
  }

  register(id, name, type, priority, getPositionFn, onClickFn) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = `celestial-3d-label label-${type} priority-${priority}`;
    el.dataset.id = id;
    el.setAttribute('aria-label', `Navigate to ${name}`);
    el.tabIndex = 0;

    const dot = document.createElement('span');
    dot.className = 'label-indicator';
    const text = document.createElement('span');
    text.className = 'label-text';
    text.textContent = name;

    el.appendChild(dot);
    el.appendChild(text);

    if (onClickFn) {
      el.addEventListener('click', () => onClickFn(id));
    }

    this.container.appendChild(el);

    const item = {
      id,
      name,
      type,
      priority,
      basePriority: priority,
      getPosition: getPositionFn,
      element: el,
      width: 0,
      height: 0,
      isVisible: true
    };

    this.items.push(item);
    return el;
  }

  setSelected(id) {
    this.selectedId = id;
    this.items.forEach(item => {
      item.priority = item.id === id ? 1000 : item.basePriority;
    });
  }

  remeasure() {
    this.items.forEach(item => {
      const r = item.element.getBoundingClientRect();
      if (r.width > 0) {
        item.width = r.width;
        item.height = r.height;
      }
    });
  }

  updateExclusionZones(screenWidth, screenHeight) {
    this.exclusionZones.length = 0;

    // 1. Fixed Header Zone
    const navHeader = document.querySelector('.nav-header');
    if (navHeader) {
      const navRect = navHeader.getBoundingClientRect();
      if (navRect.height > 0) {
        this.exclusionZones.push({
          left: 0,
          right: screenWidth,
          top: 0,
          bottom: navRect.bottom + 8
        });
      }
    }

    // 2. Hero Content Zone (when hero is visible)
    const heroContent = document.querySelector('.hero-cinematic-content');
    if (heroContent) {
      const hRect = heroContent.getBoundingClientRect();
      if (hRect.top < screenHeight && hRect.bottom > 0) {
        this.exclusionZones.push({
          left: hRect.left - 12,
          right: hRect.right + 12,
          top: hRect.top - 12,
          bottom: hRect.bottom + 12
        });
      }
    }

    // 3. Active Flight Card Zone (when in work section)
    const activeCard = document.querySelector('.flight-case-card.is-active-flight');
    if (activeCard) {
      const cRect = activeCard.getBoundingClientRect();
      if (cRect.top < screenHeight && cRect.bottom > 0) {
        this.exclusionZones.push({
          left: cRect.left - 16,
          right: cRect.right + 16,
          top: cRect.top - 16,
          bottom: cRect.bottom + 16
        });
      }
    }
  }

  hideItem(item) {
    item.element.style.opacity = '0';
    item.element.style.pointerEvents = 'none';
    item.element.setAttribute('aria-hidden', 'true');
    item.element.tabIndex = -1;
    item.isVisible = false;
  }

  showItem(item, x, y, w, h) {
    item.element.style.transform = `translate3d(${(x - w * 0.5).toFixed(1)}px, ${(y - h * 0.5).toFixed(1)}px, 0)`;
    item.element.style.opacity = '1';
    item.element.style.pointerEvents = 'auto';
    item.element.removeAttribute('aria-hidden');
    item.element.tabIndex = 0;
    item.isVisible = true;
  }

  update(camera, screenWidth, screenHeight) {
    this.visibleRects.length = 0;
    this.updateExclusionZones(screenWidth, screenHeight);

    // Sort by priority (higher priority evaluated first)
    this.items.sort((a, b) => b.priority - a.priority);

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const worldPos = item.getPosition();

      // 1. Camera forward check (ensure body is strictly in front of near plane)
      const toBody = new THREE.Vector3().subVectors(worldPos, camera.position);
      const camDir = camera.getWorldDirection(new THREE.Vector3());
      const forwardDist = toBody.dot(camDir);
      if (forwardDist <= camera.near + 0.5) {
        this.hideItem(item);
        continue;
      }

      // 2. Physical body occlusion check: Central Sun sphere (radius 22 at 0, 0, 0)
      if (item.type !== 'sun') {
        const camToBodyDist = toBody.length();
        const rayDir = toBody.clone().normalize();
        const camToSun = camera.position.clone().negate();
        const tSun = camToSun.dot(rayDir);
        if (tSun > 0 && tSun < camToBodyDist) {
          const perpDistSq = camToSun.lengthSq() - tSun * tSun;
          if (perpDistSq < 576 && item.priority < 1000) { // 24^2 = 576 (Sun R=22 + 2 margin)
            this.hideItem(item);
            continue;
          }
        }
      }

      this.tempVec.copy(worldPos);

      // Project to normalized device coordinates [-1..1]
      this.tempVec.project(camera);

      // Frustum near/far and depth bounds
      if (this.tempVec.z > 0.98 || this.tempVec.z < -1.0) {
        this.hideItem(item);
        continue;
      }

      // Convert NDC to screen pixels
      const x = (this.tempVec.x * 0.5 + 0.5) * screenWidth;
      const y = (-(this.tempVec.y * 0.5) + 0.5) * screenHeight;

      // Off-screen margin check
      const margin = 20;
      if (x < margin || x > screenWidth - margin || y < margin || y > screenHeight - margin) {
        this.hideItem(item);
        continue;
      }

      // Measure dimensions if unmeasured
      if (!item.width) {
        const r = item.element.getBoundingClientRect();
        item.width = r.width || 80;
        item.height = r.height || 26;
      }

      const w = item.width;
      const h = item.height;

      // 2D Collision box matching centered translate3d(x - w*0.5, y - h*0.5)
      const box = {
        left: x - w * 0.5 - 6,
        right: x + w * 0.5 + 6,
        top: y - h * 0.5 - 4,
        bottom: y + h * 0.5 + 4
      };

      // 1. Check against UI Exclusion Zones (Header, Hero, Active card)
      let inExclusion = false;
      for (let k = 0; k < this.exclusionZones.length; k++) {
        const ex = this.exclusionZones[k];
        if (
          box.left < ex.right &&
          box.right > ex.left &&
          box.top < ex.bottom &&
          box.bottom > ex.top
        ) {
          inExclusion = true;
          break;
        }
      }

      if (inExclusion && item.priority < 1000) {
        this.hideItem(item);
        continue;
      }

      // 2. Check collision against higher-priority visible label boxes
      let collides = false;
      for (let j = 0; j < this.visibleRects.length; j++) {
        const other = this.visibleRects[j];
        if (
          box.left < other.right &&
          box.right > other.left &&
          box.top < other.bottom &&
          box.bottom > other.top
        ) {
          collides = true;
          break;
        }
      }

      if (collides && item.priority < 1000) {
        this.hideItem(item);
      } else {
        this.visibleRects.push(box);
        this.showItem(item, x, y, w, h);
      }
    }
  }

  dispose() {
    this.items.forEach(item => {
      if (item.element && item.element.parentNode) {
        item.element.parentNode.removeChild(item.element);
      }
    });
    this.items = [];
  }
}
