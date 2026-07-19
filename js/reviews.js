export function initReviews() {
  initCarousel();
  initExpandable();
  initVideoReviews();
}

/* ─── CAROUSEL ─────────────────────────────────────── */
function initCarousel() {
  const list    = document.getElementById('reviews-cards-list');
  const prevBtn = document.getElementById('reviews-prev');
  const nextBtn = document.getElementById('reviews-next');

  if (!list || !prevBtn || !nextBtn) return;

  const cards = list.querySelectorAll('.reviews__card');
  if (!cards.length) return;

  const VISIBLE = 3;
  let index = 0;
  const maxIndex = Math.max(0, cards.length - VISIBLE);

  function slide() {
    // Auto-collapse any expanded cards that are out of view
    cards.forEach((card, i) => {
      if (i < index || i >= index + VISIBLE) {
        const btn = card.querySelector('.reviews__card-toggle');
        if (btn && btn.getAttribute('aria-expanded') === 'true') {
          const content = card.querySelector('.reviews__card-full');
          const icon    = btn.querySelector('.reviews__toggle-icon');
          const text    = btn.querySelector('.reviews__toggle-text');
          
          if (content) content.hidden = true;
          btn.setAttribute('aria-expanded', 'false');
          if (icon) icon.textContent = '+';
          if (text) text.textContent = 'Читать отзыв';
        }
      }
    });

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(list).gap) || 20;
    list.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= maxIndex;
  }

  prevBtn.addEventListener('click', () => { if (index > 0)        { index--; slide(); } });
  nextBtn.addEventListener('click', () => { if (index < maxIndex) { index++; slide(); } });

  slide();
}

/* ─── EXPANDABLE REVIEW TEXT ──────────────────────── */
function initExpandable() {
  const allBtns = document.querySelectorAll('.reviews__card-toggle, .reviews__video-toggle');
  
  allBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const root     = btn.closest('.reviews__card, .reviews__video-card');
      if (!root) return;

      const content = root.querySelector('.reviews__card-full, .reviews__video-full');
      const icon    = btn.querySelector('.reviews__toggle-icon');
      const text    = btn.querySelector('.reviews__toggle-text');
      if (!content) return;

      // Close all others
      if (!expanded) {
        allBtns.forEach(otherBtn => {
          if (otherBtn !== btn && otherBtn.getAttribute('aria-expanded') === 'true') {
            const otherRoot = otherBtn.closest('.reviews__card, .reviews__video-card');
            if (otherRoot) {
              const otherContent = otherRoot.querySelector('.reviews__card-full, .reviews__video-full');
              const otherIcon    = otherBtn.querySelector('.reviews__toggle-icon');
              const otherText    = otherBtn.querySelector('.reviews__toggle-text');
              
              if (otherContent) otherContent.hidden = true;
              otherBtn.setAttribute('aria-expanded', 'false');
              if (otherIcon) otherIcon.textContent = '+';
              if (otherText) otherText.textContent = 'Читать отзыв';
            }
          }
        });
      }

      if (expanded) {
        content.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        if (icon) icon.textContent = '+';
        if (text) text.textContent = 'Читать отзыв';
      } else {
        content.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        if (icon) icon.textContent = '−';
        if (text) text.textContent = 'Свернуть';
      }
    });
  });
}

/* ─── VIDEO REVIEWS ───────────────────────────────── */
function initVideoReviews() {
  document.querySelectorAll('[data-reviews-video]').forEach(wrapper => {
    const video   = wrapper.querySelector('video');
    const playBtn = wrapper.querySelector('.reviews__video-play');
    if (!video || !playBtn) return;

    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        wrapper.classList.add('is-playing');
      } else {
        video.pause();
        wrapper.classList.remove('is-playing');
      }
    });

    video.addEventListener('pause', () => wrapper.classList.remove('is-playing'));
    video.addEventListener('ended', () => wrapper.classList.remove('is-playing'));
  });
}
