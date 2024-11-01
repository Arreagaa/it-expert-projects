// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS
const UsuarioRutas = require('./src/routes/usuario.routes');
const EmpleadoRutas = require('./src/routes/empleados.routes');

//MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/
app.use('/api', UsuarioRutas, EmpleadoRutas);

module.exports = app;