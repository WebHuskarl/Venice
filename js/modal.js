import { initCalc } from './calc.js';

export function initModals() {
  if (!document.getElementById('global-modal')) {
    const modalHTML = `
      <div class="modal-overlay" id="global-modal">
        <div class="modal-container">
          <button class="modal-close" id="modal-close" type="button" aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="modal-content" id="modal-content"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal = document.getElementById('global-modal');
  const closeBtn = document.getElementById('modal-close');
  const content = document.getElementById('modal-content');

  function openModal(htmlContent, isCalc = false) {
    content.innerHTML = htmlContent;
    delete content.dataset.success;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (isCalc) {
      document.querySelector('.modal-container').classList.add('modal-container--calc');
      document.getElementById('modal-close').style.display = 'none';
      initCalc();
      const calcClose = content.querySelector('.calc-close');
      if (calcClose) calcClose.addEventListener('click', closeModal);
    } else {
      document.querySelector('.modal-container').classList.remove('modal-container--calc');
      document.getElementById('modal-close').style.display = 'none';
      initCallFormValidation(content);
      const callClose = content.querySelector('.modal-form-close');
      if (callClose) callClose.addEventListener('click', closeModal);
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initCallFormValidation(container) {
    const submitBtn = container.querySelector('.modal-form__btn');
    const phoneInput = container.querySelector('.modal-form__input');
    const checkboxes = container.querySelectorAll('.modal-form__checkbox');
    if (!submitBtn || !phoneInput) return;

    phoneInput.addEventListener('input', function(e) {
      let val = this.value.replace(/\D/g, '');
      if (!val) {
        this.value = '';
        return;
      }
      if (val[0] === '8') val = '7' + val.substring(1);
      if (val[0] !== '7') val = '7' + val;
      val = val.substring(0, 11);
      
      let formatted = '+7';
      if (val.length > 1) formatted += ' (' + val.substring(1, 4);
      if (val.length > 4) formatted += ') ' + val.substring(4, 7);
      if (val.length > 7) formatted += '-' + val.substring(7, 9);
      if (val.length > 9) formatted += '-' + val.substring(9, 11);
      this.value = formatted;
      this.classList.remove('error');
    });

    submitBtn.addEventListener('click', () => {
      let isValid = true;
      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length < 11) {
        phoneInput.classList.add('error');
        isValid = false;
      }
      checkboxes.forEach(cb => {
        if (!cb.checked) {
          isValid = false;
          cb.parentElement.style.color = 'red';
        } else {
          cb.parentElement.style.color = '';
        }
      });
      if (isValid) {
        container.innerHTML = `
          <div style="padding: 60px; text-align: center;">
            <h3 style="font-size: 28px; margin-bottom: 16px;">Заявка отправлена!</h3>
            <p style="font-size: 18px; color: #666;">Мы перезвоним вам в ближайшее время.</p>
          </div>
        `;
        container.dataset.success = 'true';
      }
    });
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
      const isCallSuccess = content.dataset.success === 'true';
      const isCalcSuccess = content.querySelector('.calc__quiz')?.dataset?.success === 'true';
      
      if (isCallSuccess || isCalcSuccess) {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const submitBtn = content.querySelector('.modal-form__btn');
        if (submitBtn) submitBtn.click();
      }
    }
  });

  const callHtml = `
    <div class="modal-form" style="background: #EEF2FF; padding: 24px; border-radius: 20px; position: relative;">
      <button type="button" class="modal-form-close" style="position: absolute; top: 16px; right: 16px; width: 44px; height: 44px; background: #fff; border: none; border-radius: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center; z-index: 10; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>

      <div style="display: flex; flex-direction: row; width: 100%; max-width: 900px; margin: 0 auto;">
        <div class="modal-form__left" style="background: transparent;">
          <h3 class="modal-form__title" style="margin-bottom: 16px;">Оставьте номер<br>телефона</h3>
          <p class="modal-form__subtitle" style="margin-bottom: 32px;">Перезвоним в ближайшее время</p>
          <ul class="modal-form__list" style="display: flex; flex-direction: column; gap: 16px;">
            <li style="display: flex; gap: 12px; align-items: flex-start;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="min-width:20px;margin-top:2px"><circle cx="12" cy="12" r="12" fill="#4B6EB1"/><path d="M7 12L10.5 15.5L17 8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Ответим на все вопросы
            </li>
            <li style="display: flex; gap: 12px; align-items: flex-start;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="min-width:20px;margin-top:2px"><circle cx="12" cy="12" r="12" fill="#4B6EB1"/><path d="M7 12L10.5 15.5L17 8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Подберём удобное время для<br>консультации у врача
            </li>
          </ul>
        </div>
        
        <div class="modal-form__right" style="background: #fff; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <h4 class="modal-form__right-title" style="margin-bottom: 24px;">Записаться</h4>
          <input type="tel" class="modal-form__input" placeholder="+7 (999) 999-99-99" style="margin-bottom: 16px;">
          <button class="modal-form__btn" type="button" style="margin-bottom: 24px;">Отправить</button>
          <div class="modal-form__agreements">
            <label class="modal-form__checkbox-label">
              <input type="checkbox" class="modal-form__checkbox" checked>
              <span>Я согласен на <a href="#">Обработку персональных данных</a></span>
            </label>
            <label class="modal-form__checkbox-label">
              <input type="checkbox" class="modal-form__checkbox">
              <span>Я ознакомлен и согласен с <a href="#">Условиями сбора</a> в соответствии с <a href="#">Политикой</a></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `;

  const calcHtml = `
    <div class="calc__quiz">
      <div class="calc__quiz-bg"></div>
      <div class="calc__quiz-tab">
        <span class="calc__quiz-step" style="color: #fff; font-weight: 500; font-size: 16px;">Шаг 1/5</span>
        <button type="button" class="calc-close" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; color: #fff; font-size: 24px; cursor: pointer; line-height: 1; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='scale(1.1)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='scale(1)'">&times;</button>
      </div>
      <div class="calc__quiz-header">
        <p>Ответьте на 4 вопроса и получите расчет + подарки от клиники</p>
      </div>
      <div class="calc__quiz-content">
        <!-- JS injected content -->
      </div>
    </div>
  `;

  document.querySelectorAll('.header__call-button, .footer__btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(callHtml, false);
    });
  });

  document.querySelectorAll('.hero__info-button, .result__media-button, .contacts__btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(calcHtml, true);
    });
  });
}
