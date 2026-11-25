# Taekwondo Eventos

Aplicación fullstack **MERN** para administrar y consultar la cartelera de eventos de un club de taekwondo: torneos, exámenes, seminarios, exhibiciones y entrenamientos.

Cada evento está a cargo de un profesor, y según el rol con el que se entra la aplicación muestra una cosa u otra: un usuario común ve la cartelera, y un administrador además puede dar de alta, modificar y eliminar eventos y profesores.

**Parcial 2 — Aplicaciones Híbridas**
Tecnicatura Superior en Diseño y Programación Web · Escuela Da Vinci · 2026
Alumna: **Karen Apaza Flores**

---

## Stack

| | |
|---|---|
| **Backend** | Node.js · Express 5 · MongoDB (driver nativo) · JSON Web Tokens · bcrypt · zod · cors |
| **Frontend** | React 19 · Vite · React Router · Context API · react-hook-form · zod · Bootstrap 5 |

El backend es una **API REST** independiente; el frontend es una aplicación de React que la consume por HTTP. Son dos proyectos separados que se levantan por su cuenta.

---

## Puesta en marcha

Requiere **Node.js 20.6 o superior** (los scripts usan la opción nativa `--env-file`).

Son dos terminales, una para cada proyecto.

### 1. Backend

```bash
cd back
npm install
```

Crear el archivo `.env` tomando como base `back/.env.example`:

```
MONGO_URI=<se entrega por separado>
DB_NAME=AH20232CP1
PORT=3333
JWT_SECRET=<se entrega por separado>
JWT_EXPIRES=2h
CORS_ORIGIN=http://localhost:5173
```

Levantar la API:

```bash
npm run dev
```

Queda escuchando en **http://localhost:3333**. Al arrancar avisa por consola si se conectó a la base.

### 2. Frontend

```bash
cd front
npm install
```

Crear el archivo `.env` tomando como base `front/.env.example`:

```
VITE_API_URL=http://localhost:3333/api
```

Levantar la aplicación:

```bash
npm run dev
```

Abrir 👉 **http://localhost:5173**

> Los archivos `.env` no están versionados porque contienen credenciales. **Se entregan por separado**, junto con el link al repositorio.

---

## Usuarios para probar

La base ya tiene datos cargados (eventos, profesores y usuarios), así que no hace falta ejecutar ningún script.

| Rol | Email | Contraseña | Qué puede hacer |
|---|---|---|---|
| **Administrador** | `demo.admin@chonghong.com` | `Demo.Admin2026` | Ver la cartelera y el ABM completo de eventos y profesores |
| **Usuario** | `demo.user@chonghong.com` | `Demo.User2026` | Ver la cartelera y el detalle de cada evento |

También se puede crear una cuenta nueva desde **Registrarse**. Las cuentas que se crean desde el formulario nacen siempre con rol `user`: el rol `admin` se asigna a mano en la base, para que nadie pueda darse permisos de administrador por su cuenta.

---

## Modelo de datos

Base **`AH20232CP1`**, con tres colecciones.

### `users`

```js
{
  _id: ObjectId(),
  email: "demo.admin@chonghong.com",
  name: "Admin Demo",
  password: "$2b$10$...",   // hash de bcrypt, nunca la contraseña en claro
  rol: "admin"              // "admin" o "user"
}
```

### `eventos` — entidad principal

```js
{
  _id: ObjectId(),
  img: "data:image/jpeg;base64,...",   // la imagen se sube desde el formulario
  nombre: "Copa de Campeones",
  seccion: "torneos",                  // torneos | examenes | seminarios | exhibiciones | entrenamientos
  descripcion: "Jornada deportiva...",
  lugar: "Club Deportivo San Martín",
  fecha: "2026-11-10",
  horario: "09:50",
  link: "https://...",                 // inscripción
  profesorId: ObjectId(),              // referencia al profesor
  eliminado: false                     // borrado lógico
}
```

### `profesores` — segunda entidad

```js
{
  _id: ObjectId(),
  foto: "data:image/png;base64,...",
  nombre: "Natalia Ferreira",
  descripcion: "Especializada en entrenamiento físico..."
}
```

### La relación

Relación **1 a N por referencia**: un profesor dicta muchos eventos, y cada evento está a cargo de un solo profesor.

```
   profesores                          eventos
┌──────────────┐               ┌──────────────────────┐
│ _id: AAA     │◄──────────────│ profesorId: AAA      │  "Copa de Campeones"
│ nombre       │        ╲      └──────────────────────┘
│ foto         │         ╲     ┌──────────────────────┐
│ descripcion  │          ╲────│ profesorId: AAA      │  "Evaluación de Graduación"
└──────────────┘               └──────────────────────┘
      1                                   N
```

