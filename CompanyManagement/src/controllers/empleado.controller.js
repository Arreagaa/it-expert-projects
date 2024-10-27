//IMPORTACIONES
const { count } = require('../models/empleado.model');
const Empleados = require('../models/empleado.model');

//PDF
const fs = require('fs');
const Pdfmake = require('pdfmake');

//AGREGAR EMPLEADO
function RegistrarEmpleado(req, res){
    var paramentros = req.body;
    var empleadoModels = new Empleados();
 
    if(paramentros.nombre, paramentros.apellido, paramentros.puesto, paramentros.departamento){
        empleadoModels.nombre = paramentros.nombre;
        empleadoModels.apellido = paramentros.apellido;
        empleadoModels.puesto =  paramentros.puesto;
        empleadoModels.departamento = paramentros.departamento;
        empleadoModels.idEmpresa = req.user.sub;
    }else{
        return res.status(500).send({ mensaje: "Error en la accion" });
     } if(req.user.rol == "ROL_EMPRESA"){
         Empleados.find({nombre: paramentros.nombre, apellido: paramentros.apellido, puesto: paramentros.puesto, departamento: paramentros.departamento, idEmpresa: req.user.sub}, 
            (err, empleadoGuardado)=>{
                if(empleadoGuardado.length == 0){
                    empleadoModels.save((err, accionGuardada)=>{
                        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                        if(!accionGuardada) return res.status(404).send({mensaje: 'El empleado no se agrego'});
                        return res.status(201).send({empleados: accionGuardada});
                     })
                }
            })
        } else {
            return res.status(500).send({mensaje: 'Solamente la empresa completar esta accion'});
        }
    }

// EDITAR EMPLEADO
function EditarEmpleado(req, res){
    var idEmpleado = req.params.idEmpleado;
    var paramentros = req.body;

    if(req.user.rol == "ROL_EMPRESA"){
        Empleados.findOneAndUpdate({_id: idEmpleado, idEmpresa: req.user.sub}, paramentros,{new:true},
            (err, empleadoEditado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                if(!empleadoEditado) return res.status(400).send({mensaje: 'No se puedo ediatar al empleado'});
                
                return res.status(200).send({empleados: empleadoEditado});
            })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
    }
}

// ELIMINAR EMPLEADO
function EliminarEmpleado(req, res){
    var idEmpleado = req.params.idEmpleado;

    if(req.user.rol == "ROL_EMPRESA"){
        Empleados.findOneAndRemove({_id: idEmpleado, idEmpresa: req.user.sub},(err, empleadoEliminado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
            if(!empleadoEliminado) return res.status(400).send({mensaje: 'No se puedo eliminar al empleado'});
                
            return res.status(200).send({empleados: empleadoEliminado});
        })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
    }
}

//BUSQUEDAS
//OBTNER POR ID
function ObtenerEmpleadosId(req, res){
    var idEmpleado = req.params.idEmpleado;

    if(req.user.rol == "ROL_EMPRESA"){
        Empleados.findById(idEmpleado, (err, empleadoEncontrado) =>{
            return res.send({empleados : empleadoEncontrado});
        })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
    }
}

//OBTNER POR NOMBRE
function ObtenerEmpleadosNombre(req, res){
    var nomEmpleado = req.params.nombreEmpleado;

    if(req.user.rol == "ROL_EMPRESA"){
        Empleados.find({nombre: {$regex:nomEmpleado,$options:'i'}}, (err, empleadoEncontrado) =>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
             if(!empleadoEncontrado) return res.status(404).send({mensaje : "Error, no se encuentran empleados con ese nombre"});
             return res.status(200).send({empleados : empleadoEncontrado});
         })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
    }
}

//OBTNER POR PUESTO
function ObtenerEmpleadosPuesto(req, res){
    var puestoEmpleado = req.params.puestoEmpleado;

    if(req.user.rol == "ROL_EMPRESA"){
        Empleados.find({puesto: {$regex:puestoEmpleado,$options:'i'}}, (err, empleadoEncontrado) =>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
             if(!empleadoEncontrado) return res.status(404).send({mensaje : "Error, no se encuentran empleados con ese puesto"});
             return res.status(200).send({empleados : empleadoEncontrado});
         })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
    }
}

