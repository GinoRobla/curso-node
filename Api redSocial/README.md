# Documentación de la API - Red Social

Esta API permite gestionar usuarios, publicaciones y relaciones de seguimiento para una red social. Desarrollada con Node.js, Express, MongoDB y JWT para autenticación.

---

## 🚀 Configuración

### Variables de Entorno

Antes de ejecutar la aplicación, configura las variables de entorno:

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configura las variables en `.env`:
   ```env
   PORT=3900
   MONGODB_URI=mongodb://localhost:27017/red-social
   JWT_SECRET=tu_clave_secreta_jwt_muy_segura
   ```

### Instalación

```bash
npm install
npm start
```

---

## 📱 Base URL
```
http://localhost:3900/api
```

---

## 👤 Usuarios

### POST `/api/user/register`
- **Descripción:** Registrar un nuevo usuario.
- **Body:**
```json
{
  "name": "Juan",
  "surname": "Pérez",
  "nick": "juanperez",
  "email": "juan@ejemplo.com",
  "password": "123456",
  "bio": "Desarrollador Frontend"
}
```
- **Respuesta exitosa:**
```json
{
  "status": "success",
  "message": "Usuario creado correctamente",
  "user": {
    "_id": "user_id",
    "name": "Juan",
    "surname": "Pérez",
    "nick": "juanperez",
    "email": "juan@ejemplo.com",
    "bio": "Desarrollador Frontend",
    "role": "role_user",
    "image": "default.png",
    "created_at": "2025-07-21T..."
  }
}
```

### POST `/api/user/login`
- **Descripción:** Iniciar sesión.
- **Body:**
```json
{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```
- **Respuesta exitosa:**
```json
{
  "status": "success",
  "message": "Login exitoso",
  "user": {
    "id": "user_id",
    "name": "Juan",
    "surname": "Pérez",
    "nick": "juanperez",
    "email": "juan@ejemplo.com",
    "role": "role_user",
    "image": "default.png"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET `/api/user/getProfile/:id`
- **Descripción:** Obtener perfil de un usuario.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
{
  "status": "success",
  "user": {
    "_id": "user_id",
    "name": "Juan",
    "surname": "Pérez",
    "nick": "juanperez",
    "email": "juan@ejemplo.com",
    "bio": "Desarrollador Frontend",
    "role": "role_user",
    "image": "default.png",
    "created_at": "2025-07-21T..."
  }
}
```

### GET `/api/user/list/:page`
- **Descripción:** Listar usuarios con paginación.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
{
  "status": "success",
  "users": [...],
  "page": 1,
  "itemsPerPage": 5,
  "total": 10,
  "pages": 2
}
```

### PUT `/api/user/update/:id`
- **Descripción:** Actualizar datos del usuario.
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Juan Carlos",
  "surname": "Pérez García",
  "bio": "Full Stack Developer"
}
```

### POST `/api/user/upload/:id`
- **Descripción:** Subir avatar del usuario.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:** `multipart/form-data`
  - `file0`: archivo de imagen

### GET `/api/user/getAvatar/:file`
- **Descripción:** Obtener imagen de avatar.
- **Headers:**
  - `Authorization: Bearer <token>`

### GET `/api/user/counters/:id`
- **Descripción:** Obtener contadores del usuario (publicaciones, seguidores, seguidos).
- **Headers:**
  - `Authorization: Bearer <token>`

---

## 👥 Seguimientos

### POST `/api/follow/save`
- **Descripción:** Seguir a un usuario.
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body:**
```json
{
  "followed": "user_id_a_seguir"
}
```
- **Respuesta:**
```json
{
  "status": "success",
  "message": "Usuario seguido correctamente",
  "follow": {
    "user": "mi_user_id",
    "followed": "user_id_seguido",
    "createdAt": "2025-07-21T..."
  }
}
```

### DELETE `/api/follow/unfollow/:id`
- **Descripción:** Dejar de seguir a un usuario.
- **Headers:**
  - `Authorization: Bearer <token>`

