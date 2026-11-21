/**
 * LabelManager.js — 3D-Projected HTML Labels with Screen-Space Collision Culling
 * 
 * Features:
 * - Projects 3D world positions to 2D screen coordinates
 * - Frustum culling (hides bodies behind camera or beyond clip planes)
 * - Priority-aware 2D bounding-box collision detection
 * - Prevents label overlapping during planetary transits
 */

import * as THREE from 'three';

export class LabelManager {
  constructor(container) {
    this.container = container;
    this.items = []; // { id, priority, getPosition(), element, width, height }
    this.tempVec = new THREE.Vector3();
    this.visibleRects = [];
  }

  register(id, name, type, priority, getPositionFn, onClickFn) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = `celestial-3d-label label-${type} priority-${priority}`;
    el.dataset.id = id;
    el.setAttribute('aria-label', `Navigate to ${name}`);

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

    this.items.push({
      id,
      name,
      type,
      priority,
      getPosition: getPositionFn,
      element: el,
      width: 0,
      height: 0,
      isVisible: true
    });

    return el;
  }

  update(camera, screenWidth, screenHeight) {
    this.visibleRects.length = 0;

    // Sort by priority (higher priority evaluated first)
    this.items.sort((a, b) => b.priority - a.priority);

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const worldPos = item.getPosition();
      this.tempVec.copy(worldPos);

      // Project to normalized device coordinates [-1..1]
      this.tempVec.project(camera);

      // Behind camera check
      if (this.tempVec.z > 1.0) {
        item.element.style.opacity = '0';
        item.element.style.pointerEvents = 'none';
        continue;
      }

      // Convert NDC to screen pixels
      const x = (this.tempVec.x * 0.5 + 0.5) * screenWidth;
      const y = (-(this.tempVec.y * 0.5) + 0.5) * screenHeight;

      // Off-screen margin check
      const margin = 60;
      if (x < -margin || x > screenWidth + margin || y < -margin || y > screenHeight + margin) {
        item.element.style.opacity = '0';
        item.element.style.pointerEvents = 'none';
        continue;
      }

      // Measure dimensions if unmeasured
      if (!item.width) {
        const r = item.element.getBoundingClientRect();
        item.width = r.width || 75;
        item.height = r.height || 24;
      }

      const w = item.width;
      const h = item.height;
      const box = {
        left: x - w * 0.5 - 6,
        right: x + w * 0.5 + 6,
        top: y - h * 0.5 - 4,
        bottom: y + h * 0.5 + 4
      };

      // Collision detection pass against higher-priority visible rects
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

      if (collides) {
        // Smoothly hide lower-priority colliding label
        item.element.style.opacity = '0';
        item.element.style.pointerEvents = 'none';
      } else {
        // Position and reveal
        this.visibleRects.push(box);
        item.element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        item.element.style.opacity = '1';
        item.element.style.pointerEvents = 'auto';
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
