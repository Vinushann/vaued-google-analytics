// ===== MOBILE NAVIGATION TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// ===== GA4 EVENT TRACKING =====

/**
 * Helper: sends event to GA4 via gtag().
 * Falls back silently if gtag is not loaded yet.
 */
function trackEvent(eventName, params) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
    console.log('[GA4] Event sent:', eventName, params);
  } else {
    console.warn('[GA4] gtag not available – event not sent:', eventName);
  }
}


// --- Track "Order Now" button click (Home page) ---
const orderBtn = document.getElementById('orderNowBtn');
if (orderBtn) {
  orderBtn.addEventListener('click', () => {
    trackEvent('cta_click', {
      button_text: 'Order Now',
      button_location: 'hero_section'
    });
  });
}


// --- Track clickable product card (Menu page) ---
const clickableProduct = document.querySelector('.menu-card.clickable');
if (clickableProduct) {
  clickableProduct.addEventListener('click', () => {
    const productName = clickableProduct.getAttribute('data-product');
    const productPrice = clickableProduct.getAttribute('data-price');

    trackEvent('product_click', {
      product_name: productName,
      product_price: productPrice
    });

    // Show product detail modal
    openModal(productName, productPrice, clickableProduct);
  });
}


// --- Track contact form submission ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const message = document.getElementById('formMessage').value;

    // Send GA4 event
    trackEvent('form_submission', {
      form_name: 'contact_form',
      user_name: name,
      user_email: email
    });

    // Show success message
    contactForm.style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');

    // Reset form after a delay
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'block';
      document.getElementById('formSuccess').classList.remove('show');
    }, 4000);
  });
}


// ===== PRODUCT DETAIL MODAL =====
function openModal(name, price, card) {
  const modal = document.getElementById('productModal');
  if (!modal) return;

  const icon = card.querySelector('.menu-card-img').textContent.trim();
  const desc = card.querySelector('.menu-card-body p').textContent;

  document.getElementById('modalIcon').textContent = icon;
  document.getElementById('modalName').textContent = name;
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalDesc').textContent = desc;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
}

// Close modal on overlay click
const modalOverlay = document.getElementById('productModal');
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
