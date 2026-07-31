document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initSmoothScroll();
  initCardsPulseEffect();
});

function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initCardsPulseEffect() {
  const cards = document.querySelectorAll('.card');
  const loginBtn = document.querySelector('.btn-login');

  if (!cards.length || !loginBtn) return;

  cards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      loginBtn.classList.remove('pulse');
      void loginBtn.offsetWidth;
      loginBtn.classList.add('pulse');
    });
  });
}