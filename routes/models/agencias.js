var express= require('express');
var connection=require('./connection');
var bcrypt=require('bcrypt-nodejs');
var agenciaModel={};
//DE AQUI
agenciaModel.get=function(callback){
	connection.query('SELECT * from agencia ', function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
agenciaModel.getFrom=function(id,callback){
	connection.query(`SELECT * FROM agencia WHERE ID_agencia>?`,[id],function(err, rows, fields) {
	  if (err) {
	  	rows={resp:'Error'};
	  };
	  callback(rows);
	});
}

//HASTA AQUIagenciaModel.insert=function(input,callback){
	sede={
		Nombre_agencia:input.nombre_agencia,
		Descripcion:input.descripcion
	}
	connection.query('INSERT INTO agencia SET ?',sede,function(err,rows,fields){
		callback({'Error':false,'id':rows.insertId,'message':'Registro insertado exitosamente'});
	})
}
agenciaModel.update=function(id,input,callback){
	console.log(id);
	connection.query('UPDATE agencia set Nombre_agencia=?, Descripcion=? WHERE ID_agencia=?',[input.Nombre_agencia,input.Descripcion,id],function(err,rows,fields){
		callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro actualizado exitosamente'});
	})
}
agenciaModel.show=function(id,callback){
	connection.query('SELECT * from agencia where ID_agencia='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
agenciaModel.delete=function(id,callback){
	connection.query('DELETE FROM agencia WHERE ID_agencia='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro eliminado exitosamente'});
	});
}

module.exports=agenciaModel;
