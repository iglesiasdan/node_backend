var express= require('express');
var connection=require('./connection');
var bcrypt=require('bcrypt-nodejs');
var puertoModel={};
//DE AQUI
puertoModel.get=function(callback){
	connection.query('SELECT * from puerto ', function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
puertoModel.getFrom=function(id,callback){
	connection.query(`SELECT * FROM puerto WHERE ID_puerto>?`,[id],function(err, rows, fields) {
	  if (err) {
	  	rows={resp:'Error'};
	  };
	  callback(rows);
	});
}
//HASTA AQUI
puertoModel.insert=function(input,callback){
	console.log(input);
	sede={
		Nombre_puerto:input.nombre_puerto,
		Direccion:input.direccion,
		Descripcion:input.descripcion,
		Latitud:input.latitud,
		Longitud:input.longitud,
		Ciudad:input.ciudad,
		Estado:input.estado
	}
	connection.query('INSERT INTO puerto SET ?',sede,function(err,rows,fields){
		callback({'Error':false,'id':rows.insertId,'message':'Registro insertado exitosamente'});
	})
}
puertoModel.update=function(id,input,callback){
	puerto={
		Nombre_puerto:input.Nombre_puerto,
		Direccion:input.Direccion,
		Descripcion:input.Descripcion,
		Latitud:input.Latitud,
		Longitud:input.Longitud,
		ID_puerto:input.ID_puerto,
		Estado:input.Estado
	}
	connection.query('UPDATE puerto set ? WHERE ID_puerto=?',[puerto,id],function(err,rows,fields){
		console.log(input);
		callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro actualizado exitosamente'});
	})
}
puertoModel.show=function(id,callback){
	connection.query('SELECT * from puerto where ID_puerto='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
puertoModel.delete=function(id,callback){
	connection.query('DELETE FROM puerto WHERE ID_puerto='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro eliminado exitosamente'});
	});
}

module.exports=puertoModel;
