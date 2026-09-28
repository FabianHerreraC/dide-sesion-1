/* =====================================================================
   SESIÓN 3 — EL LOOP
   Dos horas dentro de n8n: leer un Excel, escribir en él, procesar esos
   datos y dejar el flujo corriendo solo. La web no se toca.
   ===================================================================== */

/* el circuito de la sesión, dibujado a mano en el sistema del sitio */
const DIAGRAMA_LOOP = `
<svg class="diagrama" viewBox="0 0 640 200" role="img"
     aria-label="Disparador manual o programado, leer filas del Excel, procesar con agente o nodos, escribir el resultado en el Excel; una flecha punteada vuelve de la escritura a la lectura: la vuelta siguiente lee lo que dejó esta.">
  <defs>
    <marker id="pta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#111110"/>
    </marker>
  </defs>
  <g class="cajas">
    <rect x="6"   y="34" width="136" height="58"/>
    <rect x="174" y="34" width="136" height="58"/>
    <rect x="342" y="34" width="136" height="58"/>
    <rect x="510" y="34" width="124" height="58"/>
  </g>
  <g class="rot">
    <text x="74"  y="58">Disparador</text><text x="74"  y="74">manual o reloj</text>
    <text x="242" y="58">Leer filas</text><text x="242" y="74">del Excel</text>
    <text x="410" y="58">Procesar</text><text x="410" y="74">agente o nodos</text>
    <text x="572" y="58">Escribir</text><text x="572" y="74">en el Excel</text>
  </g>
  <g class="flechas">
    <line x1="142" y1="63" x2="170" y2="63" marker-end="url(#pta)"/>
    <line x1="310" y1="63" x2="338" y2="63" marker-end="url(#pta)"/>
    <line x1="478" y1="63" x2="506" y2="63" marker-end="url(#pta)"/>
    <path class="vuelta" d="M572,92 L572,140 L242,140 L242,96" marker-end="url(#pta)"/>
  </g>
  <text class="pie" x="407" y="158" text-anchor="middle">la vuelta siguiente lee lo que dejó esta</text>
</svg>`;

const VOCABULARIO_3 = [
  ['Backend', 'El lugar donde pasa lo que nadie ve. El sitio de la Sesión 2 era todo frente; esto es lo de atrás, y por ahora vive solo.'],
  ['Flujo <span>workflow</span>', 'La secuencia de nodos que se ejecuta cuando algo la dispara.'],
  ['Nodo', 'Cada paso del flujo. Unos leen, otros transforman, otros escriben.'],
  ['Ejecución', 'Cada vez que el flujo corre. Quedan registradas y se revisan una por una.'],
  ['Disparador <span>trigger</span>', 'Lo que arranca el flujo. Un clic, un reloj o, en la Sesión 4, una página web.']
];

