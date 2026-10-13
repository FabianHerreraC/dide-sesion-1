/* =====================================================================
   SESIÓN 5 — EL SISTEMA COMPLETO
   Frontend, backend y base de datos en una sola herramienta: ChatGPT
   Sites. Antes, el repaso de la arquitectura y las reglas colombianas
   sobre datos personales.
   ===================================================================== */

const DIAGRAMA_CAPAS = `
<svg class="diagrama" viewBox="0 0 640 215" role="img"
     aria-label="Tres capas: frontend, lo que se ve y se escribe; backend, las reglas y el criterio; base de datos, lo que queda escrito. El dato entra del frontend al backend por POST y del backend a la base de datos cuando se guarda; sale de la base de datos cuando se lee y del backend al frontend como JSON. Cada flecha es una llamada de API.">
  <defs>
    <marker id="ptc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#111110"/>
    </marker>
  </defs>

  <text class="via" x="6" y="26">01 / entra el dato</text>

  <g class="cajas">
    <rect x="10"  y="46" width="170" height="86"/>
    <rect x="235" y="46" width="170" height="86"/>
    <rect x="460" y="46" width="170" height="86"/>
  </g>
  <g class="rot">
    <text x="95"  y="74">Frontend</text>
    <text x="95"  y="92" class="sub">lo que se ve</text>
    <text x="95"  y="106" class="sub">y se escribe</text>
    <text x="320" y="74">Backend</text>
    <text x="320" y="92" class="sub">las reglas</text>
    <text x="320" y="106" class="sub">y el criterio</text>
    <text x="545" y="74">Base de datos</text>
    <text x="545" y="92" class="sub">lo que queda</text>
    <text x="545" y="106" class="sub">escrito</text>
  </g>

  <g class="flechas">
    <line x1="182" y1="70" x2="231" y2="70" marker-end="url(#ptc)"/>
    <line x1="407" y1="70" x2="456" y2="70" marker-end="url(#ptc)"/>
    <line x1="233" y1="112" x2="184" y2="112" marker-end="url(#ptc)"/>
    <line x1="458" y1="112" x2="409" y2="112" marker-end="url(#ptc)"/>
  </g>
  <g class="micro">
    <text x="206" y="62" text-anchor="middle">POST</text>
    <text x="431" y="62" text-anchor="middle">guarda</text>
    <text x="206" y="126" text-anchor="middle">JSON</text>
    <text x="431" y="126" text-anchor="middle">lee</text>
  </g>

  <text class="via" x="6" y="158">02 / sale el dato</text>
  <text class="pie" x="320" y="192" text-anchor="middle">cada flecha es una llamada de API: una pregunta y su respuesta</text>
</svg>`;

const CAPAS = [
  ['Frontend', 'Lo que el visitante ve y toca: la página, el formulario, los botones. Es todo lo que hicimos en la Sesión 2, y cualquier visitante puede leerlo entero desde su navegador: nada de lo que vive ahí es secreto.'],
  ['Backend', 'Las reglas que nadie ve: qué se acepta, qué se calcula, qué se responde. Fue el flujo de n8n de la Sesión 3, y es el único lugar donde pueden vivir una clave o una decisión de permisos.'],
  ['Base de datos', 'Lo que queda escrito cuando se apaga el computador. Era el Excel de OneDrive; en esta sesión es una tabla de verdad, con sus columnas y sus tipos.']
];

const LLAMADA = [
  ['Método', '<code>GET</code> para pedir, <code>POST</code> para enviar. Es la diferencia entre preguntar y entregar.'],
  ['Dirección', 'A dónde se llama. En la Sesión 4 fue la URL del webhook; aquí será una ruta del propio sitio.'],
  ['Cuerpo', 'Lo que se manda, casi siempre en JSON: pares de nombre y valor, como las columnas de una fila.'],
  ['Respuesta', 'Lo que vuelve: los datos pedidos y un código que dice si salió bien. Sin respuesta no hay llamada completa.']
];

