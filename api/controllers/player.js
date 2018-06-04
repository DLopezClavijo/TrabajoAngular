'use strict'

var path = require('path');
var fs = require('fs');

var Team = require('../models/team');
var Player = require ('../models/player');

//PAGINACION
var mongoosePaginate = require('mongoose-pagination');

function getPlayer(req,res){
    //OBTENEMOS EL ID DEL JUGADOR QUE NOS LLEGA
    var playerId = req.params.id;
 
    //METODO POPULATE PARA OBTENER LOS DATOS DEL EQUIPO RELACIONADO CON EL JUGADOR.CON LA VARIABLE PATH INDICAMOS LA PROPIEDAD DONDE ALAMCENA LOS DATOS
    Player.findById(playerId).populate({path:"team"}).exec((err,player)=>{
         if(err){
             res.status(500).send({message:'ERROR AL OBTENER JUGADOR'});
         }else{
          if(!player){
              res.status(404).send({message:'jugador no existe'});
          }else{
              res.status(200).send({player});
          }
      }
    });
 }

 function savePlayer(req,res){
    //CREAMOS UN OBJ JUGADOR VACIO
    var player = new Player();

    //OBTENEMOS LOS PARAMETEROS DE LA PETICION
    var params = req.body;

    //SET A LOS ATRIBUTOS DEL JUGADOR
    player.name = params.name;
    player.description = params.description;
    player.year= params.year;
    player.image = 'null';
    player.team = params.team;

    //GUARDAMOS EL JUGADOR
    player.save((err, playerStored)=>{
        if(err){
            res.status(500).send({message:'ERROR AL GUARDAR JUGADOR'});
        }else{
            if(!playerStored){
                res.status(404).send({message:'Jugador no se ha guardado'});
            }else{
                res.status(200).send({player: playerStored});
            }
        }
    });
}

function updatePlayer(req,res){
    //OBT ID DEL JUGADOR A ACTUALIZAR
    var playerId = req.params.id;
    var update = req.body;

    Player.findByIdAndUpdate(playerId, update, (err, playerUpdated)=>{
        if(err){
            res.status(500).send({message:'ERROR AL ACTULIZAR JUGADOR'});
        }else{
            if(!playerUpdated){
                res.status(404).send({message:'Jugador no se ha actualizado'});
            }else{
                res.status(200).send({player: playerUpdated});
            }
        }
    });
}

//FUNCION PARA LISTAR JUGADORES
function getPlayers(req,res){
    //OBTENER DE LA PETICION LA PAGINA A MOSTRAR
    var teamId = req.params.team;

    if(!teamId){
        //OBTENER TODOS LOS JUAGDORES DE LA BASE DE DATOS

        var find = Player.find({}).sort('name');
    }else{
        var find = Player.find({team: teamId}).sort('name');
    }

    find.populate({path:'team'}).exec((err, players)=>{
        if(err){
            res.status(500).send({message:'ERROR EN LA PETICION'});
        }else{
            if(!players){
                res.status(404).send({message:'No hay jugadores'});
            }else{
                res.status(200).send({players});
            }
        }
    });
}

function deletePlayer(req,res){
    //OBT ID DE JUGADOR
    var playerId = req.params.id;
    Player.findByIdAndRemove(playerId,(err,playerRemoved)=>{
        if(err){
            res.status(500).send({message:'ERROR EN EL BORRADO'});
        }else{
            if(!playerRemoved){
                res.status(404).send({message:'No se borro el jugador'});
            }else{
                res.status(200).send({player: playerRemoved});
            }
        }
    });
}
 //HOLA

 module.exports={
     getPlayer,
     savePlayer,
     getPlayers,
     updatePlayer,
     deletePlayer
 }