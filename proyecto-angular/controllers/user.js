'use strict'

//IMPORTAMOS EL MODELO DE USU
var User = require('../models/user');

//IMPORTAR LA LIBRERIA BCRYPT PARA ENCRIPTAR CONTRASEÑAS
var bcrypt = require('bcrypt-nodejs');

//IMPORTAMOS EL SERV DE JWT
var jwt = require('../services/jwt');

//TRABAJAR CON EL SISTEMA DE FICHEROS
var fs = require('fs');
//TRABAJAR CON RUTAS DE FICHEROS
var path = require('path');

function saveUser(req,res){
    //CREAR UN OBJETO USU
    var user = new User();

    //OBTENEMOS TODOS LOS PARAMETROS QUE NOS LLEGAN EN LA PETICION HTTP
    var params = req.body;

    console.log(params);

    //SET DE CADA UNO DE LOS ATRIBUTOS
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role ='ROLE_USER';
    user.image = 'null';

    if (params.password){
        //ENCRIPTAR PASS Y GUARDAR DATOS
        //USMAMOS UN METODO HASH DE BCRYOT QUE HEMOS IMPORTADO
        bcrypt.hash(params.password,null, null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                //GUARDAMOS EL USUARIO EN LA BASE DE DATOS
                user.save((err, userStored)=> {
                    if(err) {
                        res.status(500).send({message:'Error al guardar el usuario'});
                    }else{
                        if (!userStored){
                            res.status(400).send({message:'EN EL REGISTRO DE USUARIO'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }
        });
    }else{
        res.status(500).send({message:'Introduce la contraseña'});
    }
}
//COMRPOBAR SI EL EMAIL Y PASS EXISTE Y VERIFICAR SI CON CORRECTOS EN LA BD
function loginUser(req,res){
    //RECOGEMOS LOS PARAMETROS DE USUARIO Y LOS COVERTIMOS EN JSON CON BODYPARSER
    var params = req.body;

    var email = params.email;
    var password = params.password;
                                                           
    //FIND, LO USAMOS PRA BUSCAR EN LA BD
    User.findOne({email: email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message:'ERROR EN LA PETICION'});
        }else{
            if(!user){
                res.status(400).send({message:'USU NO EXISTE'});
            }else{
                //COMPROBAMOS EL PASS
                bcrypt.compare(password, user.password,function(err, check){
                    if(check){
                        //DEVOLVEMOS LOS DATOS DEL USUS LOGUEADO (TOKEN DE JWT)
                        if(params.gethash){
                            //DEVUELVE TOKEN CON LOS DATOS DE USUARIO QUE USAREMOS EN TODAS LA PETICIONES QUE HAGAMOS EN LA API REST
                            //Y ASI CONTROLAMOS QUE EL USU ESTE O NO IDENTIFICADO
                            //ADEMAS CREAREMOS UN SERVICIO DE JWT PARA CREAR LOS TOKENS Y UN MIDDLEWARE PARA COMPROBAR EN CADA UNA DE ALS RUTAS
                            //SI EL TOKEN QUE LLEGA EN LA PETICION ES CORRECTO
                            res.status(200).send({token: jwt.createToken(user)}
                            );
                        }else{
                            res.status(200).send({user});
                        }
                     }else{
                         res.status(404).send({message:'USU NO SE HA PODIDO LOGUEAR'});
                        
                    }
                });
            }
        }
    });
}


 function pruebas(req,res){
    res.status(200).send({message:'Probando controlador de usu'});
}

function updateUser(req,res){
    //RECOGEMOS EL ID DEL SUAURIO A ACTUALIZAR
    var userId= req.params.id;
    //GUARDAMOS EL BODY DE LA PETCION HTTP PUT
    var update = req.body;

    User.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
        if(err){
            res.status(500).send({message:'ERROR EN LA PETICION'});
        }else{
            if(!userUpdated){
                res.status(400).send({message:'NO SE HA PODIDO ACTUALIZAR USU'});
            }else{
                res.status(200).send({user:userUpdated});
            }
        }
    });
}

function uploadImage(req,res){
    //RECOGER EL ID DEL USUARIO QUE NOS LLEGA EN EL REQUEST
    var userId = req.params.id

    //VARIABLE PARA EL FICHERO
    var file_name = 'No encontrado';

    //SI EN LA PETICION DEL REQ VIENE EL FICHERO,SUBIMOS
    if(req.files){
        var file_path = req.files.image.path;
        //TRATAR EL APTH DEL FICHERO PARA CONSEGUIR EL NOMBRE
        var file_split = file_path.split('\\');
        file_name = file_split[2];

        //RECORTAR PARA SACAR LA EXTENSION DEL FICHERO
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        

        //COMPROBAMOS SI LA EXTENSION ES CORRECTO
        if(file_ext =='png' || file_ext =='jpg' || file_ext =='gid'){
            User.findByIdAndUpdate(userId,{image:file_name},(err,userUpdated)=>{
                if(err){
                    res.status(500).send({message:'ERROR EN LA PETICION'});
                }else{
                    if(!userUpdated){
                        res.status(404).send({message:'NO SE HA PODIDO ACTUALIZAR IMAGEN'});
                    }else{
                        res.status(200).send({user:userUpdated});
                    }
                } 
            });
        }else{
            res.status(200).send({message:'FORMATO INCORRECTO'})
        }
        console.log(file_path);
    }else{
        res.status(200).send({message:'NO SE HA SUBIDO NINGUNA IMAGEN'})
    }

}
 function getImageFile(req,res){
     //OBTENEMOS DEL REQUEST EL NOMBRE DEL FICHERO
     var imageFile = req.params.imageFile;

     //RUTA DEL FICHERO
     var path_file = './uploads/users/' + imageFile;
     //SI FICHERO EXISTE
     fs.exists(path_file,function(exists){
        if(exists){
            //RESPUEST HTTP ENVIANDO EL FICHERO QUE ACABAMOS DE RESOLVER CON EL PATH DE LA RUTA
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'NO EXISTE LA IMAGEN'});
        }
     });
 }

//PARA PODER USAR LAS FUNCIONES ENNUNA RUTA FUERA DEL FICHERO
module.exports={
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}