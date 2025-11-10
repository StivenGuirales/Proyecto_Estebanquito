const { Sequelize } = require('sequelize');
require('dotenv').config();

// Crear conexión con MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Cambiar a true si quieres ver las consultas SQL
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Función para testear la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con la base de datos MySQL');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
};

module.exports = { sequelize, testConnection };