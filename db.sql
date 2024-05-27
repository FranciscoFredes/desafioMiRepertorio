--Crear base de datos 
CREATE DATABASE repertorio;
--Nos conectamos a la base de datos
\c repertorio
--creamos la tabla canciones
CREATE TABLE canciones (id SERIAL, titulo VARCHAR(50), artista
VARCHAR(50), tono VARCHAR(10));
--insertamos canciones de prueba
INSERT INTO canciones (titulo, artista, tono) VALUES
('cancion1', 'artista1', 'Cm'),
('cancion2', 'artista2', 'E');