const MOMENTOS_3 = [
  { n: 0, parte: 0, titulo: 'Antes de empezar', mins: '',
    html: `
      <p>Solo necesitas una cosa: <b>una cuenta de n8n Cloud</b>, creada el día
         anterior a la sesión en n8n.io, con el correo institucional y sin
         tarjeta. La prueba gratuita dura 14 días.</p>
      <p class="nota">Todo lo demás lo construimos desde cero en clase.</p>` },

  { n: 1, parte: 1, titulo: 'Vocabulario mínimo', mins: '10 min',
    html: `
      <p>Toda esta sesión ocurre dentro de n8n. El sitio web se queda quieto; lo
         que se arma aquí es el motor que en la Sesión 4 se conecta a él.</p>
      ${DIAGRAMA_LOOP}
      ${filas(VOCABULARIO_3)}` },

  { n: 2, parte: 1, titulo: 'Leer el Excel', mins: '20 min',
    html: pasosOrdenados([
      'En OneDrive, crear el libro de Excel de trabajo con unas pocas filas de ejemplo y darles formato de <b>tabla</b> (seleccionar el rango y usar <em>Dar formato como tabla</em>). Los nodos leen tablas, no rangos sueltos.',
      'En n8n, <b>Create Workflow</b> y ponerle nombre.',
      'Agregar el nodo <b>Manual Trigger</b>, que arranca el flujo con un clic.',
      'Agregar <b>Microsoft Excel 365</b> con la acción <b>Get rows</b>.',
      'En <b>Credential</b>, crear una nueva y autorizar con la cuenta institucional.',
      'Elegir el libro, la hoja y la tabla.',
      '<b>Test workflow</b> y revisar las filas que devuelve. Vale detenerse a mirar la estructura: cada fila es un objeto con sus campos.']) },

  { n: 3, parte: 1, titulo: 'Escribir en el Excel', mins: '20 min',
    html: `
      ${pasosOrdenados([
        'Agregar el nodo <b>Edit Fields (Set)</b> para armar una fila nueva con valores fijos.',
        'Conectarle <b>Microsoft Excel 365</b> con la acción <b>Append row to table</b>, apuntando a una segunda hoja del mismo libro.',
        'Mapear cada columna al campo correspondiente.',
        'Ejecutar y comprobar en OneDrive que la fila apareció.'])}
      <p class="pregunta">Leer y escribir son las dos operaciones básicas de cualquier sistema. Con esas dos ya se puede construir casi todo lo demás.</p>` },

  { n: 4, parte: 1, titulo: 'Quitar la mano del disparador', mins: '10 min',
    html: pasosOrdenados([
      'Reemplazar el <b>Manual Trigger</b> por un <b>Schedule Trigger</b>.',
      'Poner el intervalo en horas o en un día fijo de la semana. Nunca en minutos.',
      'Activar el flujo con el interruptor <b>Active</b> y verificar que corra solo.']) },

  { n: 5, parte: 1, titulo: 'Revisar las ejecuciones', mins: '10 min',
    html: `<p>Abrir la pestaña <b>Executions</b> y mirar qué pasó en cada corrida,
      nodo por nodo: qué entró, qué salió y dónde falló si falló. Esa
      trazabilidad es lo que hace auditable a un sistema automatizado.</p>` },

  { n: 6, parte: 2, titulo: 'Procesamiento sin modelo', mins: '15 min',
    html: `
      <p>Hasta aquí el flujo mueve datos de un lado a otro. Ahora se le pone
         criterio en el medio.</p>
      <p>Entre la lectura y la escritura, agregar nodos que transformen:
         <b>Filter</b> para quedarse con ciertas filas, <b>Sort</b> para
         ordenarlas, <b>Summarize</b> para contar o promediar. Sirve para ver
         que buena parte del trabajo repetitivo se resuelve sin inteligencia
         artificial.</p>` },

  { n: 7, parte: 2, titulo: 'Procesamiento con un agente', mins: '20 min',
    html: `
      ${pasosOrdenados([
        'Agregar el nodo <b>AI Agent</b> después de la lectura.',
        'En el modelo, credencial de OpenAI o Anthropic con la clave que se entrega en la sesión.',
        'Como herramienta, conectarle <b>Microsoft Excel 365</b> con <b>Get rows</b> sobre la tabla.',
        'Escribir la instrucción de sistema:'])}
      ${cita('Analizas las respuestas recogidas por el formulario de mi sitio. Consulta siempre la tabla antes de responder. Trabaja con los datos que existen y di explícitamente cuándo no hay suficientes. No inventes cifras ni completes lo que falta.')}
      <p class="nota">La última frase importa: sin ella el agente rellena huecos con verosimilitud. Vale probar a quitarla y ver qué cambia.</p>` },

  { n: 8, parte: 2, titulo: 'Que el agente escriba de vuelta', mins: '15 min',
    html: `<p>Conectar la salida del agente a un <b>Append row</b> sobre la
      segunda hoja, para que cada ejecución deje ahí su lectura. La corrida
      siguiente puede leer lo que escribió la anterior, y ahí el circuito se
      vuelve recursivo: el sistema produce datos que alimentan su propio
      análisis.</p>` },

  { n: 9, parte: 2, titulo: 'Cierre conceptual: el loop', mins: '10 min',
    html: `
      <p>El proceso dejó de ser una tarea con principio y fin. Ahora es una
         partitura que suena distinto cada vez, porque cada ejecución modifica
         el estado del que parte la siguiente.</p>
      ${filas([
        ['El sistema acumula', 'Lo que entró ayer condiciona lo que se analiza hoy.'],
        ['El loop corre sin nosotros', 'No necesita que nadie esté presente para seguir operando.'],
        ['Cada vuelta puede mejorar la siguiente', 'Si la salida ajusta la pregunta que se hace, el circuito se afina solo. Esa es la segunda variable de la cognición aumentada: pensar en loops.']])}
      <p class="pregunta">¿Qué procesos de tu trabajo ya son loops sin que los llamemos así? ¿Cuáles estás ejecutando a mano una vez por semana?</p>` },

  { n: 10, parte: 3, titulo: 'Los 8 días intermedios', mins: '',
    html: `
      <p>La pausa es parte del ejercicio. El flujo programado queda activo y
         sigue leyendo, procesando y escribiendo sin que nadie intervenga, así
         que la Sesión 4 empieza con un sistema que ya tiene historia.</p>
      <h4 class="sub">Tarea para ese intervalo</h4>
      ${pasosOrdenados([
        'Revisar una vez las ejecuciones para ver qué produjo el flujo y si algo falló.',
        'Leer la segunda hoja del Excel: ahí está el rastro de lo que el agente fue escribiendo solo.',
        'Anotar qué parte de ese sistema valdría la pena mostrarle a alguien. Esa decisión es el insumo de la Sesión 4.'])}` }
];

const PROBLEMAS_3 = [
  ['El nodo de Excel no encuentra la tabla', 'Los datos deben estar formateados como tabla en Excel, no como rango suelto.'],
  ['TI no autoriza la conexión con OneDrive', 'Resolver en el alistamiento previo; alternativa de respaldo, Google Sheets con cuenta personal.'],
  ['El agente responde con datos que no existen', 'Reforzar la instrucción de sistema y revisar en la ejecución si consultó la herramienta.'],
  ['Se agotaron las 1000 ejecuciones', 'Desactivar los flujos programados; los datos del Excel siguen intactos.'],
  ['La prueba de n8n venció', 'Descargar los flujos en JSON (hay 90 días) e importarlos en una cuenta nueva o en una instancia propia.']
];

document.getElementById('problemas-3').innerHTML = tablaProblemas(PROBLEMAS_3);

const SESION_3 = montarTaller({
  momentos: MOMENTOS_3,
  prefijo: '3-',
  secciones: { 0: 's3-antes', 1: 's3-parte-1', 2: 's3-parte-2', 3: 's3-pausa' },
  partes: {
    1: 'Primera hora — Leer y escribir el Excel',
    2: 'Segunda hora — Procesar y cerrar el loop',
    3: 'Entre las dos sesiones'
  }
});