const LEY = [
  '<b>La norma vigente.</b> La <b>Ley 1581 de 2012</b> (reglamentada en el Decreto 1074 de 2015, que recogió el 1377 de 2013) rige el tratamiento de datos personales en Colombia; la <b>Ley 1266 de 2008</b> cubre aparte el dato financiero y crediticio. La autoridad es la <b>Superintendencia de Industria y Comercio</b>, por su Delegatura de Protección de Datos Personales. Hay proyectos de reforma en trámite en el Congreso desde 2025, pero mientras no se aprueben, esto es lo que aplica.',

  '<b>Sin autorización no hay recolección.</b> El permiso del titular debe ser <b>previo, expreso e informado</b>: antes de recoger el dato, dicho con claridad, y diciendo para qué. La prueba de que esa autorización existió la tiene que conservar quien recoge los datos, no quien los entrega. En la práctica: una casilla sin marcar por defecto, un texto corto que diga qué se va a hacer con el dato, y el registro de quién aceptó y cuándo.',

  '<b>Finalidad declarada y nada más.</b> Solo se piden los datos necesarios para el fin que se anunció, y solo se usan para ese fin. Si después aparece un uso nuevo —mandar boletines, cruzar con otra base, entrenar un modelo—, hace falta una autorización nueva. Dato que no sirve al propósito declarado es dato que no se pide.',

  '<b>El titular manda sobre su dato.</b> Puede conocer, actualizar, rectificar y suprimir lo suyo, pedir prueba de la autorización, y revocarla. Eso exige un canal visible para ejercerlo y plazos: <b>10 días hábiles</b> para responder una consulta y <b>15 días hábiles</b> para un reclamo, cada uno prorrogable una vez. Un formulario sin un correo de contacto para ejercer estos derechos ya está incompleto.',

  '<b>Datos sensibles, menores y dónde viven los datos.</b> Salud, biometría, origen étnico, orientación política o sexual y convicciones son <b>datos sensibles</b>: nadie está obligado a entregarlos y su tratamiento es excepcional; los de niñas, niños y adolescentes, más restringidos todavía. Además hay deberes de seguridad y confidencialidad, política de tratamiento y aviso de privacidad, registro en el <b>RNBD</b> según el tamaño y la naturaleza de la entidad, y reglas para la <b>transferencia internacional</b>: al publicar en una herramienta como ChatGPT Sites, los datos quedan en servidores fuera del país, y eso hay que advertirlo y poder sustentarlo.'
];

