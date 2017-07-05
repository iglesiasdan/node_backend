var express= require('express');
var connection=require('./connection');
var bcrypt=require('bcrypt-nodejs');
var estadisticasModel={};

estadisticasModel.get=function(id,f1,f2,callback){
	connection.query('SELECT  AVG(estudio.Salinidad) AS salinidad, AVG(estudio.Temperatura) AS temperatura, AVG(estudio.Conductividad) AS conductividad, AVG(estudio.Ph) AS ph, arribo.ID_buque, buque.Nombre_buque FROM arribo, puerto, estudio, buque WHERE arribo.ID_puerto=puerto.ID_puerto AND estudio.ID_arribo=arribo.ID_arribo AND arribo.ID_buque=buque.ID_buque AND arribo.Fecha_arribo BETWEEN "'+f1+'" AND "'+f2+'" AND buque.ID_buque='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}

// Para promedios de puertos
estadisticasModel.show=function(id,f1,f2,callback){
	connection.query('SELECT AVG(estudio.Salinidad) AS salinidad, AVG(estudio.Temperatura) AS temperatura, AVG(estudio.Conductividad) AS conductividad, AVG(estudio.Ph) AS ph, arribo.ID_puerto,puerto.Nombre_puerto FROM arribo, puerto, estudio, buque WHERE arribo.ID_puerto=puerto.ID_puerto AND arribo.ID_buque=buque.ID_buque AND estudio.ID_arribo=arribo.ID_arribo AND arribo.Fecha_arribo BETWEEN "'+f1+'" AND "'+f2+'" AND puerto.ID_puerto='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}

estadisticasModel.detalles=function(id,f1,f2,idp,callback){
	//connection.query('SELECT AVG(estudio.Salinidad) AS salinidad, AVG(estudio.Temperatura) AS temperatura, AVG(estudio.Conductividad) AS conductividad, AVG(estudio.Ph) AS ph, arribo.ID_puerto,puerto.Nombre_puerto FROM arribo, puerto, estudio, buque WHERE arribo.ID_puerto=puerto.ID_puerto AND arribo.ID_buque=buque.ID_buque AND estudio.ID_arribo=arribo.ID_arribo AND arribo.Fecha_arribo BETWEEN "'+f1+'" AND "'+f2+'" AND puerto.ID_puerto='+id+'AND puerto.ID_puerto='+idp, function(err, rows, fields) {
	connection.query('SELECT AVG(estudio.Salinidad) AS salinidad, AVG(estudio.Temperatura) AS temperatura, AVG(estudio.Conductividad) AS conductividad, AVG(estudio.Ph) AS ph, arribo.ID_buque, buque.Nombre_buque FROM arribo, puerto, estudio, buque WHERE arribo.ID_puerto=puerto.ID_puerto AND estudio.ID_arribo=arribo.ID_arribo AND arribo.ID_buque=buque.ID_buque AND arribo.Fecha_arribo BETWEEN "'+f1+'" AND "'+f2+'" AND buque.ID_buque='+id+' AND puerto.ID_puerto='+idp, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}

module.exports=estadisticasModel;