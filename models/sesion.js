var mongoose = require('mongoose'); //llamamos a mongoose

var SesionSchema = new mongoose.Schema({/* Esto es un constructor. Nos permite definir qué va a tener nuestro proveedor, así como tipar los datos */
    nombre:String,
    login:Date,
    logout:Date,
    duracion:String,
})
module.exports = mongoose.model('Sesion', SesionSchema);