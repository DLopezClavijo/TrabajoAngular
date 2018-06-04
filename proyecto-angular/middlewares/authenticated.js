'use strict'

//IMPORTAMOS JWT
var jwt = require('jwt-simple');

//IMPORTAMOS EL MOMENT
var moment = require('moment');

//CLAVE SECRETA

var secret = 'clave_secreta';

//METODO PARA COMPROBAR SI EL TOKEN ES CORRECTO
//RECIBE LA PETICION HHTP DEL CLIENTE Y EL NEXT(PARAMETRO) PARA SALIR DEL MIDDLEWARE
exports.ensureAuth = function (req,res,next){
    //RECOGEMOS LA AUTORIZACION, PASANDOLA POR LA CABECERA QUE VAMOS A MANDAR POR EL HEADER
    if(!req.headers.authorization){
        return res.status(403).send({message:'La peticion no tiene la cabecera de autentificacion'});    
    }
    //SI TENEMOS EL CAMPO EN LA CABECERA, LE QUITAMOS LAS COMILLAS POR DELNATE POR DETRAS
    var token = req.headers.authorization.replace(/['"]+/g,'');
    //DECODE TOKEN
    try{
        var payload = jwt.decode(token, secret);

        //COMPROBAMOS SI LA FECHA EXP ES MAYOR A LA ACTUALD
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:'TOKEN EXPIRADO'});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'TOKEN NO VALIDO'});
    }
    //PROPIEDAD DEL REQ DEL TIPO USER VA A SESTAR A DISPONIBLE DEN CADA DE LOS METODOSQUE USEN ESTE MIDDLEWARE. EL USER TIENE TODOS LOS DATOS DEL USUARIOS IDENTIFICADO
    req.user = payload;
    //SALIMOS DEL MIDDLEWARE
    next();
}
