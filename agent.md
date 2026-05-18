# Reglas del Proyecto - YojaShop

## Colores y Estilos
- **Variables Globales:** NUNCA harcodear colores hexadecimales o nombres de colores de Tailwind (ej. `text-[#ff7c5c]` o `text-orange-500`) directamente en los componentes. 
- **Uso de Variables:** Siempre utilizar las variables definidas en `@theme` dentro de `index.css`.
  - `primary`: Naranja principal
  - `secondary`: Amarillo principal
  - `success`: Verde para precios/éxito
  - `error`: Rojo para errores
  - `sale`: Rojo/Rosa para ofertas
  - `app-bg`: Fondo de la aplicación
  - `app-text`: Texto principal
  - `app-card`: Fondo de tarjetas/contenedores secundarios

## Bibliotecas Utilizadas
- **Swiper:** Utilizada para sliders/carousels (ej. Hero Slider).
  - Estilos personalizados en `index.css` bajo la sección `Custom Swiper Styles`.

## Componentes Reutilizables
- **HighlightText:** Utilizar este componente para resaltar fragmentos de texto con los colores de la marca.
  - Ubicación: `src/components/ui/HighlightText.tsx`
  - Props: `variant` ('primary' | 'secondary' | 'success' | 'error' | 'sale')
