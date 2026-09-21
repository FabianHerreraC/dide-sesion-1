# Spec — sitio de las sesiones DiDE

Formación práctica en cognición aumentada para la DiDE. Una página por sesión,
mismo sistema visual y mismo par de modos:

- **Sesión 1 — «Escribir el sistema antes de construirlo»** → `index.html` + `app.js`
- **Sesión 2 — «Del archivo a producción»** → `sesion-2.html` + `sesion-2.js`
- El modo presentación es compartido: `deck.js`.

El spec de abajo es el de la Sesión 1, escrito antes de construirla; la Sesión 2
hereda su arquitectura y su sistema visual, y cambia solo el contenido (un
taller de dos horas con dos rutas paralelas y una tabla de problemas
frecuentes).

## 1. ¿Qué es, en una frase?
Una página de una sola vista que presenta el guion completo de la Sesión 1, los
seis slides conceptuales y las ocho preguntas del spec en vivo.
- **Nombre corto:** sitio de la Sesión 1.
- **Propósito central:** que Fabián la use como apoyo al presentar y que el
  equipo de la DiDE la consulte después.
- **Fuera de alcance:** las otras siete sesiones del curso, y cualquier lugar
  donde los participantes suban su propio spec.

## 2. ¿Quién lo usa y quién recibe el resultado?
Interactúa Fabián durante la sesión, como apoyo de presentación. Reciben el
resultado los 17 participantes de la DiDE, que vuelven a repasar el guion o las
ocho preguntas cuando escriben su propio spec. Roles distintos en el momento,
misma audiencia final.

## 3. ¿Qué entra y qué debe salir?
Entra el guion completo (seis ideas, ocho pasos, la tarea de cierre y un
ejemplo de spec terminado). Sale una página navegable: las seis ideas como tarjetas
«Se ve / Es decir», los ocho pasos del spec en un desplegable bajo el subtítulo
«Así se hace un spec», la tarea al final del bloque, y el spec de esta misma página
como ejemplo para consulta posterior.

## 4. ¿Cuál es el paso a paso?
Fabián abre el sitio al inicio de la sesión (o alguien lo abre después para
repasar) → Bloque 1, seis ideas en orden → transición explícita → Bloque 2, los
ocho pasos del spec en orden → la tarea. **Punto de decisión:** modo presentación
(pantalla completa, slide por slide) frente a modo consulta (scroll continuo con
el material de referencia extendido). **Si falla:** servir los dos modos a la vez
sin distinguirlos no presenta bien ni se consulta bien después.

## 5. ¿Qué estilo visual y de marca debe tener?
Sistema visual de la propuesta «DiDE + cognición aumentada»: fondo blanco cálido
`#FAFAF7`, tinta `#111110`, gris de metadatos `#6B6B66`, acento chartreuse
`#E8FF6E`, monoespaciada para los kickers numerados (`01 /`), filos de un cuarto
de punto, maqueta a dos columnas heredada de
`fabianherrerac.github.io/cognicion-aumentada`. Tono instructivo y directo,
formato de propuesta institucional.

## 6. ¿Qué no debe hacer nunca?
No muestra contenido de las otras siete sesiones. No mezcla modo presentación y
modo consulta sin que quien la abre elija. No requiere backend: es estático.

## 7. ¿Cómo se sabe que quedó bien?
Prueba: Fabián da la sesión completa sin salir de la página ni buscar el guion en
otro lado. Decide Fabián contra esa prueba de uso real. Se corrige primero
cualquier slide donde el «se dice» no alcance a leerse o recordarse en el tiempo
asignado.

## 8. ¿Qué arquitectura técnica requiere?
- **Front end:** `index.html`, `sesion-2.html`, `styles.css`, `deck.js` y el
  script de cada sesión. Todo el contenido vive
  en `SLIDES`, `EJEMPLO` y `TAREA` dentro de `app.js`: una sola fuente para
  los dos modos. Los pasos del bloque 2 llevan `q` (la pregunta) e `items` (las
  auxiliares); de ahí salen a la vez el desplegable y el slide. Navegación por slide con flechas, `espacio`, `Inicio`/`Fin`, `N`
  (mostrar u ocultar el «se dice») y `Esc` para salir; `P` entra en presentación,
  y el número de un slide en modo consulta abre la presentación en ese punto.
- **Back end / base de datos:** no aplica.
- **Producción:** hosting estático tipo GitHub Pages, sin mantenimiento continuo.

## Editar el contenido
El guion de la Sesión 1 está en `app.js`; el de la Sesión 2, en `sesion-2.js`
(arreglo `MOMENTOS`: cada momento lleva `parte`, `titulo`, `mins` y su `html`, y
de ahí salen a la vez la tarjeta del modo consulta y el slide). El modo
presentación de ambas es `montarDeck()` en `deck.js`.

En la Sesión 1: Cada slide es un objeto con `n`, `block`,
`label` y, o bien `seen` (lo que se ve) + `said` (el «es decir» del bloque 1), o
bien `q` + `items` para los ocho pasos. El bloque 2 no muestra «es decir»:
su razón de ser aparece dentro del desplegable. Cambiar ahí actualiza los dos
modos a la vez.
