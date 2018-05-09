var mongoose = require('mongoose'); //llamamos a mongoose
var unique = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://localhost:27017/erp');//instancia de conexión de mongoose a base de datos // usa la URI del app.js
autoIncrement.initialize(connection);

var PresupuestoSchema = new mongoose.Schema({/* Esto es un constructor. Nos permite definir qué va a tener nuestro proveedor, así como tipar los datos */
    cliente:String,
    cif:String,
    fecha:String,
    items:Array,
    suma:Number,
    tipo:Number,
    importeIVA:Number,
    total:Number,  
   
})
PresupuestoSchema.plugin(autoIncrement.plugin, {model:'Presupuesto', field:'numero', startAt:1});//en el objeto definimos cómo queremos que sea el campo del número secuencial
module.exports = mongoose.model('Presupuesto', PresupuestoSchema);