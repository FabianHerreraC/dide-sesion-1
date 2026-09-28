/* =====================================================================
   SESIÓN 4 — LA AGENCIA
   El motor de la Sesión 3 se abre al mundo con dos webhooks: uno por
   donde entran datos desde la web, otro por donde salen resultados.
   ===================================================================== */

const DIAGRAMA_CIRCUITO = `
<svg class="diagrama" viewBox="0 0 640 260" role="img"
     aria-label="El formulario del sitio envía por POST al webhook de escritura, que agrega la fila al Excel en OneDrive; el flujo de la Sesión 3 lee y escribe ese mismo Excel; el webhook de lectura devuelve por GET los datos que la página muestra.">
  <defs>
    <marker id="ptb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#111110"/>
    </marker>
  </defs>

  <text class="via" x="6" y="28">01 / escritura</text>
  <g class="cajas">
    <rect x="6"   y="38" width="150" height="48"/>
    <rect x="228" y="38" width="150" height="48"/>
    <rect x="450" y="38" width="150" height="48"/>
  </g>
  <g class="rot">
    <text x="81"  y="58">Formulario</text><text x="81"  y="74">en el sitio</text>
    <text x="303" y="58">Webhook</text><text x="303" y="74">POST /formulario</text>
    <text x="525" y="58">Excel</text><text x="525" y="74">en OneDrive</text>
  </g>
  <g class="flechas">
    <line x1="156" y1="62" x2="224" y2="62" marker-end="url(#ptb)"/>
    <line x1="378" y1="62" x2="446" y2="62" marker-end="url(#ptb)"/>
  </g>

  <text class="via" x="6" y="122">02 / proceso</text>
  <g class="cajas"><rect x="450" y="132" width="150" height="48"/></g>
  <g class="rot">
    <text x="525" y="152">Flujo de la</text><text x="525" y="168">Sesión 3</text>
  </g>
  <g class="flechas">
    <path class="vuelta" d="M470,86 L470,132" marker-end="url(#ptb)"/>
    <path class="vuelta" d="M580,132 L580,86" marker-end="url(#ptb)"/>
  </g>

  <text class="via" x="6" y="212">03 / lectura</text>
  <g class="cajas">
    <rect x="6"   y="222" width="150" height="34"/>
    <rect x="228" y="222" width="150" height="34"/>
  </g>
  <g class="rot">
    <text x="81"  y="243">La página muestra</text>
    <text x="303" y="243">Webhook GET /datos</text>
  </g>
  <g class="flechas">
    <line x1="450" y1="180" x2="450" y2="239" />
    <line x1="450" y1="239" x2="382" y2="239" marker-end="url(#ptb)"/>
    <line x1="228" y1="239" x2="160" y2="239" marker-end="url(#ptb)"/>
  </g>
</svg>`;

const VOCABULARIO_4 = [
  ['Webhook', 'Una dirección que queda esperando. Cuando algo le envía datos, el flujo arranca.'],
  ['POST y GET', 'Enviar datos al servidor y pedirle datos al servidor.'],
  ['URL de prueba y de producción', 'La primera solo escucha mientras alguien está mirando; la segunda funciona siempre.']
];

