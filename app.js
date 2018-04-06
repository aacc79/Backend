/* PUNTO DE ENTRADA */


var express = require('express');

var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor.js');

var app = express();

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/erp',{promiseLibrary:require('bluebird')})/* Una url es un tipo de uri. En ella ponemos la ip del servidor, que en nuestro caso está en el propio equipo; y luego el puerto, que por defecto en los servidores mongo es 27017 // erp = Enterprise Resource P*/
    .then( ()=>{
        console.log('Conexión a la base de datos OK')
    } )/* Para saber que se ha conectado bien */
    .catch((err)=>{
        console.error('Error de conexión', err) } /* Que nos pinte el error */
    )/* Para los errores */

app.use(bodyParser.json({}));

app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/proveedor', proveedor);/* Lo que entre en el servidor 3000 por la ruta proveedor lo coge nuestro método post */

app.listen(3000, function () {
    console.log('servidor ok en el puerto 3000')
    
})