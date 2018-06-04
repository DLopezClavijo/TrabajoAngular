'use strict'
var mongoose = require('mongoose');
var app = require('./app');

//CONF PUERTO
var port = process.env.port || 3977;

mongoose.connect('mongodb://localhost:27017/pro_angular',(err,res)=>{
    if (err){
        throw err;
    }else{
        console.log("Conexion tpm");

        //PONEMOS EL SERVIDOR A ESCUCHAR
        app.listen(port, function(){
            console.log("Servidor escuchando en HTTP:/LOCALHOST" + port)
        });
    }
})