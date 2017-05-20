var express= require('express');
var connection=require('./connection');
var bcrypt=require('bcrypt-nodejs');
var estadisticasModel={};

estadisticasModel.get=function(callback){
	connection.query('SELECT * from estudio ', function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}

// Para promedios de puertos
estadisticasModel.show=function(id,callback){
	connection.query('SELECT AVG(estudio.Salinidad) AS salinidad, AVG(estudio.Temperatura) AS temperatura, AVG(estudio.Conductividad) AS conductividad, AVG(estudio.Ph) AS ph, arribo.ID_puerto,puerto.Nombre_puerto FROM arribo, puerto, estudio, buque WHERE arribo.ID_puerto=puerto.ID_puerto AND arribo.ID_buque=buque.ID_buque AND estudio.ID_arribo=arribo.ID_arribo AND puerto.ID_puerto='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}

module.exports=estadisticasModel;