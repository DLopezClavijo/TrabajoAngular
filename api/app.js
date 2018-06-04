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



//CONFIGURAR EL BODY-PARSER
app.use(bodyParser.urlencoded({extended:false}));

//PODER CONVERTIR LOS DATOS QUE NOS LLEGAN POR HTTP A OBJETOS JSON
app.use(bodyParser.json());

//CONF CABECERAS HTTP
app.use((req, res, next)=>{
    //CON ESTA PROPIEDAD PERMITIMOS EL ACCESO A TODOS LOS DOMINIOS
    res.header('Access-Control-Allow-Origin','*');

    //CABECERAS QUE ACABAMOS DE CREAR QUE FUNCIONE A NIVEL DE AJAX
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin,X-Requested-Width,Content-Type,Accept, Acess-Control-Allow-Request-Method');

    //PERMITIR LOS METODOS HTTP MAS COMUNES
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');

    //para salir del middleware y continuar con el flujo de ejecucion
    next();
});
//CARGAR LA RUTA BASE
//DETRAS DE CADA URL CON PETICION DE /API CARGAREMOS UNA PETICION A LA RUTA DE USER
app.use('/api', user_routes);
app.use('/api', team_routes);
app.use('/api',player_routes);


//EXPORTAR EL MODULO
module.exports = app;
