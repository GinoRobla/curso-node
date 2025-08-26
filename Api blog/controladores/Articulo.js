const fs = require("fs");
const path = require("path");
const validator = require("validator");
const Articulo = require("../modelos/Articulo");

const crear = async (req, res) => {
    //recoger los parametros por post
    let parametros = req.body;

    // validar los datos
    try{
        let validarTitulo = !validator.isEmpty(parametros.titulo);
        let validarContenido = !validator.isEmpty(parametros.contenido);

        if(!validarTitulo || !validarContenido){
            throw new Error("Los datos no son validos");
        };
        
    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Error en la validacion de los datos"
        });
    }

    // crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // asignar valores al objeto basado en el modelo (manual o automatico)
    // articulo.titulo = parametros.titulo;

    // guardar el articulo en la base de datos
    try {
        const articuloGuardado = await articulo.save();
    
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo creado correctamente",
            articulo: articuloGuardado
        });
    
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al guardar el artículo",
        });
    }
    
}

const listar = async (req, res) => {
    try {
        const articulos = await Articulo.find();

        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        return res.status(200).json({
            status: "success",
            articulos
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los artículos"
        });
    }
};

const listarId = async (req, res) => {
    try {
        let id = req.params.id;

        const articulo = await Articulo.findById(id);

        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener el artículo"
        });
    }
};

const borrarId = async (req, res) => {
    try {
        let id = req.params.id;

        const articulo = await Articulo.findByIdAndDelete(id)

        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo
        })

    }catch (error){
        return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar el articulo"
        });
    }
};

const editarId = async (req, res) => {
    try{
        //id del articulo a editar
        let id = req.params.id;
        //recoger los datos nuevos
        datos = req.body;
        // Actualizar en la base de datos
        const articuloActualizado = await Articulo.findByIdAndUpdate(id, datos);

        if(!articuloActualizado){
            return res.status(404).json({
                status:"error",
                mensaje:"Articulo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        })

    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Error al editar el articulo"
        })
    }
};

const subirImg = async (req, res) => {
    try {
        if (!req.file && !req.files) {
            return res.status(404).json({
                status: "error",
                mensaje: "peticion invalida"
            });
        }

        let archivo = req.file.originalname;
        let archivo_split = archivo.split(".");
        let extension = archivo_split[1].toLowerCase();

        if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {
            fs.unlink(req.file.path, (error) => {
                return res.status(400).json({
                    status: "error",
                    mensaje: "imagen invalida"
                });
            });
            return;
        } 
        else{
            let id = req.params.id;

            const articuloActualizado = await Articulo.findByIdAndUpdate(
                id,
                { imagen: req.file.filename },
                { new: true, runValidators: true }
            );

            if (!articuloActualizado) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "Articulo no encontrado"
                });
            }

            return res.status(200).json({
                status: "success",
                articulo: articuloActualizado
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al subir imagen"
        });
    }
};

const buscarImg = async (req, res) =>{
    try{
        let fichero = req.params.fichero;
        let ruta =  "./imagenes/articulos/" + fichero;

        fs.stat(ruta, (error, existe) => {
            if(existe){
                return res.sendFile(path.resolve(ruta))
            }
            else{
                return res.status(404).json({
                    status: "error",
                    mensaje: "Error! la imagen no existe",
                    existe,
                    fichero,
                    ruta
                });
            }
        });
    }catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar la imagen"
        });
    }
}

const buscador = async (req, res) => {
    try {
        let busqueda = req.params.busqueda;

        const articulosEncontrados = await Articulo.find({
            "$or": [
                { "titulo": { "$regex": busqueda, "$options": "i" } },
                { "contenido": { "$regex": busqueda, "$options": "i" } }
            ]
        }).sort({ fecha: -1 });

        if (!articulosEncontrados || articulosEncontrados.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articulosEncontrados
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar los artículos"
        });
    }
}

module.exports = {
    crear,
    listar,
    listarId,
    borrarId,
    editarId,
    subirImg,
    buscarImg,
    buscador
}