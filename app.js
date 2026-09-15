/* =====================================================================
   SESIÓN 1 — guion, slides y las ocho preguntas.
   Una sola fuente de contenido para los dos modos: consulta (scroll
   continuo) y presentación (slide por slide, teclado o flechas).
   Sin backend: todo vive aquí.
   ===================================================================== */

const VENN = `
<svg class="venn" viewBox="0 0 320 180" role="img"
     aria-label="Dos círculos superpuestos, cognición humana e inteligencia de máquina; la intersección está resaltada y rotulada tercer espacio.">
  <defs>
    <clipPath id="clipA"><circle cx="120" cy="90" r="66"/></clipPath>
  </defs>
  <circle class="third" cx="200" cy="90" r="66" clip-path="url(#clipA)"/>
  <circle class="c" cx="120" cy="90" r="66"/>
  <circle class="c" cx="200" cy="90" r="66"/>
  <text x="66" y="94" text-anchor="middle">cognición<tspan x="66" dy="12">humana</tspan></text>
  <text x="254" y="94" text-anchor="middle">inteligencia<tspan x="254" dy="12">de máquina</tspan></text>
  <text x="160" y="24" text-anchor="middle">tercer espacio</text>
  <line x1="160" y1="30" x2="160" y2="46" stroke="#111110" stroke-width="0.5"/>
</svg>`;

function aux(items) {
  return '<ul class="aux">' + items
    .map((t, i) => `<li data-i="${String(i + 1).padStart(2, '0')}">${t}</li>`)
    .join('') + '</ul>';
}

const TAREA = 'Vamos a hacer una web que le cuente a los miembros de la comunidad UEB de qué se trata tu cargo, las funciones que cumples, quién eres tú profesionalmente y todo lo valioso que aportas a la universidad.';

