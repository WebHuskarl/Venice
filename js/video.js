export function initVideo() {
  document.querySelectorAll('[data-video-toggle]').forEach((wrapper) => {
    const video = wrapper.querySelector('video');
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let userPaused = reduceMotion;

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

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio <= 0 || !entry.isIntersecting) {
          video.pause();
          return;
        }
        tryPlay();
      },
      { threshold: [0, 0.01] }
    );

    io.observe(wrapper);

    wrapper.addEventListener('click', () => {
      if (video.paused) {
        userPaused = false;
        tryPlay();
      } else {
        userPaused = true;
        video.pause();
      }
    });

    if (!reduceMotion) tryPlay();
    else markReady();
  });
}
