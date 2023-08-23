// leer variables de entorno
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { dbConnection } = require('./database/config');

// Crear el servidor 
const app = express();

// Configurar cors
app.use(cors());

// Base de Datos
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.json({
        msg: 'hola mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo puerto ' + process.env.PORT);
});