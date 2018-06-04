'use strict'

var mongoose = require('mongoose');

//DEFINIR LA VARIABLES APRA DEFNIR ESQUEMAS O MODELOS DE LBBDD. ESTO PERMITE CREAR OBEJTOS DEL TIPO ESQUEMA QUE
// QUE CORRESPONDE CON EL MODELO DE LA BD

var Schema = mongoose.Schema;

// crear un esquema para nuestros usuarios

var UserSchema = Schema ({
    name: String,
    surname: String,
    email: String,
    password:String,
    role: String,
    image: String

});

//para utilizar este objeto fuera de este fichero tenemos que exortarlo.De esta forma 
//cuando utilicemos el esquema vamos a atennr un obejto User con los valores de la bd;
module.exports = mongoose.model('User',UserSchema);