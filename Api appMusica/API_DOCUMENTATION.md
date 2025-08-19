# Documentación API appMusica

## Estructura del proyecto

```
index.js
package.json
.env
.env.example
README.md
API_DOCUMENTATION.md
controllers/
  album.js
  artist.js
  song.js
  user.js
database/
  connection.js
helpers/
  jwt.js
  validate.js
middlewares/
  auth.js
models/
  album.js
  artist.js
  song.js
  user.js
routes/
  album.js
  artist.js
  song.js
  user.js
uploads/
  albums/
  artists/
  songs/
  avatars/
```

## Cómo iniciar el proyecto

1. **Instala las dependencias:**
   ```
   npm install
   ```
2. **Configura las variables de entorno:**
   - Copia `.env.example` a `.env` y ajusta los valores según tu entorno.
3. **Inicia la base de datos MongoDB:**
   - Asegúrate de tener MongoDB corriendo en el puerto configurado.
4. **Arranca el servidor:**
   ```
   npm start
   ```
5. **Accede a la API:**
   - Por defecto en `http://localhost:3910`

## Requisitos
- Node.js >= 14
- MongoDB >= 4

## Autenticación
- Todas las rutas protegidas requieren el header:
  - `Authorization: Bearer <token>`

## Endpoints principales

### Usuarios
- `POST /api/user/register` — Registrar usuario
- `POST /api/user/login` — Login y obtención de token
- `GET /api/user/profile` — Perfil del usuario autenticado
- `PUT /api/user/update` — Actualizar usuario
- `POST /api/user/upload` — Subir avatar
- `GET /api/user/avatar/:file` — Obtener avatar

### Artistas
- `POST /api/artist/save` — Crear artista
- `GET /api/artist/one/:id` — Obtener artista por id
- `GET /api/artist/list/:page` — Listar artistas paginados
- `PUT /api/artist/update/:id` — Actualizar artista
- `DELETE /api/artist/remove/:id` — Eliminar artista
- `POST /api/artist/upload/:id` — Subir imagen de artista
- `GET /api/artist/image/:file` — Obtener imagen de artista

### Álbumes
- `POST /api/album/save` — Crear álbum
- `GET /api/album/one/:id` — Obtener álbum por id
- `GET /api/album/list/:artistId` — Listar álbumes de artista
- `PUT /api/album/update/:albumId` — Actualizar álbum
- `DELETE /api/album/remove/:id` — Eliminar álbum
- `POST /api/album/upload/:id` — Subir imagen de álbum
- `GET /api/album/image/:file` — Obtener imagen de álbum

### Canciones
- `POST /api/song/save` — Crear canción
- `GET /api/song/one/:id` — Obtener canción por id
- `GET /api/song/list/:albumId` — Listar canciones de álbum
- `PUT /api/song/update/:id` — Actualizar canción
- `DELETE /api/song/remove/:id` — Eliminar canción
- `POST /api/song/upload/:id` — Subir archivo de audio
- `GET /api/song/audio/:file` — Obtener archivo de audio

## Ejemplo de uso de variables de entorno

Configura tu archivo `.env` con los siguientes valores:

```
PORT=3910
MONGO_URI=mongodb://localhost:27017/app-musica
JWT_SECRET=tu_clave_secreta
```

## Notas
- Todos los endpoints requieren autenticación excepto registro y login.
- Los endpoints de subida de archivos usan el campo `file0` en el body (form-data).
- Las respuestas son en formato JSON.
