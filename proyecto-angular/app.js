'use strict'

//CARAGAR LAS LIBRERIAS DE EXPRESS Y BODY-PARSER

var express = require('express');
var bodyParser = require('body-parser');

//CREAMOS EL OBJETO EXPRESS
var app = express();

//**********CARGAR RUTAS******************************/
// CARGAR EL FICHERO DE RUTAS DEL CONTROLADOR DE USUARIOS
var user_routes = require('./routes/user');

//CARGAR EL FICHERO DE RUTAS DEL CONTROLADOR DE JUGADORES
var player_routes = require('./routes/player');

// CARGAR EL FICHERO DE RUTAS DEL CONTROLADOR DE EQUIPOS
var team_routes = require('./routes/team');

/*CARGAR UNA RUTA
app.get('/prueba', function (req,res){
    res.status(200).send({message:'curso Angular'});
});
*/


//CONFIGURAR EL BODY-PARSER
app.use(bodyParser.urlencoded({extended:false}));

//PODER CONVERTIR LOS DATOS QUE NOS LLEGAN POR HTTP A OBJETOS JSON
app.use(bodyParser.json());
//CARGAR LA RUTA BASE
//DETRAS DE CADA URL CON PETICION DE /API CARGAREMOS UNA PETICION A LA RUTA DE USER
app.use('/api', user_routes);
app.use('/api', team_routes);
app.use('/api',player_routes);


//EXPORTAR EL MODULO
module.exports = app;
