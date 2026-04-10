/* ============================================================
   HOOD PRODUCTIONS — main.js
   ============================================================ */

/* ── Navbar scroll effect ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile hamburger menu ────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

/* ── Gallery Filter ───────────────────────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ── Gallery Lightbox ─────────────────────────────────────── */
// Creates a simple lightbox when gallery items are clicked
(function buildLightbox() {
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.style.cssText = `
    display:none; position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.95); align-items:center; justify-content:center;
    cursor:zoom-out;
  `;
  const img = document.createElement('img');
  img.style.cssText = `
    max-width:90vw; max-height:90vh; border-radius:8px;
    object-fit:contain; pointer-events:none;
  `;
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      img.src = src;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();

/* ── WhatsApp Chatbot ─────────────────────────────────────── */
const chatTrigger = document.getElementById('chatTrigger');
const chatBubble  = document.getElementById('chatBubble');
const chatClose   = document.getElementById('chatClose');
const chatNotify  = document.querySelector('.chat-notify');

chatTrigger.addEventListener('click', () => {
  chatBubble.classList.toggle('open');
  if (chatNotify) chatNotify.style.display = 'none';
});

chatClose.addEventListener('click', (e) => {
  e.stopPropagation();
  chatBubble.classList.remove('open');
});

// EDIT: Replace +2348000000000 with your actual WhatsApp number (no + or spaces)
// Format: country code + number. Nigeria example: 2348012345678
function openWhatsApp(message) {
  const phone   = '2348000000000'; // EDIT: Replace with your WhatsApp number
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}

/* ── Contact Form ─────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // EDIT: For Netlify Forms, remove this entire JS handler and add
  // netlify attribute to the <form> tag in index.html:
  // <form name="contact" method="POST" data-netlify="true" id="contactForm">
  // Also add inside form: <input type="hidden" name="form-name" value="contact" />
  // Then DELETE this JS submit handler — Netlify handles it automatically.

  const btn  = contactForm.querySelector('.form-submit');
  const name = document.getElementById('name').value;

  btn.innerHTML = '<span>Sending...</span>';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent! ✓</span>';
    btn.style.background = '#1a7a3a';
    contactForm.reset();
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
      btn.style.opacity = '';
    }, 4000);
  }, 1200);
});

/* ── Scroll Reveal Animation ──────────────────────────────── */
// Fade-in elements as they enter the viewport
(function scrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .gallery-item, .price-card, .testimonial-card, .blog-card, .location-detail, .stat'
  );

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 80 * (Array.from(targets).indexOf(entry.target) % 4));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
})();

/* ── Active nav link on scroll ────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
  });
});
