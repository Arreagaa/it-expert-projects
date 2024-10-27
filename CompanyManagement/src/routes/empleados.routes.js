//IMPORTACIONES
const express = require('express');
const { append } = require('express/lib/response');
const empleadoController = require('../controllers/empleado.controller');
const md_autentificacion = require('../middlewares/autentificacion');

//RUTAS
var api = express.Router();

api.post('/registrarEmpleado', md_autentificacion.Auth, empleadoController.RegistrarEmpleado);
api.put('/editarEmpleado/:idEmpleado', md_autentificacion.Auth, empleadoController.EditarEmpleado);
api.delete('/eliminarEmpleado/:idEmpleado', md_autentificacion.Auth, empleadoController.EliminarEmpleado);

//BUSQUEDAS
api.get('/buscarEmpleados/:idEmpleado', md_autentificacion.Auth, empleadoController.ObtenerEmpleadosId);
api.get('/buscarNombreEmpleados/:nombreEmpleado', md_autentificacion.Auth, empleadoController.ObtenerEmpleadosNombre);
api.get('/buscarPuestoEmpleados/:puestoEmpleado', md_autentificacion.Auth, empleadoController.ObtenerEmpleadosPuesto);
api.get('/buscarDepartamentoEmpleados/:depaEmpleado', md_autentificacion.Auth, empleadoController.ObtenerEmpleadosDepartamento);

api.get('/empleados', md_autentificacion.Auth, empleadoController.ObtenerEmpleados);
api.get('/empleadosCantidad', md_autentificacion.Auth, empleadoController.ObtenerEmpleadosCantidad);

//PDF
api.get('/makePDF',md_autentificacion.Auth, empleadoController.makePDF);


module.exports = api;