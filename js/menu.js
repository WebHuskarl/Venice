export function initMenu() {
  const burger = document.querySelector('[data-burger-toggle]');
  const nav    = document.getElementById('header-nav');

  if (!burger || !nav) return;

  let scrollY = 0;

  function openMenu() {
    scrollY = window.scrollY;
    burger.classList.add('active');
    nav.classList.add('active');
    document.body.classList.add('nav-active');
    document.documentElement.classList.add('nav-active');
    document.body.style.top = `-${scrollY}px`;
    burger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    document.body.classList.remove('nav-active');
    document.documentElement.classList.remove('nav-active');
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('active') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  const navCall = nav.querySelector('.header__nav-call');
  if (navCall) {
    navCall.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('active')) {
      closeMenu();
    }
  });
}
