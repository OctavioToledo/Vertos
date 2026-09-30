# Verto's — Landing + menú + carrito a WhatsApp

## Qué es
Verto's es un emprendimiento familiar de **panchos a la masa** (hot dogs envueltos en masa) en San Martín, Mendoza, Argentina. Estética retro, con calidez de comida casera. Este sitio es una landing de una sola página que muestra el menú, permite armar un pedido con un carrito y lo envía por WhatsApp. No hay backend ni pagos online.

Idioma del sitio: español rioplatense, tuteo con "vos" ("Pedí", "Elegí", "Mirá").

## Stack
- Vite + React + TypeScript + Tailwind CSS.
- Sitio 100% estático (build a `dist/`), deploy en Vercel / Cloudflare Pages / Netlify.
- Sin librerías pesadas. Estado del carrito con React Context + `useReducer`, persistido en `localStorage` (envuelto en try/catch).
- Todo el contenido editable vive en **`src/data/menu.json`** y **`src/data/negocio.json`**. Ningún precio, texto de producto u horario debe estar hardcodeado en componentes. La familia tiene que poder cambiar un precio editando una sola línea.

## Identidad visual

### Concepto
"El cartel de chapa del carrito de panchos del barrio". El elemento memorable es el **menú presentado como un cartel de precios pintado a mano**: fondo rojo kétchup, nombres en amarillo mostaza con tipografía slab gruesa, precios grandes y contundentes. Todo lo demás acompaña en silencio: fondo blanco papel, texto negro, mucho aire.

Detalle hogareño: una franja fina de **mantel cuadriculado rojo y blanco** usada solo como separador en 1 o 2 lugares (no como fondo de secciones enteras).

### Paleta
| Token | Hex | Uso |
|---|---|---|
| `ketchup` | `#C8202F` | Color principal, fondo del cartel de menú, botones primarios |
| `ketchup-oscuro` | `#8E1520` | Sombras duras, hover/pressed, bordes |
| `mostaza` | `#F2B705` | Títulos sobre rojo, precios, badges, acentos |
| `papel` | `#FFFDF7` | Fondo general |
| `plancha` | `#1E1B18` | Texto principal, footer, contornos |
| `blanco` | `#FFFFFF` | Texto sobre rojo, tarjetas |

Verificar contraste AA: amarillo mostaza **no** se usa como texto sobre fondo blanco (solo sobre rojo o negro).

### Tipografía (Google Fonts)
- **Alfa Slab One**: títulos, nombre de cada pancho, precios. Look de cartel pintado.
- **Barlow** (400, 600, 700): textos, ingredientes, botones, formularios.
- Escala sugerida: 14 / 16 / 20 / 28 / 40 / 64 px. Fallbacks: `Georgia, serif` y `system-ui, sans-serif`.
- Sentence case en todo. Nada de etiquetas en mayúsculas espaciadas arriba de cada título.

### Recursos gráficos
- Sombras "duras" desplazadas (ej. `4px 4px 0 #1E1B18`) en botones y tarjetas, en vez de sombras difusas grises. Da el toque retro de impresión.
- Precios dentro de un "sello" o etiqueta amarilla levemente rotada (-2°).
- Íconos simples en SVG inline (pancho, papas, moto de delivery, bolsa take away, reloj, pin de ubicación). Nada de librerías de íconos genéricas si se puede evitar.
- Animación: una sola al cargar la página (el título del hero entra como si se "pintara"/estampara). El resto sin animaciones decorativas. Respetar `prefers-reduced-motion`. Sí animar las respuestas a acciones del usuario (el contador del carrito "salta" al agregar un producto).

## Estructura de la página (mobile-first)

```
┌────────────────────────────┐
│ Header fijo: logo · 🛒 (n) │
├────────────────────────────┤
│ HERO                       │
│ "Panchos a la masa,        │
│  hechos en casa."          │
│ Badge: Abierto / Cerrado   │
│ [Ver el menú] [WhatsApp]   │
├──── franja cuadriculada ───┤
│ MENÚ (cartel rojo)         │
│  Pancho común ...... $4.500│
│  queso + aderezos   [+ Agregar]
│  ...                       │
├────────────────────────────┤
│ PROMOS (oculta si vacía)   │
├────────────────────────────┤
│ PAPAS                      │
│ BEBIDAS (consultar)        │
├────────────────────────────┤
│ CÓMO PEDIR                 │
│ Horarios · Take away /     │
│ Delivery · Pagos · Mapa    │
├──── franja cuadriculada ───┤
│ FOOTER: IG, WhatsApp, dir. │
└────────────────────────────┘
  [🛒 Ver pedido · $13.000]  ← barra flotante inferior cuando hay items
```

