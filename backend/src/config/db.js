const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false,
    },
    dialectOptions: {
      connectTimeout: 5000, 
    },
  }
);

async function connectDB(retries = 5, delay = 5000) {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("Conectado a la DB de MariaDB/MySQL");
      await sequelize.sync();
      break;
    } catch (err) {
      console.error("Error al conectar con MariaDB/MySQL:", err.message);

      retries--;

      if (retries === 0) {
        console.error("No se pudo conectar después de varios intentos. Abortando.");
        process.exit(1);
      } else {
        console.log(`Reintentando conexión... (${5 - retries}/5) en ${delay / 1000} segundos`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }
}

module.exports = { sequelize, connectDB };