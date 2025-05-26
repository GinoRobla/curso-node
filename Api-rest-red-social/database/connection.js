const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/red-social");

        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo conectar a la base de datos");
    }
}

module.exports = connection;