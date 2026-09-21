/* =====================================================================
   DECK — el modo presentación, compartido por las dos sesiones.
   Recibe los slides y dos funciones que dicen cómo rotularlos y qué
   nota mostrar. Sin dependencias: se carga antes del script de la
   sesión y esta lo monta.
   ===================================================================== */

function montarDeck({ slides, etiqueta, nota, ancla }) {
  const deck = document.getElementById('deck');
  const stage = document.getElementById('deck-stage');
  const rotulo = document.getElementById('deck-label');
  const cuenta = document.getElementById('deck-count');
  const barra = document.getElementById('deck-prog');
  let idx = 0;

  function render() {
    const s = slides[idx];
    const n = nota ? nota(s) : '';
    stage.innerHTML = `<div class="deck__seen">${s.seen}</div>` + n;
    rotulo.innerHTML = etiqueta(s);
    cuenta.innerHTML = `<b>${String(idx + 1).padStart(2, '0')}</b> / ${slides.length}`;
    barra.style.width = ((idx + 1) / slides.length * 100) + '%';
    stage.scrollTop = 0;
  }

  function go(d) {
    idx = Math.min(slides.length - 1, Math.max(0, idx + d));
    render();
  }

  function abrir(n) {
    idx = typeof n === 'number' && n >= 0 ? n : idx;
    deck.hidden = false;
    document.body.classList.add('is-presenting');
    render();
    deck.focus();
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  function cerrar() {
    deck.hidden = true;
    document.body.classList.remove('is-presenting');
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    if (ancla) document.getElementById(ancla(slides[idx]))
      ?.scrollIntoView({ block: 'center' });
  }

  document.getElementById('btn-present').addEventListener('click', () => abrir(0));
  document.getElementById('deck-prev').addEventListener('click', () => go(-1));
  document.getElementById('deck-next').addEventListener('click', () => go(1));
  document.getElementById('deck-close').addEventListener('click', cerrar);
  document.getElementById('deck-notes').addEventListener('click', () => {
    deck.classList.toggle('is-clean');
  });

  document.addEventListener('keydown', (e) => {
    if (deck.hidden) {
      if ((e.key === 'p' || e.key === 'P') && !/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) {
        e.preventDefault(); abrir(0);
      }
      return;
    }
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); go(1); break;
      case 'ArrowLeft': case 'PageUp': e.preventDefault(); go(-1); break;
      case 'Home': idx = 0; render(); break;
      case 'End': idx = slides.length - 1; render(); break;
      case 'Escape': cerrar(); break;
      case 'n': case 'N': deck.classList.toggle('is-clean'); break;
    }
  });

  return { abrir, cerrar, estaAbierto: () => !deck.hidden };
}
