// js/main.js — cleaned & consolidated
(function () {
  const whatsappNumber = '918700127481'; // no plus sign
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth navigation (fade out then navigate) to avoid flicker between pages
  function smoothNavigate(href) {
    if (prefersReducedMotion) {
      window.location.href = href;
      return;
    }
    const pageEl = document.querySelector('.page');
    if (!pageEl) { window.location.href = href; return; }
    pageEl.style.transition = 'opacity 260ms ease, transform 260ms ease';
    pageEl.style.opacity = 0;
    pageEl.style.transform = 'translateY(6px)';
    setTimeout(() => window.location.href = href, 250);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Page enter animation (subtle)
    const pageEl = document.querySelector('.page');
    if (pageEl && !prefersReducedMotion) {
      pageEl.style.opacity = 0;
      pageEl.style.transform = 'translateY(6px)';
      requestAnimationFrame(() => {
        pageEl.style.transition = 'opacity 260ms ease, transform 260ms ease';
        pageEl.style.opacity = 1;
        pageEl.style.transform = 'translateY(0)';
      });
    }

    /* ---------- Hamburger Toggle & Nav behavior ---------- */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('nav.site-nav');

    if (hamburgerBtn && navMenu) {
      hamburgerBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      });

      // Intercept internal navigation clicks inside nav to animate
      navMenu.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        // close nav
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');

        // if internal same-origin link, animate
        if (a.href && a.hostname === location.hostname) {
          e.preventDefault();
          smoothNavigate(a.href);
        }
      });

      // Close menu on outside click
      document.addEventListener('click', (e) => {
        const path = e.composedPath ? e.composedPath() : (e.path || []);
        if (!path.includes(navMenu) && !path.includes(hamburgerBtn) && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* ---------- Doctor Tabs (doctors.html) ---------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const doctorCards = document.querySelectorAll('.doctor-card');
    if (tabButtons.length && doctorCards.length) {
      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          tabButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
          btn.classList.add('active'); btn.setAttribute('aria-selected','true');
          const specialty = btn.getAttribute('data-specialty');
          doctorCards.forEach(card => {
            const cs = card.getAttribute('data-specialty') || '';
            if (specialty === 'all' || specialty === cs) { card.style.display = ''; card.removeAttribute('aria-hidden'); }
            else { card.style.display = 'none'; card.setAttribute('aria-hidden','true'); }
          });
        });
      });
    }

    /* ---------- Accordion (services.html) ---------- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length) {
      accordionHeaders.forEach(header => {
        const content = header.nextElementSibling;
        if (!content) return;
        header.setAttribute('aria-expanded', content.hasAttribute('hidden') ? 'false' : 'true');

        header.addEventListener('click', () => {
          const wasActive = header.classList.contains('active');
          // close all
          accordionHeaders.forEach(h => {
            h.classList.remove('active');
            h.setAttribute('aria-expanded', 'false');
            const c = h.nextElementSibling;
            if (c) { c.style.maxHeight = null; c.setAttribute('hidden',''); }
          });
          // open if was not active
          if (!wasActive) {
            header.classList.add('active');
            header.setAttribute('aria-expanded','true');
            if (content) {
              content.removeAttribute('hidden');
              // smooth expand
              const height = content.scrollHeight;
              content.style.maxHeight = (height + 36) + 'px';
            }
          }
        });
      });
    }

    /* ---------- WhatsApp Form (contact.html) ---------- */
    const contactForm = document.getElementById('whatsapp-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('name').value || '').trim();
        const email = (document.getElementById('email').value || '').trim();
        const subject = (document.getElementById('subject').value || '').trim();
        const message = (document.getElementById('message').value || '').trim();
        if (!name || !email || !subject || !message) {
          alert('Please complete all fields.');
          return;
        }
        const whatsappMessage = `*New Inquiry from Medics Care Hospital Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A%0A*Message:* ${message}`;
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, '_blank');
        contactForm.reset();
        alert('WhatsApp opened — please tap Send in WhatsApp to submit.');
      });
    }

    /* ---------- Intercept regular internal links (page-wide) to animate transitions ---------- */
    document.querySelectorAll('a').forEach(a => {
      // skip links that have download, mailto, tel, target blank, or hash only
      if (!a.href) return;
      const isMailto = a.href.startsWith('mailto:') || a.href.startsWith('tel:') || a.target === '_blank';
      if (isMailto) return;
      if (a.hostname === location.hostname) {
        a.addEventListener('click', (ev) => {
          // if it is an in-page anchor or JS-driven link, skip
          if (a.hash && a.pathname === location.pathname) return;
          // allow special cases (like buttons with data attributes)
          ev.preventDefault();
          smoothNavigate(a.href);
        });
      }
    });

  }); // DOMContentLoaded end
})();
