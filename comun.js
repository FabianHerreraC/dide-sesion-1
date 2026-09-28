/* =====================================================================
   COMÚN — las piezas de composición que usan todas las sesiones.
   Se carga antes de los scripts de cada sesión.
   ===================================================================== */

/* lista de preguntas o apuntes auxiliares, numerada al margen */
function aux(items) {
  return '<ul class="aux">' + items
    .map((t, i) => `<li data-i="${String(i + 1).padStart(2, '0')}">${t}</li>`)
    .join('') + '</ul>';
}

/* pasos en orden, numerados 01, 02, 03… */
function pasosOrdenados(items) {
  return '<ol class="steps">' + items.map(t => `<li>${t}</li>`).join('') + '</ol>';
}

/* pares clave / valor: definiciones, requisitos, respuestas */
function filas(rows) {
  return '<div class="ans">' + rows.map(([k, v]) => `
    <div class="ans__row"><span class="ans__k">${k}</span><span class="ans__v">${v}</span></div>`).join('') + '</div>';
}

/* una de las dos rutas paralelas del taller */
function ruta(letra, titulo, cuerpo) {
  return `
  <div class="ruta ruta--${letra.toLowerCase()}">
    <span class="ruta__tag">Ruta ${letra}</span>
    <h4 class="ruta__t">${titulo}</h4>
    ${cuerpo}
  </div>`;
}

/* la instrucción que se le dicta al agente, o cualquier cita literal */
function cita(texto) {
  return `<blockquote class="cita">${texto}</blockquote>`;
}

/* lo que se le pide a Codex, con su rótulo */
function encargo(texto) {
  return `<div class="encargo"><span class="line">Se le pide a Codex</span>${cita(texto)}</div>`;
}

/* tabla de dos columnas: síntoma y remedio */
function tablaProblemas(rows) {
  return `
  <table class="tabla">
    <thead><tr><th>Síntoma</th><th>Qué hacer</th></tr></thead>
    <tbody>${rows.map(([s, q]) => `<tr><td>${s}</td><td>${q}</td></tr>`).join('')}</tbody>
  </table>`;
}

/* la tarjeta de un momento del taller, en modo consulta */
function momentoCard(m, i, prefijo = '') {
  return `
  <article class="mom" id="mom-${prefijo}${m.n}" data-i="${i}">
    <div class="mom__n">${String(m.n).padStart(2, '0')}<b>${m.mins}</b></div>
    <div>
      <h3 class="mom__t">${m.titulo}</h3>
      <div class="mom__body">${m.html}</div>
    </div>
  </article>`;
}

/* el momento convertido en slide */
function momentoSlide(m) {
  return {
    ...m,
    seen: `<h2 class="deck__t">${m.titulo}</h2>
           ${m.mins ? `<span class="deck__min">${m.mins}</span>` : ''}
           <div class="deck__cuerpo">${m.html}</div>`
  };
}

/* monta una sesión de taller: reparte sus momentos por sección y
   devuelve la configuración que el deck necesita. */
function montarTaller({ momentos, secciones, partes, prefijo }) {
  for (const [parte, contenedor] of Object.entries(secciones)) {
    const nodo = document.getElementById(contenedor);
    if (!nodo) continue;
    nodo.innerHTML = momentos
      .map((m, i) => [m, i])
      .filter(([m]) => String(m.parte) === String(parte))
      .map(([m, i]) => momentoCard(m, i, prefijo || ''))
      .join('');
  }
  return {
    slides: momentos.map(momentoSlide),
    etiqueta: m => partes[m.parte]
      ? `${partes[m.parte]} · <b>${m.titulo}</b>`
      : `<b>${m.titulo}</b>`,
    nota: () => '',
    ancla: m => 'mom-' + (prefijo || '') + m.n
  };
}
