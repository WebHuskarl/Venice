const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export function initTimer() {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const endOfMonth = new Date(nextMonth - 1);
  const endDay = endOfMonth.getDate();
  const endMonthText = MONTHS[endOfMonth.getMonth()];

  document.querySelectorAll('.dynamic-promo-date').forEach(el => {
    el.textContent = `${endDay} ${endMonthText}`;
  });

  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');

  if (!daysEl || !hoursEl || !minutesEl) return;

  function updateTimer() {
    const current = new Date();
    const target = new Date(current.getFullYear(), current.getMonth() + 1, 0, 23, 59, 59);
    
    let diff = target - current;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
