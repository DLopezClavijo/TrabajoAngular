'use strict'

//IMPORTAMOS JWT
var jwt = require('jwt-simple');

//IMPORTAR MOMENTSJS
var moment = require('moment');

//CALVE SECRETA
var secret = 'clave_secreta';

//CREAR Y EXPORTAR EL METODO DE CREACION DEL TOKEN
exports.createToken = function(user){
    //VARIABLE PARA LOS DATOS QUE VAMOS A CODIFICAR
    var payload = {
        sub: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp:moment().add(30,'days').unix()
     };

     //DEVOLVEMOS EL TOKEN LA CLAVE SECRETA PARA QUE GENERA EL HASH
     return jwt.encode(payload, secret);
}