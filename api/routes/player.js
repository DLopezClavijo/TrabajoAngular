'use strict'

var express = require('express');

var PlayerController = require('../controllers/player');

//CARGMOS RUTAS DEL MIDDLEWARE
var md_auth =require('../middlewares/authenticated');
//MODULO PARA SUBIDA Y ENVIO DE FICHEROS
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/players'});

//CARGAR ROUTEAS DE EXPRESS
var api = express.Router();

api.get('/player/:id',md_auth.ensureAuth ,PlayerController.getPlayer);
api.post('/player',md_auth.ensureAuth,PlayerController.savePlayer);
api.get('/players/:team?',md_auth.ensureAuth ,PlayerController.getPlayers);
api.put('/player/:id',md_auth.ensureAuth,PlayerController.updatePlayer);
api.delete('/player/:id',md_auth.ensureAuth,PlayerController.deletePlayer); 
//api.post('/upload-image-player/:id',[md_auth.ensureAuth,md_upload],playerController.uploadImage);
//api.get('/get-image-player/:imageFile',playerController.getImageFile);

//EXPORT LA API PARA PODER UTILIZARLA FUERA DEL 
//FICHERO Y ASI TODAS LAS RUTAS FUNCIONEN EN EL BACKEND
module.exports = api;