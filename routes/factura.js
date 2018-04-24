var express = require('express');
var mongoose = require('mongoose');
var Factura = require('../models/factura.js');/* importamos el modelo de factura que creamos antes*/

var app = express();

app.get('/', (req, res, next)=> {/* los get son peticiones en los que la app dice al servidor 'dame los proveedores', no recibe nada */
    Factura.find({}).exec((err, datos)=>{/* llama a la base de datos, hace un find sobre proveedors, y si hay un dato lo mete aquó ¿? */
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            facturas: datos /* le enchufamos los datos */
        })
    })    /* encuéntrame todos los proveedores dentro de proveedors */
});

app.get('/:id', (req,res, next)=>{
    Factura.findById(req.params.id,(err, datos)=>{
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            factura: datos //proveedor buscado por id
        })
    }); //req.params.id, forma de extraer el parámetro de la ruta
});//en este caso, mongoose busca mediante el id


app.post('/',(req, res)=>{
    var body = req.body;/* variable para almacenar los datos del proveedor que nos llegan*/
    var factura = new Factura ({/* Tomamos los datos que vienen del http que demando. Igaulamos la propiedad de este objeto con la propiedad que viene del mensaje*/
        proveedor:body.proveedor,
        cif:body.cif,
        fechaLegal:body.fechaLegal,
        fechaRegistro:body.fechaRegistro,
        concepto:body.concepto,
        RetencionIrpf:body.RetencionIrpf,
        base:body.base,
        tipo:body.tipo,
        ImporteRetencion:body.ImporteRetencion,
        importe:body.importe,
        total:body.total,
    });

    factura.save((err, datos)=>{/* El segundo parámetro, "datos", es lo que se ha guardado */
        if(err){/* En caso de error, devuélvenos un objeto json con las propiedades relativas el error que has tenido*/
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al crear factura',
                errores: err
            })
        }

        res.status(201).json({/* 201 significa que se crea un recurso */
            of:true,
            mensaje:'Factura creada',
            factura: datos/* que es el parámetro que save nos devuelve cuando lo ha grabado en la base de datos */
        })
    })/* proveedor.save() a secas graba proveedor en la base de datos */
});

app.put('/:id', function (req,res,next) {
    Factura.findByIdAndUpdate(req.params.id, req.body, function (err, datos) {
        if(err){/* En caso de error, devuélvenos un objeto json con las propiedades relativas el error que has tenido*/
            return res.status(400).json({
                ok:false,
                mensaje: 'ERROR al actualizar factura',
                errores: err
            })  
        }  
        res.status(200).json({
            ok: true,
            mensaje: 'factura se ha actualizado'
        })
    });//busca por un id y actualiza. El id viene de '/:id' los parámetros que vienen de la ryta se almacenan en una propiedad llamada params //  req.body del mensaje del cuerpo obtenemos lo que queremos cambiar // usamos la función callback
})

app.delete('/:id', function (req,res,next) {
    Factura.findByIdAndRemove(req.params.id, req.body, function (err, datos) {
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'ERROR al eliminar factura',
                errores: err
            })  
        }  
        res.status(200).json({
            ok: true,
            mensaje: 'factura se ha eliminado jajaja'
        })
    });//busca por un id y actualiza. El id viene de '/:id' los parámetros que vienen de la ryta se almacenan en una propiedad llamada params //  req.body del mensaje del cuerpo obtenemos lo que queremos cambiar // usamos la función callback
})


module.exports = app;