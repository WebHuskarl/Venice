const PHONE_RE = /^[\d\s\-\+\(\)]{10,18}$/;

function validatePhone(input) {
  const isValid = PHONE_RE.test(input.value.trim());
  input.classList.toggle('is-invalid', !isValid);
  return isValid;
}

export function initForms() {
  document.querySelectorAll('form').forEach(form => {
    const tel = form.querySelector('[type="tel"]');

    if (tel) {
      tel.addEventListener('input', () => {
        if (tel.classList.contains('is-invalid')) validatePhone(tel);
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (tel && !validatePhone(tel)) {
        tel.focus();
        return;
      }

      // TODO: отправка на сервер
    });
  });
}
