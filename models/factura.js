var mongoose = require('mongoose'); 
var unique = require('mongoose-unique-validator'); 

var FacturaSchema = new mongoose.Schema({/* Esto es un constructor. Nos permite definir qué va a tener nuestra factura, así como tipar los datos */
    proveedor:String,
    cif:Number,
    fechaLegal:String,
    fechaRegistro:String,
    concepto:String,
    RetencionIrpf:Number,
    base:Number,
    tipo:Number,
    ImporteRetencion:Number,
    importe:Number,
    total:Number,
})
FacturaSchema.plugin(unique, {message: 'El proveedor con ese cif ya está registrado'});/* Mensaje relacionado con el objeto del cif de FacturaSchema */
module.exports = mongoose.model('Factura', FacturaSchema);