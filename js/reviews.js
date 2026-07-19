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
  const wrapper = list?.parentElement;

  if (!list || !prevBtn || !nextBtn || !wrapper) return;

  const cards = list.querySelectorAll('.reviews__card');
  if (!cards.length) return;

  let index = 0;
  let visible = 1;
  let currentGap = 30;
  const GAP = 30;
  const CARD = 322;

  function getMaxIndex() {
    return Math.max(0, cards.length - visible);
  }

  function layout() {
    const available = wrapper.parentElement?.clientWidth || wrapper.clientWidth;
    let cardW;
    currentGap = GAP;

    // При достаточной ширине карточки 322px — clip-path path() требует фиксированный размер
    if (available >= CARD * 3 + GAP * 2 + 24) {
      visible = 3;
      cardW = CARD;
    } else if (available >= CARD * 2 + GAP + 24) {
      visible = 2;
      cardW = CARD;
    } else if (available >= CARD) {
      visible = 1;
      cardW = CARD;
      currentGap = 0;
    } else {
      // уже уже 322px — на очень узких экранах подстраиваем
      visible = 1;
      cardW = available;
      currentGap = 0;
    }

    const trackWidth = visible * cardW + (visible - 1) * currentGap;
    wrapper.style.width = `${Math.min(trackWidth, available)}px`;
    wrapper.style.maxWidth = '100%';
    wrapper.style.marginLeft = 'auto';
    wrapper.style.marginRight = 'auto';

    list.style.gap = `${currentGap}px`;
    cards.forEach((card) => {
      card.style.flex = `0 0 ${cardW}px`;
      card.style.width = `${cardW}px`;
      card.style.maxWidth = 'none';
    });

    if (index > getMaxIndex()) index = getMaxIndex();
    slide(cardW);
  }

  function slide(cardW) {
    const width = cardW || cards[0].getBoundingClientRect().width || CARD;
    const maxIndex = getMaxIndex();
    if (index > maxIndex) index = maxIndex;

    cards.forEach((card, i) => {
      if (i < index || i >= index + visible) {
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

    list.style.transform = `translateX(-${index * (width + currentGap)}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      slide();
    }
  });
  nextBtn.addEventListener('click', () => {
    if (index < getMaxIndex()) {
      index++;
      slide();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 150);
  });

  layout();
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
