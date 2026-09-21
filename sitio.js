/* =====================================================================
   SITIO — el selector de sesión y el deck compartido.
   Las dos sesiones viven en la misma página; solo una está a la vista,
   y el modo presentación siempre arranca en la que se está viendo.
   ===================================================================== */

const SESIONES = {
  's1': { config: SESION_1, hash: '' },
  's2': { config: SESION_2, hash: '#sesion-2' }
};

let actual = location.hash === '#sesion-2' ? 's2' : 's1';

function mostrar(id, { scroll = true } = {}) {
  if (!SESIONES[id]) return;
  actual = id;
  for (const clave of Object.keys(SESIONES)) {
    document.getElementById(clave).hidden = clave !== id;
  }
  document.querySelectorAll('.tab').forEach(tab => {
    const activa = tab.dataset.sesion === id;
    tab.classList.toggle('is-on', activa);
    if (activa) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });
  history.replaceState(null, '', location.pathname + SESIONES[id].hash);
  if (scroll) window.scrollTo(0, 0);
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    mostrar(tab.dataset.sesion);
  });
});

window.addEventListener('hashchange', () => {
  mostrar(location.hash === '#sesion-2' ? 's2' : 's1');
});

/* al abrir la página (o un enlace directo a la Sesión 2) se empieza arriba */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
mostrar(actual);

/* el deck lee siempre la sesión que está a la vista */
const DECK = montarDeck(() => SESIONES[actual].config);

/* clic en el número de una tarjeta: presentar desde ahí */
document.addEventListener('click', (e) => {
  if (DECK.estaAbierto()) return;
  if (!e.target.closest('.slide-card__n, .mom__n')) return;
  const card = e.target.closest('.slide-card, .mom');
  if (!card) return;
  DECK.abrir(Number(card.dataset.i));
});
