const {Schema, model} = require("mongoose");

const ArticuloSchema = Schema({ 
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    imagen: {
        type: String,
        default: "default.png"
    }
})

module.exports = model("Articulo", ArticuloSchema, "articulos");
// Exportamos el modelo de Articulo para poder usarlo en otras partes de la aplicación