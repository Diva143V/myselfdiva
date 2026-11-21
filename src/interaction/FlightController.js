/**
 * FlightController.js — GSAP ScrollTrigger + Lenis Camera Choreography
 * 
 * - Drives camera flight along 3D CatmullRom spline scrubbed by user scroll
 * - Staged Hero Ignition reveal sequence on initial load
 * - Lenis inertia-smoothed scroll integration
 * - Magnetic spring physics on hero CTA buttons
 * - Two-way sync between 3D camera and HTML case study spotlight cards
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export class FlightController {
  constructor(universeScene, probeModalHandler) {
    this.universe = universeScene;
    this.probe = probeModalHandler;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.lenis = null;
    this.masterTrigger = null;

    this.initLenis();
    this.initScrollFlight();
    this.initMagneticButtons();

    if (!this.reducedMotion) {
      this.playStagedIgnition();
    }
  }

  initLenis() {
    if (this.reducedMotion) return;

    this.lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  initScrollFlight() {
    const track = document.getElementById('scroll-flight-track');
    if (!track) return;

    // Scrubbed camera flight mapped across scroll distance
    this.masterTrigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.0,
      onUpdate: (self) => {
        const progress = self.progress;
        this.universe.setFlightProgress(progress);

        // Highlight matching case study deck cards during flight
        this.syncCaseCards(progress);
      }
    });

    // Wire up direct navigation buttons (e.g. "See the work")
    document.querySelectorAll('[data-flight-step]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const step = parseFloat(btn.dataset.flightStep) || 0;
        this.flyToProgress(step);
      });
    });
  }

  syncCaseCards(progress) {
    // 4 Case Studies correspond to progress windows
    const cards = document.querySelectorAll('.flight-case-card');
    cards.forEach((card) => {
      const min = parseFloat(card.dataset.progressMin) || 0;
      const max = parseFloat(card.dataset.progressMax) || 1;
      const isActive = progress >= min && progress <= max;
      card.classList.toggle('is-active-flight', isActive);
    });
  }

  flyToProgress(targetProgress) {
    if (this.reducedMotion) {
      const track = document.getElementById('scroll-flight-track');
      if (track) {
        const targetScroll = track.offsetTop + track.offsetHeight * targetProgress;
        window.scrollTo({ top: targetScroll, behavior: 'auto' });
      }
      return;
    }

    const track = document.getElementById('scroll-flight-track');
    if (track && this.lenis) {
      const targetScroll = track.offsetTop + (track.offsetHeight - window.innerHeight) * targetProgress;
      this.lenis.scrollTo(targetScroll, { duration: 1.6 });
    }
  }

  playStagedIgnition() {
    // Exactly ONE staged reveal moment on load
    const overlay = document.getElementById('ignition-curtain');
    const heroContent = document.querySelector('.hero-cinematic-content');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(this.universe.sun.light, {
      intensity: 3.2,
      duration: 1.8,
      delay: 0.2
    })
    .to(overlay, {
      opacity: 0,
      duration: 1.4,
      onComplete: () => {
        if (overlay) overlay.style.display = 'none';
      }
    }, '-=1.2')
    .from(heroContent, {
      y: 40,
      opacity: 0,
      duration: 1.2
    }, '-=0.8');
  }

  initMagneticButtons() {
    if (this.reducedMotion || !window.matchMedia('(hover: hover)').matches) return;

    const buttons = document.querySelectorAll('.btn-magnetic');
    buttons.forEach((btn) => {
      let rect = null;
      btn.addEventListener('pointerenter', () => {
        rect = btn.getBoundingClientRect();
      });

      btn.addEventListener('pointermove', (e) => {
        if (!rect) rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const dx = (e.clientX - cx) * 0.26;
        const dy = (e.clientY - cy) * 0.26;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
      });

      btn.addEventListener('pointerleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        rect = null;
      });
    });
  }

  destroy() {
    if (this.lenis) this.lenis.destroy();
    if (this.masterTrigger) this.masterTrigger.kill();
  }
}
