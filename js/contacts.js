export function initContacts() {
  const nextBtn = document.getElementById('contacts-next');
  const prevBtn = document.getElementById('contacts-prev');
  const slides = document.getElementById('contacts-gallery');

  if (nextBtn && prevBtn && slides) {
    function getStep() {
      const first = slides.querySelector('.contacts__gallery-img');
      if (!first) return slides.clientWidth;
      const gap = parseFloat(getComputedStyle(slides).gap) || 0;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      return isMobile
        ? first.offsetWidth
        : first.offsetWidth + gap;
    }

    nextBtn.addEventListener('click', () => {
      const step = getStep();
      if (slides.scrollLeft + slides.clientWidth >= slides.scrollWidth - 10) {
        slides.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slides.scrollBy({ left: step, behavior: 'smooth' });
      }
    });

    prevBtn.addEventListener('click', () => {
      const step = getStep();
      if (slides.scrollLeft <= 10) {
        slides.scrollTo({ left: slides.scrollWidth, behavior: 'smooth' });
      } else {
        slides.scrollBy({ left: -step, behavior: 'smooth' });
      }
    });
  }

  const mapEl = document.getElementById('contacts-map');
  if (!mapEl) return;

  const loadYmaps = () =>
    new Promise((resolve, reject) => {
      if (window.ymaps) {
        resolve();
        return;
      }
      const existing = document.querySelector('script[data-ymaps]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      script.dataset.ymaps = 'true';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });

  const startMap = () => {
    loadYmaps()
      .then(() => {
        if (window.ymaps) window.ymaps.ready(initMap);
      })
      .catch(() => {});
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          startMap();
        }
      },
      { rootMargin: '120px' }
    );
    io.observe(mapEl);
  } else {
    startMap();
  }

  function initMap() {
    const mapNode = document.getElementById('contacts-map');
    if (!mapNode) return;

    const savedY = window.scrollY;
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    const myMap = new ymaps.Map(
      'contacts-map',
      {
        center: [55.772, 37.605],
        zoom: 13,
        controls: [],
      },
      {
        suppressMapOpenBlock: true,
      }
    );

    myMap.controls.add('zoomControl', {
      position: {
        right: 10,
        top: 10,
      },
    });

    const placemarks = [
      [55.7698, 37.596],
      [55.7801, 37.6015],
      [55.7716, 37.6205],
      [55.7812, 37.5995],
    ];

    placemarks.forEach((coords) => {
      myMap.geoObjects.add(
        new ymaps.Placemark(coords, {}, {
          preset: 'islands#blueCircleDotIcon',
        })
      );
    });

    const restoreScroll = () => {
      window.scrollTo(0, savedY);
      if (document.activeElement && mapNode.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    };
    restoreScroll();
    requestAnimationFrame(restoreScroll);
    setTimeout(() => {
      restoreScroll();
      html.style.scrollBehavior = prevBehavior;
    }, 0);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const center = myMap.getCenter();
        myMap.container.fitToViewport();
        myMap.setCenter(center);
      }, 150);
    });
  }
}
