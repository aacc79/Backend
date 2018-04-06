var mongoose = require('mongoose'); //llamamos a mongoose
var unique = require('mongoose-unique-validator'); //llamamos a mongoose

var ProveedorSchema = new mongoose.Schema({/* Esto es un constructor. Nos permite definir qué va a tener nuestro proveedor, así como tipar los datos */
    nombre:String,
    cif:{type:String, unique: true},/* ponemos un objeto que dice a mongoose. Cuando llegues aquí, comprueba que no tengas en la base de datos uno que tenga en el campo CIF el valorque te está llegando*/
    domicilio:String,
    cp:Number,
    localidad:String,
    provincia:String,
    telefono:String,
    email:String,
    contacto:String,
})
ProveedorSchema.plugin(unique, {message: 'El proveedor con ese cif ya está registrado'});/* Mensaje relacionado con el objeto del cif de ProveedorSchema */
module.exports = mongoose.model('Proveedor', ProveedorSchema);