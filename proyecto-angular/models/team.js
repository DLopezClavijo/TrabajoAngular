'use strict'

var mongoose = require('mongoose');

//DEFINIR LA VARIABLES APRA DEFNIR ESQUEMAS O MODELOS DE LBBDD. ESTO PERMITE CREAR OBEJTOS DEL TIPO ESQUEMA QUE
// QUE CORRESPONDE CON EL MODELO DE LA BD

var Schema = mongoose.Schema;

// crear un esquema para nuestros EQUIPOS

var TeamSchema = Schema ({
    name: String,
    description: String,
    image: String

});

//para utilizar este objeto fuera de este fichero tenemos que exortarlo.De esta forma 
//cuando utilicemos el esquema vamos a atennr un obejto User con los valores de la bd;
module.exports = mongoose.model('Team',TeamSchema);