var mongoose = require('mongoose'); //llamamos a mongoose
var unique = require('mongoose-unique-validator'); 

var UsuarioSchema = new mongoose.Schema({/* Esto es un constructor. Nos permite definir qué va a tener nuestro proveedor, así como tipar los datos */
    nombre:String,
    email:{type:String, unique: true},/* unique para que no existan dos cuentas con el mismo email */
    password:String,
    rol:String,
    sesiones: Array,//aquí almacenamos los documentos de la sesión , en vez de tener una colección
})
/* Mensaje para el caso de que intenten registrar 2 veces el mismo usuario */
UsuarioSchema.plugin(unique, {message: 'Ya existe una cuenta con ese correo electrónico'});/* Mensaje relacionado con el objeto del cif de ProveedorSchema */
module.exports = mongoose.model('Usuario', UsuarioSchema);