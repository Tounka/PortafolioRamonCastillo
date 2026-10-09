# Sección Tecnologías — Propuesta "Bandas transportadoras 3D"

Propuesta para reemplazar la órbita semicircular actual (`OrbitaSemicircular` dentro de `TecnologiasDrift.jsx`) por una escena 3D donde **bandas transportadoras mueven cajas con los logos de las tecnologías**.

Este documento sirve para dos cosas:
1. Darle a otra IA un brief claro para generar **una sola imagen con las 4 variaciones** (A, B, C, D) lado a lado.
2. Anotar sobre esa imagen y elegir la dirección final.

---

## Contexto fijo (aplica a las 4 variaciones)

| Elemento | Valor |
|---|---|
| Fondo | Negro puro `#000` |
| Acento de marca | Amarillo `#FCB71C` (botón "regresar" a la derecha, flecha `>`) |
| Título | "Tecnologías" — subtítulo: "Las herramientas con las que construyo, de la interfaz a la nube." |
| Tipografía | Poppins |
| Viewport | Pantalla completa (`100dvh`), escritorio 16:9 y móvil vertical |
| Navegación | Botón amarillo cuadrado redondeado a la derecha, centrado vertical |

### Las 17 cajas y sus categorías (color de la categoría = color de la banda / borde de la caja)

| Categoría | Color | Tecnologías |
|---|---|---|
| Frontend | `#FCB71C` amarillo | HTML5, CSS3, JavaScript, React, Next, Styled Components |
| Backend y datos | `#5EC8F2` azul cielo | Node, Python, PostgreSQL, Supabase, Firebase |
| CMS y e-commerce | `#C49BFF` lila | WordPress, WooCommerce, Shopify, Stripe |
| Cloud y flujo | `#6EE7A0` verde menta | GitHub, GCP |

### Cómo se ve una caja
- Cubo con aristas ligeramente redondeadas, material oscuro mate (`#111`–`#1a1a1a`).
- Logo oficial a color en la cara frontal/superior.
- Borde/arista con brillo suave del color de su categoría (efecto neón tenue, no saturado).
- Al hover/tap: la caja se levanta de la banda, gira para mirar a cámara y muestra nombre + descripción corta.

---

## Variación A — "Línea de ensamblaje isométrica"

**Concepto:** 4 bandas paralelas horizontales apiladas en vista isométrica, una por categoría. Las cajas avanzan de izquierda a derecha en loop continuo.

- **Cámara:** isométrica fija (~30°), sin perspectiva fuerte.
- **Layout:** título arriba a la izquierda; las 4 bandas ocupan el centro, cada una con su etiqueta de categoría pintada en el lateral de la banda ("FRONTEND", "BACKEND Y DATOS"…).
- **Movimiento:** cada banda a distinta velocidad; los rodillos giran. Las cajas entran por un túnel a la izquierda y salen por otro a la derecha.
- **Interacción:** hover pausa la banda y levanta la caja; click en la etiqueta de la banda resalta solo esa categoría.
- **Móvil:** las bandas se vuelven verticales (cajas bajan de arriba a abajo), 2 columnas.
- **Técnica:** CSS 3D transforms puro (`transform-style: preserve-3d`) + animación GSAP. Lo más ligero.
- **Pros:** muy legible, fácil de implementar, buen rendimiento. **Contras:** el menos "wow".

## Variación B — "Fábrica que converge"

**Concepto:** 4 bandas nacen desde las 4 esquinas de la pantalla y convergen en una **máquina central** (un ensamblador / prensa) donde las cajas se combinan y sale un paquete final etiquetado "Tu proyecto".

- **Cámara:** perspectiva cenital inclinada (~55°), ligera rotación con el mouse (parallax).
- **Layout:** máquina central brillando en amarillo `#FCB71C`; bandas en diagonal desde cada esquina con su color. Título arriba centrado.
- **Movimiento:** las cajas viajan hacia el centro, entran a la máquina, ésta pulsa y expulsa el paquete final hacia abajo/fuera de cuadro.
- **Interacción:** hover en una caja la detiene; click en la máquina muestra un "stack ejemplo" (ej. React + Node + PostgreSQL + GCP).
- **Móvil:** bandas desde arriba y abajo (2+2) hacia el centro.
- **Técnica:** WebGL con `ogl` (ya está en `package.json`) o CSS 3D con perspectiva. Complejidad media-alta.
- **Pros:** cuenta una historia ("combino tecnologías para construir tu producto"). **Contras:** más complejo, la máquina central compite con los logos.

## Variación C — "Carrusel de equipaje"

**Concepto:** una sola banda ovalada tipo carrusel de aeropuerto, vista en perspectiva 3D, con las 17 cajas girando alrededor. En el centro del óvalo, un panel con la info de la caja seleccionada.

- **Cámara:** perspectiva 3/4 desde arriba (~40°), el óvalo ocupa ~70% del ancho.
- **Layout:** banda segmentada en 4 tramos de color (uno por categoría) o banda neutra gris oscuro con cajas de bordes de color. Panel central tipo pantalla con logo grande + descripción.
- **Movimiento:** rotación lenta y continua; las placas de la banda se doblan en las curvas como en un carrusel real.
- **Interacción:** arrastrar para girar el carrusel manualmente; la caja que pasa por el frente se destaca y alimenta el panel central.
- **Móvil:** óvalo vertical más estrecho, panel debajo.
- **Técnica:** CSS 3D (cajas posicionadas sobre una elipse) o `ogl`. Complejidad media.
- **Pros:** muy táctil, un solo foco claro, funciona bien en móvil. **Contras:** 17 cajas en un óvalo pueden verse amontonadas.

