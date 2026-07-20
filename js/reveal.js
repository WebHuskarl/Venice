const STAGGER_MS = 70;

const RULES = [
  {
    sel: [
      'main h1',
      'main h2',
      'main .booking__title',
      'main .calc__title',
      'main .contacts__title',
      'main .turnkey__implantation-title',
      'main .turnkey__prosthetics-title',
      'main .consultation__content-title',
      'main .experts__top-title',
      'main .reviews__left-title',
      'main .result__info-title',
      'footer .footer__logo',
    ].join(','),
    variant: 'title',
  },
  {
    sel: [
      'main .result__info-descr',
      'main .experts__top-descr',
      'main .reviews__left-descr',
      'main .consultation__content-descr',
      'main .turnkey__implantation-descr',
      'main .turnkey__prosthetics-descr',
      'main .turnkey__title-span',
    ].join(','),
    variant: 'fade',
  },
  {
    sel: [
      'main .hero__video-mask',
      'main .hero__mobile-photo',
      'main .result__media-doctor',
      'main .consultation__content-media-doctor',
      'main .contacts__map-wrapper',
      'main .contacts__gallery',
    ].join(','),
    variant: 'left',
  },
  {
    sel: [
      'main .hero__info-wrapper > *',
      'main .result__media-plan',
      'main .booking__form',
      'main .consultation__form',
      'main .calc__quiz',
      'main .calc__sale',
      'main .turnkey__countries-block',
      'main .experts__top-successes',
      'main .reviews__right-badge',
      'main .contacts__info',
    ].join(','),
    variant: 'right',
  },
  {
    sel: [
      'main .result__info-cards-item',
      'main .experts__middle-item',
      'main .experts__bottom-item',
      'main .reviews__card',
      'main .contacts__card',
      'main .turnkey__implantation-card',
      'main .turnkey__prosthetics-card',
      'main .turnkey__implantation-plus-item',
      'main .turnkey__prosthetics-plus-item',
      'main .hero__video-item',
      'main .consultation__sale',
      'main .booking__countdown',
      'main .booking__contact',
      'main .experts__bottom-button',
      'main .reviews__nav',
      'main .reviews__ratings',
      'footer .footer__col',
      'footer .footer__btn',
    ].join(','),
    variant: 'up',
    stagger: true,
  },
  {
    sel: ['main .hero__video-preview-block'].join(','),
    variant: 'scale',
  },
];

function mark(el, variant, delayIndex = 0) {
  if (!el || el.dataset.reveal != null) return;
  el.dataset.reveal = variant;
  if (delayIndex > 0) {
    el.style.setProperty('--reveal-delay', `${delayIndex * STAGGER_MS}ms`);
  }
}

function applyRules() {
  for (const rule of RULES) {
    const nodes = document.querySelectorAll(rule.sel);
    if (!rule.stagger) {
      nodes.forEach((el) => mark(el, rule.variant));
      continue;
    }

    const byParent = new Map();
    nodes.forEach((el) => {
      const parent = el.parentElement;
      if (!byParent.has(parent)) byParent.set(parent, []);
      byParent.get(parent).push(el);
    });

    byParent.forEach((children) => {
      children.forEach((el, i) => {
        const variant =
          rule.variant === 'up' && i % 3 === 2 ? 'scale' : rule.variant;
        mark(el, variant, i);
      });
    });
  }
}

export function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  applyRules();

  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const reveal = (el) => {
    el.classList.add('is-in');
    const done = () => {
      el.classList.add('is-done');
      el.removeEventListener('transitionend', done);
    };
    el.addEventListener('transitionend', done, { once: true });
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        io.unobserve(entry.target);
      }
    },
    {
      root: null,
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.1,
    }
  );

  targets.forEach((el) => io.observe(el));
}
