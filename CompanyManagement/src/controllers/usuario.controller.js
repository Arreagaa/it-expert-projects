//IMPORTACIONES
const usuarioModels = require('../models/usuario.model');
const usuariosModel = require('../models/usuario.model');
const Usuarios = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

//LOGIN
function login(req,res){
    var paramentros = req.body;

    Usuarios.findOne({email: paramentros.email},(err,usuarioGuardado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(usuarioGuardado){
            bcrypt.compare(paramentros.password,usuarioGuardado.password,(err,verificacionPassword)=>{
                if(verificacionPassword){
                    if(paramentros.obtenerToken === 'true'){
                        return res.status(200).send({
                            toke: jwt.crearToken(usuarioGuardado)
                        })
                    }else{
                        usuarioGuardado.password = undefined;
                        return res.status(200).send({usuario: usuarioGuardado})
                    }
                }else{
                    return res.status(500).send({mensaje:'La contrasena no coincide'})
                }
            })
        }else{
            return res.status(500).send({mensaje: 'El usuario no se encuentra o no se identifica'})
        }
    })
}

//AGREGAR ADMIN -- AL INSTANTE
function RegistrarAdmin(req, res){
    var usuariosModel = new Usuarios();   
    usuariosModel.nombre = 'Admin';
    usuariosModel.email = 'Admin@gmail.com';
    usuariosModel.rol = 'ROL_ADMINISTRADOR';

    Usuarios.find({ nombre: 'Admin', email: 'Admin@gmail.com'}, (err, usuarioEncontrato) => {
        if (usuarioEncontrato.length == 0) {
            bcrypt.hash("123456",null, null, (err, passswordEncypt) => { 
                usuariosModel.password = passswordEncypt
                usuariosModel.save((err, usuarioGuardado) => {
                console.log(err)
                })
            })
        } else {
            console.log('Este usuario con el puesto de Administrador ya esta creado')
        }
    })
    }

// ADMIN ADJUNTA EMPRESA
 function RegistrarEmpresa(req, res){
    var paramentros = req.body;
    var usuariosModel = new Usuarios();
 
    if(paramentros.nombre, paramentros.email, paramentros.password){
        usuariosModel.nombre = paramentros.nombre;
        usuariosModel.email = paramentros.email;
        usuariosModel.password = paramentros.password;
        usuariosModel.rol = 'ROL_EMPRESA';

        Usuarios.find({nombre: paramentros.nombre, email: paramentros.email, password: paramentros.password, rol: paramentros.rol}, (err, empresaGuardado)=>{
                if(empresaGuardado.length == 0){
                bcrypt.hash(paramentros.password, null,null, (err, passwordEncriptada)=>{
                    usuariosModel.password = passwordEncriptada;
                    usuariosModel.save((err, empresaGuardado) => {
                        if(err) return res.status(500).send({mensaje: 'No se guardo la accion'});
                        if(!empresaGuardado) return res.status(404).send({mensaje: 'No se agrego'});
        
                        return res.status(201).send({usuarios: empresaGuardado});
                     })
                })
            }else{
                return res.status(500).send({ mensaje: 'Debe ser administrador para completar esta accion' });
            }
        })
    }     
} 

// ADMIN EDITA EMPRESA
function EditarEmpresa(req, res){
    var idUsuario = req.params.idUsuario;
    var paramentros = req.body;

    if(req.user.rol == "ROL_ADMINISTRADOR"){
        Usuarios.findByIdAndUpdate({_id: idUsuario, email: paramentros.email, password: paramentros.password, rol: paramentros.rol}, paramentros,{new:true},
            (err, empresaEditada)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                if(!empresaEditada) return res.status(400).send({mensaje: 'No se pudo ediar la empresa'});
                
                return res.status(200).send({usuarios: empresaEditada});
            })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para editar la empresa'});
    }
}

//ADMIN ELIMINA EMPRESA
function EliminarEmpresa(req, res){
    var idUsuario = req.params.idUsuario;
    var paramentros = req.body;

    if(req.user.rol == "ROL_ADMINISTRADOR"){
        Usuarios.findByIdAndDelete({_id: idUsuario,  email: paramentros.email, password: paramentros.password, rol: paramentros.rol},(err, empresaEliminada)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                if(!empresaEliminada) return res.status(400).send({mensaje: 'No es posible eliminar la empresa'});
                
                return res.status(200).send({usuarios: empresaEliminada});
            })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para eliminar la empresa'});
    }
}

module.exports = {
    login,
    RegistrarAdmin,
    RegistrarEmpresa,
    EditarEmpresa,
    EliminarEmpresa
}