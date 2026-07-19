export function initCalc() {
  const quizzes = document.querySelectorAll('.calc__quiz:not(.initialized)');
  if (quizzes.length === 0) return;


  quizzes.forEach(quiz => {
    quiz.classList.add('initialized');
    const data = [
      {
        question: 'Какую челюсть нужно восстановить?',
        options: ['Верхнюю', 'Нижнюю', 'Обе челюсти', 'Нужна консультация']
      },
      {
        question: 'Какое количество зубов отсутствует?',
        options: ['1-2 зуба', '3 и более', 'Полное отсутствие', 'Затрудняюсь ответить']
      },
      {
        question: 'Как давно отсутствует зуб(ы)?',
        options: ['Менее полугода', 'Более полугода', 'Более года', 'Недавно удалили']
      },
      {
        question: 'Есть ли у вас панорамный снимок или КТ зубов?',
        options: ['Да, есть свежий снимок', 'Да, но ему больше 6 месяцев', 'Нет снимка', 'Не знаю, что это']
      }
    ];

    let currentStep = 0;
    const contentEl = quiz.querySelector('.calc__quiz-content');
    const stepEl = quiz.querySelector('.calc__quiz-step');

    function renderStep(step) {
      if (step < 4) {
        const q = data[step];
        stepEl.textContent = `Шаг ${step + 1}/5`;
        contentEl.innerHTML = `
        <h3 class="calc__quiz-question">${q.question}</h3>
        <div class="calc__quiz-options">
          ${q.options.map((opt, i) => `
            <label class="calc__quiz-label">
              <input type="radio" name="calc-q" value="${opt}" class="calc__quiz-radio-input" ${i === 0 ? 'checked' : ''}>
              <span class="calc__quiz-radio"></span>
              <span class="calc__quiz-text">${opt}</span>
            </label>
          `).join('')}
        </div>
        <div class="calc__quiz-footer">
          <button class="calc__quiz-btn" type="button" id="calc-next">Далее</button>
        </div>
      `;

        // Update progress bar
        const headerEl = quiz.querySelector('.calc__quiz-header');
        let progress = headerEl.querySelector('.calc__quiz-progress');
        if (!progress) {
          progress = document.createElement('div');
          progress.className = 'calc__quiz-progress';
          headerEl.appendChild(progress);
        }
        progress.style.width = `${(step + 1) * 20}%`;

        quiz.querySelector('#calc-next').addEventListener('click', () => {
          currentStep++;
          renderStep(currentStep);
        });

        setTimeout(() => {
          const checkedRadio = quiz.querySelector('.calc__quiz-radio-input:checked');
          if (checkedRadio) checkedRadio.focus();
        }, 50);
      } else {
        stepEl.textContent = `Шаг 5/5`;
        contentEl.innerHTML = `
        <div class="calc__form-layout" id="calc-form-view">
          <div class="calc__form-left">
            <h3 class="calc__form-title">Рассчёт стоимости лечения готов, а подарки уже ваши!</h3>
            <p class="calc__form-descr">Оставьте номер вашего телефона</p>
          </div>
          <div class="calc__form-right">
            <input type="tel" class="calc__form-input" id="calc-phone" placeholder="+7 (999) 999-99-99">
            <span class="calc__form-error" id="calc-error">Введите корректный номер</span>
            <button class="calc__form-btn" type="button" id="calc-submit">Получить расчет</button>
            <div class="calc__form-agreements">
              <label class="calc__form-checkbox-label">
                <input type="checkbox" class="calc__form-checkbox" checked>
                <span>Я согласен на <a href="#">Обработку персональных данных</a></span>
              </label>
              <label class="calc__form-checkbox-label">
                <input type="checkbox" class="calc__form-checkbox" checked>
                <span>Я ознакомлен и согласен с <a href="#">Условиями сбора персональных данных</a> в соответствии с <a href="#">Политикой конфиденциальности</a></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="calc__form-layout" id="calc-success-view" style="display: none;">
          <div class="calc__form-left">
            <h3 class="calc__form-title">Заявка отправлена!</h3>
            <p class="calc__form-descr">Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
            <button class="calc__form-btn" type="button" id="calc-home-btn" style="margin-top: 24px; padding: 12px 24px; background: var(--color-blue-1); color: #fff; border-radius: 8px; border: none; cursor: pointer; font-weight: 600;">Вернуться на главную</button>
          </div>
        </div>
      `;

        const headerEl = quiz.querySelector('.calc__quiz-header');
        let progress = headerEl.querySelector('.calc__quiz-progress');
        if (progress) {
          progress.style.width = `100%`;
        }

        const submitBtn = quiz.querySelector('#calc-submit');
        const phoneInput = quiz.querySelector('#calc-phone');
        const errorMsg = quiz.querySelector('#calc-error');
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
          checkboxes.forEach(cb => {
            if (!cb.checked) {
              allChecked = false;
              cb.parentElement.style.color = 'red';
            } else {
              cb.parentElement.style.color = '';
            }
          });

          if (!allChecked) {
            isValid = false;
          }

          if (isValid) {
            quiz.querySelector('#calc-form-view').style.display = 'none';
            quiz.querySelector('#calc-success-view').style.display = 'flex';
            quiz.dataset.success = 'true';
          }
        });

        checkboxes.forEach(cb => {
          cb.addEventListener('change', () => {
            if (cb.checked) {
              cb.parentElement.style.color = '';
            }
          });
        });

        quiz.querySelector('#calc-home-btn').addEventListener('click', () => {
          const modalContainer = quiz.closest('.modal-content');
          if (modalContainer) {
            const closeBtn = document.querySelector('.calc-close');
            if (closeBtn) closeBtn.click();
          } else {
            window.location.href = '#hero';
            location.reload();
          }
        });

        setTimeout(() => {
          const phoneInput = quiz.querySelector('#calc-phone');
          if (phoneInput) phoneInput.focus();
        }, 50);

        phoneInput.addEventListener('input', function (e) {
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
        const nextBtn = quiz.querySelector('#calc-next');
        if (nextBtn) {
          nextBtn.click();
        } else {
          const submitBtn = quiz.querySelector('#calc-submit');
          if (submitBtn) {
            submitBtn.click();
          } else {
            const homeBtn = quiz.querySelector('#calc-home-btn');
            if (homeBtn) homeBtn.click();
          }
        }
      }
    });

    renderStep(currentStep);
  });
}
