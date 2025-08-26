# API REST - Red Social

API REST desarrollada con Node.js, Express, MongoDB y JWT para una aplicación de red social.

## 📋 Descripción

Esta API permite la gestión completa de una red social, incluyendo:
- Registro y autenticación de usuarios
- Sistema de seguimiento entre usuarios
- Publicaciones con texto e imágenes
- Gestión de avatares de usuario
- Feed de publicaciones personalizado

## 🚀 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB (local o en la nube)
- Git

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/GinoRobla/curso-node.git
   cd "Api redSocial"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   PORT=3900
   MONGODB_URI=mongodb://localhost:27017/red-social
   JWT_SECRET=tu_clave_secreta_jwt
   ```

4. **Iniciar MongoDB**
   
   Asegúrate de que MongoDB esté ejecutándose en tu sistema:
   ```bash
   # En Windows (si está instalado como servicio)
   net start MongoDB
   
   # O ejecutar manualmente
   mongod
   ```

5. **Ejecutar la API**
   ```bash
   npm start
   ```

   La API estará disponible en `http://localhost:3900`

## 🔧 Tecnologías utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT (JSON Web Tokens)** - Autenticación y autorización
- **bcrypt** - Encriptación de contraseñas
- **Multer** - Manejo de archivos/imágenes
- **CORS** - Configuración de políticas de intercambio de recursos
- **Validator** - Validación de datos

## 📚 Documentación de la API

### Base URL
```
http://localhost:3900/api
```

### Autenticación

La API utiliza JWT para la autenticación. Incluye el token en el header `Authorization`:
```
Authorization: Bearer <tu_token_jwt>
```

---

## 👤 Endpoints de Usuario

### Registrar usuario
- **POST** `/api/user/register`
- **Body:**
  ```json
  {
    "name": "Nombre Usuario",
    "surname": "Apellido",
    "nick": "nickname",
    "email": "email@ejemplo.com",
    "password": "contraseña123"
  }
  ```

### Iniciar sesión
- **POST** `/api/user/login`
- **Body:**
  ```json
  {
    "email": "email@ejemplo.com",
    "password": "contraseña123"
  }
  ```

### Obtener perfil de usuario
- **GET** `/api/user/getProfile/:id`
- **Auth:** Requerida
- **Parámetros:** `id` - ID del usuario

### Listar usuarios
- **GET** `/api/user/list/:page`
- **Auth:** Requerida
- **Parámetros:** `page` - Número de página (opcional)

### Actualizar usuario
- **PUT** `/api/user/update/:id`
- **Auth:** Requerida
- **Parámetros:** `id` - ID del usuario
- **Body:** Campos a actualizar

### Subir avatar
- **POST** `/api/user/upload/:id`
- **Auth:** Requerida
- **Content-Type:** `multipart/form-data`
- **Parámetros:** `id` - ID del usuario
- **File:** `file0` - Imagen del avatar

### Obtener avatar
- **GET** `/api/user/getAvatar/:file`
- **Auth:** Requerida
- **Parámetros:** `file` - Nombre del archivo del avatar

### Obtener contadores de usuario
- **GET** `/api/user/counters/:id`
- **Auth:** Requerida
- **Parámetros:** `id` - ID del usuario
- **Respuesta:** Número de seguidores, seguidos y publicaciones

---

## 👥 Endpoints de Seguimiento

### Seguir usuario
- **POST** `/api/follow/save`
- **Auth:** Requerida
- **Body:**
  ```json
  {
    "followed": "id_del_usuario_a_seguir"
  }
  ```

### Dejar de seguir
- **DELETE** `/api/follow/unfollow/:id`
- **Auth:** Requerida
- **Parámetros:** `id` - ID del usuario a dejar de seguir

### Obtener usuarios seguidos
- **GET** `/api/follow/following/:id/:page?`
- **Auth:** Requerida
- **Parámetros:** 
  - `id` - ID del usuario
  - `page` - Número de página (opcional)

### Obtener seguidores
- **GET** `/api/follow/followers/:id/:page?`
- **Auth:** Requerida
- **Parámetros:** 
  - `id` - ID del usuario
  - `page` - Número de página (opcional)

---

## 📝 Endpoints de Publicaciones

### Crear publicación
- **POST** `/api/publication/save`
- **Auth:** Requerida
- **Body:**
  ```json
  {
    "text": "Contenido de la publicación"
  }
  ```

### Obtener detalle de publicación
- **GET** `/api/publication/detail/:id`
- **Auth:** Requerida
- **Parámetros:** `id` - ID de la publicación

### Eliminar publicación
- **DELETE** `/api/publication/remove/:id`
- **Auth:** Requerida
- **Parámetros:** `id` - ID de la publicación

### Obtener publicaciones de usuario
- **GET** `/api/publication/user/:id/:page?`
- **Auth:** Requerida
- **Parámetros:** 
  - `id` - ID del usuario
  - `page` - Número de página (opcional)

### Subir imagen a publicación
- **POST** `/api/publication/upload/:id`
- **Auth:** Requerida
- **Content-Type:** `multipart/form-data`
- **Parámetros:** `id` - ID de la publicación
- **File:** `file0` - Imagen de la publicación

### Obtener imagen de publicación
- **GET** `/api/publication/media/:file`
- **Parámetros:** `file` - Nombre del archivo de la imagen

### Obtener feed de publicaciones
- **GET** `/api/publication/feed/:page?`
- **Auth:** Requerida
- **Parámetros:** `page` - Número de página (opcional)
- **Descripción:** Obtiene las publicaciones de los usuarios que sigues

---

## 📁 Estructura del proyecto

```
Api redSocial/
├── controllers/          # Controladores de las rutas
│   ├── user.js
│   ├── follow.js
│   └── publication.js
├── database/            # Configuración de base de datos
│   └── connection.js
├── helpers/             # Funciones auxiliares
│   └── validate.js
├── middlewares/         # Middlewares personalizados
│   └── auth.js
├── models/              # Modelos de Mongoose
│   ├── user.js
│   ├── follow.js
│   └── publication.js
├── routes/              # Definición de rutas
│   ├── user.js
│   ├── follow.js
│   └── publication.js
├── services/            # Servicios auxiliares
│   ├── jwt.js
│   └── followService.js
├── uploads/             # Archivos subidos
│   ├── avatars/
│   └── publications/
├── .env                 # Variables de entorno
├── index.js             # Punto de entrada de la aplicación
└── package.json         # Dependencias y scripts
```

## 🛡️ Seguridad

- Las contraseñas se encriptan usando bcrypt
- Autenticación mediante JWT
- Validación de datos de entrada
- Configuración CORS habilitada

## 🔄 Códigos de estado HTTP

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `400` - Bad Request: Error en los datos enviados
- `401` - Unauthorized: Token inválido o faltante
- `403` - Forbidden: Sin permisos para la operación
- `404` - Not Found: Recurso no encontrado
- `500` - Internal Server Error: Error interno del servidor

## 🐛 Desarrollo

### Scripts disponibles

- `npm start` - Inicia el servidor con nodemon (recarga automática)
- `npm test` - Ejecuta las pruebas (no implementadas)

### Notas para desarrolladores

- El servidor se reinicia automáticamente con nodemon al detectar cambios
- Los archivos se suben a las carpetas `uploads/avatars/` y `uploads/publications/`
- Las imágenes son accesibles públicamente a través de la ruta `/uploads`

## ✍️ Autor

**Gino** - Desarrollador principal