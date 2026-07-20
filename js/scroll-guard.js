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

  const unlock = () => {
    document.documentElement.classList.remove('scroll-lock-boot');
  };

  // Только стартовый сброс — без перехвата скролла пользователя
  toTop();
  requestAnimationFrame(() => {
    toTop();
    unlock();
  });

  window.addEventListener(
    'load',
    () => {
      toTop();
      unlock();
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
      unlock();
    }
  });
}