1. **Header**: logo (placeholder de texto "Verto's" en Alfa Slab One hasta tener el logo), botón de carrito con contador.
2. **Hero**: frase principal, subtítulo corto, badge de estado (abierto/cerrado calculado en vivo), botones "Ver el menú" (scroll) y "Pedir por WhatsApp".
3. **Menú de panchos**: el cartel. En mobile, lista vertical; en desktop, 2 columnas. Cada ítem: foto (si existe), nombre, ingredientes, precio, botón "Agregar". Si el producto ya está en el carrito, el botón pasa a un selector `– 2 +`.
4. **Promos**: se renderiza solo si `promos` tiene elementos.
5. **Papas**: mismas tarjetas con "Agregar".
6. **Bebidas**: mientras `bebidas` esté vacío, mostrar un bloque "Consultá las bebidas del día" con botón que abre WhatsApp con el texto "Hola! ¿Qué bebidas tienen hoy?". Si `bebidas` tiene items, se muestran como productos normales con "Agregar".
7. **Cómo pedir**: días y horarios, take away y delivery (costo de envío a coordinar por WhatsApp), medios de pago, dirección con mapa embebido de Google Maps (iframe) y link "Cómo llegar".
8. **Footer**: Instagram, WhatsApp, dirección, "Hecho en familia en San Martín, Mendoza".

## Datos

### `src/data/negocio.json`
```json
{
  "nombre": "Verto's",
  "whatsapp": "5492634647394",
  "whatsappVisible": "263 464-7394",
  "instagram": "vertos.ok",
  "direccion": "Manuel de Olazábal 101, San Martín, Mendoza",
  "zonaHoraria": "America/Argentina/Mendoza",
  "horarios": {
    "dias": [3, 4, 5, 6, 0],
    "apertura": "20:30",
    "cierre": "00:30"
  },
  "entrega": ["Take away", "Delivery"],
  "pagos": ["Efectivo", "Transferencia"],
  "notaDelivery": "El costo de envío se coordina por WhatsApp según la zona."
}
```
`dias` usa 0 = domingo … 6 = sábado. El formato de WhatsApp para Argentina en `wa.me` es `54 9 + código de área sin 0 + número sin 15` → `5492634647394`.

### `src/data/menu.json`
```json
{
  "panchos": [
    { "id": "nino", "nombre": "Pancho niño", "ingredientes": "Solo aderezos", "precio": 3500, "foto": null },
    { "id": "comun", "nombre": "Pancho común", "ingredientes": "Queso + aderezos", "precio": 4500, "foto": null },
    { "id": "lluvia-papas", "nombre": "Pancho con lluvia de papas", "ingredientes": "Queso + papas + aderezos", "precio": 5000, "foto": null },
    { "id": "criollo", "nombre": "Pancho criollo", "ingredientes": "Criolla + queso + aderezos", "precio": 6000, "foto": null },
    { "id": "salteado", "nombre": "Pancho salteado", "ingredientes": "Verduras salteadas + queso + aderezos", "precio": 6000, "foto": null },
    { "id": "fugazza", "nombre": "Pancho fugazza", "ingredientes": "Cebolla caramelizada + queso extra + aderezos", "precio": 6500, "foto": null },
    { "id": "pizza", "nombre": "Pancho pizza", "ingredientes": "Extra queso + muzzarella + salsa + morrón + aceitunas", "precio": 6500, "foto": null },
    { "id": "calabresa", "nombre": "Pancho calabresa", "ingredientes": "Queso + salame + cebolla de verdeo + aderezos", "precio": 6500, "foto": null },
    { "id": "cuatro-quesos", "nombre": "Pancho 4 quesos", "ingredientes": "Muzzarella + parmesano + azul + fontina + aderezos", "precio": 7000, "foto": null },
    { "id": "cheddar-panceta", "nombre": "Pancho cheddar y panceta", "ingredientes": "Queso + cheddar + panceta + aderezos", "precio": 7000, "foto": null }
  ],
  "papas": [
    { "id": "cono-chico", "nombre": "Cono de papas chico", "ingredientes": "", "precio": 3500, "foto": null },
    { "id": "bandeja", "nombre": "Bandeja de papas", "ingredientes": "", "precio": 8500, "foto": null }
  ],
  "promos": [],
  "bebidas": []
}
```
Todos los panchos son "a la masa": se aclara una vez en el título de la sección ("Panchos a la masa") en vez de repetirlo en cada nombre.

