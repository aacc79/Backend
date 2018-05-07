var express = require('express'); /* OJO, es require, */
var mongoose = require('mongoose');
var Cliente = require('../models/cliente');/* importamos el modelo de proveedor que creamos antes*/

var app = express();

app.get('/nombre/:nombre', (req, res, next)=> {/* los get son peticiones en los que la app dice al servidor 'dame los proveedores', no recibe nada */

    var nombre = req.params.nombre; //para recuperar el parámetro nombre /:nombre de arriba
    Cliente.find({nombre: {$regex:nombre, $options:'i'}}).exec((err, datos)=>{/* llama a la base de datos, hace un find sobre proveedors, y si hay un dato lo mete aquó ¿? *//*$regex:nombre del parámetro nombre de arriba, $options:'i' dan igual mayusculas de minusculas */ //regex sirve para no tener que escribir el nombre exacto
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            clientes: datos /* le enchufamos los datos */
        })
    })    /* encuéntrame todos los proveedores dentro de proveedors */
});

app.get('/', (req, res, next)=> {/* los get son peticiones en los que la app dice al servidor 'dame los proveedores', no recibe nada */

    Cliente.find({}).exec((err, datos)=>{
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            clientes: datos /* le enchufamos los datos */
        })
    })    /* encuéntrame todos los proveedores dentro de proveedors */
});

app.get('/localidad/:localidad', (req, res, next)=> {/* los get son peticiones en los que la app dice al servidor 'dame los proveedores', no recibe nada */

    var localidad = req.params.localidad; //para recuperar el parámetro localidad /:localidad de arriba
    Cliente.find({localidad: {$regex:localidad, $options:'i'}}).exec((err, datos)=>{/* llama a la base de datos, hace un find sobre proveedors, y si hay un dato lo mete aquó ¿? *//*$regex:nombre del parámetro nombre de arriba, $options:'i' dan igual mayusculas de minusculas */ //regex sirve para no tener que escribir el nombre exacto
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            clientes: datos /* le enchufamos los datos */
        })
    })    /* encuéntrame todos los proveedores dentro de proveedors */
});

app.get('/mixto/:nombre/:localidad', (req, res, next)=> {//ponemos dos parámetros distintos, nombre y localidad

    var nombre = req.params.nombre; 
    var localidad = req.params.localidad; //para recuperar el parámetro localidad /:localidad de arriba
    Cliente.find({nombre:{$regex:nombre, $options: 'i'},
    localidad:{$regex:localidad,$options:'i'}})
    .exec((err, datos)=>{
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            clientes: datos /* le enchufamos los datos */
        })
    })    /* encuéntrame todos los proveedores dentro de proveedors */
});

app.get('/:id', (req,res, next)=>{
    Cliente.findById(req.params.id,(err, datos)=>{
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            cliente: datos //proveedor buscado por id
        })
    }); //req.params.id, forma de extraer el parámetro de la ruta
});//en este caso, mongoose busca mediante el id


app.post('/',(req, res)=>{
    var body = req.body;/* variable para almacenar los datos del proveedor que nos llegan*/
    var Cliente = new Cliente ({/* Tomamos los datos que vienen del http que demando. Igaulamos la propiedad de este objeto con la propiedad que viene del mensaje*/
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto,
    });

    Cliente.save((err, datos)=>{/* El segundo parámetro, "datos", es lo que se ha guardado */
        if(err){/* En caso de error, devuélvenos un objeto json con las propiedades relativas el error que has tenido*/
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al crear cliente',
                errores: err
            })
        }

        res.status(201).json({/* 201 significa que se crea un recurso */
            of:true,
            mensaje:'Cliente creado',
            cliente: datos/* que es el parámetro que save nos devuelve cuando lo ha grabado en la base de datos */
        })
    })/* proveedor.save() a secas graba proveedor en la base de datos */
});

app.put('/:id', function (req,res,next) {
    Cliente.findByIdAndUpdate(req.params.id, req.body, function (err, datos) {
        if(err){/* En caso de error, devuélvenos un objeto json con las propiedades relativas el error que has tenido*/
            return res.status(400).json({
                ok:false,
                mensaje: 'ERROR al actualizar cliente',
                errores: err
            })  
        }  
        res.status(200).json({
            ok: true,
            mensaje: 'cliente ' + datos.nombre+ ' se ha actualizado'
        })
    });//busca por un id y actualiza. El id viene de '/:id' los parámetros que vienen de la ryta se almacenan en una propiedad llamada params //  req.body del mensaje del cuerpo obtenemos lo que queremos cambiar // usamos la función callback
})

app.delete('/:id', function (req,res,next) {
    Cliente.findByIdAndRemove(req.params.id, req.body, function (err, datos) {
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'ERROR al eliminar cliente',
                errores: err
            })  
        }  
        res.status(200).json({
            ok: true,
            mensaje: 'cliente ' + datos.nombre+ ' se ha eliminado'
        })
    });//busca por un id y actualiza. El id viene de '/:id' los parámetros que vienen de la ryta se almacenan en una propiedad llamada params //  req.body del mensaje del cuerpo obtenemos lo que queremos cambiar // usamos la función callback
})


module.exports = app;