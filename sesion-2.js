/* =====================================================================
   SESIÓN 2 — DEL ARCHIVO A PRODUCCIÓN
   Guion de taller: dos partes de 60 minutos, dos rutas paralelas
   (con Codex o solo en el navegador) y la tabla de problemas
   frecuentes. Todo el contenido vive aquí.
   ===================================================================== */

const PROMESA = 'Al terminar las dos horas, cada participante tiene su sitio publicado en GitHub Pages y recogiendo respuestas en un Excel institucional.';

const REQUISITOS = [
  ['Archivo', 'El <code>index.html</code> de la Sesión 1, con sus imágenes o CSS si los tiene.'],
  ['Cuenta', 'Una cuenta de GitHub con el correo institucional (se crea en github.com si aún no existe).'],
  ['Acceso', 'La cuenta Microsoft institucional, con OneDrive y Forms.']
];

const VOCABULARIO = [
  ['Repositorio', 'La carpeta del proyecto guardada en GitHub, con todo su historial.'],
  ['Commit', 'Una versión guardada con una nota que explica qué cambió. Como una página fechada en un cuaderno de bocetos.'],
  ['Push', 'Enviar los commits del computador a GitHub.'],
  ['Pull', 'Traer al computador los cambios que están en GitHub.'],
  ['GitHub Pages', 'El servicio que convierte el repositorio en un sitio web público.']
];

/* ── helpers de composición ─────────────────────────────────────────── */

function pasosOrdenados(items) {
  return '<ol class="steps">' + items.map(t => `<li>${t}</li>`).join('') + '</ol>';
}

function filas(rows) {
  return '<div class="ans">' + rows.map(([k, v]) => `
    <div class="ans__row"><span class="ans__k">${k}</span><span class="ans__v">${v}</span></div>`).join('') + '</div>';
}

function ruta(letra, titulo, cuerpo) {
  return `
  <div class="ruta ruta--${letra.toLowerCase()}">
    <span class="ruta__tag">Ruta ${letra}</span>
    <h4 class="ruta__t">${titulo}</h4>
    ${cuerpo}
  </div>`;
}

/* ── los momentos del taller ────────────────────────────────────────── */

