const mongoose = require('mongoose');

require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Conectado a la BD MongoDB');
    } catch (err){
        console.error('Error al conectar con MongoDB: ', err);
        process.exit(1);
    }
};

module.exports = connectDB;