Fotos: van en `public/fotos/` (ej. `"foto": "/fotos/fugazza.webp"`). Si `foto` es `null`, mostrar una ilustración SVG de pancho genérica en los colores de la marca, para que la tarjeta nunca se vea vacía o rota. Imágenes con `loading="lazy"`, `width`/`height` definidos y formato WebP.

Formato de precios: `Intl.NumberFormat('es-AR')` → `$6.500`.

## Carrito

- Botón "Agregar" en cada producto. Feedback visual inmediato (contador del header salta, toast corto "Agregado: Pancho fugazza").
- Barra flotante inferior (mobile) con cantidad de items y total; abre un **drawer** lateral/inferior.
- En el drawer: lista de items con `– cantidad +`, eliminar, subtotal por línea, total.
- Campo opcional de aclaración por item (ej. "sin aderezos", "sin cebolla").
- Formulario de cierre:
  - Nombre (obligatorio)
  - Entrega: Take away / Delivery (obligatorio)
  - Dirección y referencia (obligatorio solo si es Delivery)
  - Pago: Efectivo / Transferencia (obligatorio)
  - Si es efectivo: "¿Con cuánto abonás?" (opcional, para el cambio)
  - Comentarios (opcional)
- Botón final: **"Enviar pedido por WhatsApp"**. Abre `https://wa.me/5492634647394?text=` + mensaje con `encodeURIComponent`.
- Validaciones con mensajes claros junto al campo ("Ingresá la dirección para el delivery").
- Después de enviar, ofrecer "Vaciar carrito" (no vaciarlo automáticamente, por si el usuario vuelve atrás).
- Carrito persistido en `localStorage`.

### Mensaje de WhatsApp (formato)
```
¡Hola Verto's! Quiero hacer un pedido 🌭

• 2x Pancho fugazza — $13.000
• 1x Pancho 4 quesos — $7.000
   (sin aderezos)
• 1x Cono de papas chico — $3.500

Total: $23.500

Nombre: Juan
Entrega: Delivery
Dirección: San Martín 450, casa con rejas verdes
Pago: Efectivo (abono con $30.000)
Comentarios: tocar timbre

(El costo de envío lo coordinamos por acá)
```
La última línea solo si es Delivery.

## Abierto / cerrado
- Calcular con la hora de Mendoza (`Intl.DateTimeFormat` con `timeZone: 'America/Argentina/Mendoza'`), no con la hora del dispositivo.
- El horario cruza la medianoche: el miércoles abre 20:30 y cierra el jueves 00:30. Entonces entre 00:00 y 00:30 del jueves, viernes, sábado, domingo y **lunes** también está abierto. Escribir tests unitarios para estos bordes (martes 23:00 cerrado, lunes 00:15 abierto, lunes 00:31 cerrado, miércoles 20:29 cerrado, miércoles 20:30 abierto).
- Badge: "Abierto ahora · hasta las 00:30" / "Cerrado · abrimos el miércoles a las 20:30" (calcular el próximo día y hora de apertura).
- Si está cerrado, el carrito sigue funcionando, pero en el drawer se muestra un aviso: "Ahora estamos cerrados. Podés dejar tu pedido y te respondemos cuando abramos."

## Calidad
- Mobile-first, probado a 360px de ancho. Sin scroll horizontal.
- Botones y controles de al menos 44px de alto.
- Foco visible con teclado, `aria-label` en botones de ícono, drawer accesible (foco atrapado, cierra con Escape).
- SEO: `<title>Verto's · Panchos a la masa en San Martín, Mendoza</title>`, meta description, Open Graph con imagen (`public/og.jpg`, 1200×630) para que el link se vea lindo al compartirlo por WhatsApp e Instagram, favicon.
- JSON-LD `Restaurant` de schema.org con dirección, horarios, teléfono y `servesCuisine`.
- Objetivo Lighthouse: 90+ en todas las categorías.

## Pendientes (dejar preparados, no inventar contenido)
- Logo definitivo (reemplazar el placeholder de texto en header, favicon y og.jpg).
- Promos (3) → completar `promos` en `menu.json`.
- Bebidas → completar `bebidas` en `menu.json`.
- Fotos de productos → `public/fotos/`.
- Lista de aderezos disponibles (a definir si se muestra).
- Dominio (ej. vertos.com.ar vía NIC Argentina).
