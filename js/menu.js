export function initMenu() {
  const header = document.querySelector('.header');
  const burger = document.querySelector('[data-burger-toggle]');
  const nav = document.getElementById('header-nav');
  const container = document.querySelector('.header__container');

  if (header) {
    let ticking = false;
    const syncScrolled = () => {
      if (!document.body.classList.contains('nav-active')) {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncScrolled);
    };
    syncScrolled();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (!burger || !nav) return;

  nav.hidden = false;

  let scrollY = 0;
  let headerOffset = 0;

  function syncHeaderHeight() {
    const h = header ? header.offsetHeight : 0;
    document.documentElement.style.setProperty('--header-h', `${h}px`);
    return h;
  }

  /** Правый край панели = правый край контейнера */
  function syncNavToContainer() {
    syncHeaderHeight();

    if (window.matchMedia('(max-width: 768px)').matches) {
      nav.style.right = '0';
      nav.style.left = '0';
      nav.style.top = '';
      return;
    }

    nav.style.left = 'auto';
    nav.style.top = '';
    const box = container || burger;
    const rect = box.getBoundingClientRect();
    const rightGap = Math.max(0, window.innerWidth - rect.right);
    nav.style.right = `${rightGap}px`;
  }

  function openMenu() {
    scrollY = window.scrollY;
    headerOffset = syncHeaderHeight();

    syncNavToContainer();
    burger.classList.add('active');
    nav.classList.add('active');
    document.body.classList.add('nav-active');
    document.documentElement.classList.add('nav-active');

    if (headerOffset) {
      document.body.style.paddingTop = `${headerOffset}px`;
    }

    requestAnimationFrame(syncNavToContainer);

    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    document.body.classList.remove('nav-active');
    document.documentElement.classList.remove('nav-active');
    document.body.style.paddingTop = '';
    window.scrollTo(0, scrollY);
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');

    if (header) {
      header.classList.toggle('is-scrolled', scrollY > 12);
    }
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('active') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('.header__nav-link').forEach((link) => {
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

  window.addEventListener('resize', () => {
    if (nav.classList.contains('active')) syncNavToContainer();
  });
}
