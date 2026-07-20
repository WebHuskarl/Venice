export function initVideo() {
  document.querySelectorAll('[data-video-toggle]').forEach((wrapper) => {
    const video = wrapper.querySelector('video');
    if (!video) return;

    const isMobileHero = window.matchMedia('(max-width: 1279px)').matches;
    if (isMobileHero) {
      video.removeAttribute('src');
      video.removeAttribute('autoplay');
      video.load();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'metadata';

    if (!wrapper.hasAttribute('role')) {
      wrapper.setAttribute('role', 'button');
    }
    if (!wrapper.hasAttribute('tabindex')) {
      wrapper.setAttribute('tabindex', '0');
    }
    if (!wrapper.hasAttribute('aria-label')) {
      wrapper.setAttribute(
        'aria-label',
        'Видео имплантации All-on-6. Нажмите, чтобы поставить на паузу или воспроизвести'
      );
    }
    video.setAttribute('aria-hidden', 'true');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let userPaused = reduceMotion;

    const syncLabel = () => {
      wrapper.setAttribute(
        'aria-label',
        video.paused
          ? 'Видео на паузе. Нажмите, чтобы воспроизвести'
          : 'Видео воспроизводится. Нажмите, чтобы поставить на паузу'
      );
    };

    const markReady = () => {
      video.classList.add('is-ready');
    };

    if (video.readyState >= 2) {
      markReady();
    } else {
      video.addEventListener('loadeddata', markReady, { once: true });
      video.addEventListener('canplay', markReady, { once: true });
    }

    const tryPlay = () => {
      if (userPaused) return;
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {});
    };

    const toggle = () => {
      if (video.paused) {
        userPaused = false;
        tryPlay();
      } else {
        userPaused = true;
        video.pause();
      }
      syncLabel();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio <= 0 || !entry.isIntersecting) {
          video.pause();
          syncLabel();
          return;
        }
        tryPlay();
        syncLabel();
      },
      { threshold: [0, 0.01] }
    );

    io.observe(wrapper);

    wrapper.addEventListener('click', toggle);
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });

    if (!reduceMotion) tryPlay();
    else markReady();
    syncLabel();
  });
}
