'use strict'

var express = require('express');

var UserController = require('../controllers/user');

//CARGMOS RUTAS DEL MIDDLEWARE
var md_auth =require('../middlewares/authenticated');
//MODULO PARA SUBIDA Y ENVIO DE FICHEROS
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'});

//CARGAR ROUTEAS DE EXPRESS
var api = express.Router();

api.get('/probando',md_auth.ensureAuth,UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);

//EXPORT LA API PARA PODER UTILIZARLA FUERA DEL 
//FICHERO Y ASI TODAS LAS RUTAS FUNCIONEN EN EL BACKEND
module.exports = api;