Se eligió **referenciar** y no embeber porque un profesor existe por sí mismo aunque todavía no tenga eventos asignados, y sus datos no se repiten en cada evento. La API expone esa relación en `GET /api/profesores/:id/eventos`.

Como protección de la integridad, **no se permite eliminar un profesor que tenga eventos asociados**: la API responde `409` para que esos eventos no queden apuntando a alguien que ya no existe.

---

## Estructura del proyecto

```
parcial2/
│
├── back/                          API REST
│   ├── api/
│   │   ├── controllers/           coordinan los pedidos y devuelven json
│   │   └── routes/                mapean url + verbo a cada controller
│   ├── services/                  ⭐ unica capa que habla con mongo
│   ├── middlewares/               autenticacion (jwt) y validacion (zod)
│   ├── schemas/                   esquemas de zod de cada entidad
│   ├── prueba.http                peticiones de ejemplo para probar la api
│   └── main.js                    punto de entrada
│
└── front/                         aplicación React
    └── src/
        ├── components/            Layout, Nav, ProtectedRoute y los de las tablas
        │   ├── eventos/           EventoFila
        │   └── profesores/        ProfesorFila
        ├── context/               SessionProvider: estado global de la sesión
        ├── hooks/                 useValidacion, hook propio de validación
        ├── pages/                 una carpeta por entidad
        ├── schemas/               esquemas de zod, espejo de los del backend
        ├── services/              ⭐ toda la comunicación con la API
        ├── estilo.css             paleta e identidad visual propia
        └── main.jsx               ruteo
```

### Separación de responsabilidades

**En el backend**, las rutas solo mapean URLs, los controllers coordinan y eligen el código de estado, los servicios son la única capa que habla con Mongo, y los middlewares resuelven autenticación y validación antes de que el pedido llegue al controller.

**En el frontend**, las páginas no saben que existe `fetch`: piden los datos a un servicio por entidad (`useApiEventos`, `useApiProfesores`, `useApiUsuarios`), que a su vez usa `api.service.js`, el único lugar donde se arma la petición HTTP y se adjunta el token.

```
páginas  →  services/  →  api.service.js  →  API REST
```

---

## Autenticación

1. **Registro** (`POST /api/users`): zod valida los datos, se verifica que el email no exista y la contraseña se guarda **hasheada con bcrypt** (nunca en claro).
2. **Login** (`POST /api/login`): se compara la contraseña con `bcrypt.compare` y, si coincide, se devuelve un **JWT** firmado con la clave del `.env` que incluye el email y el rol, con vencimiento de 2 horas.
3. **En el frontend** el token se guarda en el Context y en `localStorage`, y `api.service.js` lo adjunta en la cabecera `Authorization: Bearer ...` de cada pedido.
4. **En cada pedido protegido**, el middleware `validateToken` verifica la firma y el vencimiento, y `validateRol` chequea que el rol alcance.
5. **En las rutas del frontend**, `ProtectedRoute` impide entrar a una página escribiendo la URL: sin sesión redirige a `/login`, y con sesión pero sin el rol necesario redirige al inicio.

---

## API REST

Todas las respuestas son JSON. Base: `http://localhost:3333`

### Autenticación

| Método | Endpoint | Protegido | Descripción |
|---|---|---|---|
| `POST` | `/api/users` | — | Registro |
| `POST` | `/api/login` | — | Login, devuelve el token |

### Eventos

| Método | Endpoint | Protegido | Descripción |
|---|---|---|---|
| `GET` | `/api/eventos` | — | Lista todos, acepta filtros |
| `GET` | `/api/eventos/:id` | — | Trae uno |
| `POST` | `/api/eventos` | 🔒 admin | Crea |
| `PUT` | `/api/eventos/:id` | 🔒 admin | Modifica |
| `DELETE` | `/api/eventos/:id` | 🔒 admin | Elimina |

Filtros del listado, combinables:

```
GET /api/eventos?seccion=torneos
GET /api/eventos?profesor=<idDelProfesor>
GET /api/eventos?seccion=torneos&profesor=<idDelProfesor>
```

### Profesores

| Método | Endpoint | Protegido | Descripción |
|---|---|---|---|
| `GET` | `/api/profesores` | — | Lista todos |
| `GET` | `/api/profesores/:id` | — | Trae uno |
| `GET` | `/api/profesores/:id/eventos` | — | **Los eventos de ese profesor** |
| `POST` | `/api/profesores` | 🔒 admin | Crea |
| `PUT` | `/api/profesores/:id` | 🔒 admin | Modifica |
| `DELETE` | `/api/profesores/:id` | 🔒 admin | Elimina |