const SLIDES = [
  { n: 1, block: 1, label: 'La pregunta equivocada',
    seen: `<p class="v-strike"><s>¿Cómo integro la IA a mis procesos?</s></p>`,
    said: 'Esta es la pregunta que todos traen hoy, y es la pregunta equivocada. Asume que la IA es una herramienta que mejora lo que ya saben hacer.' },

  { n: 2, block: 1, label: 'Cognición aumentada',
    seen: `<p class="v-quote">Cognición aumentada: el pensamiento deja de ocurrir solo en la cabeza y pasa a un espacio compartido con la máquina.</p>`,
    said: 'La cognición aumentada extiende el pensamiento hacia afuera en tres direcciones: loops, volumen y flujo. Es un cambio de paradigma cognitivo, un cambio en cómo entendemos.' },

  { n: 3, block: 1, label: 'La pregunta nueva',
    seen: `<p class="v-ask">¿Qué procesos nuevos emergen en este paradigma que me dan más valor?</p>`,
    said: 'Si la cognición aumentada es este nuevo espacio, la pregunta cambia. Ya no se trata de integrar la IA a lo que hacen, se trata de qué se vuelve posible que antes no lo era.' },

  { n: 4, block: 1, label: 'El tercer espacio',
    seen: VENN,
    said: 'Ninguno de los dos círculos solos alcanza lo que se produce en la intersección. Ahí dialogan dos inteligencias, ahí emerge algo que ninguna produce sola, y ahí es donde van a trabajar hoy.' },

  { n: 5, block: 1, label: 'La competencia nueva',
    seen: `<p class="v-strike"><s>prompt engineering</s></p>`,
    said: 'Encontrar la fórmula mágica de palabras dejó de ser la competencia. La competencia nueva es especificar problemas y codesarrollar soluciones con la máquina.' },

  { n: 6, block: 1, label: 'Qué es un spec',
    seen: `<div class="flow"><span class="flow__a">diálogo</span><span class="flow__arrow">⟶</span><span class="flow__b">spec</span></div>`,
    said: 'Esa interlocución se fija en un documento ejecutable para que el agente lo pueda ejecutar. A eso le llaman spec. Son ocho preguntas, y las vamos a resolver juntos ahora mismo.' },

  { n: 7, block: 2, label: 'Paso 1',
    q: '¿Qué es, en una frase?', items: [
      'Cómo se llama en pocas palabras.',
      'Cuál es su propósito central.',
      'Qué queda fuera de su alcance.'],
    said: 'Nombrar bien el objeto evita mezclar dos propósitos bajo una sola definición. Si queda mal respondida, el agente construye una versión ambigua que no cumple del todo ninguno de los dos propósitos.' },

  { n: 8, block: 2, label: 'Paso 2',
    q: '¿Quién lo usa y quién recibe el resultado?', items: [
      'Quién interactúa directamente.',
      'Quién recibe el resultado final.',
      'Si son el mismo rol o dos distintos.'],
    said: 'Separar a quien usa el sistema de quien recibe su resultado evita diseñarlo pensando solo en uno de los dos. Sin esto, el sistema queda optimizado para la persona equivocada.' },

  { n: 9, block: 2, label: 'Paso 3',
    q: '¿Qué entra y qué debe salir?', items: [
      'Qué información entra y de dónde viene.',
      'Qué debe producir el sistema.',
      'Qué pasa si falta un dato.'],
    said: 'Fijar entradas y salidas antes de pensar en pantallas evita que el diseño visual termine decidiendo qué se pide. Sin esto, el agente inventa qué pedir o qué producir.' },

  { n: 10, block: 2, label: 'Paso 4',
    q: '¿Cuál es el paso a paso?', items: [
      'Qué dispara el inicio.',
      'Cuáles son los puntos de decisión.',
      'Qué pasa si algo falla a mitad de camino.'],
    said: 'Sin secuencia explícita el agente decide el orden por su cuenta, y el orden suele ser una regla de negocio, no un detalle menor.' },

  { n: 11, block: 2, label: 'Paso 5',
    q: '¿Qué estilo visual y de marca debe tener?', items: [
      'Qué colores, tipografías o referencias debe usar.',
      'Qué tono debe transmitir.',
      'Qué elementos de marca existentes debe respetar.'],
    said: 'El estilo comunica antes de que se lea una palabra. Sin definirlo, el agente elige por defecto una estética genérica que no reconoce a quien la ve.' },

  { n: 12, block: 2, label: 'Paso 6',
    q: '¿Qué no debe hacer nunca?', items: [
      'Qué datos no puede inventar.',
      'Qué decisiones requieren aprobación humana.',
      'Qué información no debe mostrarse, y a quién.'],
    said: 'Sin este límite el agente rellena los huecos del spec con su mejor suposición, y esa suposición se vuelve un dato falso que alguien va a creer real.' },

  { n: 13, block: 2, label: 'Paso 7',
    q: '¿Cómo se sabe que quedó bien, y qué se corrige primero si falla?', items: [
      'Cuál es el caso de prueba y su resultado esperado.',
      'Quién decide si el resultado es aceptable.',
      'Qué se corrige primero.'],
    said: 'Sin un criterio de éxito nadie puede decir si el sistema cumple el spec o solo corre sin errores visibles.' },

  { n: 14, block: 2, label: 'Paso 8',
    q: '¿Qué arquitectura técnica requiere?', items: [
      'Qué necesita el front end.',
      'Qué lógica vive en el back end.',
      'Dónde vive el sistema en producción.'],
    said: 'Nombrar las cuatro capas obliga a decidir dónde vive cada responsabilidad, en vez de dejar que todo termine mezclado en un solo lugar.' },

  { n: 15, block: 2, label: 'Transición',
    seen: `<p class="v-cue">Ahora escriben su propio spec.</p>`,
    said: 'Les toca especificar su propio proceso.' },

  { n: 16, block: 2, label: 'La tarea',
    seen: `<p class="v-cue">Ahora elabora tu propio spec.</p>
           <p class="task__brief">${TAREA}</p>` }
];

/* los slides del bloque 2 componen su escenario desde la pregunta y las
   auxiliares: el mismo dato alimenta el desplegable del modo consulta. */
let paso = 0;
for (const s of SLIDES) {
  if (!s.q) continue;
  s.step = ++paso;
  s.seen = `<p class="v-ask">${s.q}</p>` + aux(s.items);
}

