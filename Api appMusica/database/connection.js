const mongoose = require('mongoose');

// Conexión a la base de datos
const connection = async () => {
    try{
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/app-musica';
        await mongoose.connect(mongoUri);
        console.log('Conexión a la base de datos establecida');
    }catch(error){
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = connection; 