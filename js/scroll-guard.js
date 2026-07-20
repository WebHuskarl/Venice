export function initScrollGuard() {
  history.scrollRestoration = 'manual';

  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }

  const toTop = () => {
    const active = document.activeElement;
    if (
      active &&
      active !== document.body &&
      active !== document.documentElement &&
      typeof active.blur === 'function'
    ) {
      active.blur();
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  toTop();
  requestAnimationFrame(toTop);

  const unlock = () => {
    document.documentElement.classList.remove('scroll-lock-boot');
  };

  const armGuard = (ms = 1200) => {
    const until = Date.now() + ms;
    const onScroll = () => {
      if (Date.now() > until) {
        window.removeEventListener('scroll', onScroll);
        return;
      }
      if (window.scrollY > 0) toTop();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  armGuard(1200);

  window.addEventListener(
    'load',
    () => {
      toTop();
      [50, 150, 400, 800].forEach((delay) => setTimeout(toTop, delay));
      setTimeout(unlock, 900);
      armGuard(1500);
    },
    { once: true }
  );

  // bfcache / «назад» — браузер может вернуть старый scroll
  window.addEventListener('pageshow', (e) => {
    if (e.persisted || location.hash) {
      if (location.hash) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      document.documentElement.classList.add('scroll-lock-boot');
      toTop();
      armGuard(800);
      setTimeout(unlock, 500);
    }
  });
}