const MOMENTOS = [
  { n: 0, parte: 0, titulo: 'Antes de empezar', mins: '',
    html: `<p>Cada participante necesita:</p>${filas(REQUISITOS)}` },

  { n: 1, parte: 1, titulo: 'Vocabulario mínimo', mins: '10 min',
    html: `<p>Cinco palabras que se van a repetir toda la sesión.</p>${filas(VOCABULARIO)}` },

  { n: 2, parte: 1, titulo: 'Ruta A · GitHub + Codex', mins: '25 min',
    html: `
      <h4 class="sub">Conectar GitHub con Codex <span>una sola vez por computador</span></h4>
      ${pasosOrdenados([
        'Pedirle a Codex: <em>«Revisa si tengo instalados Git y GitHub CLI. Si falta alguno, dime cómo instalarlo.»</em>',
        'Con ambos instalados, pedirle: <em>«Conéctame con mi cuenta de GitHub usando GitHub CLI.»</em> Codex ejecutará <code>gh auth login</code>.',
        'Responder las opciones que aparecen: <b>GitHub.com</b>, protocolo <b>HTTPS</b>, autenticar con <b>navegador</b>.',
        'Copiar el código de ocho caracteres que muestra la terminal, pegarlo en la página que se abre y autorizar.',
        'Verificar pidiéndole a Codex: <em>«Confirma con qué cuenta de GitHub estoy conectado.»</em>'])}
      <h4 class="sub">Publicar el sitio</h4>
      ${pasosOrdenados([
        'Abrir Codex en la carpeta del proyecto de la Sesión 1.',
        'Dar el encargo: <em>«Publica este proyecto en un repositorio público nuevo de mi GitHub llamado mi-sitio-dide y actívale GitHub Pages. Antes de ejecutar, muéstrame el plan y explícame cada comando.»</em>',
        'Leer el plan, preguntar lo que no se entienda y aprobar.',
        'Al terminar, pedirle la dirección del sitio publicado y abrirla.'])}
      <p class="nota">Si el computador no deja instalar Git o GitHub CLI, el participante sigue por la Ruta B.</p>` },

  { n: 3, parte: 1, titulo: 'Ruta B · Solo GitHub en el navegador', mins: '25 min',
    html: pasosOrdenados([
      'En github.com, botón <b>New</b>. Nombre sin espacios (ej. <code>mi-sitio-dide</code>), marcar <b>Public</b> y <b>Create repository</b>.',
      'En la página del repositorio, clic en <b>uploading an existing file</b> (o <b>Add file → Upload files</b>).',
      'Arrastrar el <code>index.html</code> y los demás archivos. El archivo principal debe llamarse exactamente <code>index.html</code> y quedar en la raíz, fuera de cualquier carpeta.',
      'En el mensaje del commit, escribir <em>«Primera versión del sitio»</em> y clic en <b>Commit changes</b>.',
      'Ir a <b>Settings → Pages</b>. En <b>Source</b>, elegir <b>Deploy from a branch</b>, rama <code>main</code>, carpeta <code>/ (root)</code>, y <b>Save</b>.',
      'Esperar uno o dos minutos y recargar. Arriba aparece la dirección <code>https://usuario.github.io/nombre-repo/</code>: ese es el sitio en producción.']) },

  { n: 4, parte: 1, titulo: 'Ciclo de edición', mins: '15 min',
    html: `
      <p>Repetir tres veces: cambiar el título, cambiar un color, agregar una sección.</p>
      ${ruta('A', 'Con Codex', '<p>Pedirle el cambio, revisarlo en el navegador local y luego pedir: <em>«Súbelo a GitHub con un mensaje que describa el cambio.»</em></p>')}
      ${ruta('B', 'En el navegador', '<p>Abrir <code>index.html</code> en GitHub, clic en el lápiz, editar, escribir un mensaje descriptivo y <b>Commit changes</b>.</p>')}
      <p class="nota">En ambas, revisar la pestaña <b>Actions</b> hasta ver el check verde y recargar el sitio con <b>Ctrl + Shift + R</b> (o <b>Cmd + Shift + R</b> en Mac).</p>
      <p>Un buen mensaje de commit dice qué cambió: <em>«Cambia el color del encabezado a verde»</em> sirve para cualquiera que lea el historial; <em>«cambios»</em> se queda corto.</p>` },

  { n: 5, parte: 1, titulo: 'Cierre de la primera hora', mins: '10 min',
    html: `
      <p>Abrir el sitio publicado y presionar <b>Ctrl + U</b> (o clic derecho → <em>Ver código fuente</em>). Todo lo que escribieron está a la vista de cualquier visitante.</p>
      <p class="pregunta">Si la página va a recoger datos de personas, ¿dónde deberían guardarse?</p>` },

  { n: 6, parte: 2, titulo: 'Crear el formulario conectado a Excel', mins: '15 min',
    html: pasosOrdenados([
      'Entrar a office.com con la cuenta institucional y abrir <b>OneDrive</b>.',
      '<b>Nuevo → Formularios para Excel</b>. Ponerle nombre. Esto crea un Excel que recibe las respuestas en vivo.',
      'Diseñar entre 3 y 5 preguntas relacionadas con el propósito del sitio.',
      'En la configuración, revisar <b>quién puede responder</b>. Si queda en <em>solo personas de la organización</em>, los visitantes externos tendrán que iniciar sesión.']) },

  { n: 7, parte: 2, titulo: 'Obtener el código para insertar', mins: '5 min',
    html: pasosOrdenados([
      'Clic en <b>Recopilar respuestas</b> (o <b>Compartir</b>).',
      'Elegir el ícono <b><code>&lt;/&gt;</code> Insertar</b> y copiar el código. Es una etiqueta <code>&lt;iframe&gt;</code>.']) },

  { n: 8, parte: 2, titulo: 'Insertar el formulario en el sitio', mins: '15 min',
    html: `
      ${ruta('A', 'Con Codex', '<p>Pedirle: <em>«Agrega una sección nueva al final de la página con este formulario embebido: [pegar código]. Que ocupe el ancho de la página y se vea bien en celular. Luego súbelo a GitHub con un mensaje que describa el cambio.»</em></p>')}
      ${ruta('B', 'En el navegador', '<p>Editar <code>index.html</code> en GitHub con el lápiz y pegar el código antes de la etiqueta <code>&lt;/body&gt;</code>, dentro de una sección. Cambiar el ancho del iframe a <code>width="100%"</code>, escribir el mensaje del commit y confirmar.</p>')}
      <pre class="code"><code>&lt;section&gt;
  &lt;h2&gt;Cuéntanos&lt;/h2&gt;
  &lt;!-- pegar aquí el iframe de Forms --&gt;
&lt;/section&gt;</code></pre>` },

  { n: 9, parte: 2, titulo: 'Probar el flujo completo', mins: '10 min',
    html: pasosOrdenados([
      'Esperar el check verde en <b>Actions</b> y recargar el sitio.',
      'Llenar el formulario desde la página publicada.',
      'Abrir el Excel en OneDrive: la respuesta debe aparecer como fila nueva.']) },

  { n: 10, parte: 2, titulo: 'Trabajo en parejas', mins: '10 min',
    html: pasosOrdenados([
      'Intercambiar las direcciones de los sitios.',
      'Cada uno responde el formulario del otro.',
      'En el repositorio del compañero, ir a <b>Issues → New issue</b> y dejar una sugerencia concreta sobre el sitio.']) },

  { n: 11, parte: 2, titulo: 'Cierre', mins: '5 min',
    html: `
      <p class="pregunta">El sitio es público y el Excel es privado: el código se muestra y los datos se resguardan.</p>
      <p>En la Sesión 3 cambiamos el formulario prestado por uno propio, diseñado en la página y conectado a una automatización.</p>` },
  { n: 12, parte: 3, titulo: 'Así se ve ya hecho', mins: '',
    html: `
      <p>Este es el resultado del taller, funcionando en esta misma página: un
         formulario de Microsoft Forms embebido, que escribe cada respuesta en
         un Excel de OneDrive. Lo que van a construir se ve así.</p>
      <div class="embed">
        <iframe width="640px" height="480px" src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=UMLAdHccXUCbHprB9Qir4zjqhc7agYBPmfZi1e4GjDtUQjFDMjNINlkyU1hYNFVZTlU0TVNHUTdIMy4u&embed=true" frameborder="0" marginwidth="0" marginheight="0" style="border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen title="Formulario de ejemplo"> </iframe>
      </div>
      <p class="nota">Es un formulario real: lo que se escriba aquí llega al Excel del ejemplo.</p>` }
];