const MOMENTOS_5 = [
  { n: 0, parte: 0, titulo: 'Antes de empezar', mins: '',
    html: `
      ${filas([
        ['Cuenta', 'ChatGPT en un plan que incluya <b>Sites</b> (Plus, Pro, Business, Enterprise o Edu). Es una función en beta pública; en cuentas Enterprise el administrador debe habilitarla, y la publicación abierta a internet viene apagada.'],
        ['A la mano', 'El spec de la Sesión 1 y el sitio de la Sesión 2. Lo que vamos a montar hoy es el mismo propósito, pero con sus tres capas propias.'],
        ['Datos', 'Para el taller, datos de prueba inventados. Nada de datos personales reales mientras estamos aprendiendo.']])}
      <p class="nota">Las cuatro sesiones anteriores armaron el sistema por partes: la página por un lado, el motor por otro, y los webhooks en el medio. Hoy se construyen las tres capas en una sola herramienta.</p>` },

  { n: 1, parte: 1, titulo: 'Las tres capas, de nuevo y completas', mins: '15 min',
    html: `
      ${DIAGRAMA_CAPAS}
      ${filas(CAPAS)}
      <p class="pregunta">Si cualquiera puede leer el frontend entero, ¿qué cosas no pueden vivir nunca ahí?</p>` },

  { n: 2, parte: 1, titulo: 'Qué es una llamada de API', mins: '10 min',
    html: `
      <p>Una <b>llamada de API</b> es una conversación corta entre dos programas: uno pregunta o entrega algo, el otro responde. Nada más. Ya hicimos varias sin llamarlas así: el formulario de la Sesión 4 enviando al webhook era una, y la página leyendo el JSON de vuelta era otra.</p>
      ${filas(LLAMADA)}
      <p class="nota">Cuando un sistema «se integra» con otro, casi siempre quiere decir esto: que uno sabe a qué dirección llamar y qué esperar de vuelta.</p>` },

  { n: 3, parte: 1, titulo: 'El flujo: lo que entra y lo que sale', mins: '10 min',
    html: `
      ${pasosOrdenados([
        '<b>Entra.</b> Alguien escribe algo en el formulario y lo envía.',
        '<b>Se valida.</b> El backend revisa que esté completo y que sea plausible antes de aceptarlo. Lo que no se valida, se cree.',
        '<b>Se guarda.</b> La fila queda en la base de datos, con la fecha y el origen.',
        '<b>Se procesa.</b> Se cuenta, se resume, se clasifica: con nodos o con un agente, como en la Sesión 3.',
        '<b>Sale.</b> La página pide el resultado y lo muestra. El visitante ve algo que incluye lo que otros dejaron antes.'])}
      <p class="pregunta">Un dato que entra y nunca sale no le sirve a nadie; un dato que sale sin haber sido validado al entrar engaña a todos.</p>` },

  { n: 4, parte: 2, titulo: 'Cinco puntos sobre datos personales en Colombia', mins: '20 min',
    html: `
      <p>Desde hoy el sistema puede guardar datos de personas reales. Esto es lo mínimo que hay que tener presente antes de abrir el formulario al público.</p>
      ${pasosOrdenados(LEY)}
      <p class="nota">Esto es orientación práctica para el taller, no asesoría jurídica: la política de tratamiento de datos de la Universidad manda sobre cualquier sitio que se publique a su nombre, y la SIC publica las guías oficiales en sic.gov.co.</p>` },

  { n: 5, parte: 3, titulo: 'Crear el sitio en ChatGPT Sites', mins: '20 min',
    html: `
      ${pasosOrdenados([
        'En ChatGPT, describir el sitio en el prompt (la palabra <b>website</b> o un <code>@Sites</code> explícito activan la función).',
        'Decir las tres cosas que la herramienta necesita: <b>para quién</b> es el sitio, <b>para qué</b> sirve y <b>qué debe hacer</b> cuando alguien lo usa.',
        'Revisar la vista previa, que es privada: un sitio nuevo solo lo ven su dueño y los administradores del espacio de trabajo.',
        'Refinar por chat, pidiendo un cambio a la vez. En la vista previa, <b>Edit</b> abre el campo para describir el cambio.'])}
      ${encargo('«Hazme un sitio donde la comunidad de la universidad pueda dejar una pregunta sobre mi cargo y vea las últimas respuestas publicadas. Guarda cada pregunta con su fecha. Antes de construir, muéstrame qué campos vas a guardar y por qué.»')}
      <p class="nota">Es el mismo oficio de la Sesión 1: lo que se especifica bien se construye bien. Cambió la herramienta, no el método.</p>` },

  { n: 6, parte: 3, titulo: 'Los datos que persisten', mins: '15 min',
    html: `
      ${filas([
        ['Tabla', 'Los datos estructurados —las filas del formulario, un contador, el estado de algo— van a una base de datos relacional del sitio (D1, compatible con SQLite). Hasta 10 GB por sitio.'],
        ['Archivos', 'Las imágenes, los PDF, el audio y el video van a un almacenamiento de archivos aparte (R2). El patrón normal es guardar el archivo allí y la ficha que lo describe en la tabla.'],
        ['Lo pasajero', 'El tema claro u oscuro, un aviso que alguien cerró: eso no necesita base de datos. Pedir que se guarde todo es la forma más rápida de ensuciar una tabla.'],
        ['Claves', 'Las credenciales y variables de entorno se configuran en los ajustes del sitio, nunca escritas dentro del prompt ni del código visible.']])}
      <p class="pregunta">¿Cuál de los datos que pensabas pedir es realmente necesario para el fin que declaraste?</p>` },

  { n: 7, parte: 3, titulo: 'Quién entra y quién ve', mins: '15 min',
    html: `
      ${filas([
        ['Audiencia', 'Un sitio nace privado. Se puede abrir a personas concretas, a invitados externos, a todo el espacio de trabajo o a cualquiera en internet; esto último suele estar apagado por defecto en cuentas institucionales.'],
        ['Identidad', 'Un sitio público puede ofrecer <b>Sign in with ChatGPT</b> sin cerrarle la puerta a quien no inicie sesión. Tras el ingreso, el servidor recibe el correo del visitante.'],
        ['Permisos', 'Quién puede hacer qué se decide <b>en el servidor</b>. Una comprobación hecha en el navegador sirve para la experiencia, no como control de acceso: el visitante puede ver y cambiar todo lo que llega a su máquina.'],
        ['Roles', 'Quien visita usa el sitio; quien edita cambia el código y publica, pero no cambia la audiencia ni la propiedad.']])}` },

  { n: 8, parte: 3, titulo: 'Publicar y volver atrás', mins: '10 min',
    html: `
      ${pasosOrdenados([
        '<b>Guardar una versión</b> construye algo revisable sin que nadie más lo vea. Es el equivalente al commit de la Sesión 2.',
        '<b>Desplegar</b> publica esa versión en su dirección: toda dirección desplegada es producción, así que se despliega cuando la audiencia elegida ya puede verlo.',
        'Probar el circuito completo: enviar el formulario, comprobar que la fila quedó en la tabla y recargar la página para ver el resultado.',
        'Revisar la audiencia una última vez antes de repartir el enlace.'])}
      <p class="nota">Borrar un sitio es permanente. Y hay usos vedados por la propia herramienta: datos de salud, datos de tarjetas, transacciones financieras y contenido dirigido a menores de 13 años.</p>` },

  { n: 9, parte: 4, titulo: 'Cierre: dónde queda cada responsabilidad', mins: '15 min',
    html: `
      ${filas([
        ['La herramienta cambió', 'Cinco sesiones atrás esto eran cuatro herramientas distintas. Hoy una sola hace las tres capas, y mañana será otra. Lo que no caduca es saber qué hace cada capa y por qué.'],
        ['El criterio no se delega', 'Qué dato se pide, para qué, quién lo ve y cuándo se borra son decisiones humanas. Ninguna herramienta las toma por nosotros, aunque todas las ejecuten.'],
        ['Lo que queda', 'Un sistema propio, publicado, con su frontend, su backend y su base de datos; y el oficio de especificarlo antes de construirlo.']])}
      <p class="pregunta">¿Qué dato de los que vas a recoger te gustaría que alguien recogiera de ti, con las mismas reglas que acabas de escribir?</p>` }
];

