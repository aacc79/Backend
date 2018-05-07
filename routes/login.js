var express = require ('express');
var bcryptjs = require ('bcryptjs');
var jsonwebtoken = require ('jsonwebtoken');
var app = express();
var Usuario = require('../models/usuario');

app.post('/', (req,res)=>{/* req,res para gestionar petición y respuesta */
    var body = req.body;
    Usuario.findOne({email: body.email}, (err, datos)=>{/* gestionamos los errores */
        if(err){
            return res.status(500).json({
            ok: false,
            mensaje:'Error de conexión',
            errores:err
            })

        }
        if(!datos){/* si no aparece ningún dato, porque no hay un email igual registrado */
            return res.status(400).json({
                ok: false,
                mensaje:'Ese email no está asociado a ninguna cuenta',
                //esto no es un error, solo que no existe ese dato
            })
        }
        if (!bcryptjs.compareSync(body.password, datos.password)){
            return res.status(400).json({
                ok: false,
                mensaje: 'La contraseña introducida es incorrecta'
            })
        }

        var token = jsonwebtoken.sign({usuario:datos}, 'sol3luna4', {expiresIn: 60})//usuario equivale a datos, que es lo que recibimos de la consulta. //Como clave secreta ponemos sol3luna4// después ponemos el tiempo de duración del token, para que se te eche de la app cuando el token expire

        res.status(200).json({
            ok:true,
            token: token, /* Cuando sea correcto, mandamos al frontend el token */ //En ES6 es suficiente con escribir token
            nombre: datos.nombre,//en el mensaje de login aparecerá el nombre
            rol: datos.rol, //cada vez que se haga login exitosamente, en la respuesta tendremos el rol
            _id:datos._id
        })


  

    })/* metemos un objeto y buscamos por el email que nos viene de la app (body.email), que sabemos que NO puede estar repetido */ //en la función callback ponemos los parámetros de error y datos, que es el email que se recibe (los "datos" que vienen de la app, de la petición)
})

module.exports = app;