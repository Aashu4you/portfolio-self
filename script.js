/* ════════════════════════════════════════════════════════════════
   AASHUTOSH SHARMA — PORTFOLIO JAVASCRIPT
   ════════════════════════════════════════════════════════════════ */

'use strict';

/* ── UTILITIES ──────────────────────────────────────────────────── */
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
      // Trigger hero entrance after preloader fades
      setTimeout(() => {
        $$('.hero .reveal-up, .hero .reveal-right').forEach(el => {
          el.classList.add('visible');
        });
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

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring on interactive elements
  const interactives = 'a, button, .skill-card, .project-card, .service-card, input, textarea';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) ring.classList.add('expand');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) ring.classList.remove('expand');
  });

  document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(.6)');
  document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
})();

/* ═══════════════════════════════════════════════════════════════
   3. NAVBAR — scroll effect + active links + hamburger
   ═══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks  = $('#navLinks');
  const links     = $$('.nav-link');
  const sections  = $$('section[id]');

  // Scroll: glass effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  }, { passive: true });

  // Active link highlight
  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const link   = links.find(l => l.getAttribute('href') === '#' + sec.id);
      if (link) link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    });
  }

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
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

  const words = [
    'Frontend Developer',
    'JavaScript Developer',
    'UI/UX Enthusiast',
    'Full-Stack Builder',
    'Open Source Lover'
  ];

  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word    = words[wIdx];
    const display = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);
    el.textContent = display;

    let delay = deleting ? 60 : 100;

    if (!deleting && cIdx > word.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && cIdx < 0) {
      deleting = false;
      cIdx = 0;
      wIdx = (wIdx + 1) % words.length;
      delay = 400;
    }

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
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.8 + .3;
      this.vx = (Math.random() - .5) * .4;
      this.vy = (Math.random() - .5) * .4;
      this.a  = Math.random() * .5 + .1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(162,89,255,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  // Draw connecting lines
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(162,89,255,${.1 * (1 - dist / 100)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ═══════════════════════════════════════════════════════════════
   7. SCROLL REVEAL ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */
(function initReveal() {
  const items = $$('.reveal-up, .reveal-left, .reveal-right');

  // Don't observe hero items — they're handled after preloader
  const nonHeroItems = items.filter(el => !el.closest('.hero'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  nonHeroItems.forEach(el => io.observe(el));
})();

/* ═══════════════════════════════════════════════════════════════
   8. SKILL TABS
   ═══════════════════════════════════════════════════════════════ */
(function initSkillTabs() {
  const tabs   = $$('.skill-tab');
  const panels = $$('.skill-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = $(`#tab-${tab.dataset.tab}`);
      if (target) {
        target.classList.add('active');
        // Animate skill bars in active panel
        animateBars(target);
      }
    });
  });

  // Animate bars on scroll
  function animateBars(panel) {
    $$('.skill-card', panel).forEach(card => {
      card.classList.add('in-view');
    });
  }

  // Trigger initial panel on scroll
  const skillSection = $('#skills');
  if (!skillSection) return;

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateBars($('.skill-panel.active'));
      io.disconnect();
    }
  }, { threshold: .2 });

  io.observe(skillSection);
})();

/* ═══════════════════════════════════════════════════════════════
   9. STAT COUNTER ANIMATION
   ═══════════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('.stat-number[data-target]');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.target, 10);
      let   cur = 0;
      const step = Math.ceil(end / 40);
      const tick = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = cur;
        if (cur >= end) clearInterval(tick);
      }, 40);
      io.unobserve(el);
    });
  }, { threshold: .4 });

  counters.forEach(c => io.observe(c));
})();

/* ═══════════════════════════════════════════════════════════════
   10. PROJECT FILTER
   ═══════════════════════════════════════════════════════════════ */
(function initFilter() {
  const btns  = $$('.filter-btn');
  const cards = $$('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;

      cards.forEach(card => {
        const match = f === 'all' || card.dataset.category === f;
        card.style.transition = 'opacity .35s, transform .35s';
        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
          card.style.transform = 'none';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(.95)';
          setTimeout(() => card.classList.add('hidden'), 350);
        }
      });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   11. CONTACT FORM
   ═══════════════════════════════════════════════════════════════ */
(function initContactForm() {
  const form    = $('#contactForm');
  if (!form) return;

  const fields  = {
    name:    { el: $('#name'),    err: $('#nameError'),    msg: 'Please enter your name.' },
    email:   { el: $('#email'),   err: $('#emailError'),   msg: 'Please enter a valid email.' },
    subject: { el: $('#subject'), err: $('#subjectError'), msg: 'Please enter a subject.' },
    message: { el: $('#message'), err: $('#messageError'), msg: 'Please enter your message.' }
  };
  const success  = $('#formSuccess');
  const submitBtn = $('#submitBtn');

  function validate() {
    let valid = true;
    Object.entries(fields).forEach(([key, f]) => {
      const val = f.el.value.trim();
      let ok = val.length > 0;
      if (key === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

      f.el.classList.toggle('error', !ok);
      f.err.textContent = ok ? '' : f.msg;
      if (!ok) valid = false;
    });
    return valid;
  }

  // Live validation
  Object.values(fields).forEach(f => {
    f.el.addEventListener('input', () => {
      if (f.el.classList.contains('error')) {
        f.el.classList.remove('error');
        f.err.textContent = '';
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate async send
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
      submitBtn.disabled = false;
      form.reset();
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1800);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   12. COPY EMAIL
   ═══════════════════════════════════════════════════════════════ */
(function initCopyEmail() {
  const btn   = $('#copyEmailBtn');
  const email = $('#emailText');
  const toast = $('#copyToast');
  if (!btn || !email) return;

  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(email.textContent.trim()).then(() => {
      toast.classList.add('show');
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        toast.classList.remove('show');
        btn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 2500);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = email.textContent.trim();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   13. BACK TO TOP
   ═══════════════════════════════════════════════════════════════ */
(function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   14. CARD TILT EFFECT
   ═══════════════════════════════════════════════════════════════ */
(function initTilt() {
  const cards = $$('.project-card, .service-card, .stat-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rx = (y - cy) / cy * -6;
      const ry = (x - cx) / cx *  6;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   15. SMOOTH ANCHOR SCROLL
   ═══════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   16. WAVE DIVIDER PARALLAX
   ═══════════════════════════════════════════════════════════════ */
(function initParallax() {
  const hero = $('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const blobs = $$('.blob');
    blobs.forEach((b, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      b.style.transform = `translateY(${scrolled * .08 * dir}px)`;
    });
  }, { passive: true });
})();

console.log('%c Aashutosh Sharma Portfolio ✦', 'color:#a259ff;font-family:monospace;font-size:14px;font-weight:bold;');
console.log('%c Built with ♥ using HTML, CSS & Vanilla JS', 'color:#8b9ec7;font-family:monospace;font-size:11px;');