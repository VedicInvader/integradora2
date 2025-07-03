require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('../src/config/db');
const readingRt = require('../src/routes/readingRoutes');

const app = express();

//para los middlewares
app.use(cors());
app.use(express.json());

//conexion base de datos
connectDB();

//routes
app.use('/api/readings', readingRt);

//errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message });
});

//levantar el server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`El server está corriendo en el puerto ${PORT}`);
});

