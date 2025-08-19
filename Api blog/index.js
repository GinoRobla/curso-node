const {conexion} = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

//inicializar app
console.log("app de nodejs arrancada"); 

//conectar a la base de datos
conexion();

//crear el servidor nodejs
const app = express();
const puerto = 3900;

//configurar el cors
app.use(cors());

//convertir body a json
app.use(express.json()); // convertir el body a json
app.use(express.urlencoded({extended: true})); // convertir el body a urlencoded

// rutas
const ArticuloRutas = require("./rutas/Articulo");

// cargar rutas
app.use("/api", ArticuloRutas);


//crear servidor y escuchar peticiones
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});