# Reglas del Proyecto - YojaShop

## Core Aesthetic: Vintage Comic Book
- **Borders:** Black, thick borders (usually `border-2` or `border-4`, sometimes `border-8` for large containers).
- **Shadows:** Hard, solid, non-blurred shadows using standard offsets (e.g., `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`).
- **Typography:**
    - Heavy use of `font-black`, `uppercase`, `italic`, and `tracking-tighter`.
    - Drop shadows on text for depth (`drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]`).
- **Interactions:**
    - Hover states should include slight rotations (`hover:rotate-1` or `hover:-rotate-2`) and scaling.
    - Active states should simulate "pressing" by shifting the element and removing the shadow (`active:translate-x-1 active:translate-y-1 active:shadow-none`).
- **Textures:** Use Ben-Day dots (pointillism) overlays for depth (defined in `CartDrawer` and `Navbar` backgrounds).

## Colores y Estilos
- **Variables Globales:** NUNCA harcodear colores hexadecimales o nombres de colores de Tailwind directamente en los componentes. 
- **Uso de Variables:** Siempre utilizar las variables definidas en `@theme` dentro de `index.css`.
  - `primary`: Naranja principal (Botones, acentos)
  - `secondary`: Amarillo principal (Ofertas, advertencias)
  - `success`: Verde para precios/éxito
  - `error`: Rojo para errores/ofertas críticas
  - `sale`: Rojo/Rosa para etiquetas de descuento
  - `app-bg`: Fondo de la aplicación (Soporta Light/Dark mode)
  - `app-text`: Texto principal
  - `app-card`: Fondo de tarjetas/contenedores secundarios
  - `nav-bg`: Fondo específico para el Navbar trapezoidal

## Bibliotecas y Animaciones
- **Swiper:** Utilizada para sliders/carousels (Hero, Ofertas).
    - Usar `loop: true` y `autoplay` para dinamismo.
- **Marquee:** Animación CSS pura `animate-marquee` y `animate-marqueeReverse`.
    - Requiere un contenedor con `overflow-hidden` y un hijo con el doble de contenido o repeticiones suficientes para cubrir el viewport.
- **Dark Mode:** Implementado vía la clase `.dark`. Todas las variables de color en `index.css` deben tener su contraparte oscura.

## Componentes Reutilizables y UI
- **HighlightText:** Para resaltar fragmentos de texto (`src/components/ui/HighlightText.tsx`).
- **CartDrawer:** Estructura lateral derecha para el carrito (`src/components/cart/CartDrawer.tsx`).
- **Layout Patterns:**
    - Seccionamiento con `py-20` y `overflow-hidden`.
    - Uso de `skew-x-6` o `-skew-x-6` para elementos dinámicos como el Navbar.
    - Focus Selectivo: Al hacer hover en un elemento de una lista, opacar el resto (`group-hover/container:opacity-50 hover:!opacity-100`).

## Convenciones de Desarrollo
- **Paths Absolutos:** Utilizar siempre el alias `@/` para referenciar la carpeta `src`. NO usar rutas relativas con `../`.
  - Ejemplo: `import { Button } from '@/components/ui/Button'` en lugar de `../../components/ui/Button`.
- **Textura Global:** La aplicación utiliza una trama de puntos (Ben-Day dots) definida en el `body` (`index.css`) para mantener la estética comic.
- **Idioma:** Toda la interfaz de usuario debe estar en **Español**.
- **Imágenes:** Usar Unsplash o placeholders de alta calidad que encajen con la estética vibrante.

## Arquitectura y Lógica
- **Separación de Concernimientos:** Extraer TODA la lógica de los componentes siempre que sea posible. Los componentes deben enfocarse principalmente en el renderizado (UI).
- **Custom Hooks:** Utilizar Custom Hooks para manejar estados complejos, llamadas a API, validaciones y efectos.
- **Validaciones:** Usar `react-hook-form` junto con `zod` para la gestión y validación de formularios.

## Herramientas y Comandos
- **Gestor de Paquetes:** Utilizar ÚNICAMENTE `pnpm` para la instalación de dependencias y ejecución de scripts. NO usar `npm` ni `yarn`.
  - Ejemplo: `pnpm install <package>`, `pnpm run dev`.