### Códigos de estado

| Código | Significado |
|---|---|
| `200` | Operación exitosa |
| `201` | Recurso creado |
| `400` | Datos inválidos — la respuesta trae el detalle |
| `401` | Falta el token o está vencido |
| `403` | El rol no alcanza para esa acción |
| `404` | El recurso no existe |
| `409` | Conflicto (por ejemplo, borrar un profesor con eventos) |
| `500` | Error del servidor |

Un `400` devuelve la lista completa de problemas:

```json
{
  "message": "Datos invalidos",
  "detalles": [
    "nombre: El nombre debe tener como minimo 3 caracteres",
    "link: El link de inscripcion tiene que ser una URL valida"
  ]
}
```

> El archivo `back/prueba.http` tiene peticiones de ejemplo listas para ejecutar con la extensión *REST Client* de VS Code.

---

## Validación de datos

Se valida **en los dos lados, con los mismos esquemas de zod**.

**En el backend** la validación es un middleware que corre antes del controller (`middlewares/eventos.validate.js`, `profesores.validate.js`, `users.validate.js`). Si algo está mal corta con un `400` y la lista de errores, y el controller nunca se ejecuta. Además, el middleware reemplaza el body por el resultado del esquema: si el cliente manda campos de más, no llegan a la base.

**En el frontend** la validación avisa antes de mandar el pedido:

- el formulario de registro usa **react-hook-form** con `zodResolver`, que muestra el error debajo de cada campo
- los formularios de eventos y profesores usan el hook propio **`useValidacion`**, que valida el objeto completo contra el esquema y muestra los mensajes arriba del formulario (el formulario incluye un archivo de imagen, que se maneja aparte del resto de los campos)

La validación del frontend es por comodidad de quien usa la aplicación: **la que realmente protege el sistema es la del backend**, porque los atributos `required` del HTML se saltean con cualquier cliente HTTP.

---

## Decisiones de implementación

**Credenciales fuera del código.** La cadena de conexión y la clave de firma de los JWT salen del `.env`. Antes la clave estaba escrita en dos archivos distintos, con el riesgo de cambiar uno y no el otro y que dejaran de validar todos los tokens.

**Los servicios se comparten.** La capa `services/` del backend no pertenece ni a la API ni a las vistas HTML: la usan las dos, así que no hay consultas duplicadas.

**Validación del formato de ObjectId** antes de consultar, porque el driver de Mongo lanza una excepción con ids mal formados y el pedido quedaría colgado.

**Manejo de errores.** Cada controller está envuelto en `try/catch`: el detalle se registra en la consola del servidor y al cliente se le devuelve un mensaje genérico, para no exponer rutas internas ni datos de conexión.

**El rol no viaja desde el cliente.** El registro siempre crea usuarios con rol `user`. En el backend el rol se lee del token firmado, y en el frontend también: `useRol()` decodifica el JWT con `jwt-decode` en lugar de leer el rol de `localStorage`. Si se leyera de ahí, cualquiera podría editarlo desde la consola del navegador y ver la interfaz de administrador.

**Sesión vencida.** Al abrir la aplicación se revisa la fecha de expiración del token guardado: si ya venció, no se restaura la sesión y se pide iniciar sesión de nuevo.

**Estados de carga.** Las listas manejan tres estados (`loading`, `ready`, `error`) con componentes separados, así se distingue "está cargando" de "no hay datos" y de "falló la consulta".

**Borrado lógico de eventos.** Los eventos se marcan con `eliminado` en lugar de borrarse, así se pueden recuperar.

---

## Cumplimiento de la consigna

### Backend

- [x] Backend separado del frontend, como API REST
- [x] Autenticación con JWT
- [x] Base de datos NoSQL (MongoDB)
- [x] Gestión de usuarios
- [x] Dos entidades además de los usuarios (`eventos` y `profesores`)
- [x] CRUD completo de las dos entidades
- [x] División en controladores, routers, servicios, middlewares y esquemas
- [x] Recursos identificados en las URIs

### Frontend

- [x] Componentes funcionales y hooks (incluido un hook propio)
- [x] División de componentes
- [x] Enrutamiento con React Router
- [x] Lógica de API separada de las vistas
- [x] Estado gestionado con Context API y `useState`

### Ambos

- [x] Validación de datos en backend y frontend
- [x] Autenticación con JWT
- [x] Login y registro con contraseñas encriptadas
- [x] Consumo de la API desde el frontend
- [x] Archivo README
