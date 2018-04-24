/* Aquí metemos un código que comprueba en cada petición que un token está llegando y que éste coincide con el token del usuario */
var jsonwebtoken = require ('jsonwebtoken');

exports.checkToken = function (req, res, next) {
    var token = req.query.token;
    jsonwebtoken.verify(token, 'sol3luna4', (err, decoded)=>{// OJO la contraseña entre comillas
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Token incorrecto'
            })
        }
        req.usuario = decoded.usuario;
        next();
    } );//verifica el token. Los 3 parámetros que recibe son el token, la clave secreta (sol3luna4 que usamos en login), y una función flecha
    
}/* Ponemos una propiedad que en realidad es una función */ //req.query.token recoge el token de la consulta