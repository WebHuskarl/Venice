export function initMenu() {
  const burger = document.querySelector('[data-burger-toggle]');
  const nav    = document.getElementById('header-nav');

  if (!burger || !nav) return;

  function openMenu() {
    burger.classList.add('active');
    nav.classList.add('active');
    document.body.classList.add('nav-active');
    burger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    document.body.classList.remove('nav-active');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('active') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('active')) {
      closeMenu();
    }
  });
}
