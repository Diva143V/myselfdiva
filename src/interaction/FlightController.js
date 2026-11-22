/**
 * FlightController.js — GSAP ScrollTrigger + Lenis Camera Choreography
 * 
 * - Drives camera flight along authored route scrubbed by user scroll
 * - Strict separation of Hero and Work scene reading layers (P1 fix)
 * - Shows exactly ONE active project panel in Guided flight with prev/next controls
 * - Hides inactive panels from pointer events and keyboard focus (inert / tabIndex)
 * - Safe Hero navigation (scrolling to 0 rather than track offset) (P1 fix)
 * - Mobile document-flow full-opacity cards without sticky overlap
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { GALAXY_CONFIG } from '../config/galaxyConfig.js';

gsap.registerPlugin(ScrollTrigger);

export class FlightController {
  constructor(universeScene, probeModalHandler) {
    this.universe = universeScene;
    this.probe = probeModalHandler;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.lenis = null;
    this.masterTrigger = null;
    this.currentCaseIndex = -1;
    this.caseStudies = GALAXY_CONFIG.caseStudies;

    this.initLenis();
    this.initScrollFlight();
    this.initCardSteppers();
    this.initMagneticButtons();

    // Ensure initial sync of card visibility
    this.syncCaseCards(this.masterTrigger ? this.masterTrigger.progress : 0);

    // Re-sync on window resize (desktop vs mobile transition)
    window.addEventListener('resize', () => {
      this.syncCaseCards(this.masterTrigger ? this.masterTrigger.progress : 0);
    }, { passive: true });

    // Handle direct hash navigation & popstate/back-forward
    this.initHashNavigation();

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

        // Only update camera if in guided mode
        if (this.universe.mode === 'guided') {
          this.universe.setFlightProgress(progress);
        }

        // Manage single active card visibility
        this.syncCaseCards(progress);
      }
    });

    // Wire up direct navigation buttons
    document.querySelectorAll('[data-flight-step]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const step = parseFloat(btn.dataset.flightStep) || 0;
        e.preventDefault();
        this.flyToProgress(step);
      });
    });

    // Dedicated top / hero scroll handlers (Sun Core fix)
    document.querySelectorAll('a[href="#hero"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.flyToTop();
      });
    });

    // Wire up case-study direct anchor links
    document.querySelectorAll('a[href^="#case-"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        const caseId = hash.replace('#case-', '');
        const idx = this.caseStudies.findIndex(cs => cs.id === caseId);
        if (idx !== -1) {
          e.preventDefault();
          this.navigateToCase(idx);
          history.pushState(null, '', hash);
        }
      });
    });
  }

  syncCaseCards(progress) {
    const isDesktop = window.innerWidth >= 768;
    const cards = document.querySelectorAll('.flight-case-card');
    const deck = document.querySelector('.flight-deck');

    // On mobile (< 768px), cards remain in normal document flow
    if (!isDesktop) {
      cards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.removeAttribute('inert');
      });
      if (deck) {
        deck.style.opacity = '1';
        deck.style.pointerEvents = 'auto';
      }
      return;
    }

    // Desktop Guided Flight: Exactly ONE active project panel
    // Keep hero and work scene separate: before track starts, hide entire deck
    if (progress <= 0.08 || progress >= 0.99) {
      if (deck) {
        deck.style.opacity = '0';
        deck.style.pointerEvents = 'none';
      }
      cards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('is-active-flight');
        card.setAttribute('inert', '');
      });
      if (this.currentCaseIndex !== -1) {
        this.currentCaseIndex = -1;
        this.universe.clearFocus();
      }
      return;
    }

    if (deck) {
      deck.style.opacity = '1';
      deck.style.pointerEvents = 'auto';
    }

    // Determine active case study
    let activeIndex = -1;
    for (let i = 0; i < this.caseStudies.length; i++) {
      const cs = this.caseStudies[i];
      if (progress >= cs.progressMin && progress <= cs.progressMax) {
        activeIndex = i;
        break;
      }
    }

    // If between thresholds, maintain closest or active
    if (activeIndex === -1 && progress > 0.08 && progress < 0.99) {
      // Find closest
      let closestDist = Infinity;
      this.caseStudies.forEach((cs, i) => {
        const center = (cs.progressMin + cs.progressMax) * 0.5;
        const d = Math.abs(progress - center);
        if (d < closestDist) {
          closestDist = d;
          activeIndex = i;
        }
      });
    }

    // Display ONLY the active card, hide all others completely
    cards.forEach((card, idx) => {
      const isTarget = idx === activeIndex;
      if (isTarget) {
        card.style.display = 'block';
        card.classList.add('is-active-flight');
        card.removeAttribute('inert');
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
      } else {
        card.style.display = 'none';
        card.classList.remove('is-active-flight');
        card.setAttribute('inert', '');
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
      }
    });

    // Update camera focus if active case changed
    if (activeIndex !== this.currentCaseIndex && activeIndex !== -1) {
      this.currentCaseIndex = activeIndex;
      const targetCase = this.caseStudies[activeIndex];
      this.universe.focusOnBody(targetCase.targetBodyId, targetCase.cameraFraming);
      // Boost label priority for focused body
      if (window.__UNIVERSE__?.labelManager) {
        window.__UNIVERSE__.labelManager.setSelected(targetCase.targetBodyId);
      }
    }
  }

  initCardSteppers() {
    // Prev / Next stepper controls on project panels
    document.querySelectorAll('.flight-case-card').forEach((card, idx) => {
      const prevBtn = card.querySelector('.stepper-prev');
      const nextBtn = card.querySelector('.stepper-next');

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (idx > 0) {
            this.navigateToCase(idx - 1);
          } else {
            this.flyToTop();
          }
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (idx < this.caseStudies.length - 1) {
            this.navigateToCase(idx + 1);
          } else {
            // Navigate past flight to calm sections
            const exp = document.getElementById('experience');
            if (exp) {
              if (this.lenis) {
                this.lenis.scrollTo(exp, { duration: 1.4 });
              } else {
                exp.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
        });
      }
    });
  }

  navigateToCase(idx) {
    if (idx < 0 || idx >= this.caseStudies.length) return;
    const isDesktop = window.innerWidth >= 768;
    const cards = document.querySelectorAll('.flight-case-card');
    const targetCard = cards[idx];

    if (isDesktop) {
      const cs = this.caseStudies[idx];
      const targetP = (cs.progressMin + cs.progressMax) * 0.5;
      this.flyToProgress(targetP);
    } else {
      if (targetCard) {
        if (this.lenis) {
          this.lenis.scrollTo(targetCard, { offset: -80, duration: 1.2 });
        } else {
          targetCard.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  initHashNavigation() {
    const scrollToHash = (hash, immediate = false) => {
      if (!hash) return;
      if (hash === '#hero') {
        this.flyToTop();
        return;
      }

      if (hash.startsWith('#case-')) {
        const caseId = hash.replace('#case-', '');
        const idx = this.caseStudies.findIndex(cs => cs.id === caseId);
        if (idx !== -1) {
          this.navigateToCase(idx);
          return;
        }
      }

      const target = document.querySelector(hash);
      if (!target) return;

      if (this.lenis) {
        this.lenis.scrollTo(target, { immediate, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
      }
    };

    // On initial load if hash exists
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash, true), 150);
    }

    // On browser back/forward
    window.addEventListener('popstate', () => {
      scrollToHash(window.location.hash, false);
    });
  }

  flyToTop() {
    if (this.lenis) {
      this.lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    history.pushState(null, '', '#hero');
  }

  flyToProgress(targetProgress) {
    if (targetProgress <= 0) {
      this.flyToTop();
      return;
    }

    const track = document.getElementById('scroll-flight-track');
    if (!track) return;

    const isDesktop = window.innerWidth >= 768;
    let targetScroll;
    if (isDesktop) {
      targetScroll = track.offsetTop + (track.offsetHeight - window.innerHeight) * targetProgress;
    } else {
      targetScroll = track.offsetTop - 70;
    }

    if (this.reducedMotion) {
      window.scrollTo({ top: targetScroll, behavior: 'auto' });
      return;
    }

    if (this.lenis) {
      this.lenis.scrollTo(targetScroll, { duration: 1.6 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }

  playStagedIgnition() {
    const overlay = document.getElementById('ignition-curtain');
    const heroContent = document.querySelector('.hero-cinematic-content');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(this.universe.sun.light, {
      intensity: 2.8,
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