const PROBLEMAS_5 = [
  ['No aparece la opción de crear un sitio', 'Revisar el plan: Sites está en Plus, Pro, Business, Enterprise y Edu, y en cuentas institucionales el administrador debe habilitarlo.'],
  ['El sitio se ve solo desde mi cuenta', 'Es el estado inicial: nace privado. Cambiar la audiencia en las opciones de compartir, y recordar que la publicación abierta puede estar restringida por el administrador.'],
  ['Los datos del formulario se pierden al recargar', 'Pedir explícitamente que esos datos se guarden en la base del sitio; lo que no se declara persistente, vive solo en el navegador.'],
  ['Alguien ve datos que no debería', 'La comprobación quedó en el navegador. Las reglas de acceso se escriben del lado del servidor.'],
  ['Un visitante pide borrar sus datos', 'Hay que poder hacerlo y responder a tiempo: 15 días hábiles para un reclamo. Conviene tener la consulta de borrado lista desde el primer día.']
];

document.getElementById('problemas-5').innerHTML = tablaProblemas(PROBLEMAS_5);

const SESION_5 = montarTaller({
  momentos: MOMENTOS_5,
  prefijo: '5-',
  secciones: { 0: 's5-antes', 1: 's5-parte-1', 2: 's5-parte-2', 3: 's5-parte-3', 4: 's5-cierre' },
  partes: {
    1: 'Arquitectura — las tres capas',
    2: 'Datos personales — cinco puntos',
    3: 'Manos a la obra — ChatGPT Sites',
    4: 'Cierre'
  }
});
