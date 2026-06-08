/* ════════════════════════════════════════════════════════════════
   AASHUTOSH SHARMA — PORTFOLIO JAVASCRIPT
   ════════════════════════════════════════════════════════════════ */

'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ═══════════════════════════════════════════════════════════════
   1. PRELOADER
   ═══════════════════════════════════════════════════════════════ */
(function initPreloader() {
  const preloader = $('#preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => {
        $$('.hero .reveal-up, .hero .reveal-right').forEach(el => el.classList.add('visible'));
      }, 200);
    }, 1800);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   2. CUSTOM CURSOR
   ═══════════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = $('#cursorDot');
  const ring = $('#cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactives = 'a, button, .skill-card, .project-card, .service-card, .stat-card, input, textarea, .filter-btn, .skill-tab, .proj-link, .carousel-dot, .carousel-btn';
  document.addEventListener('mouseover', e => { if (e.target.closest(interactives)) ring.classList.add('expand'); });
  document.addEventListener('mouseout',  e => { if (e.target.closest(interactives)) ring.classList.remove('expand'); });
  document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(.5)');
  document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
})();

/* ═══════════════════════════════════════════════════════════════
   3. NAVBAR
   ═══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks  = $('#navLinks');
  const links     = $$('.nav-link');
  const sections  = $$('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  }, { passive: true });

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const link = links.find(l => l.getAttribute('href') === '#' + sec.id);
      if (link) link.classList.toggle('active', scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight);
    });
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   4. THEME TOGGLE
   ═══════════════════════════════════════════════════════════════ */
(function initTheme() {
  const btn  = $('#themeToggle');
  const icon = $('#themeIcon');
  const html = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  function applyTheme(t) {
    html.dataset.theme = t;
    icon.className = t === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
})();

/* ═══════════════════════════════════════════════════════════════
   5. TYPING EFFECT
   ═══════════════════════════════════════════════════════════════ */
(function initTyping() {
  const el = $('#typedText');
  if (!el) return;

  const words = ['Frontend Developer','JavaScript Developer','UI/UX Enthusiast','Full-Stack Builder','Open Source Lover'];
  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word = words[wIdx];
    el.textContent = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);
    let delay = deleting ? 60 : 100;
    if (!deleting && cIdx > word.length) { delay = 1800; deleting = true; }
    else if (deleting && cIdx < 0) { deleting = false; cIdx = 0; wIdx = (wIdx + 1) % words.length; delay = 400; }
    setTimeout(type, delay);
  }
  setTimeout(type, 1200);
})();

/* ═══════════════════════════════════════════════════════════════
   6. PARTICLE CANVAS
   ═══════════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random()*W; this.y = Math.random()*H;
      this.r = Math.random()*1.8+.3;
      this.vx = (Math.random()-.5)*.4; this.vy = (Math.random()-.5)*.4;
      this.a = Math.random()*.5+.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(162,89,255,${this.a})`; ctx.fill();
    }
  }

  for (let i=0; i<80; i++) particles.push(new Particle());

  function drawLines() {
    for (let i=0; i<particles.length; i++) {
      for (let j=i+1; j<particles.length; j++) {
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if (dist<100) {
          ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(162,89,255,${.1*(1-dist/100)})`; ctx.lineWidth=.5; ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ═══════════════════════════════════════════════════════════════
   7. SCROLL REVEAL
   ═══════════════════════════════════════════════════════════════ */
(function initReveal() {
  const items = $$('.reveal-up, .reveal-left, .reveal-right').filter(el => !el.closest('.hero'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
})();

/* ═══════════════════════════════════════════════════════════════
   8. SKILL TABS
   ═══════════════════════════════════════════════════════════════ */
(function initSkillTabs() {
  const tabs = $$('.skill-tab'), panels = $$('.skill-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = $(`#tab-${tab.dataset.tab}`);
      if (target) { target.classList.add('active'); animateBars(target); }
    });
  });

  function animateBars(panel) { $$('.skill-card', panel).forEach(c => c.classList.add('in-view')); }

  const skillSection = $('#skills');
  if (!skillSection) return;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateBars($('.skill-panel.active')); io.disconnect(); }
  }, { threshold: .2 });
  io.observe(skillSection);
})();

/* ═══════════════════════════════════════════════════════════════
   9. STAT COUNTERS
   ═══════════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('.stat-number[data-target]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, end = parseInt(el.dataset.target, 10);
      let cur = 0;
      const step = Math.ceil(end/40);
      const tick = setInterval(() => { cur = Math.min(cur+step, end); el.textContent = cur; if (cur>=end) clearInterval(tick); }, 40);
      io.unobserve(el);
    });
  }, { threshold: .4 });
  counters.forEach(c => io.observe(c));
})();

/* ═══════════════════════════════════════════════════════════════
   10. PROJECT FILTER
   ═══════════════════════════════════════════════════════════════ */