const EJEMPLO = [
  { n: 1, q: '¿Qué es, en una frase?',
    lead: 'Una página de una sola vista que presenta el guion completo de la Sesión 1, las seis ideas conceptuales y las ocho preguntas del spec en vivo.',
    rows: [
      ['Nombre corto', 'Sitio de la Sesión 1.'],
      ['Propósito central', 'Que Fabián la use como apoyo al presentar y que el equipo de la DiDE la consulte después.'],
      ['Queda fuera', 'Las otras siete sesiones del curso, y cualquier lugar donde los participantes suban su propio spec.']] },

  { n: 2, q: '¿Quién lo usa y quién recibe el resultado?',
    lead: 'Son roles distintos en el momento y la misma audiencia final.',
    rows: [
      ['Interactúa', 'Fabián, durante la sesión, como apoyo de presentación.'],
      ['Recibe el resultado', 'Los 17 participantes de la DiDE, que vuelven a repasar el guion o las ocho preguntas cuando escriben su propio spec.']] },

  { n: 3, q: '¿Qué entra y qué debe salir?',
    lead: '',
    rows: [
      ['Entra', 'El guion completo: seis ideas, ocho pasos y la tarea de cierre.'],
      ['Sale', 'Una página navegable donde cada idea es una sección clara, con las ocho preguntas del spec como bloque central y un ejemplo disponible para consulta posterior.']] },

  { n: 4, q: '¿Cuál es el paso a paso?',
    lead: '',
    rows: [
      ['Dispara', 'Fabián abre el sitio al inicio de la sesión, o alguien lo abre después para repasar.'],
      ['Pasos intermedios', 'Bloque 1, las seis ideas en orden; luego Bloque 2, los ocho pasos del spec, con una transición explícita entre ambos.'],
      ['Punto de decisión', 'Modo presentación (pantalla completa, slide por slide) frente a modo consulta (scroll continuo con todo visible).'],
      ['Si falla', 'Si intenta servir los dos modos a la vez sin distinguirlos, ni presenta bien ni se consulta bien después.']] },

  { n: 5, q: '¿Qué estilo visual y de marca debe tener?',
    lead: '',
    rows: [
      ['Colores y tipografías', 'El mismo sistema visual de la propuesta «DiDE + cognición aumentada»: fondo blanco cálido, monoespaciada para los kickers numerados (01 /, 02 /), acento en verde chartreuse y líneas de un cuarto de punto para separar bloques.'],
      ['Tono', 'Instructivo y directo, formato de propuesta institucional, como el resto de fichas de Fabián.'],
      ['Elementos a respetar', 'La maquetación a dos columnas heredada de fabianherrerac.github.io/cognicion-aumentada y el mismo sistema de numeración de secciones de la propuesta.']] },

  { n: 6, q: '¿Qué no debe hacer nunca?',
    lead: '',
    rows: [
      ['Nunca', 'Mostrar contenido de las otras siete sesiones.'],
      ['Nunca', 'Mezclar el modo presentación y el modo consulta en la misma vista sin que quien la abre elija cuál quiere.'],
      ['Nunca', 'Requerir un backend: es contenido estático.']] },

  { n: 7, q: '¿Cómo se sabe que quedó bien, y qué se corrige primero si falla?',
    lead: '',
    rows: [
      ['Prueba', 'Fabián la usa en vivo para dar la sesión completa sin salir de la página ni buscar el guion en otro lado.'],
      ['Quién decide', 'Fabián, contra esa prueba de uso real.'],
      ['Se corrige primero', 'Cualquier idea donde el «es decir» no alcance a leerse o recordarse en el tiempo asignado.']] },

  { n: 8, q: '¿Qué arquitectura técnica requiere?',
    lead: '',
    rows: [
      ['Front end', 'Página estática con navegación por slide (flechas o teclado) y una vista alterna de scroll continuo.'],
      ['Back end', 'No existe: todo el contenido vive en el código de la página.'],
      ['Base de datos', 'No aplica.'],
      ['Producción', 'Hosting simple tipo GitHub Pages, sin mantenimiento continuo.']] }
];

/* ── modo consulta: scroll continuo ─────────────────────────────────── */

function slideCard(s) {
  return `
  <article class="slide-card" id="slide-${s.n}">
    <div class="slide-card__n">Idea<b>${String(s.n).padStart(2, '0')}</b></div>
    <div>
      <div class="stage"><span class="line">Se ve</span>${s.seen}</div>
      <div class="said"><span class="line">Es decir</span><p>${s.said}</p></div>
    </div>
  </article>`;
}

/* bloque 2: los ocho pasos en un desplegable, sin «es decir» */
function pasoItem(s) {
  return `
  <details class="paso" id="slide-${s.n}">
    <summary>
      <span class="paso__n">${String(s.step).padStart(2, '0')} /</span>
      <span class="paso__q">${s.q}</span>
      <span class="paso__mark" aria-hidden="true"></span>
    </summary>
    <div class="paso__body">
      <p>${s.said}</p>
      ${aux(s.items)}
    </div>
  </details>`;
}

