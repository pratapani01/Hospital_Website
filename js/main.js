// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // ---------- Doctor Tabs (doctors.html) ----------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const doctorCards = document.querySelectorAll('.doctor-card');

  if (tabButtons.length && doctorCards.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        const specialty = button.getAttribute('data-specialty');
        doctorCards.forEach(card => {
          const cardSpecialty = card.getAttribute('data-specialty') || '';
          if (specialty === 'all' || specialty === cardSpecialty) {
            card.style.display = '';
            card.removeAttribute('aria-hidden');
          } else {
            card.style.display = 'none';
            card.setAttribute('aria-hidden', 'true');
          }
        });
      });
    });
  }

  // ---------- Accordion (services.html) ----------
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  if (accordionHeaders.length) {
    accordionHeaders.forEach(header => {
      const content = header.nextElementSibling;
      if (!content) return;

      // Ensure aria attributes
      header.setAttribute('aria-expanded', content.hasAttribute('hidden') ? 'false' : 'true');

      header.addEventListener('click', () => {
        const isActive = header.classList.contains('active');

        // Close all
        accordionHeaders.forEach(h => {
          const c = h.nextElementSibling;
          h.classList.remove('active');
          h.setAttribute('aria-expanded', 'false');
          if (c) {
            c.style.maxHeight = null;
            c.setAttribute('hidden', '');
          }
        });

        // Open clicked if it wasn't active
        if (!isActive) {
          header.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          if (content) {
            content.removeAttribute('hidden');
            // expand smoothly
            const height = content.scrollHeight;
            content.style.maxHeight = height + 36 + 'px';
          }
        }
      });
    });
  }

  // ---------- WhatsApp form handler (contact.html) ----------
  const contactForm = document.getElementById('whatsapp-form');
  const whatsappNumber = '918700127481'; // country code + number, no plus

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Basic trimming & validation
      const name = (document.getElementById('name').value || '').trim();
      const email = (document.getElementById('email').value || '').trim();
      const subject = (document.getElementById('subject').value || '').trim();
      const message = (document.getElementById('message').value || '').trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }

      // Build message (use encodeURIComponent)
      const whatsappMessage =
        `*New Inquiry from Medics Care Hospital Website*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Subject:* ${subject}\n\n` +
        `*Message:* ${message}`;

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      // Open WhatsApp Web in a new tab
      window.open(url, '_blank');

      // Reset form and notify user
      contactForm.reset();
      alert('A WhatsApp window has been opened with your message. Please press send there to submit.');
    });
  }
});
// Mobile hamburger toggle + close on link click
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.querySelector('nav');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // toggle aria
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', String(!expanded));
  });

  // close when a link inside nav is clicked (improves UX)
  navMenu.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'A') {
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // optional: close on outside click (click outside nav)
  document.addEventListener('click', (e) => {
    const insideHeader = e.composedPath().includes(navMenu) || e.composedPath().includes(hamburgerBtn);
    if (!insideHeader && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
}
