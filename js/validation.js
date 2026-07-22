import { reachGoal } from './metrika.js';

function validatePhone(input) {
  const digits = input.value.replace(/\D/g, '');
  const isValid = digits.length === 11;
  input.classList.toggle('is-invalid', !isValid);
  return isValid;
}

export function initForms() {
  document.querySelectorAll('form').forEach(form => {
    const tel = form.querySelector('[type="tel"]');
    const checkbox = form.querySelector('[type="checkbox"]');

    if (tel) {
      const onPhoneInput = function (e) {
        let inputNumbersValue = e.target.value.replace(/\D/g, '');
        let formattedInputValue = '';
        const selectionStart = e.target.selectionStart;

        if (!inputNumbersValue) {
          e.target.value = '';
          return;
        }

        if (inputNumbersValue[0] !== '7' && inputNumbersValue[0] !== '8') {
          inputNumbersValue = '7' + inputNumbersValue;
        }

        let firstSymbols = '+7';
        formattedInputValue = firstSymbols + ' ';

        if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }

        e.target.value = formattedInputValue;
        
        if (tel.classList.contains('is-invalid')) validatePhone(tel);
      };

      const onPhoneKeyDown = function (e) {
        if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length === 1) {
          e.target.value = '';
        }
      };

      tel.addEventListener('input', onPhoneInput);
      tel.addEventListener('keydown', onPhoneKeyDown);
    }
    
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox.classList.contains('is-invalid') && checkbox.checked) {
          checkbox.classList.remove('is-invalid');
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let valid = true;

      if (tel && !validatePhone(tel)) {
        tel.focus();
        valid = false;
      }
      
      if (checkbox && !checkbox.checked) {
        checkbox.classList.add('is-invalid');
        valid = false;
      }

      if (!valid) return;

      // TODO: отправка на сервер
      // Как в Метрике: ym(..., 'reachGoal', 'lead')
      reachGoal('lead');
      alert('Заявка успешно отправлена!');
      form.reset();
    });
  });
}

