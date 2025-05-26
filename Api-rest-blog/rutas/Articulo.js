const express = require("express");
const multer = require("multer");
const ArticuloControlador = require("../controladores/Articulo");
const { subirImg } = require("../controladores/Articulo");

const router = express.Router();

// Configuración del almacenamiento
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./imagenes/articulos/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const subidor = multer({ storage: almacenamiento });

//rutas 
router.post("/crear", ArticuloControlador.crear);
router.get("/listar", ArticuloControlador.listar);
router.get("/listarId/:id", ArticuloControlador.listarId);
router.delete("/borrarId/:id", ArticuloControlador.borrarId);
router.put("/editarId/:id", ArticuloControlador.editarId);
router.post("/subirImg/:id",[subidor.single("imagen")], ArticuloControlador.subirImg);
router.get("/buscarImg/:fichero", ArticuloControlador.buscarImg);
router.get("/buscador/:busqueda", ArticuloControlador.buscador);

module.exports = router;