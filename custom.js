

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ---- Mobile menu ----
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link, #mobile-menu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- Reveal on scroll ----
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// ---- Animated counters ----
function animateCounter(el) {
  const target = parseInt(el.dataset.counter);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target + suffix;
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// ---- Skill bars ----
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#skills').forEach(el => skillObserver.observe(el));

// ---- Testimonial slider ----
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('dots');
let currentSlide = 0;
let autoSlide;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'w-2 h-2 rounded-full transition-all duration-300';
  dot.style.background = i === 0 ? 'linear-gradient(135deg, #a855f7, #ec4899)' : 'rgba(255,255,255,0.2)';
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dotsContainer.children[currentSlide].style.background = 'rgba(255,255,255,0.2)';
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dotsContainer.children[currentSlide].style.background = 'linear-gradient(135deg, #a855f7, #ec4899)';
}

document.getElementById('prev-btn').addEventListener('click', () => {
  clearInterval(autoSlide);
  goToSlide(currentSlide - 1);
  startAuto();
});
document.getElementById('next-btn').addEventListener('click', () => {
  clearInterval(autoSlide);
  goToSlide(currentSlide + 1);
  startAuto();
});

function startAuto() {
  autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
startAuto();

// ---- Smooth scroll offset for fixed navbar ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
  });

// ---- Video Testimonial Switcher ----
function switchVideo(url, initials, name, project, gradient) {
  // Update iframe
  document.getElementById('featured-video-frame').src = url;
  
  // Update active info
  const avatar = document.getElementById('active-avatar');
  avatar.textContent = initials;
  avatar.style.background = gradient;
  
  document.getElementById('active-name').textContent = name;
  document.getElementById('active-project').textContent = project;

  // Update button states
  const buttons = document.querySelectorAll('.video-selector-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active-video-btn');
    btn.style.boxShadow = 'none';
    btn.style.borderColor = 'rgba(148,120,220,0.12)';
  });
  
  // Find clicked button and style
  const clickedBtn = event.currentTarget || event.target.closest('.video-selector-btn');
  if (clickedBtn) {
    clickedBtn.classList.add('active-video-btn');
    clickedBtn.style.borderColor = 'rgba(124,58,237,0.25)';
    clickedBtn.style.boxShadow = '0 0 0 2px rgba(124,58,237,0.15)';
  }
}