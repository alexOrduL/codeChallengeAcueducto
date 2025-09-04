-- Inicialización de la base de datos
CREATE DATABASE IF NOT EXISTS palindrome_ecommerce;

-- Conectar a la base de datos
\c palindrome_ecommerce;

-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Configurar timezone
SET timezone = 'UTC';
