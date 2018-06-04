'use strict'

var express = require('express');

var TeamController = require('../controllers/team');

//CARGMOS RUTAS DEL MIDDLEWARE
var md_auth =require('../middlewares/authenticated');
//MODULO PARA SUBIDA Y ENVIO DE FICHEROS
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/teams'});

//CARGAR ROUTEAS DE EXPRESS
var api = express.Router();

api.get('/team/:id',md_auth.ensureAuth ,TeamController.getTeam);
api.post('/team',md_auth.ensureAuth,TeamController.saveTeam);
api.get('/teams/:page?',md_auth.ensureAuth ,TeamController.getTeams)
api.put('/teams/:id',md_auth.ensureAuth,TeamController.updateTeam);
api.delete('/team/:id',md_auth.ensureAuth,TeamController.deleteTeam);
api.post('/upload-image-team/:id',[md_auth.ensureAuth,md_upload],TeamController.uploadImage);
api.get('/get-image-team/:imageFile',TeamController.getImageFile);

//EXPORT LA API PARA PODER UTILIZARLA FUERA DEL 
//FICHERO Y ASI TODAS LAS RUTAS FUNCIONEN EN EL BACKEND
module.exports = api;