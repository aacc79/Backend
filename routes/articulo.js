var express = require('express'); /* OJO, es require, */
var mongoose = require('mongoose');
var Articulo = require('../models/articulo.js');/* importamos el modelo de proveedor que creamos antes*/
var proteccionhttp = require('../middleware/proteccionhttp');/* Para evitar que se puedan crear proveedores mediante postman, y que de esa manera se sorteé la seguridad del administrador */
var app = express();

app.get('/', (req, res, next)=> {/* los get son peticiones en los que la app dice al servidor 'dame los proveedores', no recibe nada */
    var tramo = req.query.tramo;
    tramo = Number(tramo);//tramo nos llega como un string desde la app, pero el método skip requiere un número. Para ello usamos el método number para cambiar el tipo de tramo
    Articulo.find({}).skip(tramo).limit(5).exec((err, datos)=>{/* llama a la base de datos, hace un find sobre proveedores, y si hay un dato lo mete aquó ¿?  hacemos que muestre solo 5, y que haya una paginación que vaya variando, a la que llamamos 'tramo'*/
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        Articulo.count({}, (err, totales)=>{
            res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            articulos: datos, /* le enchufamos los datos */
            totales// equivale a totales(q es parametro): totales(q es propiedad) //enviamos el resultado
        })/* este count engloba en sí find().count({}) */
    })
    })    /* encuéntrame todos los proveedores dentro de proveedors */
});

app.get('/:id', (req,res, next)=>{
    Articulo.findById(req.params.id,(err, datos)=>{
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            articulo: datos //proveedor buscado por id
        })
    }); //req.params.id, forma de extraer el parámetro de la ruta
});//en este caso, mongoose busca mediante el id


app.post('/',(req, res)=>{
    var body = req.body;/* variable para almacenar los datos del proveedor que nos llegan*/
    var articulo = new Articulo ({/* Tomamos los datos que vienen del http que demando. Igaulamos la propiedad de este objeto con la propiedad que viene del mensaje*/
        referencia:body.referencia,
        precio:body.precio,
    });

    articulo.save((err, datos)=>{/* El segundo parámetro, "datos", es lo que se ha guardado */
        if(err){/* En caso de error, devuélvenos un objeto json con las propiedades relativas el error que has tenido*/
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al crear artículo',
                errores: err
            })
        }

        res.status(201).json({/* 201 significa que se crea un recurso */
            of:true,
            mensaje:'Artículo creado',
            articulo: datos/* que es el parámetro que save nos devuelve cuando lo ha grabado en la base de datos */
        })
    })/* proveedor.save() a secas graba proveedor en la base de datos */
});

app.put('/:id', function (req,res,next) {
    Articulo.findByIdAndUpdate(req.params.id, req.body, function (err, datos) {
        if(err){/* En caso de error, devuélvenos un objeto json con las propiedades relativas el error que has tenido*/
            return res.status(400).json({
                ok:false,
                mensaje: 'ERROR al actualizar Artículo',
                errores: err
            })  
        }  
        res.status(200).json({
            ok: true,
            mensaje: 'articulo ' + datos.nombre+ ' se ha actualizado'
        })
    });//busca por un id y actualiza. El id viene de '/:id' los parámetros que vienen de la ryta se almacenan en una propiedad llamada params //  req.body del mensaje del cuerpo obtenemos lo que queremos cambiar // usamos la función callback
})

app.delete('/:id', proteccionhttp.checkToken, function (req,res,next) {
    Articulo.findByIdAndRemove(req.params.id, req.body, function (err, datos) {
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'ERROR al eliminar artículo',
                errores: err
            })  
        }  
        res.status(200).json({
            ok: true,
            mensaje: 'articulo ' + datos.nombre+ ' se ha eliminado'
        })
    });//busca por un id y actualiza. El id viene de '/:id' los parámetros que vienen de la ryta se almacenan en una propiedad llamada params //  req.body del mensaje del cuerpo obtenemos lo que queremos cambiar // usamos la función callback
})

module.exports = app;