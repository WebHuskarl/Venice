/** ID должен совпадать со счётчиком в index.html */
export const METRIKA_ID = 110945275;

/** Цель «Заявка»: ym(ID, 'reachGoal', 'lead') */
export function reachGoal(name) {
  if (!METRIKA_ID || typeof window.ym !== 'function') return;
  window.ym(METRIKA_ID, 'reachGoal', name);
}
