export function initContacts() {
  const nextBtn = document.getElementById('contacts-next');
  const prevBtn = document.getElementById('contacts-prev');
  const slides = document.getElementById('contacts-gallery');

  if (nextBtn && prevBtn && slides) {
    nextBtn.addEventListener('click', () => {
      if (slides.scrollLeft + slides.clientWidth >= slides.scrollWidth - 10) {
        slides.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slides.scrollBy({ left: slides.offsetWidth / 2 + 12, behavior: 'smooth' });
      }
    });

    prevBtn.addEventListener('click', () => {
      if (slides.scrollLeft <= 10) {
        slides.scrollTo({ left: slides.scrollWidth, behavior: 'smooth' });
      } else {
        slides.scrollBy({ left: -(slides.offsetWidth / 2 + 12), behavior: 'smooth' });
      }
    });
  }

  if (typeof ymaps !== 'undefined') {
    ymaps.ready(initMap);
  }

  function initMap() {
    const mapEl = document.getElementById('contacts-map');
    if (!mapEl) return;
    
    const myMap = new ymaps.Map("contacts-map", {
      center: [55.772, 37.605],
      zoom: 13,
      controls: []
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
  }
}
