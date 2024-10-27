//IMPORTACIONES
const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_autentificacion = require('../middlewares/autentificacion');

//RUTAS
var api = express.Router();

api.post('/registrarEmpresa', md_autentificacion.Auth, usuarioController.RegistrarEmpresa);
api.post('/agregarAdmin', usuarioController.RegistrarAdmin);
api.put('/editarEmpresa/:idUsuario', md_autentificacion.Auth, usuarioController.EditarEmpresa);
api.delete('/eliminarEmpresa/:idUsuario', md_autentificacion.Auth, usuarioController.EliminarEmpresa);

//LOGIN
api.post('/login', usuarioController.login);

module.exports = api;