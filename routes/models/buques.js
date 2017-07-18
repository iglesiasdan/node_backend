var express= require('express');
var connection=require('./connection');
var bcrypt=require('bcrypt-nodejs');
var buqueModel={};
//DESDE AQUI
buqueModel.get=function(callback){
	connection.query('SELECT * from buque ', function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}

buqueModel.getFrom=function(id,callback){
	connection.query(`SELECT * FROM buque WHERE ID_buque>?`,[id],function(err, rows, fields) {
	  if (err) {
	  	rows={resp:'Error'};
	  };
	  callback(rows);
	});
}

//HASTA AQUI
buqueModel.insert=function(input,callback){

		connection.query('SELECT * FROM buque WHERE Numero_imo=?',[input.numero_imo],function(err,rows,fields){
		if(err) throw err;
		if(rows.length==0){
			buque={
				Nombre_buque:input.nombre_buque,
				Numero_imo:input.numero_imo,
				Abanderamiento:input.abanderamiento?input.abanderamiento:'',
				Eslora:input.eslora?input.eslora:'',
				Manga:input.manga?input.manga:'',
				Puntal:input.puntal?input.puntal:'',
				N_tanques_babor:input.n_tanques_babor?input.n_tanques_babor:'',
				N_tanques_estribor:input.n_tanques_estribor?input.n_tanques_estribor:'',
				N_tanques_db:input.n_tanques_db?input.n_tanques_db:'',
				Total_tanques:input.total_tanques?input.total_tanques:'',
				Capacidad_tanques:input.capacidad_tanques?input.capacidad_tanques:'',
				Vol_total:input.vol_total?input.vol_total:'',
				Fotos:input.fotos?input.fotos:''
			}
		connection.query('INSERT INTO buque SET ?',buque,function(err,rows,fields){
			callback({'Error':false,'id':rows.insertId,'message':'Registro insertado exitosamente'});
		})
		}else{
			callback({'Error':true,'message':'Error, el numero de IMO ya existe'})
		}
	})





}
buqueModel.update=function(id,input,callback){
	console.log(id);
	buque={
		Nombre_buque:input.nombre_buque,
				Numero_imo:input.numero_imo,
				Abanderamiento:input.abanderamiento?input.abanderamiento:'',
				Eslora:input.eslora?input.eslora:'',
				Manga:input.manga?input.manga:'',
				Puntal:input.puntal?input.puntal:'',
				N_tanques_babor:input.n_tanques_babor?input.n_tanques_babor:'',
				N_tanques_estribor:input.n_tanques_estribor?input.n_tanques_estribor:'',
				N_tanques_db:input.n_tanques_db?input.n_tanques_db:'',
				Total_tanques:input.total_tanques?input.total_tanques:'',
				Capacidad_tanques:input.capacidad_tanques?input.capacidad_tanques:'',
				Vol_total:input.vol_total?input.vol_total:'',
				Fotos:input.fotos?input.fotos:''
	}
	connection.query('UPDATE buque set ? WHERE ID_buque=?',[buque,id],function(err,rows,fields){
		callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro actualizado exitosamente'});
	})
}
buqueModel.show=function(id,callback){
	connection.query('SELECT * from buque where ID_buque='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
buqueModel.delete=function(id,callback){
	connection.query('DELETE FROM buque WHERE ID_buque='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro eliminado exitosamente'});
	});
}

module.exports=buqueModel;
