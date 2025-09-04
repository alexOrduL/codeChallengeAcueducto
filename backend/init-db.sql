-- Script de inicialización de la base de datos PostgreSQL
-- Este script se ejecuta automáticamente cuando se crea el contenedor

-- Crear usuario si no existe (para desarrollo)
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'palindrome_user') THEN
      
      CREATE ROLE palindrome_user LOGIN PASSWORD 'palindrome_password';
   END IF;
END
$do$;

-- Crear base de datos si no existe
SELECT 'CREATE DATABASE palindrome_db OWNER palindrome_user'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'palindrome_db')\gexec

-- Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE palindrome_db TO palindrome_user;

-- Conectar a la base de datos palindrome_db
\c palindrome_db

-- Otorgar permisos en el esquema public
GRANT ALL ON SCHEMA public TO palindrome_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO palindrome_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO palindrome_user;

-- No crear tabla aquí - dejar que TypeORM la cree con synchronize
-- Esto evita conflictos de sincronización

-- Los datos se insertarán después de que TypeORM cree la tabla
-- Esto se hará mediante el seed service del backend

-- Mensaje de confirmación
RAISE NOTICE 'Base de datos y usuario configurados correctamente. TypeORM creará las tablas.';
