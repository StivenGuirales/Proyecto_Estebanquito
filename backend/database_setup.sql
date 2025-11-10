-- Script para crear la base de datos del Banco Estebanquito
-- Ejecutar este script en MySQL antes de correr el backend

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS banco_estebanquito;

-- Usar la base de datos
USE banco_estebanquito;

-- Mostrar mensaje de confirmación
SELECT 'Base de datos banco_estebanquito creada exitosamente!' AS mensaje;

-- Nota: Las tablas serán creadas automáticamente por Sequelize al ejecutar el backend