const MOMENTOS_4 = [
  { n: 0, parte: 0, titulo: 'De dónde partimos', mins: '',
    html: `
      <p>El motor ya funciona. Aquí se le abren dos puertas: una para que
         entren datos desde afuera y otra para que salgan resultados.</p>
      <p><b>Requisito de esta sesión:</b> el sitio de la Sesión 2 publicado en
         GitHub Pages. Quien no lo tenga en línea lo resuelve en los primeros
         minutos, subiendo su <code>index.html</code> al repositorio y
         activando Pages.</p>
      ${DIAGRAMA_CIRCUITO}` },

  { n: 1, parte: 1, titulo: 'Vocabulario mínimo', mins: '5 min',
    html: filas(VOCABULARIO_4) },

  { n: 2, parte: 1, titulo: 'Webhook de escritura', mins: '20 min',
    html: pasosOrdenados([
      'Flujo nuevo con el nodo <b>Webhook</b>, método <code>POST</code>, path <code>formulario</code>.',
      'Copiar la <b>Test URL</b> y hacer clic en <b>Listen for test event</b>.',
      'Conectarle <b>Microsoft Excel 365</b> con <b>Append row to table</b>, apuntando a la tabla original.',
      'Mapear cada campo del webhook a su columna.']) },

  { n: 3, parte: 1, titulo: 'Formulario propio en el sitio', mins: '20 min',
    html: `
      ${encargo('«Reemplaza el formulario embebido por un formulario propio en HTML con los campos […]. Que envíe los datos por fetch en formato JSON a esta dirección: [pegar Test URL]. Que muestre un mensaje de éxito o de error, y explícame qué hace cada parte del código.»')}
      <p class="nota">Si el flujo no recibe nada y la consola del navegador muestra un error de <b>CORS</b>, agregar en el nodo Webhook un <b>Response Header</b> con <code>Access-Control-Allow-Origin</code> en <code>*</code>, o el dominio de GitHub Pages.</p>` },

  { n: 4, parte: 1, titulo: 'Pasar a producción', mins: '15 min',
    html: pasosOrdenados([
      'Enviar el formulario desde el sitio publicado y verificar la ejecución en n8n y la fila en el Excel.',
      'Activar el flujo y copiar la <b>Production URL</b>.',
      'Reemplazarla en el código, hacer commit y push, y probar de nuevo.']) },

  { n: 5, parte: 2, titulo: 'Webhook de lectura', mins: '20 min',
    html: pasosOrdenados([
      'Flujo nuevo con un nodo <b>Webhook</b>, método <code>GET</code>, path <code>datos</code>.',
      'Agregar <b>Microsoft Excel 365</b> con <b>Get rows</b> sobre la hoja donde el agente escribe sus lecturas.',
      'Agregar <b>Respond to Webhook</b> para devolver esas filas como JSON.',
      'Probar la dirección en el navegador: deben aparecer los datos en texto plano.']) },

  { n: 6, parte: 2, titulo: 'Mostrar el resultado en la página', mins: '20 min',
    html: `
      ${encargo('«Agrega una sección al sitio que consulte esta dirección al cargar la página y muestre los datos: [pegar URL]. Quiero ver el último análisis y el total de respuestas. Maneja el caso en que todavía no haya datos.»')}
      <p>Cada participante decide qué muestra: el resumen del agente, un
         contador, una lista. Esa decisión es de diseño y conviene nombrarla
         como tal.</p>` },

  { n: 7, parte: 2, titulo: 'Ver el circuito completo', mins: '10 min',
    html: `<p>En parejas: uno responde el formulario del otro, ambos ejecutan el
      flujo de procesamiento y recargan la página. El dato que acaba de entrar
      ya pasó por el agente y cambió lo que el siguiente visitante ve.</p>` },

  { n: 8, parte: 2, titulo: 'Cierre, entregable y agencia', mins: '10 min',
    html: `
      ${pasosOrdenados([
        '<b>Desactivar</b> los flujos programados antes de salir, para no gastar la cuota.',
        'Descargar cada flujo en JSON (menú del flujo, <b>Download</b>). Esos archivos son el entregable personal de las dos sesiones y sobreviven al vencimiento de la prueba.',
        'Conversación final.'])}
      ${filas([
        ['El humano define el criterio', 'El sistema ejecuta el juicio. La instrucción de sistema es el lugar donde queda inscrita una decisión humana que luego se aplica miles de veces.'],
        ['La escala cambia el proceso', 'Algo que una persona hace una vez por semana, un agente lo hace cada hora, sin cansarse y sin olvidar.'],
        ['Qué conviene delegar', 'La pregunta interesante no es qué puede hacer el agente, sino qué queremos que haga sin supervisión, y qué exige que alguien mire antes de que salga al público.']])}
      <p class="pregunta">¿Qué queremos que el sistema haga sin que nadie mire, y qué no?</p>` }
];

const PROBLEMAS_4 = [
  ['El formulario envía y n8n no recibe nada', 'Revisar si el flujo está en modo prueba o activo, y si la URL del código es la de prueba o la de producción.'],
  ['Error de CORS en la consola del navegador', 'Agregar <code>Access-Control-Allow-Origin</code> en los Response Headers del nodo Webhook.'],
  ['El agente responde con datos que no existen', 'Reforzar la instrucción de sistema y revisar en la ejecución si consultó la herramienta.'],
  ['Se agotaron las 1000 ejecuciones', 'Desactivar los flujos programados; los datos del Excel siguen intactos.'],
  ['La prueba de n8n venció', 'Descargar los flujos en JSON (hay 90 días) e importarlos en una cuenta nueva o en una instancia propia.']
];

document.getElementById('problemas-4').innerHTML = tablaProblemas(PROBLEMAS_4);

const SESION_4 = montarTaller({
  momentos: MOMENTOS_4,
  prefijo: '4-',
  secciones: { 0: 's4-antes', 1: 's4-parte-1', 2: 's4-parte-2' },
  partes: {
    1: 'Primera hora — Que la web escriba en el sistema',
    2: 'Segunda hora — Que el sistema le responda'
  }
});
