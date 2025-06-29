require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const readingRt = require('./routes/readingRoutes');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//conexion a la base de datos
connectDB();

//rutas
app.use('/api/readings', readingRt);

//manejador de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message });
})

//para levantar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});