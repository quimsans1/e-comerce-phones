# Prueba técnica Napptilus (Zara)

Aplicación web de catálogo de móviles desarrollada para la prueba técnica de Zara/Napptilus.

## Despliegue de la aplicación
```bash
https://starlit-dasik-96e942.netlify.app/
```

## Instalación y ejecución

### Instalación
```bash
# situarte en la carpeta frontend
cd frontend

# instalar dependencias
npm install
```

## Stack tecnológico
- React 19 + TypeScript
- React Router DOM v6
- Vite 5
- SASS/SCSS
- Context API para estado global del carrito
- Vitest + Testing Library
- ESLint

### Scripts del proyecto
```bash
# desarrollo (assets sin minificar)
npm run dev

# build de producción (TypeScript + Vite)
npm run build

# servir build de producción en local
npm run preview

# atajo para build + preview
npm run prod

# tests
npm test
```

### Variables de entorno
Crear un archivo `.env` en `frontend/` con:
```dotenv
VITE_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
VITE_API_KEY=87909682e6cd74208f41a6ef39fe4191
```

> Todas las peticiones incluyen el header `x-api-key` con `VITE_API_KEY`.

## Arquitectura y estructura del proyecto

### Enfoque de arquitectura
La aplicación sigue una arquitectura por capas simples y mantenibles:

- **`pages/`**: cada vista principal (listado, detalle, carrito).
- **`components/`**: componentes reutilizables (header, tabla de productos, tarjeta de producto, selectores, botón, input, carousel, etc.).
- **`services/`**: acceso a API y configuración de peticiones/autenticación.
- **`context/`**: estado global del carrito con Context API + persistencia.
- **`types/`**: tipos de Typescript usados en el proyecto.
- **`utils/`**: formateo de precio, parseo de errores.
- **`styles/`**: variables de color y breakpoints globales.
- **`tests/`**: pruebas unitarias y de integración.

### Flujo de datos
1. Las páginas usan el servicio de la api de productos `services/productsService`.
2. El servicio contiene `fetch`, errores y header `x-api-key`.
3. Las páginas controlan los distintos estados de la interfaz (loading/error)
4. El carrito se encuentra en `ShoppingBagContext` y se sincroniza con `localStorage`.
5. Contador del carrito: El `Header` consume `itemCount` proporcionado por el `ShoppingBagProvider` a través del contexto para mostrar el contador de productos en el carrito (Shopping Bag).

### Estructura de carpetas
```text
src/
├── components/            # Componentes reutilizables de UI
├── context/               # Context API del carrito (estado global + persistencia)
├── pages/                 # Vistas principales: ListPage, DetailPage, ShoppingBagPage
├── services/              # Llamadas HTTP a la API de productos
├── styles/                # Variables de estilo (colores, breakpoints)
├── tests/                 # Unit + integration tests
├── types/                 # Tipos TypeScript del dominio
└── utils/                 # Funciones auxiliares reutilizables
```

## Testing

Se incluyen pruebas unitarias e integración con dos:

- **Vitest**: se usa como test runner y framework de testing (ejecución, `describe/it`, assertions con `expect`, mocks con `vi`, hooks como `beforeEach`).
- **React Testing Library** (`@testing-library/react`): se usa para probar comportamiento de UI desde la perspectiva del usuario (`render`, búsquedas con `screen`, interacciones con `fireEvent`, esperas asíncronas con `waitFor`).

### Qué valida cada archivo de test

**Integración (expected behavior)**

- `src/tests/integration/expected-behavior/ListView.integration.test.tsx`
  - Renderiza hasta 20 productos.
  - Muestra estado de carga mientras la petición está pendiente.
  - Comprueba búsqueda en tiempo real y actualización del contador de resultados.
  - Verifica que el icono global del carrito refleja la cantidad persistida.

- `src/tests/integration/expected-behavior/DetailView.integration.test.tsx`
  - Cambiar color actualiza la imagen principal del móvil.
  - Cambiar almacenamiento actualiza el precio mostrado.
  - El botón `ADD` permanece deshabilitado hasta seleccionar color y almacenamiento.
  - Al añadir al carrito, se actualiza el contador global del header.

- `src/tests/integration/expected-behavior/ShoppingBagPage.integration.test.tsx`
  - Renderiza los productos guardados en carrito.
  - Elimina un producto y valida actualización del DOM.
  - Recalcula el total tras eliminar un item.

**Integración (error state)**

- `src/tests/integration/error-state/ListView.error.integration.test.tsx`
  - Fuerza fallo de API en listado y valida que la UI muestra el error con `role="alert"`.

**Unitarios**

- `src/tests/unit/ShoppingBagContext.unit.test.tsx`
  - Estado inicial del carrito en 0.
  - Suma de totales al añadir productos.
  - Re-cálculo correcto del total al eliminar un producto.

- `src/tests/unit/DetailPage.unit.test.tsx`
  - Lógica de precio al cambiar almacenamiento.
  - Protección para no añadir al carrito si faltan selecciones requeridas.

- `src/tests/unit/formatPriceEur.unit.test.ts`
  - Formateo de enteros, cero y decimales con sufijo `EUR`.

## Accesibilidad

Se han aplicado prácticas de accesibilidad en componentes y páginas:

- Uso de landmarks y etiquetas semánticas (`header`, `main`, `section`, `article`).
- `aria-label` en navegación, buscador y acciones clave.
- Estados `loading` y `error` anunciados con `role="status"`, `aria-live` y `role="alert"`.
- Texto oculto accesible (`.visually-hidden`) para mejorar feedback del contador de carrito.
- `alt` descriptivo en imágenes de producto.

## Responsive y estilos (SCSS)

- Tipografía requerida: `Helvetica, Arial, sans-serif`.
- Estilos modulares por componente (`*.scss`).
- Variables CSS globales de color en `src/styles/colors.scss`:
  - `--color-primary`
  - `--color-text-primary`
- Breakpoints SASS en `src/styles/breakpoints.scss`:
  - `$tablet-max-width: 1024px`
  - `$phone-max-width: 767px`

## Modo desarrollo y modo producción

- **Desarrollo** (`npm run dev`): ejecución local para desarrollo.
- **Producción** (`npm run build`): genera bundle minificado.

## Calidad de código

- ESLint configurado para TypeScript y React.
- Consola limpia (sin errores ni warnings del navegador).
- Tipado TypeScript para reducir errores en tiempo de desarrollo.
