export function initCalc() {
  const quizzes = document.querySelectorAll('.calc__quiz:not(.initialized)');
  if (quizzes.length === 0) return;

  quizzes.forEach((quiz) => {
    quiz.classList.add('initialized');
    const data = [
      {
        question: 'Какую челюсть нужно восстановить?',
        options: ['Верхнюю', 'Нижнюю', 'Обе челюсти', 'Нужна консультация'],
      },
      {
        question: 'Какое количество зубов отсутствует?',
        options: ['1-2 зуба', '3 и более', 'Полное отсутствие', 'Затрудняюсь ответить'],
      },
      {
        question: 'Как давно отсутствует зуб(ы)?',
        options: ['Менее полугода', 'Более полугода', 'Более года', 'Недавно удалили'],
      },
      {
        question: 'Есть ли у вас панорамный снимок или КТ зубов?',
        options: ['Да, есть свежий снимок', 'Да, но ему больше 6 месяцев', 'Нет снимка', 'Не знаю, что это'],
      },
    ];

    let currentStep = 0;
    const contentEl = quiz.querySelector('.calc__quiz-content');
    const stepEl = quiz.querySelector('.calc__quiz-step');
    const radioName = `calc-q-${Math.random().toString(36).slice(2, 9)}`;

    function renderStep(step, { shouldFocus = false } = {}) {
      if (step < 4) {
        const q = data[step];
        stepEl.textContent = `Шаг ${step + 1}/5`;
        contentEl.innerHTML = `
        <h3 class="calc__quiz-question" id="${radioName}-q">${q.question}</h3>
        <div class="calc__quiz-options" role="radiogroup" aria-labelledby="${radioName}-q">
          ${q.options
            .map(
              (opt, i) => `
            <label class="calc__quiz-label">
              <input type="radio" name="${radioName}" value="${opt}" class="calc__quiz-radio-input" ${i === 0 ? 'checked' : ''}>
              <span class="calc__quiz-radio" aria-hidden="true"></span>
              <span class="calc__quiz-text">${opt}</span>
            </label>
          `
            )
            .join('')}
        </div>
        <div class="calc__quiz-footer">
          <button class="calc__quiz-btn calc__quiz-next" type="button">Далее</button>
        </div>
      `;

        const headerEl = quiz.querySelector('.calc__quiz-header');
        let progress = headerEl.querySelector('.calc__quiz-progress');
        if (!progress) {
          progress = document.createElement('div');
          progress.className = 'calc__quiz-progress';
          progress.setAttribute('role', 'progressbar');
          progress.setAttribute('aria-valuemin', '1');
          progress.setAttribute('aria-valuemax', '5');
          headerEl.appendChild(progress);
        }
        progress.style.width = `${(step + 1) * 20}%`;
        progress.setAttribute('aria-valuenow', String(step + 1));
        progress.setAttribute('aria-label', `Шаг ${step + 1} из 5`);

        quiz.querySelector('.calc__quiz-next').addEventListener('click', () => {
          currentStep++;
          renderStep(currentStep, { shouldFocus: true });
        });

        if (shouldFocus) {
          setTimeout(() => {
            const checkedRadio = quiz.querySelector('.calc__quiz-radio-input:checked');
            if (checkedRadio) checkedRadio.focus({ preventScroll: true });
          }, 50);
        }
      } else {
        stepEl.textContent = `Шаг 5/5`;
        const phoneId = `${radioName}-phone`;
        contentEl.innerHTML = `
        <div class="calc__form-layout calc__form-view">
          <div class="calc__form-left">
            <h3 class="calc__form-title">Рассчёт стоимости лечения готов, а подарки уже ваши!</h3>
            <p class="calc__form-descr">Оставьте номер вашего телефона</p>
          </div>
          <div class="calc__form-right">
            <label class="visually-hidden" for="${phoneId}">Номер телефона</label>
            <input type="tel" class="calc__form-input" id="${phoneId}" name="phone" autocomplete="tel" placeholder="+7 (999) 999-99-99">
            <span class="calc__form-error" role="alert">Введите корректный номер</span>
            <button class="calc__form-btn calc__form-submit" type="button">Получить расчет</button>
            <div class="calc__form-agreements">
              <label class="calc__form-checkbox-label">
                <input type="checkbox" class="calc__form-checkbox" checked>
                <span>Я согласен на <a href="privacy.html">Обработку персональных данных</a></span>
              </label>
              <label class="calc__form-checkbox-label">
                <input type="checkbox" class="calc__form-checkbox" checked>
                <span>Я ознакомлен и согласен с <a href="privacy.html">Условиями сбора персональных данных</a> в соответствии с <a href="privacy.html">Политикой конфиденциальности</a></span>
              </label>
            </div>
          </div>
        </div>

        <div class="calc__form-layout calc__success-view" style="display: none;">
          <div class="calc__form-left">
            <h3 class="calc__form-title">Заявка отправлена!</h3>
            <p class="calc__form-descr">Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
            <button class="calc__form-btn calc__home-btn" type="button" style="margin-top: 24px; padding: 12px 24px; background: var(--color-blue-1); color: #fff; border-radius: 8px; border: none; cursor: pointer; font-weight: 600;">Вернуться на главную</button>
          </div>
        </div>
      `;

        const headerEl = quiz.querySelector('.calc__quiz-header');
        const progress = headerEl.querySelector('.calc__quiz-progress');
        if (progress) {
          progress.style.width = '100%';
          progress.setAttribute('aria-valuenow', '5');
          progress.setAttribute('aria-label', 'Шаг 5 из 5');
        }

        const submitBtn = quiz.querySelector('.calc__form-submit');
        const phoneInput = quiz.querySelector('.calc__form-input');
        const errorMsg = quiz.querySelector('.calc__form-error');
        const checkboxes = quiz.querySelectorAll('.calc__form-checkbox');

        submitBtn.addEventListener('click', () => {
          let isValid = true;

          const digits = phoneInput.value.replace(/\D/g, '');
          if (digits.length < 11) {
            phoneInput.classList.add('error');
            errorMsg.style.display = 'block';
            isValid = false;
          } else {
            phoneInput.classList.remove('error');
            errorMsg.style.display = 'none';
          }

          let allChecked = true;
          checkboxes.forEach((cb) => {
            if (!cb.checked) {
              allChecked = false;
              cb.parentElement.style.color = 'red';
            } else {
              cb.parentElement.style.color = '';
            }
          });

          if (!allChecked) isValid = false;

          if (isValid) {
            quiz.querySelector('.calc__form-view').style.display = 'none';
            quiz.querySelector('.calc__success-view').style.display = 'flex';
            quiz.dataset.success = 'true';
          }
        });

        checkboxes.forEach((cb) => {
          cb.addEventListener('change', () => {
            if (cb.checked) cb.parentElement.style.color = '';
          });
        });

        quiz.querySelector('.calc__home-btn').addEventListener('click', () => {
          const modalContainer = quiz.closest('.modal-content');
          if (modalContainer) {
            const closeBtn = document.querySelector('.calc-close');
            if (closeBtn) closeBtn.click();
          } else {
            window.location.href = 'index.html';
          }
        });

        if (shouldFocus) {
          setTimeout(() => {
            const phone = quiz.querySelector('.calc__form-input');
            if (phone) phone.focus({ preventScroll: true });
          }, 50);
        }

        phoneInput.addEventListener('input', function () {
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
          errorMsg.style.display = 'none';
        });
      }
    }

    quiz.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const nextBtn = quiz.querySelector('.calc__quiz-next');
        if (nextBtn) {
          nextBtn.click();
        } else {
          const submitBtn = quiz.querySelector('.calc__form-submit');
          if (submitBtn) {
            submitBtn.click();
          } else {
            const homeBtn = quiz.querySelector('.calc__home-btn');
            if (homeBtn) homeBtn.click();
          }
        }
      }
    });

    renderStep(currentStep, { shouldFocus: false });
  });
}
