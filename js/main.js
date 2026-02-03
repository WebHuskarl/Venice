// Меню кнопка
const burgerButton = document.querySelector('.burger-button');
const nav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__nav-link');

// переключение меню
burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('active');
  nav.classList.toggle('active');
  burgerButton.setAttribute('aria-expanded', burgerButton.classList.contains('active') ? 'true' : 'false');
});

// закрытие меню при клике по ссылке
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // закрываем меню
    burgerButton.classList.remove('active');
    nav.classList.remove('active');
    burgerButton.setAttribute('aria-expanded', 'false');
  });
});



//Hero включение/выключение видео
document.querySelectorAll('[data-video-toggle]').forEach(wrapper => {
  const video = wrapper.querySelector('video');
  
  wrapper.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
});
