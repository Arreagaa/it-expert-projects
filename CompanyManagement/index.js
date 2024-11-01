const mongoose = require('mongoose');
const app = require('./app');
UsuarioController = require('./src/controllers/usuario.controller');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Control-de-empresas', {useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos");

    app.listen(3000, function(){
        console.log("Esta corriendo en el puerto 3000")
    })

    UsuarioController.RegistrarAdmin();

}).catch(err => console.log(err))