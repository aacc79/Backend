var mongoose = require('mongoose'); //llamamos a mongoose
var unique = require('mongoose-unique-validator'); //llamamos a mongoose

var SesionSchema = new mongoose.Schema({/* Esto es un constructor. Nos permite definir qué va a tener nuestro proveedor, así como tipar los datos */
    nombre:String,
    horaLogout:Date
})
/* Mensaje para el caso de que intenten registrar 2 veces el mismo sesion */
SesionSchema.plugin(unique, {message: 'Ya existe una cuenta con ese correo electrónico'});/* Mensaje relacionado con el objeto del cif de ProveedorSchema */
module.exports = mongoose.model('Sesion', SesionSchema);