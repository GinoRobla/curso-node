# API Blog - Node.js REST API

Una API REST para la gestión de artículos de blog construida con Node.js, Express y MongoDB.

## 🚀 Instalación y Configuración

### Prerequisitos

- Node.js (versión 14 o superior)
- MongoDB (instalado localmente o servicio en la nube)
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/GinoRobla/curso-node.git
   cd "Api blog"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar MongoDB**
   - Asegúrate de que MongoDB esté ejecutándose en tu sistema local
   - La API se conectará automáticamente a `mongodb://localhost:27017/blog-curso`

4. **Crear carpeta de imágenes** (si no existe)
   ```bash
   mkdir -p imagenes/articulos
   ```

5. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

   La API estará disponible en `http://localhost:3900`

## 📁 Estructura del Proyecto

```
Api blog/
├── basedatos/
│   └── conexion.js          # Configuración de conexión a MongoDB
├── controladores/
│   └── Articulo.js          # Lógica de negocio para artículos
├── imagenes/
│   └── articulos/           # Almacenamiento de imágenes subidas
├── modelos/
│   └── Articulo.js          # Modelo de datos de Mongoose
├── rutas/
│   └── Articulo.js          # Definición de rutas de la API
├── index.js                 # Punto de entrada de la aplicación
└── package.json            # Dependencias y configuración del proyecto
```

## 🛠 Dependencias

### Dependencias de Producción
- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **cors**: Middleware para habilitar CORS
- **multer**: Middleware para subida de archivos
- **validator**: Librería para validación de datos

### Dependencias de Desarrollo
- **nodemon**: Herramienta para desarrollo que reinicia automáticamente la aplicación

## 📋 API Endpoints

Base URL: `http://localhost:3900/api`

### Artículos

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/crear` | Crear un nuevo artículo | `{ "titulo": "string", "contenido": "string" }` |
| GET | `/listar` | Obtener todos los artículos | - |
| GET | `/listarId/:id` | Obtener un artículo por ID | - |
| PUT | `/editarId/:id` | Actualizar un artículo | `{ "titulo": "string", "contenido": "string" }` |
| DELETE | `/borrarId/:id` | Eliminar un artículo | - |
| POST | `/subirImg/:id` | Subir imagen para un artículo | FormData con campo `imagen` |
| GET | `/buscarImg/:fichero` | Obtener imagen por nombre de archivo | - |
| GET | `/buscador/:busqueda` | Buscar artículos por título o contenido | - |

### Ejemplos de Uso

#### Crear un artículo
```bash
curl -X POST http://localhost:3900/api/crear \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Mi primer artículo", "contenido": "Este es el contenido del artículo"}'
```

#### Obtener todos los artículos
```bash
curl http://localhost:3900/api/listar
```

#### Subir imagen para un artículo
```bash
curl -X POST http://localhost:3900/api/subirImg/ARTICLE_ID \
  -F "imagen=@/ruta/a/tu/imagen.jpg"
```

#### Buscar artículos
```bash
curl http://localhost:3900/api/buscador/node
```

## 📝 Modelo de Datos

### Artículo
```javascript
{
  "_id": "ObjectId",
  "titulo": "String (requerido)",
  "contenido": "String (requerido)", 
  "fechaCreacion": "Date (default: Date.now)",
  "imagen": "String (default: 'default.png')"
}
```

## 📤 Respuestas de la API

### Respuesta Exitosa
```json
{
  "status": "success",
  "mensaje": "Operación realizada correctamente",
  "articulo": { /* datos del artículo */ }
}
```

### Respuesta de Error
```json
{
  "status": "error",
  "mensaje": "Descripción del error"
}
```

## 🔧 Configuración

### Puerto
La aplicación ejecuta por defecto en el puerto `3900`. Puedes modificar esto en el archivo `index.js`.

### Base de Datos
La conexión a MongoDB está configurada para `mongodb://localhost:27017/blog-curso`. Puedes modificar la URL de conexión en `basedatos/conexion.js`.

### Subida de Archivos
- Las imágenes se almacenan en la carpeta `imagenes/articulos/`
- Formatos soportados: PNG, JPG, JPEG, GIF
- Los archivos se renombran automáticamente con timestamp

## 🚫 Validaciones

- **Título**: Campo requerido, no puede estar vacío
- **Contenido**: Campo requerido, no puede estar vacío
- **Imágenes**: Solo se aceptan archivos PNG, JPG, JPEG y GIF

## ⚡ Scripts Disponibles

```bash
npm start          # Inicia la aplicación con nodemon
npm test           # Ejecuta tests (no implementado)
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 👨‍💻 Autor

**Gino Robla**

---

¡Gracias por usar la API Blog! Si tienes alguna pregunta o sugerencia, no dudes en contactar.