## Variación D — "Torre en espiral"

**Concepto:** las bandas forman una **rampa helicoidal** que sube alrededor de una torre central; cada vuelta de la espiral es una categoría (Frontend abajo → Cloud arriba, "de la interfaz a la nube").

- **Cámara:** perspectiva frontal ligeramente desde abajo; la torre gira lentamente o la cámara orbita con el scroll/mouse.
- **Layout:** torre al centro-derecha, título y leyenda de categorías a la izquierda. Cada tramo de la espiral con su color.
- **Movimiento:** cajas suben por la espiral y al llegar arriba "despegan" hacia una nube brillante (Cloud), luego reaparecen abajo.
- **Interacción:** rueda/scroll sube o baja la cámara por la torre; click en una vuelta enfoca esa categoría.
- **Móvil:** la torre ocupa todo el alto, leyenda colapsada arriba.
- **Técnica:** WebGL con `ogl` necesariamente. Complejidad alta.
- **Pros:** la más espectacular y conecta con el subtítulo. **Contras:** la más pesada, logos de atrás quedan ocultos, más difícil de leer.

---

## Tabla comparativa

| | A Isométrica | B Converge | C Carrusel | D Espiral |
|---|---|---|---|---|
| Legibilidad | ★★★★★ | ★★★ | ★★★★ | ★★ |
| Impacto visual | ★★ | ★★★★ | ★★★ | ★★★★★ |
| Narrativa | ★★ | ★★★★★ | ★★★ | ★★★★ |
| Móvil | ★★★★ | ★★★ | ★★★★ | ★★★ |
| Esfuerzo de implementación | Bajo | Medio-alto | Medio | Alto |
| Tecnología | CSS 3D + GSAP | ogl / CSS 3D | CSS 3D / ogl | ogl |

---

## Prompt para la IA generadora de imagen

> Copiar tal cual:

```
A single 16:9 presentation image divided into a 2x2 grid of four UI mockups, each panel clearly labeled with a large letter in the top-left corner: "A", "B", "C", "D". Thin gray divider lines between panels. Each panel is a full-screen web section of a developer portfolio on a pure black (#000000) background, with the title "Tecnologías" in white Poppins font at the top and a small yellow (#FCB71C) rounded-square button with a ">" arrow on the right edge, vertically centered.

All four panels show 3D conveyor belts carrying dark matte cubes (#151515) with slightly rounded edges. Each cube has an official tech logo in full color on its front/top face (HTML5, CSS3, JavaScript, React, Next.js, Styled Components, Node.js, Python, PostgreSQL, Supabase, Firebase, WordPress, WooCommerce, Shopify, Stripe, GitHub, Google Cloud). Cube edges glow softly in their category color: yellow #FCB71C (frontend), sky blue #5EC8F2 (backend & data), lilac #C49BFF (CMS & e-commerce), mint green #6EE7A0 (cloud). Conveyor belts are dark graphite with visible rollers and subtle colored side rails. Clean, modern, premium, soft studio lighting, slight neon glow, minimal, high contrast. No people.

Panel A — "Isometric assembly line": four parallel horizontal conveyor belts stacked vertically in isometric view, one per category, each with its category name printed on the belt side ("FRONTEND", "BACKEND Y DATOS", "CMS Y E-COMMERCE", "CLOUD Y FLUJO"). Cubes move left to right, entering and exiting through small dark tunnels. One cube is lifted above its belt, rotated toward the viewer, with a small tooltip showing its name.

Panel B — "Converging factory": four conveyor belts start at the four corners of the screen and converge diagonally into a glowing yellow (#FCB71C) central machine/press. Camera is tilted top-down perspective. A finished package labeled "Tu proyecto" exits the machine at the bottom.

Panel C — "Baggage carousel": a single large oval conveyor carousel like an airport baggage claim, seen in 3/4 top-down perspective, with all cubes riding around it. The belt is divided into four colored segments. In the center of the oval, a floating dark glass panel shows a large React logo, the word "React" and one line of description text. The cube currently at the front is highlighted.

Panel D — "Spiral tower": a helical conveyor ramp spiraling upward around a central dark cylindrical tower, each loop of the spiral colored by category (yellow at the bottom, then blue, then lilac, mint green at the top). Cubes climb the spiral, and at the top they float into a soft glowing cloud. A small legend with the four category colors on the left side of the panel.

Style: high-fidelity UI design mockup, Dribbble/Behance quality, 3D render look, consistent lighting across panels, crisp readable logos.
```

---

## Hoja de anotaciones (llenar después de ver la imagen)

| Variación | ¿Me gusta? | Qué conservar | Qué cambiar |
|---|---|---|---|
| A | | | |
| B | | | |
| C | | | |
| D | | | |

**Decisión final:** ______  
**Mezcla posible** (ej. "carrusel de C con la máquina de B"): ______
