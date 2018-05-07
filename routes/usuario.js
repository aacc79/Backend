var express = require ('express');
var bcryptjs = require ('bcryptjs');
var app = express();
var Usuario = require('../models/usuario');
var proteccionhttp = require('../middleware/proteccionhttp');/* Para evitar que se puedan crear usuarios mediante postman, y que de esa manera se sorteé la seguridad del administrador */


app.post('/',proteccionhttp.checkToken, (req,res)=>{//si no se cumple la comprobación de token de los paréntesis, no se ejecuta
    var body = req.body;
    var usuario = new Usuario({
        nombre:body.nombre, 
        email:body.email, 
        password:bcryptjs.hashSync(body.password, 10),
        rol:body.rol
    })
    usuario.save((err,datos)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear usuario',
                errores: err
            }        )
        }
        res.status(200).json({
            ok:true,
            mensaje: 'usuario creado correctamente'
        })
    })
});

app.get('/', (req, res, next)=> {/* los get son peticiones en los que la app dice al servidor 'dame los proveedores', no recibe nada */
    Usuario.find({}).exec((err, datos)=>{/* llama a la base de datos, hace un find sobre proveedors, y si hay un dato lo mete aquó ¿? */
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            usuarios: datos /* le enchufamos los datos */
        })
    })    /* encuéntrame todos los proveedores dentro de proveedors */
});
app.get('/sesion', (req, res, next)=> {/* los get son peticiones en los que la app dice al servidor 'dame los proveedores', no recibe nada */

    var nombre = req.query.nombre;
    Usuario.find({nombre:nombre}).exec((err, datos)=>{/* llama a la base de datos, hace un find sobre proveedors, y si hay un dato lo mete aquó ¿? */ // nombre(campo de mongo):nombre(variable de arriba)
        if(err){/* si no es capaz de hacer un find */
            return res.status(400).json({
                ok:false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        
        
        res.status(200).json({/* 200 Respuesta estándar para peticiones correctas. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP*/
            ok:true,
            sesiones: datos[0].sesiones.reverse() /* datos.sesiones es el array donde se almacenan las sesiones */
        })
    })    /* encuéntrame todos los proveedores dentro de proveedors */
});
app.put('/:id', (req,res,next)=>{
    var id= req.params.id;
    var body = req.body;//para recuperar el cuerpo del mensaje
    Usuario.findById(id, (err,usuario)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error de conexión'
            })
        } 
        usuario.nombre = body.nombre; // usuario es el de la base de datos, que pasa a ser el nuevo que venga del mensaje
        usuario.email = body.email;
        usuario.rol = body.rol; 
        usuario.save((err,usuarioModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok:false,
                    mensaje: 'Error al actualizar el usuario',
                    errores: err//para que luego podamos trabajar los errores de mongoose
                })
            }
            res.status(200).json({
                ok:true,
                mensaje: 'Usuario actualizado correctamente'
            })
        })//este es un método de mongoose
    })
})
app.put('/sesion/:id', (req,res,next)=>{//para que las peticiones en que crea las sesiones sean un put sobre el objeto usuario
   
    var id= req.params.id;//recuperado del parámetro
    var body = req.body;//para recuperar el cuerpo del mensaje
console.log(body)
    Usuario.findById(id, (err,usuario)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error de conexión'
            })
        } 
        usuario.sesiones.push(body); //OJO si haces push sobre un Array undefined, da error

        usuario.save((err,usuarioModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok:false,
                    mensaje: 'Error crear sesión',
                    errores: err//para que luego podamos trabajar los errores de mongoose
                })
            }
            res.status(200).json({
                ok:true,
                mensaje: 'Sesión creada'
            })
        })//este es un método de mongoose.Modifica el usuario
    })
})/* PAra probarlo en postman put con un id localhost:3000/usuario/sesion/5ad8c4f1a571023004212bbd solo con un body sesion {login:'Ahora mismo'} */ //vemos si se crea un array, responde  "mensaje": "Sesión creada"
/* consola mongo use erp, db.usuarios.find() y vemos que a uno le ha añadido la sesión */
app.delete('/:id', function (req,res,next) {
    Usuario.findByIdAndRemove(req.params.id, req.body, function (err, datos) {
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'ERROR al eliminar usuario',
                errores: err
            })  
        }  
        res.status(200).json({
            ok: true,
            mensaje: 'Usuario ' + datos.nombre+ ' correctamente eliminado'
        })
    });//busca por un id y actualiza. El id viene de '/:id' los parámetros que vienen de la ryta se almacenan en una propiedad llamada params //  req.body del mensaje del cuerpo obtenemos lo que queremos cambiar // usamos la función callback
})
module.exports = app