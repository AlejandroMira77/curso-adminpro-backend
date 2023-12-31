// leer variables de entorno
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { dbConnection } = require('./database/config');

// Crear el servidor 
const app = express();

// Configurar cors
app.use(cors());

// Carpeta publica
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Base de Datos
dbConnection();

// Rutas
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/login.route'));
app.use('/api/hospitals', require('./routes/hospitals.route'));
app.use('/api/medicos', require('./routes/medicos.route'));
app.use('/api/all', require('./routes/search.route'));
app.use('/api/upload', require('./routes/upload.route'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo puerto ' + process.env.PORT);
});