document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Random accent color (single source of truth)
    const root = document.documentElement;
    const hue = Math.floor(Math.random() * 360);
    root.style.setProperty('--accent-primary', `hsl(${hue}, 100%, 65%)`);
    root.style.setProperty('--accent-glow', `hsla(${hue}, 100%, 65%, 0.3)`);

    // Mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    const closeMobileNav = () => {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.classList.contains('open')) return;
            if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
            closeMobileNav();
        });
    }

    // BlurText animation
    if (!prefersReducedMotion) {
        document.querySelectorAll('.blur-text-container').forEach(el => {
            const text = el.getAttribute('data-text') || '';
            const words = text.split(' ');
            el.innerHTML = '';
            words.forEach((word, wordIdx) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'inline-block';
                word.split('').forEach((char, charIdx) => {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = char;
                    charSpan.className = 'blur-text-segment';
                    charSpan.style.animationDelay = `${wordIdx * 200 + charIdx * 50}ms`;
                    wordSpan.appendChild(charSpan);
                });
                el.appendChild(wordSpan);
                if (wordIdx < words.length - 1) el.appendChild(document.createTextNode('\u00A0'));
            });
        });
    }

    // Reveal on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            if (entry.target.classList.contains('text-pressure')) {
                entry.target.classList.add('revealed');
            }
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    if (prefersReducedMotion) {
        revealElements.forEach(el => el.classList.add('active'));
    } else {
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Active nav link on scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const updateActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Text rotation & pressure effect
    const pressureElement = document.querySelector('.text-pressure');
    const rotationTexts = [
        'Diwakar Venkat Peddada',
        'Full Stack Developer',
        'Frontend Developer',
        'Cloud Enthusiast',
        'Hi, I am Diva'
    ];
    let currentIndex = 0;

    const initPressureEffect = (text) => {
        if (!pressureElement) return;
        pressureElement.innerHTML = '';
        text.trim().split(/\s+/).forEach((word, wordIndex, words) => {
            const wordWrap = document.createElement('span');
            wordWrap.className = 'text-pressure-word';

            word.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.setAttribute('data-char', char);
                span.style.transitionDelay = `${(wordIndex * 4 + i) * 0.03}s`;
                wordWrap.appendChild(span);
            });

            pressureElement.appendChild(wordWrap);
        });

        requestAnimationFrame(() => {
            pressureElement.classList.remove('fade-in', 'fade-out');
            pressureElement.classList.add('revealed');
        });
    };

    const rotateText = () => {
        if (!pressureElement) return;
        pressureElement.classList.add('fade-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % rotationTexts.length;
            const nextText = rotationTexts[currentIndex];

            pressureElement.classList.remove('revealed', 'fade-out');
            pressureElement.classList.add('fade-in');

            initPressureEffect(nextText);

            let delay = 3000;
            if (nextText === 'Hi, I am Diva') delay = 7000;
            setTimeout(rotateText, delay);
        }, 800);
    };

    if (pressureElement) {
        initPressureEffect(rotationTexts[0]);

        if (!prefersReducedMotion) {
            setTimeout(rotateText, 3000);

            const mouse = { x: 0, y: 0 };
            document.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            }, { passive: true });

            const updatePressure = () => {
                const spans = pressureElement.querySelectorAll('.text-pressure-word span');
                spans.forEach(span => {
                    const rect = span.getBoundingClientRect();
                    const charCenter = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };

                    const d = Math.hypot(mouse.x - charCenter.x, mouse.y - charCenter.y);
                    const maxDist = 150;
                    const intensity = Math.max(0, 1 - d / maxDist);

                    if (intensity > 0) {
                        span.style.fontWeight = String(Math.round(700 + intensity * 100));
                        span.style.transform = `scale(${1 + intensity * 0.08})`;
                        span.style.filter = `drop-shadow(0 0 ${6 * intensity}px var(--accent-primary))`;
                        span.style.color = 'var(--accent-primary)';
                    } else {
                        span.style.fontWeight = '700';
                        span.style.transform = 'scale(1)';
                        span.style.filter = 'none';
                        span.style.color = 'var(--text-primary)';
                    }
                });
                requestAnimationFrame(updatePressure);
            };
            requestAnimationFrame(updatePressure);
        }
    }

    // Floating lines background
    const floatingLinesContainer = document.getElementById('floating-lines');
    const THREE = window.THREE;

    if (floatingLinesContainer && THREE && !prefersReducedMotion) {
        try {
            const vertexShader = `precision highp float; void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
            const fragmentShader = `
                precision highp float;
                uniform float iTime;
                uniform vec3 iResolution;
                uniform float animationSpeed;
                uniform vec2 iMouse;
                uniform float bendInfluence;
                uniform float scrollOffset;
                vec3 getNeonColor(float offset) {
                    float t = iTime * 0.2 + offset;
                    vec3 c1 = vec3(233.0, 71.0, 245.0) / 255.0, c2 = vec3(47.0, 75.0, 162.0) / 255.0, c3 = vec3(59.0, 130.0, 246.0) / 255.0;
                    return mix(mix(c1, c2, (sin(t) * 0.5 + 0.5)), c3, (cos(t * 0.8) * 0.5 + 0.5));
                }
                float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv) {
                    float time = iTime * animationSpeed * 0.5;
                    float y = sin(uv.x + offset + time * 0.05) * (sin(offset + time * 0.15) * 0.25);
                    y += scrollOffset * 0.1 * (1.0 + offset * 0.1);
                    float influence = exp(-dot(screenUv - mouseUv, screenUv - mouseUv) * 4.0);
                    y += (mouseUv.y - screenUv.y) * influence * -0.4 * bendInfluence;
                    return 0.015 / max(abs(uv.y - y) + 0.008, 1e-3) + 0.005;
                }
                void main() {
                    vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y; uv.y *= -1.0;
                    vec2 m = (2.0 * iMouse - iResolution.xy) / iResolution.y; m.y *= -1.0;
                    vec3 col = vec3(0.0), P = getNeonColor(0.0), B = getNeonColor(2.0), C = getNeonColor(4.0);
                    for (int i = 0; i < 6; i++) col += mix(C, B, float(i)/5.0) * 0.4 * wave(uv * mat2(cos(-0.8*log(length(uv)+1.2)), sin(-0.8*log(length(uv)+1.2)), -sin(-0.8*log(length(uv)+1.2)), cos(-0.8*log(length(uv)+1.2))) + vec2(0.05*float(i)+2.0, -0.6), 1.5+0.2*float(i), uv, m) * 0.2;
                    for (int i = 0; i < 8; i++) col += mix(B, P, float(i)/7.0) * 0.4 * wave(uv * mat2(cos(0.15*log(length(uv)+1.2)), sin(0.15*log(length(uv)+1.2)), -sin(0.15*log(length(uv)+1.2)), cos(0.15*log(length(uv)+1.2))) + vec2(0.05*float(i)+5.0, 0.1), 2.0+0.15*float(i), uv, m);
                    for (int i = 0; i < 6; i++) { vec2 ruv = uv * mat2(cos(-0.3*log(length(uv)+1.2)), sin(-0.3*log(length(uv)+1.2)), -sin(-0.3*log(length(uv)+1.2)), cos(-0.3*log(length(uv)+1.2))); ruv.x *= -1.0; col += P * 0.3 * wave(ruv + vec2(0.05*float(i)+10.0, 0.6), 1.0+0.2*float(i), uv, m) * 0.15; }
                    gl_FragColor = vec4(col, 1.0);
                }
            `;

            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.domElement.style.mixBlendMode = 'screen';
            floatingLinesContainer.appendChild(renderer.domElement);

            const uniforms = {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector3() },
                animationSpeed: { value: 1.0 },
                iMouse: { value: new THREE.Vector2(-1000, -1000) },
                bendInfluence: { value: 0 },
                scrollOffset: { value: 0 }
            };

            const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(2, 2),
                new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
            );
            scene.add(mesh);

            const clock = new THREE.Clock();
            let targetMouse = new THREE.Vector2(-1000, -1000);
            let currentMouse = new THREE.Vector2(-1000, -1000);
            let targetInfluence = 0;
            let currentInfluence = 0;
            let targetScroll = 0;
            let currentScroll = 0;
            let animationId = null;
            let isPaused = false;

            const res = () => {
                renderer.setSize(floatingLinesContainer.clientWidth, floatingLinesContainer.clientHeight);
                uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
            };

            window.addEventListener('resize', res, { passive: true });
            res();

            document.addEventListener('mousemove', (e) => {
                const rect = renderer.domElement.getBoundingClientRect();
                targetMouse.set(
                    (e.clientX - rect.left) * renderer.getPixelRatio(),
                    (rect.height - (e.clientY - rect.top)) * renderer.getPixelRatio()
                );
                targetInfluence = 1.0;
            }, { passive: true });

            window.addEventListener('scroll', () => {
                targetScroll = window.pageYOffset / window.innerHeight;
            }, { passive: true });

            const loop = () => {
                if (isPaused) return;
                uniforms.iTime.value = clock.getElapsedTime();
                currentMouse.lerp(targetMouse, 0.05);
                uniforms.iMouse.value.copy(currentMouse);
                currentInfluence += (targetInfluence - currentInfluence) * 0.05;
                uniforms.bendInfluence.value = currentInfluence;
                currentScroll += (targetScroll - currentScroll) * 0.1;
                uniforms.scrollOffset.value = currentScroll;
                renderer.render(scene, camera);
                animationId = requestAnimationFrame(loop);
            };

            document.addEventListener('visibilitychange', () => {
                isPaused = document.hidden;
                if (!isPaused && !animationId) {
                    loop();
                }
            });

            loop();
        } catch (e) {
            console.warn('Floating lines background failed to initialize.', e);
        }
    }

    // Chroma key video
    const v = document.getElementById('chroma-video');
    const c = document.getElementById('chroma-canvas');

    if (v && c) {
        const ctx = c.getContext('2d', { willReadFrequently: true });

        const draw = () => {
            if (!document.hidden) {
                if (!v.paused && !v.ended && v.videoWidth > 0) {
                    if (c.width !== v.videoWidth) {
                        c.width = v.videoWidth;
                        c.height = v.videoHeight;
                    }

                    ctx.clearRect(0, 0, c.width, c.height);
                    ctx.drawImage(v, 0, 0, c.width, c.height);

                    try {
                        const f = ctx.getImageData(0, 0, c.width, c.height);
                        const d = f.data;
                        for (let i = 0; i < d.length; i += 4) {
                            const r = d[i];
                            const g = d[i + 1];
                            const b = d[i + 2];
                            if (g > 65 && g > r * 1.1 && g > b * 1.1) d[i + 3] = 0;
                        }
                        ctx.putImageData(f, 0, 0);
                    } catch (e) {
                        // Canvas tainted or unavailable
                    }
                }
                requestAnimationFrame(draw);
            }
        };

        v.addEventListener('play', draw);

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !v.paused) draw();
        });

        const playBtn = document.getElementById('play-button');
        const downloadAudio = new Audio('assets/download.wav');
        downloadAudio.volume = 0.5;
        downloadAudio.playbackRate = 1.5;

        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                downloadAudio.play().catch(err => console.warn('Audio play failed:', err));
                playBtn.classList.add('hidden');
            });
        }

        v.play().catch(() => {
            v.muted = true;
            v.play();
        });
    }
});
