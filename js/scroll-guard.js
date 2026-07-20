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
  };

  toTop();
  requestAnimationFrame(toTop);
  window.addEventListener(
    'load',
    () => {
      toTop();
      setTimeout(toTop, 50);
      setTimeout(toTop, 200);
    },
    { once: true }
  );
}
