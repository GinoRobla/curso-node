# API de Música - Documentación

API RESTful para aplicación de música con Node.js, Express, MongoDB y JWT.

## URL Base
```
http://localhost:3910/api
```

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/GinoRobla/curso-node.git
cd "Api appMusica"
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```env
PORT=3910
MONGO_URI=mongodb://localhost:27017/app-musica
JWT_SECRET=tu_clave_secreta_jwt
```

### 4. Iniciar MongoDB
Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema.

### 5. Ejecutar la aplicación
```bash
npm start
```

La API estará disponible en: `http://localhost:3910`

---

## Autenticación
Los endpoints protegidos requieren token JWT en el header:
```http
Authorization: Bearer <token>
```

---

## Usuarios

### **POST** `/api/user/register`
Registra un nuevo usuario.

**Body:**
```json
{
  "name": "Juan",
  "surname": "Pérez",
  "nick": "juanperez",
  "email": "juan@ejemplo.com",
  "password": "miPassword123"
}
```

### **POST** `/api/user/login`
Inicia sesión y devuelve el token JWT.

**Body:**
```json
{
  "email": "juan@ejemplo.com",
  "password": "miPassword123"
}
```

### **GET** `/api/user/profile/:id` 🔒
Obtiene el perfil de un usuario.

### **PUT** `/api/user/update` 🔒
Actualiza los datos del usuario autenticado.

### **POST** `/api/user/upload` 🔒
Sube avatar de usuario (multipart/form-data, campo `file0`).

### **GET** `/api/user/avatar/:file`
Obtiene la imagen del avatar.

---

## Artistas

### **POST** `/api/artist/save` 🔒
Crea un nuevo artista.

**Body:**
```json
{
  "name": "Shakira",
  "description": "Cantante colombiana"
}
```

### **GET** `/api/artist/one/:id` 🔒
Obtiene un artista por ID.

### **GET** `/api/artist/list/:page` 🔒
Lista artistas con paginación.

### **PUT** `/api/artist/update/:id` 🔒
Actualiza un artista.

### **DELETE** `/api/artist/remove/:id` 🔒
Elimina un artista.

### **POST** `/api/artist/upload/:id` 🔒
Sube imagen del artista.

### **GET** `/api/artist/image/:file`
Obtiene imagen del artista.

---

## Álbumes

### **POST** `/api/album/save` 🔒
Crea un nuevo álbum.

**Body:**
```json
{
  "artist": "64f8a1b2c3d4e5f6789abcdf",
  "title": "Pies Descalzos",
  "description": "Álbum debut",
  "year": 1995
}
```

### **GET** `/api/album/one/:id` 🔒
Obtiene un álbum con información del artista.

### **GET** `/api/album/list/:artistId` 🔒
Lista álbumes de un artista.

### **PUT** `/api/album/update/:albumId` 🔒
Actualiza un álbum.

### **DELETE** `/api/album/remove/:id` 🔒
Elimina un álbum.

### **POST** `/api/album/upload/:id` 🔒
Sube imagen de portada.

### **GET** `/api/album/image/:file`
Obtiene imagen del álbum.

---

## Canciones

### **POST** `/api/song/save` 🔒
Crea una nueva canción.

**Body:**
```json
{
  "album": "64f8a1b2c3d4e5f6789abce1",
  "track": 1,
  "name": "Estoy Aquí",
  "duration": "3:56"
}
```

### **GET** `/api/song/one/:id` 🔒
Obtiene una canción con información del álbum y artista.

### **GET** `/api/song/list/:albumId` 🔒
Lista canciones de un álbum.

### **PUT** `/api/song/update/:id` 🔒
Actualiza una canción.

### **DELETE** `/api/song/remove/:id` 🔒
Elimina una canción.

### **POST** `/api/song/upload/:id` 🔒
Sube archivo de audio.

### **GET** `/api/song/audio/:file`
Obtiene archivo de audio.

---

## Modelos de Datos

### Usuario
```javascript
{
  "name": "String (requerido)",
  "surname": "String",
  "nick": "String (requerido, único)",
  "email": "String (requerido, único)",
  "password": "String (requerido)",
  "role": "String (default: 'role_user')",
  "image": "String (default: 'default')"
}
```

### Artista
```javascript
{
  "name": "String (requerido)",
  "description": "String",
  "image": "String (default: 'default.png')"
}
```

### Álbum
```javascript
{
  "artist": "ObjectId (requerido)",
  "title": "String (requerido)",
  "description": "String",
  "year": "Number (requerido)",
  "image": "String (default: 'default.png')"
}
```

### Canción
```javascript
{
  "album": "ObjectId (requerido)",
  "track": "Number (requerido)",
  "name": "String (requerido)",
  "duration": "String (requerido)",
  "file": "String (default: 'default.mp3')"
}
```

---

## Códigos de Estado

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 400 | Error de validación |
| 401 | Token inválido o expirado |
| 403 | Sin permisos |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## Notas

- 🔒 = Requiere autenticación JWT
- Archivos se almacenan en `./uploads/`
- Formatos soportados: JPG, PNG, GIF (imágenes), MP3, WAV, OGG (audio)
- Los endpoints de prueba (`/prueba`) están disponibles sin autenticación
