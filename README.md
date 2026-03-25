# News Explorer — Backend API

API REST para la aplicación **News Explorer**. Construida con Node.js, Express y MongoDB.

---

## 🌐 Dominio público

> _Añade aquí el dominio de tu servidor una vez desplegado_
> Ejemplo: `https://api.tudominio.com`

---

## 🚀 Tecnologías

- **Node.js** + **Express** — servidor web
- **MongoDB** + **Mongoose** — base de datos
- **bcryptjs** — encriptación de contraseñas
- **jsonwebtoken** — autenticación JWT
- **celebrate** + **Joi** — validación de datos de entrada
- **Winston** + **express-winston** — sistema de logging

---

## 📁 Estructura del proyecto

```
project-name-backend/
├── app.js                  # Punto de entrada
├── package.json
├── .env.example            # Plantilla de variables de entorno
├── .gitignore
├── .editorconfig
├── .eslintrc
├── models/
│   ├── user.js             # Esquema de usuario
│   └── article.js          # Esquema de artículo
├── controllers/
│   ├── users.js            # signup, signin, getCurrentUser
│   └── articles.js         # getArticles, createArticle, deleteArticle
├── routes/
│   ├── index.js            # Enrutador principal
│   ├── users.js            # GET /users/me
│   └── articles.js         # GET, POST, DELETE /articles
├── middlewares/
│   ├── auth.js             # Validación JWT
│   └── errorHandler.js     # Manejador centralizado de errores
├── errors/
│   └── index.js            # Clases de error personalizadas
├── utils/
│   └── logger.js           # Configuración de Winston
└── logs/
    ├── request.log         # Registro de solicitudes (generado automáticamente)
    └── error.log           # Registro de errores (generado automáticamente)
```

---

## ⚙️ Instalación y ejecución local

### 1. Prerrequisitos

- Node.js v18 o superior
- MongoDB en ejecución local (`mongodb://localhost:27017`)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus valores. En desarrollo **no es necesario** el archivo `.env` — el código usa valores predeterminados automáticamente.

### 4. Ejecutar en modo desarrollo (con hot reload)

```bash
npm run dev
```

### 5. Ejecutar en modo producción

```bash
npm start
```

El servidor se inicia en el puerto `3001` por defecto.

---

## 📡 Endpoints de la API

### Rutas públicas (no requieren autenticación)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/signup` | Registrar un nuevo usuario |
| `POST` | `/signin` | Iniciar sesión y obtener JWT |

### Rutas protegidas (requieren `Authorization: Bearer <token>`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/users/me` | Obtener email y nombre del usuario autenticado |
| `GET` | `/articles` | Obtener todos los artículos guardados por el usuario |
| `POST` | `/articles` | Guardar un nuevo artículo |
| `DELETE` | `/articles/:articleId` | Eliminar un artículo guardado |

---

## 📝 Ejemplos de uso

### Registro — `POST /signup`

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "micontraseña123",
  "name": "Juan"
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "664f...",
  "email": "usuario@ejemplo.com",
  "name": "Juan"
}
```

---

### Inicio de sesión — `POST /signin`

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "micontraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Obtener usuario — `GET /users/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "email": "usuario@ejemplo.com",
  "name": "Juan"
}
```

---

### Guardar artículo — `POST /articles`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "keyword": "tecnología",
  "title": "El futuro de la IA",
  "text": "Descripción del artículo...",
  "date": "2025-01-15",
  "source": "El País",
  "link": "https://elpais.com/articulo-ejemplo",
  "image": "https://elpais.com/imagen-ejemplo.jpg"
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "664f...",
  "keyword": "tecnología",
  "title": "El futuro de la IA",
  ...
}
```

---

### Eliminar artículo — `DELETE /articles/:articleId`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "message": "Artículo eliminado correctamente"
}
```

---

## 🔒 Códigos de estado utilizados

| Código | Significado |
|--------|-------------|
| `200` | OK |
| `201` | Creado |
| `400` | Solicitud incorrecta (datos inválidos) |
| `401` | No autorizado (token ausente o inválido) |
| `403` | Prohibido (sin permiso para esa acción) |
| `404` | No encontrado |
| `409` | Conflicto (email ya registrado) |
| `500` | Error interno del servidor |

---

## 🛡️ Seguridad

- Las contraseñas se encriptan con **bcryptjs** (10 rondas de salt)
- El campo `password` tiene `select: false` — nunca se devuelve en consultas
- El campo `owner` tiene `select: false` — no se expone en respuestas de artículos
- Los tokens JWT expiran en **7 días**
- Solo el propietario puede eliminar sus propios artículos
- Todas las rutas protegidas validan el JWT antes de ejecutar el controlador

---

## 📋 Variables de entorno

| Variable | Descripción | Requerida en producción |
|----------|-------------|------------------------|
| `NODE_ENV` | `development` o `production` | ✅ |
| `PORT` | Puerto del servidor (default: 3001) | ❌ |
| `MONGO_URI` | URI de conexión a MongoDB | ✅ |
| `JWT_SECRET` | Clave secreta para firmar JWT | ✅ |

> ⚠️ **Nunca** guardes el archivo `.env` en el repositorio.
## API en desarrollo local: http://localhost:3001
