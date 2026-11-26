// ===== Header shadow/background on scroll =====
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav after tapping a link
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Gallery lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(imgEl) {
  if (!imgEl || !imgEl.src) return;
  lightboxImg.src = imgEl.src;
  lightboxImg.alt = imgEl.alt || '';
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== "Apply to train with [name]" shortcut from trainer cards =====
function applyWithTrainer(name) {
  const trainerSelect = document.getElementById('trainer');
  if (trainerSelect) {
    trainerSelect.value = name;
  }
  document.getElementById('apply').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('fullName').focus({ preventScroll: true });
}

// ===== Apply form validation + submit =====
const applyForm = document.getElementById('applyForm');
const formStatus = document.getElementById('formStatus');

applyForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const trainer = document.getElementById('trainer').value;
  const goal = document.getElementById('goal').value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+\-\s()]{7,15}$/;

  if (!fullName || !email || !phone || !trainer || !goal) {
    showStatus('Please fill in every required field.', true);
    return;
  }
  if (!emailPattern.test(email)) {
    showStatus('Please enter a valid email address.', true);
    return;
  }
  if (!phonePattern.test(phone)) {
    showStatus('Please enter a valid phone number.', true);
    return;
  }

  // No backend is wired up yet — this is where you'd send the data
  // to your server, e.g.:
  // fetch('/api/apply', { method: 'POST', body: new FormData(applyForm) })

  showStatus(`Thanks, ${fullName.split(' ')[0]} — your application with ${trainer} has been received. We'll call you within one business day.`, false);
  applyForm.reset();
});

function showStatus(message, isError) {
  formStatus.textContent = message;
  formStatus.classList.toggle('error', isError);
}

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
