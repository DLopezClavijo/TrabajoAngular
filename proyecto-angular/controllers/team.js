'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

//CARGAMOS LOS MODELOS
var Player = require('../models/player');
var Team =require('../models/team');


function getTeam(req,res){
   //OBTENEMOS EL ID DEL EQUIPO QUE NOS LLEGA
   var teamId = req.params.id;

   Team.findById(teamId,(err,team)=>{
        if(err){
            res.status(500).send({message:'ERROR AL OBTENER EQUIPO'});
        }else{
         if(!team){
             res.status(404).send({message:'Equipo no existe'});
         }else{
             res.status(200).send({team: team});
         }
     }
   });
}
//FUNCION PARA LISTAR EQUIPOS
function getTeams(req,res){
    //OBTENER DE LA PETICION LA PAGINA A MOSTRAR
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    //UNA VARIABLE PARA INDICAR LOS EQUIPOS POR PAGINA
    var itemsPerPage = 3;

    Team.find().sort('name').paginate(page,itemsPerPage,function(err,teams,total){
        if(err){
            res.status(500).send({message:'ERROR AL LISTAR EQUIPOS'});
        }else{
         if(!teams){
             res.status(404).send({message:'Equipos Inexistentes'});
         }else{
             res.status(200).send({page:total,teams: teams});
         }
     }
    });

}


function saveTeam(req,res){
    //CREAMOS UN OBJ EQUIPO VACIO
    var team = new Team();

    //OBTENEMOS LOS PARAMETEROS DE LA PETICION
    var params = req.body;

    //SET A LOS ATRIBUTOS DEL EQUIPO
    team.name = params.name;
    team.description = params.description;
    team.image= 'null';

    //GUARDAMOS EL EQUIPO
    team.save((err, teamStored)=>{
        if(err){
            res.status(500).send({message:'ERROR AL GUARDAR EQUIPO'});
        }else{
            if(!teamStored){
                res.status(404).send({message:'Equipo no se ha guardado'});
            }else{
                res.status(200).send({team: teamStored});
            }
        }
    });
}

function updateTeam(req,res){
    //OBT EL ID DE EQUIPO
    var teamId= req.params.id;

    //OBT LOS DATOS DEL EQUIPO PARA ACTUALIZAR
    var update = req.body;

    Team.findByIdAndUpdate(teamId,update,(err,teamUpdated)=>{
        if(err){
            res.status(500).send({message:'ERROR AL ACTULAIZAR EL EQUIPO'});
        }else{
            if(!teamUpdated){
                res.status(404).send({message:'Equipo no se ha actualizado'});
            }else{
                res.status(200).send({team: teamUpdated});
            }
        }
    });
}

function deleteTeam(req,res){
    //OBT ID DEL EQUIPO
    var teamId = req.params.id;

    Team.findByIdAndRemove(teamId,(err,teamRemoved)=>{
        if(err){
            res.status(500).send({message:'ERROR AL BORRAR EL EQUIPO'});
        }else{
            if(!teamRemoved){
                res.status(404).send({message:'Equipo no se ha borrado'});
            }else{
                //BUSCAMOS LOS JUGADORES EN EL EQUIPO Y LO BORRAMOS
                Player.find({team: teamRemoved._id}).remove((err,playerRemoved)=>{
                    if(err){
                        res.status(500).send({message:'ERROR AL BORRAR EL JUGADOR'});
                    }else{
                        if(!playerRemoved){
                            res.status(404).send({message:'jugador no se ha borrado'});
                        }else{
                            res.status(200).send({teamRemoved});
                        }
                    }
                })     
            }
        }
    });
}

module.exports={
    getTeam,
    saveTeam,
    getTeams,
    updateTeam,
    deleteTeam
}
