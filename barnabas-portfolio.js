/* ═══════════════════════════════════════════════════════
   Barnabas Portfolio — script.js
   Cursor · Parallax · Float · Scroll · Form
═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── CURSOR ─────────────────────────────────────────── */
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0, shown = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;

    // Move dot instantly
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    if (!shown) {
      shown = true;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }
  });

  // Ring follows with smooth lag
  (function loopRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loopRing);
  })();

  // Expand ring on hover
  document.querySelectorAll('a, button, .project-card, .service-card, .channel, .tech, .svc, .btn-glow')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

  // Shrink dot on click
  document.addEventListener('mousedown', () => dot.classList.add('clicking'));
  document.addEventListener('mouseup',   () => dot.classList.remove('clicking'));

  // Hide when mouse leaves page
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    shown = false;
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  /* ── PARALLAX BG NAME ───────────────────────────────── */
  const bgName = document.querySelector('.bg-name');
  document.addEventListener('mousemove', e => {
    const dx = (e.clientX / window.innerWidth  - 0.5) * 20;
    const dy = (e.clientY / window.innerHeight - 0.5) * 11;
    bgName.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  });

  /* ── BLOB DRIFT ─────────────────────────────────────── */
  const blob3 = document.querySelector('.blob-3');
  document.addEventListener('mousemove', e => {
    const dx = (e.clientX / window.innerWidth  - 0.5) * 70;
    const dy = (e.clientY / window.innerHeight - 0.5) * 55;
    blob3.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  });

  /* ── FLOATING STAT CARDS BOB ────────────────────────── */
  const cards = document.querySelectorAll('.stat-card');
  (function bobLoop(ts) {
    const t = ts / 1000;
    cards.forEach((c, i) => {
      c.style.transform = `translateY(${Math.sin(t * 0.65 + i * 1.9) * 8}px)`;
    });
    requestAnimationFrame(bobLoop);
  })(0);

  /* ── NAV — SMOOTH SCROLL + ACTIVE STATE ─────────────── */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-links a').forEach(l => l.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── SCROLL SPY — highlight nav as user scrolls ─────── */
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.removeAttribute('aria-current'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.setAttribute('aria-current', 'page');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));

  /* ── SCROLL REVEAL ──────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.project-card, .service-card, .process-step, .channel, .contact-form'
  );
  revealEls.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
  });
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 80 * (Array.from(revealEls).indexOf(entry.target) % 4));
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── STAGGER HOME ITEMS ─────────────────────────────── */
  document.querySelectorAll('.svc').forEach((el, i) => {
    el.style.opacity = '0'; el.style.transform = 'translateX(-10px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateX(0)'; }, 850 + i * 110);
  });
  document.querySelectorAll('.tech').forEach((el, i) => {
    el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 600 + i * 90);
  });

  /* ── HAMBURGER MENU ──────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('navLinks');
  const closeBtn  = document.getElementById('closeBtn');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  /* ── CONTACT FORM — EmailJS ──────────────────────────── */
  emailjs.init('fnsQbDZL__bl2qnf6'); // ← replace with your EmailJS public key

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const btn   = form.querySelector('.form-submit span');
      const orig  = btn.textContent;
      const fname = form.querySelector('#fname').value.trim();
      const email = form.querySelector('#email').value.trim();
      const msg   = form.querySelector('#message').value.trim();

      // Basic validation
      if (!fname || !email || !msg) {
        btn.textContent = '⚠ Fill all required fields';
        setTimeout(() => { btn.textContent = orig; }, 2500);
        return;
      }

      btn.textContent = 'Sending…';

      const templateParams = {
        from_name:    fname + ' ' + form.querySelector('#lname').value.trim(),
        from_email:   email,
        service_type: form.querySelector('#service').value || 'Not specified',
        message:      msg,
        to_name:      'Barnabas',
      };

      emailjs.send('service_1wqxgeb', 'template_u87wv6d', templateParams)
        .then(() => {
          btn.textContent = '✓ Message Sent!';
          form.reset();
          setTimeout(() => { btn.textContent = orig; }, 4000);
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          btn.textContent = '✗ Failed — try again';
          setTimeout(() => { btn.textContent = orig; }, 3000);
        });
    });
  }

})();