//OBTNER POR DEPARTAMENTO
function ObtenerEmpleadosDepartamento(req, res){
    var depaEmpleado = req.params.depaEmpleado;

    if(req.user.rol == "ROL_EMPRESA"){
        Empleados.find({departamento: {$regex:depaEmpleado,$options:'i'}}, (err, empleadoEncontrado) =>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
             if(!empleadoEncontrado) return res.status(404).send({mensaje : "Error, no se encuentran empleados con ese puesto"});
             return res.status(200).send({empleados : empleadoEncontrado});
         })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
    }
}

//OBTENER TODOS LOS EMPLEADOS 
function ObtenerEmpleados(req, res){

    if(req.user.rol == "ROL_EMPRESA"){
    Empleados.find({idEmpresa: req.user.sub }, (err,empleadosEncontrados) =>{
        if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
         if(!empleadosEncontrados) return res.status(404).send({mensaje : "Error, no se encuentran empleados"});

         return res.status(200).send({empleados : empleadosEncontrados});
     })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
    }
    };

//OBTENER CANTIDAD EMPLEADOS
function ObtenerEmpleadosCantidad(req, res){
    
    if(req.user.rol == "ROL_EMPRESA"){
        Empleados.count({ idEmpresa: req.user.sub }, (err,empleadosEncontrados) =>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
             if(!empleadosEncontrados) return res.status(404).send({mensaje : "Error, no se encuentran empleados"});
    
             return res.status(200).send({empleados : empleadosEncontrados});
         })
        } else {
            return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
        }
};

//PDF
function makePDF(req, res) {
    const usuarioLogueado = req.user.sub;

    Empleados.find({idEmpresa: usuarioLogueado}, (err, empleadosEmpresas) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });

    var fonts = {
        Roboto: {
            normal: './fonts/Roboto/Roboto-Regular.ttf',
            bold: './fonts/Roboto/Roboto-Medium.ttf',
            italics: './fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: './fonts/Roboto/Roboto-MediumItalic.ttf'
        }
    };
    let pdfmake = new Pdfmake(fonts);
    let content = [{
        text: 'Reporte De Empleados', alignment:'center', fontSize:20, decoration:'underline', color:'#6793F4', bold:true
    }]

    for (let i=0; i < empleadosEmpresas.length ; i++) {
        let empleadoNum = i + 1;
        content.push({
            text:' '
        })
        content.push({
            text:'Nombre de la empresa: '+  empleadosEmpresas[i].idEmpresa.nombre
        })
        content.push({
            text:'Contacto: '+  empleadosEmpresas[i].idEmpresa.email
        })
        content.push({
            text:' '
        })
        content.push({
            text:empleadoNum+'.'+' '+'Nombre del Empleado '+':'+' '+ empleadosEmpresas[i].nombre+' '+empleadosEmpresas[i].apellido 
        })
        content.push({
            text:'Puesto del Empleado '+':'+' '+ empleadosEmpresas[i].puesto
        })
        content.push({
            text:'Departamento del Empleado '+':'+' '+ empleadosEmpresas[i].departamento
        })
        content.push({
            text:' '
        })
    }

    let docDefinition = {
        content: content,
        background: function(){
            return {canvas: [{type:'rect', x: 500, y: 32, w:170, h: 765, color: '#E6E6FA'}]
            }
        }	
    }

    let documentPDF = pdfmake.createPdfKitDocument(docDefinition, {});
    documentPDF.pipe(fs.createWriteStream('empleadosReporte.pdf'));
    documentPDF.end();
    return res.status(200).send({mensaje:'El reporte de empleados ya fue creado'});
    }).populate('idEmpresa')
}

module.exports = {
    RegistrarEmpleado,
    EditarEmpleado,
    EliminarEmpleado,
    ObtenerEmpleadosId,
    ObtenerEmpleadosNombre,
    ObtenerEmpleadosPuesto,
    ObtenerEmpleadosDepartamento,
    ObtenerEmpleados,
    ObtenerEmpleadosCantidad,
    makePDF
}