function ejemploCard(r) {
  const filas = r.rows.map(([k, v]) => `
    <div class="ans__row"><span class="ans__k">${k}</span><span class="ans__v">${v}</span></div>`).join('');
  return `
  <article class="ref">
    <span class="ref__n">${String(r.n).padStart(2, '0')} /</span>
    <h3>${r.q}</h3>
    <div class="ref__body">
      ${r.lead ? `<p class="ans__lead">${r.lead}</p>` : ''}
      <div class="ans">${filas}</div>
    </div>
  </article>`;
}

document.getElementById('bloque-1').innerHTML =
  SLIDES.filter(s => s.block === 1).map(slideCard).join('');
document.getElementById('bloque-2').innerHTML = `
  <h3 class="subhead">Así se hace un spec</h3>
  <p class="subhead__lead">Ocho preguntas, en este orden. Cada una se despliega
     con sus auxiliares y con lo que se rompe si queda mal respondida.</p>
  <div class="pasos">${SLIDES.filter(s => s.q).map(pasoItem).join('')}</div>
  <article class="task" id="slide-16">
    <span class="line">Tarea</span>
    <h3>Ahora elabora tu propio spec</h3>
    <p>${TAREA}</p>
  </article>`;
document.getElementById('ejemplo').innerHTML = `
  <h3 class="subhead">Este mismo sitio, especificado</h3>
  <p class="subhead__lead">Las ocho preguntas, respondidas antes de escribir una
     línea de código. Esto fue lo único que recibió el agente que lo construyó.</p>
  <div class="ejemplo">${EJEMPLO.map(ejemploCard).join('')}</div>`;

/* ── modo presentación ──────────────────────────────────────────────── */

const deck = document.getElementById('deck');
const deckStage = document.getElementById('deck-stage');
const deckLabel = document.getElementById('deck-label');
const deckCount = document.getElementById('deck-count');
const deckProg = document.getElementById('deck-prog');
let idx = 0;

function render() {
  const s = SLIDES[idx];
  deckStage.innerHTML = `
    <div class="deck__seen">${s.seen}</div>` +
    (s.block === 1 && s.said
      ? `<div class="deck__said"><span class="line">Es decir</span><p>${s.said}</p></div>`
      : '');
  deckLabel.innerHTML = `Bloque ${s.block} — ${s.block === 1 ? 'Presentación' : 'Spec en vivo'} · <b>${s.label}</b>`;
  deckCount.innerHTML = `<b>${String(s.n).padStart(2, '0')}</b> / ${SLIDES.length}`;
  deckProg.style.width = ((idx + 1) / SLIDES.length * 100) + '%';
  deckStage.scrollTop = 0;
}

function go(d) {
  idx = Math.min(SLIDES.length - 1, Math.max(0, idx + d));
  render();
}

function openDeck(n) {
  idx = typeof n === 'number' ? n : idx;
  deck.hidden = false;
  document.body.classList.add('is-presenting');
  render();
  deck.focus();
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

function closeDeck() {
  deck.hidden = true;
  document.body.classList.remove('is-presenting');
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  document.getElementById('slide-' + SLIDES[idx].n)
    ?.scrollIntoView({ block: 'center' });
}

document.getElementById('btn-present').addEventListener('click', () => openDeck(0));
document.getElementById('deck-prev').addEventListener('click', () => go(-1));
document.getElementById('deck-next').addEventListener('click', () => go(1));
document.getElementById('deck-close').addEventListener('click', closeDeck);
document.getElementById('deck-notes').addEventListener('click', () => {
  deck.classList.toggle('is-clean');
});

document.addEventListener('keydown', (e) => {
  if (deck.hidden) {
    if (e.key === 'p' || e.key === 'P') { e.preventDefault(); openDeck(0); }
    return;
  }
  switch (e.key) {
    case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); go(1); break;
    case 'ArrowLeft': case 'PageUp': e.preventDefault(); go(-1); break;
    case 'Home': idx = 0; render(); break;
    case 'End': idx = SLIDES.length - 1; render(); break;
    case 'Escape': closeDeck(); break;
    case 'n': case 'N': deck.classList.toggle('is-clean'); break;
  }
});

/* ── entrar a la presentación desde un slide concreto del modo consulta ── */
document.addEventListener('click', (e) => {
  const card = e.target.closest('.slide-card');
  if (!card || !deck.hidden) return;
  if (!e.target.closest('.slide-card__n')) return;
  openDeck(SLIDES.findIndex(s => 'slide-' + s.n === card.id));
});
