# Admin Clothing Store (Frontend)

Panel administrativo web para gestionar el catálogo de productos de una tienda de ropa.

Forma parte de una solución full stack:

| Capa | Tecnología | Rol |
|------|------------|-----|
| Backend | NestJS + MongoDB | API REST de productos |
| Frontend (este repo) | Angular 22 | Panel admin: listar, crear y editar |
| Mobile | Flutter | Catálogo para clientes (listar y detalle) |

---

## Contexto

Una tienda de ropa necesita administrar su catálogo desde un panel web. Este frontend consume la API del backend y permite:

- Listar productos
- Crear un producto
- Editar un producto

Cada producto incluye: **nombre**, **categoría**, **precio**, **stock** e **imagen (URL)**.

---

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior
- npm
- Backend de la API corriendo en `http://localhost:3000` (NestJS + MongoDB)

---

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd clouthin-store-frontend

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm start
# equivalente: npx ng serve
```

La aplicación queda disponible en:

**http://localhost:4200/**

> Importante: el backend debe estar activo antes de usar el panel. Si la API no responde, verás errores al cargar o guardar productos.

---

## Configuración de la API

La URL base del backend se define en los environments:

- Desarrollo: `src/environments/environment.ts`
- Producción: `src/environments/environment.production.ts`

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};
```

Si tu API corre en otro host o puerto, cambia solo `apiUrl`. El service construye las rutas a partir de ese valor (`/products`, etc.).

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo (`ng serve`) |
| `npm run build` | Build de producción |
| `npm run watch` | Build en modo watch (development) |
| `npm test` | Tests unitarios (Vitest) |

---

## Estructura del proyecto

```
src/app/
├── features/products/          # Feature de productos
│   ├── model/                  # Interfaces y contratos con la API
│   ├── services/               # ProductService (HTTP)
│   ├── product-list/           # Listado + orquestación del modal
│   └── product-form-modal/     # Modal create/edit
├── layout/                     # Sidebar, navbar y layout general
├── app.routes.ts               # Rutas
└── app.config.ts               # Providers (router, HttpClient)
src/environments/               # Configuración por entorno (apiUrl)
```

### Decisiones de arquitectura

- **Organización por features**: la lógica de productos vive junta (modelo, service y UI).
- **Un solo modal** para crear y editar: si recibe un producto, precarga el formulario y usa `PATCH`; si no, usa `POST`.
- **Separación de responsabilidades**:
  - `ProductList` orquesta la lista y abre el modal
  - `ProductFormModal` maneja el formulario y las peticiones de guardado
  - `ProductService` es la única capa que habla con la API

---

## Endpoints que consume

Base: `{apiUrl}/products` (por defecto `http://localhost:3000/products`)

| Método | Ruta | Uso en el panel |
|--------|------|-----------------|
| `GET` | `/products` | Listar productos |
| `POST` | `/products` | Crear producto |
| `PATCH` | `/products/:id` | Editar producto |

Documentación Swagger del backend (si está levantado):  
**http://localhost:3000/api/docs**

---

## Dependencias con el backend

Este frontend **no funciona de forma aislada**. Necesitas:

1. MongoDB disponible
2. API NestJS corriendo (puerto 3000 por defecto)
3. CORS habilitado en el backend (ya incluido en la API del proyecto)

Consulta el README del repositorio backend para instrucciones de arranque de la API.

---

## Build de producción

```bash
npm run build
```

Los artefactos se generan en `dist/`. En el build de producción se usa `environment.production.ts` (reemplazo configurado en `angular.json`).

---

## Notas

- Stack: Angular 22, TypeScript, RxJS, standalone components
- Estilos con CSS por componente
- Estado de UI con signals de Angular