### GET `/api/follow/following/:id/:page`
### GET `/api/follow/following/:id`
- **Descripción:** Obtener lista de usuarios que sigue.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
{
  "status": "success",
  "follows": [...],
  "total": 5,
  "page": 1,
  "pages": 1
}
```

### GET `/api/follow/followers/:id/:page`
### GET `/api/follow/followers/:id`
- **Descripción:** Obtener lista de seguidores.
- **Headers:**
  - `Authorization: Bearer <token>`

---

## 📝 Publicaciones

### POST `/api/publication/save`
- **Descripción:** Crear una nueva publicación.
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body:**
```json
{
  "text": "Mi primera publicación en la red social!"
}
```
- **Respuesta:**
```json
{
  "status": "success",
  "message": "Publicación guardada",
  "publicationStored": {
    "_id": "publication_id",
    "user": "user_id",
    "text": "Mi primera publicación en la red social!",
    "created_at": "2025-07-21T..."
  }
}
```

### GET `/api/publication/detail/:id`
- **Descripción:** Obtener detalle de una publicación.
- **Headers:**
  - `Authorization: Bearer <token>`

### DELETE `/api/publication/remove/:id`
- **Descripción:** Eliminar una publicación.
- **Headers:**
  - `Authorization: Bearer <token>`

### GET `/api/publication/user/:id/:page`
### GET `/api/publication/user/:id`
- **Descripción:** Obtener publicaciones de un usuario específico.
- **Headers:**
  - `Authorization: Bearer <token>`

### POST `/api/publication/upload/:id`
- **Descripción:** Subir imagen a una publicación.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:** `multipart/form-data`
  - `file0`: archivo de imagen

### GET `/api/publication/media/:file`
- **Descripción:** Obtener archivo multimedia de publicación.

### GET `/api/publication/feed/:page`
### GET `/api/publication/feed`
- **Descripción:** Obtener feed de publicaciones (timeline).
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
{
  "status": "success",
  "page": 1,
  "total": 10,
  "pages": 2,
  "publications": [
    {
      "_id": "publication_id",
      "user": {
        "_id": "user_id",
        "name": "Juan",
        "surname": "Pérez",
        "nick": "juanperez",
        "image": "avatar.jpg"
      },
      "text": "Contenido de la publicación",
      "file": "imagen.jpg",
      "created_at": "2025-07-21T..."
    }
  ]
}
```

---

## 🔐 Autenticación

Todas las rutas protegidas requieren el token JWT en el header:
```
Authorization: Bearer <tu_token_jwt>
```

El token se obtiene al hacer login y tiene una duración de 30 días.

---

## 📁 Estructura del Proyecto

```
├── controllers/       # Lógica de negocio
│   ├── user.js       # Gestión de usuarios
│   ├── follow.js     # Gestión de seguimientos
│   └── publication.js # Gestión de publicaciones
├── database/         # Configuración de base de datos
├── helpers/          # Validaciones y utilidades
├── middlewares/      # Middleware de autenticación
├── models/           # Modelos de MongoDB
├── routes/           # Definición de rutas
├── services/         # Servicios (JWT)
├── uploads/          # Archivos subidos
│   ├── avatars/      # Imágenes de perfil
│   └── publications/ # Imágenes de publicaciones
└── index.js          # Punto de entrada
```

---

## ⚠️ Errores Comunes

Los errores se devuelven en formato:
```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

### Códigos de Estado:
- `200`: Éxito
- `400`: Datos inválidos
- `401`: No autorizado
- `404`: No encontrado
- `500`: Error del servidor

---

## 🛡️ Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Autenticación JWT
- ✅ Variables de entorno para datos sensibles
- ✅ Validación de datos de entrada
- ✅ Protección de rutas privadas

---

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Bcrypt** - Hashing de contraseñas
- **Multer** - Subida de archivos
- **CORS** - Política de origen cruzado