const WHATSAPP_NUMBER = '2348102396172';

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const chatTrigger = document.getElementById('chatTrigger');
const chatBubble = document.getElementById('chatBubble');
const chatClose = document.getElementById('chatClose');
const chatNotify = document.querySelector('.chat-notify');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const studioMap = document.getElementById('studioMap');
const studioMapPins = document.querySelectorAll('.studio-map-pin');

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener');
}

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  }

  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.style.color = anchor.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
  });
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach((span) => {
        span.style.transform = '';
        span.style.opacity = '1';
      });
    });
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((node) => node.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach((item) => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

studioMapPins.forEach((pin) => {
  pin.addEventListener('click', () => {
    if (!studioMap) return;
    studioMap.src = pin.dataset.mapTarget;
    studioMapPins.forEach((node) => node.classList.remove('active'));
    pin.classList.add('active');
    studioMap.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

(function buildLightbox() {
  if (!galleryItems.length) return;

  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.style.cssText = `
    display:none;
    position:fixed;
    inset:0;
    z-index:2000;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,0.94);
    cursor:zoom-out;
    padding:1rem;
  `;

  const image = document.createElement('img');
  image.style.cssText = `
    max-width:92vw;
    max-height:92vh;
    object-fit:contain;
    border-radius:18px;
  `;

  overlay.appendChild(image);
  document.body.appendChild(overlay);

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const source = item.querySelector('img');
      if (!source) return;
      image.src = source.src;
      image.alt = source.alt;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();

document.querySelectorAll('[data-whatsapp-message]').forEach((button) => {
  button.addEventListener('click', () => {
    openWhatsApp(button.dataset.whatsappMessage);
  });
});

if (chatTrigger && chatBubble) {
  chatTrigger.addEventListener('click', () => {
    chatBubble.classList.toggle('open');
    if (chatNotify) {
      chatNotify.style.display = 'none';
    }
  });
}

if (chatClose && chatBubble) {
  chatClose.addEventListener('click', (event) => {
    event.stopPropagation();
    chatBubble.classList.remove('open');
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const service = formData.get('service')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    const whatsappMessage = [
      'Hello, I would like to book a session with Hood Studios Production.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || 'Not provided'}`,
      `Package/Session: ${service}`,
      `Shoot details: ${message}`,
    ].join('\n');

    openWhatsApp(whatsappMessage);
  });
}

(function scrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .gallery-item, .price-card, .policy-card, .testimonial-card, .location-detail, .studio-map-pin'
  );

  if (!targets.length) return;

  targets.forEach((target) => {
    target.style.opacity = '0';
    target.style.transform = 'translateY(20px)';
    target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach((target) => observer.observe(target));
})();
