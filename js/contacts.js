export function initContacts() {
  const nextBtn = document.getElementById('contacts-next');
  const prevBtn = document.getElementById('contacts-prev');
  const slides = document.getElementById('contacts-gallery');

  if (nextBtn && prevBtn && slides) {
    function getStep() {
      const first = slides.querySelector('.contacts__gallery-img');
      if (!first) return slides.clientWidth;
      const gap = parseFloat(getComputedStyle(slides).gap) || 0;
      // На мобилке 1 фото = 100% ширины; на десктопе — ширина карточки + gap
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

  // Карту инициализируем только когда секция в зоне видимости —
  // иначе ymaps фокусирует контейнер и страница уезжает вниз при загрузке.
  const mapEl = document.getElementById('contacts-map');
  if (typeof ymaps !== 'undefined' && mapEl) {
    const startMap = () => ymaps.ready(initMap);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
          io.disconnect();
          startMap();
        }
      }, { rootMargin: '200px' });
      io.observe(mapEl);
    } else {
      startMap();
    }
  }

  function initMap() {
    const mapEl = document.getElementById('contacts-map');
    if (!mapEl) return;

    // Яндекс.Карта при создании фокусирует контейнер — из-за
    // scroll-behavior: smooth страница уезжает вниз. Блокируем это.
    const savedY = window.scrollY;
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    const myMap = new ymaps.Map("contacts-map", {
      center: [55.772, 37.605],
      zoom: 13,
      controls: []
    }, {
      suppressMapOpenBlock: true
    });

    myMap.controls.add('zoomControl', {
      position: {
        right: 10,
        top: 10
      }
    });

    const placemarks = [
      [55.7698, 37.5960], // Маяковская
      [55.7801, 37.6015], // Новослободская
      [55.7716, 37.6205], // Цветной бульвар
      [55.7812, 37.5995]  // Менделеевская
    ];

    placemarks.forEach(coords => {
      myMap.geoObjects.add(new ymaps.Placemark(coords, {}, {
        preset: 'islands#blueCircleDotIcon'
      }));
    });

    const restoreScroll = () => {
      window.scrollTo(0, savedY);
      if (document.activeElement && mapEl.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    };
    restoreScroll();
    requestAnimationFrame(restoreScroll);
    setTimeout(() => {
      restoreScroll();
      html.style.scrollBehavior = prevBehavior;
    }, 0);

    // Ресайз/смена брейкпоинта меняет размер контейнера карты.
    // Без ручного пересчёта Яндекс-карта оставляет серые/битые тайлы.
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
