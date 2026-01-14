document.querySelectorAll('[data-burger-toggle]').forEach(burger => {
  const nav = document.getElementById('header-nav');
  
  burger.addEventListener('click', () => {
    const isActive = burger.classList.contains('active');
    
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    burger.setAttribute('aria-expanded', !isActive);
  });
});

document.querySelectorAll('[data-nav-close]').forEach(link => {
  link.addEventListener('click', () => {
    const burger = document.querySelector('[data-burger-toggle]');
    const nav = document.getElementById('header-nav');
    
    burger.classList.remove('active');
    nav.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
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
