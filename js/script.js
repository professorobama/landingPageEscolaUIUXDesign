// Utilidades de UX: navegação, validação e microinterações
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
const header = document.querySelector('.header');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navList.classList.toggle('is-open');
  });
}

// Elevação do header ao rolar
const elevacao = () => {
  if (window.scrollY > 8) header.classList.add('is-elevado');
  else header.classList.remove('is-elevado');
};
window.addEventListener('scroll', elevacao);
elevacao();

// Scroll suave para âncoras com data-scroll e itens do menu
const smoothLinks = document.querySelectorAll('[data-scroll], .nav__list a');
smoothLinks.forEach((a) => a.addEventListener('click', (e) => {
  const href = a.getAttribute('href');
  if (href && href.startsWith('#')) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    navList.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
}));

// Validação simples do formulário com feedback não intrusivo
const form = document.getElementById('leadForm');
const hint = document.getElementById('formHint');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email');
  if (!email.value || !email.validity.valid) {
    hint.textContent = 'Por favor, informe um e-mail válido.';
    hint.style.color = 'var(--danger)';
    email.focus();
    return;
  }
  hint.textContent = 'Obrigado! Em breve você receberá novidades.';
  hint.style.color = 'var(--success)';
  form.reset();
});

// Carousel simples com acessibilidade básica
const slides = Array.from(document.querySelectorAll('.carousel__slide'));
const prev = document.querySelector('.carousel__ctrl[data-dir="prev"]');
const next = document.querySelector('.carousel__ctrl[data-dir="next"]');
let index = 0;

function updateCarousel() {
  slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
}
prev?.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});
next?.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});
updateCarousel();

// Ano dinâmico no rodapé
document.getElementById('year').textContent = new Date().getFullYear();