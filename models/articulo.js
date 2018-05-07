var mongoose = require('mongoose'); //llamamos a mongoose
var unique = require('mongoose-unique-validator');

var ArticuloSchema = new mongoose.Schema({/* Esto es un constructor. Nos permite definir qué va a tener nuestro proveedor, así como tipar los datos */
    referencia:{type:String, unique: true},/* ponemos un objeto que dice a mongoose. Cuando llegues aquí, comprueba que no tengas en la base de datos uno que tenga en el campo CIF el valorque te está llegando*/
    precio:Number,
})
ArticuloSchema.plugin(unique, {message: 'El artículo con esa referencia ya está registrado'});/* Mensaje relacionado con el objeto del cif de ProveedorSchema */
module.exports = mongoose.model('Articulo', ArticuloSchema);