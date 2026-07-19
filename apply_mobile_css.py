import os
import shutil

base_dir = r'c:\Users\USERR\Desktop\Венеция'
css_dir = os.path.join(base_dir, 'css', 'components')

# 1. Move the image
src_img = r'C:\Users\USERR\.gemini\antigravity-ide\brain\460508a7-cabc-4aed-8498-73bd36400e29\hero_mobile_bg_1784424557240.png'
dest_img = os.path.join(base_dir, 'images', 'photos', 'hero_mobile_bg.png')
if os.path.exists(src_img):
    shutil.copy(src_img, dest_img)

# 2. Append CSS blocks
css_updates = {
    'header.css': """
@media (max-width: 768px) {
  .header__container { padding: 1.5rem 2rem; justify-content: space-between; }
  .header__contacts, .header__call-button { display: none; }
  .header__burger { display: flex; z-index: 101; }
  .header__nav { 
    position: fixed; top: 0; left: 0; width: 100%; height: 100vh; 
    background: var(--color-white); z-index: 100;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
  }
  .header.nav-active .header__nav, body.nav-active .header__nav { opacity: 1; pointer-events: auto; }
  .header__nav-list { flex-direction: column; align-items: center; gap: 3rem; }
  .header__nav-link { font-size: 2.4rem; }
}
""",
    'hero.css': """
@media (max-width: 768px) {
  .hero__container { flex-direction: column; padding: 2rem; }
  .hero__video-wrapper { display: none; }
  .hero { 
    background-image: url('../../images/photos/hero_mobile_bg.png'); 
    background-size: cover; background-position: center; 
    position: relative;
  }
  .hero::after {
    content: ''; position: absolute; inset: 0; 
    background: rgba(255, 255, 255, 0.85); z-index: 0;
  }
  .hero__container { position: relative; z-index: 1; }
  .hero__info-title { font-size: 4rem; text-align: center; margin-bottom: 2rem; }
  .hero__info-descr { font-size: 1.8rem; text-align: center; margin-bottom: 3rem; }
  .hero__info-action { flex-direction: column; align-items: stretch; gap: 2rem; }
  .hero__info-action-btn { width: 100%; justify-content: center; }
  .hero__info-features { flex-direction: column; gap: 1.5rem; }
}
""",
    'result.css': """
@media (max-width: 768px) {
  .result__container { padding: 4rem 2rem; }
  .result__title { font-size: 3.2rem; margin-bottom: 3rem; text-align: center; }
  .result__cards { flex-direction: column; gap: 2rem; }
  .result__card { width: 100%; height: auto; clip-path: none; border-radius: 2rem; padding: 3rem; }
  .result__card-title { font-size: 2.4rem; margin-bottom: 1.5rem; }
  .result__card-descr { font-size: 1.6rem; }
  .result__card-num { position: static; transform: none; font-size: 3rem; margin-bottom: 1rem; text-align: right; }
  .result__media { flex-direction: column; height: auto; padding: 0; background: none; }
  .result__media-info { width: 100%; padding: 3rem; background: var(--color-white); border-radius: 2rem; text-align: center; }
  .result__media-doctor { position: static; width: 100%; border-radius: 2rem; margin-top: 2rem; }
  .result__media-plan { position: static; transform: none; width: 100%; margin-top: 2rem; }
}
""",
    'turnkey.css': """
@media (max-width: 768px) {
  .turnkey__container { padding: 4rem 2rem; }
  .turnkey__top { flex-direction: column; gap: 3rem; margin-bottom: 4rem; }
  .turnkey__title { font-size: 3.2rem; text-align: center; }
  .turnkey__countries { flex-wrap: wrap; justify-content: center; }
  .turnkey__cards { flex-direction: column; gap: 3rem; }
  .turnkey__card { width: 100%; height: auto; clip-path: none; border-radius: 2rem; }
}
""",
    'booking.css': """
@media (max-width: 768px) {
  .booking__container { padding: 4rem 2rem; }
  .booking__inner { flex-direction: column; gap: 3rem; padding: 3rem; height: auto; border-radius: 2rem; }
  .booking__title { font-size: 2.8rem; text-align: center; }
  .booking__form-inputs { flex-direction: column; }
  .booking__countdown { margin-left: 0; margin-top: 2rem; justify-content: center; }
  .booking__contact { position: static; margin-top: 2rem; text-align: center; }
}
""",
    'experts.css': """
@media (max-width: 768px) {
  .experts { padding: 4rem 0; }
  .experts__top { flex-direction: column; align-items: center; text-align: center; gap: 2rem; padding: 0 2rem; }
  .experts__top-title { font-size: 3.2rem; }
  .experts__top-successes { width: 100%; height: auto; padding: 3rem; clip-path: none; border-radius: 2rem; align-items: center; justify-content: center; text-align: center;}
  .experts__middle-list { flex-direction: column; gap: 2rem; padding: 0 2rem; text-align: center; align-items: center; }
  .experts__cards-list { flex-direction: column; gap: 2rem; padding: 0 2rem; }
  .experts__card { width: 100%; height: auto; }
}
""",
    'consultation.css': """
@media (max-width: 768px) {
  .consultation__container { padding: 4rem 2rem; }
  .consultation__inner { flex-direction: column; padding: 3rem; border-radius: 2rem; height: auto; }
  .consultation__content { max-width: 100%; text-align: center; }
  .consultation__title { font-size: 3.2rem; }
  .consultation__content-media { margin-top: 3rem; flex-direction: column; align-items: center; text-align: center; }
  .consultation__form { width: 100%; padding: 3rem; border-radius: 2rem; margin-top: 3rem; position: static; transform: none; }
}
""",
    'reviews.css': """
@media (max-width: 768px) {
  .reviews { padding: 4rem 0; }
  .reviews__header { flex-direction: column; gap: 3rem; padding: 0 2rem; align-items: center; text-align: center; }
  .reviews__left-title { font-size: 3.2rem; }
  .reviews__left-title-accent--bottom { padding-left: 0; }
  .reviews__left-descr { width: 100%; }
  .reviews__right-badge { width: 100%; height: auto; clip-path: none; border-radius: 2rem; align-items: center; text-align: center; justify-content: center; padding: 3rem; }
  .reviews__nav { position: static; transform: none; justify-content: center; gap: 2rem; margin-top: 3rem; padding: 0; }
  .reviews__ratings { margin-top: 3rem; }
  .reviews__ratings-list { display: flex; flex-direction: column; padding: 0 2rem; gap: 1rem; width: 100%; }
  .reviews__ratings-item { width: 100%; padding: 1.5rem; justify-content: flex-start; }
  .reviews__marquee-wrapper { animation: none; width: 100%; }
  .reviews__marquee-wrapper > .reviews__ratings-list:last-child { display: none; } /* hide duplicated marquee list on mobile */
}
""",
    'calc.css': """
@media (max-width: 768px) {
  .calc { padding: 4rem 2rem; }
  .calc__inner { padding: 3rem; border-radius: 2rem; height: auto; }
  .calc__title { font-size: 2.8rem; text-align: center; }
  .calc__grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .calc__nav { flex-direction: column; gap: 2rem; }
  .calc__btn { width: 100%; justify-content: center; }
}
""",
    'footer.css': """
@media (max-width: 768px) {
  .footer { padding: 4rem 0; }
  .footer__top { flex-direction: column; gap: 4rem; align-items: center; text-align: center; padding: 0 2rem; }
  .footer__nav { flex-direction: column; gap: 2rem; align-items: center; }
  .footer__socials { flex-direction: column; align-items: center; gap: 2rem; }
  .footer__bottom { flex-direction: column; gap: 2rem; text-align: center; padding: 0 2rem; margin-top: 4rem;}
}
"""
}

for filename, css in css_updates.items():
    file_path = os.path.join(css_dir, filename)
    if os.path.exists(file_path):
        with open(file_path, 'a', encoding='utf-8') as f:
            f.write(css)
        print(f"Appended mobile css to {filename}")

print("Mobile adaptation applied!")
