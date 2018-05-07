var mongoose = require('mongoose'); //llamamos a mongoose
var unique = require('mongoose-unique-validator');

var PresupuestoSchema = new mongoose.Schema({/* Esto es un constructor. Nos permite definir qué va a tener nuestro proveedor, así como tipar los datos */
    proveedor:String,
        cif:{type:String, unique: true},
        fechaLegal:Date,
        fechaRegistro:Date,
        concepto:String,
        RetencionIrpf:Number,
        base:Number,
        tipo:Number,
        ImporteRetencion:Number,
        importe:Number,
        total:String,
    
   
})
PresupuestoSchema.plugin(unique, {message: 'El presupuesto con ese cif ya está registrado'});/* Mensaje relacionado con el objeto del cif de ProveedorSchema */
module.exports = mongoose.model('Presupuesto', PresupuestoSchema);