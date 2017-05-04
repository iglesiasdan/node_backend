var express= require('express');
var connection=require('./connection');
var bcrypt=require('bcrypt-nodejs');
var estudioModel={};
estudioModel.get=function(callback){
	connection.query('SELECT * from estudio ', function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
estudioModel.insert=function(input,callback){
	estudio={
		ID_arribo:input.ID_arribo,
		ID_usuario:input.ID_usuario,
		N_tanque:input.N_tanque,
		Capacidad:input.Capacidad,
		Volumen:input.Volumen,
		Actividad:input.Actividad,
		Salinidad:input.Salinidad,
		Temperatura:input.Temperatura,
		Conductividad:input.Conductividad,
		Ph:input.Ph
	}
	connection.query('INSERT INTO estudio SET ?',estudio,function(err,rows,fields){
		callback({'Error':false,'id':rows.insertId,'message':'Registro insertado exitosamente'});
	})
}
estudioModel.update=function(id,input,callback){
	estudio={
		N_tanque:input.N_tanque,
		Capacidad:input.Capacidad,
		Volumen:input.Volumen,
		Actividad:input.Actividad,
		Salinidad:input.Salinidad,
		Temperatura:input.Temperatura,
		Conductividad:input.Conductividad,
		Ph:input.Ph
	}
	connection.query('UPDATE estudio set ? WHERE ID_estudio=?',[estudio,id],function(err,rows,fields){
		callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro actualizado exitosamente'});
	})
}
estudioModel.show=function(id,callback){
	connection.query('SELECT * from estudio where ID_estudio='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
estudioModel.list=function(id,callback){
	connection.query('SELECT * from estudio where ID_arribo='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
estudioModel.delete=function(id,callback){
	connection.query('DELETE FROM estudio WHERE ID_estudio='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro eliminado exitosamente'});
	});
}

module.exports=estudioModel;