(function initFilter() {
  const btns = $$('.filter-btn'), cards = $$('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const match = f === 'all' || card.dataset.category === f;
        card.style.transition = 'opacity .35s, transform .35s';
        if (match) { card.classList.remove('hidden'); card.style.opacity='1'; card.style.transform='none'; }
        else { card.style.opacity='0'; card.style.transform='scale(.95)'; setTimeout(() => card.classList.add('hidden'), 350); }
      });
      setTimeout(() => window.carouselGoTo && window.carouselGoTo(0), 420);
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   11. CONTACT FORM
   ═══════════════════════════════════════════════════════════════ */
(function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const fields = {
    name:    { el: $('#name'),    err: $('#nameError'),    msg: 'Please enter your name.' },
    email:   { el: $('#email'),   err: $('#emailError'),   msg: 'Please enter a valid email.' },
    subject: { el: $('#subject'), err: $('#subjectError'), msg: 'Please enter a subject.' },
    message: { el: $('#message'), err: $('#messageError'), msg: 'Please enter your message.' }
  };
  const success = $('#formSuccess'), submitBtn = $('#submitBtn');

  function validate() {
    let valid = true;
    Object.entries(fields).forEach(([key, f]) => {
      const val = f.el.value.trim();
      let ok = val.length > 0;
      if (key === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      f.el.classList.toggle('error', !ok); f.err.textContent = ok ? '' : f.msg;
      if (!ok) valid = false;
    });
    return valid;
  }

  Object.values(fields).forEach(f => {
    f.el.addEventListener('input', () => { if (f.el.classList.contains('error')) { f.el.classList.remove('error'); f.err.textContent=''; } });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    const templateParams = { from_name: fields.name.el.value.trim(), from_email: fields.email.el.value.trim(), subject: fields.subject.el.value.trim(), message: fields.message.el.value.trim() };
    try {
      await emailjs.send("service_b2tuz6u", "template_k8yz1nc", templateParams);
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
      submitBtn.disabled = false; form.reset();
      success.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
      success.classList.add('show'); setTimeout(() => success.classList.remove('show'), 5000);
    } catch (error) {
      console.error(error); submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
      success.innerHTML = '<i class="fas fa-times-circle"></i> Failed to send message.';
      success.classList.add('show'); setTimeout(() => success.classList.remove('show'), 5000);
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════
   12. COPY EMAIL
   ═══════════════════════════════════════════════════════════════ */
(function initCopyEmail() {
  const btn = $('#copyEmailBtn'), email = $('#emailText'), toast = $('#copyToast');
  if (!btn || !email) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(email.textContent.trim()).then(() => {
      toast.classList.add('show'); btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => { toast.classList.remove('show'); btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2500);
    }).catch(() => {
      const ta = document.createElement('textarea'); ta.value = email.textContent.trim();
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   13. BACK TO TOP
   ═══════════════════════════════════════════════════════════════ */
(function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ═══════════════════════════════════════════════════════════════
   14. CARD TILT
   ═══════════════════════════════════════════════════════════════ */
(function initTilt() {
  $$('.service-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect=card.getBoundingClientRect(), x=e.clientX-rect.left, y=e.clientY-rect.top;
      const rx=(y-rect.height/2)/rect.height*-6, ry=(x-rect.width/2)/rect.width*6;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
})();

/* ═══════════════════════════════════════════════════════════════
   15. SMOOTH ANCHOR SCROLL
   ═══════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   16. PARALLAX BLOBS
   ═══════════════════════════════════════════════════════════════ */
(function initParallax() {
  if (!$('.hero')) return;
  window.addEventListener('scroll', () => {
    $$('.blob').forEach((b, i) => { b.style.transform = `translateY(${window.scrollY * .08 * (i%2===0?1:-1)}px)`; });
  }, { passive: true });
})();

/* ═══════════════════════════════════════════════════════════════
   17. INFINITE CAROUSEL — clone full set, RAF lerp, drag
   ═══════════════════════════════════════════════════════════════ */
(function initCarousel() {
  const track   = $('#carouselTrack');
  const prevBtn = $('#carouselPrev');
  const nextBtn = $('#carouselNext');
  const dotsWrap = $('#carouselDots');
  if (!track || !prevBtn) return;

  /* 1. Grab originals before any cloning */
  const originals = $$('.project-card', track);
  const N = originals.length;
  if (!N) return;

  /* 2. Clone full set at both ends for seamless infinite scroll
        Layout: [clone of 1..N] [real 1..N] [clone of 1..N]
        Real cards start at index N                           */
  originals.forEach(c => {
    const cl = c.cloneNode(true);
    cl.classList.add('is-clone');
    track.appendChild(cl);
  });
  [...originals].reverse().forEach(c => {
    const cl = c.cloneNode(true);
    cl.classList.add('is-clone');
    track.insertBefore(cl, track.firstChild);
  });

  /* 3. Measure — called once on init and on resize */
  let CARDW = 0;
  function measure() {
    const gap = parseFloat(getComputedStyle(track).gap) || 28;
    CARDW = originals[0].offsetWidth + gap;
  }

  /* 4. State */
  let idx   = N;          // current target index (N = first real card)
  let curX  = 0;          // current rendered position
  let rafId = null;

  /* 5. Instant jump — no animation */
  function jump(i) {
    idx  = i;
    curX = -(i * CARDW);
    track.style.transform = `translateX(${curX}px)`;
  }

  /* 6. Animated slide — lerp via RAF */
  function slideTo(i) {
    idx = i;
    if (!rafId) rafId = requestAnimationFrame(step);
    updateDots();
  }

  function step() {
    const targetX = -(idx * CARDW);
    const diff    = targetX - curX;

    if (Math.abs(diff) < 0.4) {
      /* Settled — snap and check if we need to teleport */
      curX = targetX;
      track.style.transform = `translateX(${curX}px)`;
      rafId = null;

      if (idx < N) {
        jump(idx + N);          // went past start → jump to real equivalent at end
      } else if (idx >= N * 2) {
        jump(idx - N);          // went past end → jump to real equivalent at start
      }
      updateDots();
      return;
    }

    curX += diff * 0.14;
    track.style.transform = `translateX(${curX}px)`;
    rafId = requestAnimationFrame(step);
  }

  /* 7. Dots */
  function realIdx() {
    return ((idx - N) % N + N) % N;
  }

  function updateDots() {
    $$('.carousel-dot', dotsWrap).forEach((d, i) =>
      d.classList.toggle('active', i === realIdx())
    );
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    originals.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Project ${i + 1}`);
      dot.addEventListener('click', () => slideTo(N + i));
      dotsWrap.appendChild(dot);
    });
  }

  /* 8. Buttons */
  prevBtn.addEventListener('click', () => slideTo(idx - 1));
  nextBtn.addEventListener('click', () => slideTo(idx + 1));

  window.addEventListener('resize', () => { measure(); jump(idx); });
  window.carouselGoTo = (i) => slideTo(N + i);

  /* 9. Mouse drag */
  let dragStartX = 0, dragStartCurX = 0, dragging = false;

  track.addEventListener('mousedown', e => {
    dragging      = true;
    dragStartX    = e.clientX;
    dragStartCurX = curX;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    track.classList.add('is-dragging');
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    curX = dragStartCurX + (e.clientX - dragStartX);
    track.style.transform = `translateX(${curX}px)`;
  });

  window.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('is-dragging');
    const delta = e.clientX - dragStartX;
    if      (delta < -(CARDW * 0.2)) slideTo(idx + 1);
    else if (delta >  (CARDW * 0.2)) slideTo(idx - 1);
    else                              slideTo(idx);
  });

  /* 10. Touch drag */
  let touchStartX = 0, touchStartCurX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX    = e.touches[0].clientX;
    touchStartCurX = curX;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    curX = touchStartCurX + (e.touches[0].clientX - touchStartX);
    track.style.transform = `translateX(${curX}px)`;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if      (delta < -(CARDW * 0.2)) slideTo(idx + 1);
    else if (delta >  (CARDW * 0.2)) slideTo(idx - 1);
    else                              slideTo(idx);
  });

  /* 12. Keyboard navigation */
  document.addEventListener('keydown', e => {
    if (!$('#projects').getBoundingClientRect) return;
    const rect = $('#projects') && $('#projects').getBoundingClientRect();
    if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
    if (e.key === 'ArrowLeft')  slideTo(idx - 1);
    if (e.key === 'ArrowRight') slideTo(idx + 1);
  });

  /* 13. Auto-play — advance every 4s unless user is hovering */
  let autoPlay;
  const outer = track.closest('.projects-carousel-outer');
  function startAutoPlay() { autoPlay = setInterval(() => slideTo(idx + 1), 4000); }
  function stopAutoPlay()  { clearInterval(autoPlay); }
  startAutoPlay();
  if (outer) {
    outer.addEventListener('mouseenter', stopAutoPlay);
    outer.addEventListener('mouseleave', startAutoPlay);
  }

  /* 11. Init after layout is ready */
  function init() {
    measure();
    buildDots();
    jump(N);   // start at first real card
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();

console.log('%c Aashutosh Sharma Portfolio ✦', 'color:#a259ff;font-family:monospace;font-size:14px;font-weight:bold;');
console.log('%c Built with ♥ using HTML, CSS & Vanilla JS', 'color:#8b9ec7;font-family:monospace;font-size:11px;');