const PROBLEMAS = [
  ['El sitio muestra error 404', 'Revisar que el archivo se llame <code>index.html</code> y esté en la raíz; esperar un par de minutos.'],
  ['Los cambios no aparecen', 'Recargar con <b>Ctrl + Shift + R</b> y revisar que el check de <b>Actions</b> esté verde.'],
  ['Codex no puede instalar Git o GitHub CLI', 'Seguir por la Ruta B y resolver la conexión en el alistamiento de la Sesión 3.'],
  ['<code>gh auth login</code> no abre el navegador', 'Copiar la dirección que muestra la terminal, abrirla a mano y pegar el código.'],
  ['El formulario pide iniciar sesión', 'Cambiar en Forms la opción de quién puede responder.']
];

/* ── modo consulta ──────────────────────────────────────────────────── */

function momentoCard(m) {
  return `
  <article class="mom" id="mom-${m.n}" data-i="${MOMENTOS.indexOf(m)}">
    <div class="mom__n">${String(m.n).padStart(2, '0')}<b>${m.mins}</b></div>
    <div>
      <h3 class="mom__t">${m.titulo}</h3>
      <div class="mom__body">${m.html}</div>
    </div>
  </article>`;
}

document.getElementById('antes').innerHTML =
  MOMENTOS.filter(m => m.parte === 0).map(momentoCard).join('');
document.getElementById('parte-1').innerHTML =
  MOMENTOS.filter(m => m.parte === 1).map(momentoCard).join('');
document.getElementById('parte-2').innerHTML =
  MOMENTOS.filter(m => m.parte === 2).map(momentoCard).join('');
document.getElementById('demo').innerHTML =
  MOMENTOS.filter(m => m.parte === 3).map(momentoCard).join('');
document.getElementById('problemas').innerHTML = `
  <table class="tabla">
    <thead><tr><th>Síntoma</th><th>Qué hacer</th></tr></thead>
    <tbody>${PROBLEMAS.map(([s, q]) => `<tr><td>${s}</td><td>${q}</td></tr>`).join('')}</tbody>
  </table>`;

/* ── configuración para el deck compartido ──────────────────────────── */

const NOMBRE_PARTE = {
  0: 'Antes de empezar',
  1: 'Parte 1 — Publicar el sitio',
  2: 'Parte 2 — Forms y Excel',
  3: 'El resultado'
};

const SESION_2 = {
  slides: MOMENTOS.map(m => ({
    ...m,
    seen: `<h2 class="deck__t">${m.titulo}</h2>
           ${m.mins ? `<span class="deck__min">${m.mins}</span>` : ''}
           <div class="deck__cuerpo">${m.html}</div>`
  })),
  etiqueta: m => (m.parte === 0 || m.parte === 3)
    ? `<b>${m.titulo}</b>`
    : `${NOMBRE_PARTE[m.parte]} · <b>${m.titulo}</b>`,
  nota: () => '',
  ancla: m => 'mom-' + m.n
};
