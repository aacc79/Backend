var express = require ('express');
var app = express();// de no poner esto, no reconocería los app.post, etc de abajo
var mongoose = require('mongoose');
var Sesion = require('../models/sesion');


app.post('/', (req,res)=>{
    var body = req.body;
    var sesion = new Sesion({
        nombre:body.nombre, 
        login:body.login, 
        logout:body.logout, 
        duracion:body.duracion, 

    })
    sesion.save((err,datos)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear sesion',
                errores: err
            }        )
        }
        res.status(201).json({
            ok:true,
            mensaje: 'sesion creada correctamente',
            sesion: datos
        })
    })
});

app.get('/', (req, res, next)=> {/* los get son peticiones en los que la app dice al servidor 'dame los proveedores', no recibe nada */
    var nombre = req.query.nombre//query es el objeto que trae las consultas
    Sesion.find({nombre:nombre})
        .sort({_id:-1})//ordenamos por id descendente
        .exec((err, datos)=>{//el objeto vacío({}) es la sintaxis de mongo y mongoose para devolver todo/* llama a la base de datos, hace un find sobre proveedors, y si hay un dato lo mete aquó ¿? */
            if(err){/* si no es capaz de hacer un find */
                return res.status(400).json({
                    ok:false,
                    mensaje: 'Error de conexión',
                    errores: err
                })
            }
            res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
                ok:true,
                sesiones: datos /* le enchufamos los datos */
            })
        })    /* encuéntrame todos los proveedores dentro de proveedors */
});

app.put('/:id', (req,res,next)=>{
    var id= req.params.id;
    var body = req.body;//para recuperar el cuerpo del mensaje
    Sesion.findById(id, (err,sesion)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error de conexión'
            })
        } 
        sesion.nombre = body.nombre; // sesion es el de la base de datos, que pasa a ser el nuevo que venga del mensaje
        sesion.horaLogout = body.horaLogout;
        sesion.save((err,sesionModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok:false,
                    mensaje: 'Error al actualizar sesion',
                    errores: err//para que luego podamos trabajar los errores de mongoose
                })
            }
            res.status(200).json({
                ok:true,
                mensaje: 'sesion actualizado correctamente'
            })
        })//este es un método de mongoose
    })
})

// app.put('/sesion/:id', (req,res,next)=>{
    
//     var id= req.params.id;//recuperado del parámetro
//     var body = req.body;//para recuperar el cuerpo del mensaje

//     Sesion.findById(id, (err,sesion)=>{
//         if (err) {
//             return res.status(500).json({
//                 ok:false,
//                 mensaje: 'Error de conexión'
//             })
//         } //buscamos el usuario por id
//         sesion.nombre = body.nombre; // sesion es el de la base de datos, que pasa a ser el nuevo que venga del mensaje
//         sesion.horaLogout = body.horaLogout;
//         sesion.save((err,sesionModificado)=>{
//             if (err) {
//                 return res.status(400).json({
//                     ok:false,
//                     mensaje: 'Error al actualizar sesion',
//                     errores: err//para que luego podamos trabajar los errores de mongoose
//                 })
//             }
//             res.status(200).json({
//                 ok:true,
//                 mensaje: 'sesion actualizado correctamente'
//             })
//         })//este es un método de mongoose
//     })
// })//put para modificar sesiones

app.delete('/:id', function (req,res,next) {
    Sesion.findByIdAndRemove(req.params.id, req.body, function (err, datos) {
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'ERROR al eliminar sesion',
                errores: err
            })  
        }  
        res.status(200).json({
            ok: true,
            mensaje: 'Sesion ' + datos.nombre+ ' correctamente eliminado'
        })
    });//busca por un id y actualiza. El id viene de '/:id' los parámetros que vienen de la ryta se almacenan en una propiedad llamada params //  req.body del mensaje del cuerpo obtenemos lo que queremos cambiar // usamos la función callback
})

module.exports = app


/* en vez de almacenar sesiones en una colección, lo almacenamos en un array */