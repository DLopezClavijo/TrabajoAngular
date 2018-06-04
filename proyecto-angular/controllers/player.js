'use strict'

var path = require('path');
var fs = require('fs');

var Team = require('../models/team');
var Player = require ('../modeles/player');

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


 module.exports={
     getPlayer
 }