var express= require('express');
var connection=require('./connection');
var bcrypt=require('bcrypt-nodejs');
var usuarioModel={};

usuarioModel.get=function(callback){
	connection.query('SELECT * from usuario ', function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
usuarioModel.show=function(id,callback){
	connection.query('SELECT * from usuario where ID_usuario='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback(rows);
	});
}
usuarioModel.insert=function(input,callback){
	usuario={
				Username:input.Username,
				Correo:input.Correo,
				Contrasena:bcrypt.hashSync(input.Contrasena),
				Privilegio:input.Privilegio
			}
			connection.query('INSERT INTO usuario SET ?',usuario,function(err,rows,fields){
				callback({'Error':false,'id':rows.insertId,'message':'Registro guardado exitosamente'});
			})
}
usuarioModel.update=function(id,input,callback){
	connection.query('UPDATE usuario set Username=?, Correo=?, Privilegio=? WHERE ID_usuario=?',[input.Username,input.Correo,input.Privilegio,id],function(err,rows,fields){
		callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro modificado exitosamente'});
	})
}
usuarioModel.updatePass=function(id,input,callback){
	connection.query('UPDATE usuario set Contrasena=? WHERE ID_usuario=?',[bcrypt.hashSync(input.Contrasena),id],function(err,rows,fields){
		callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro modificado exitosamente'});
	})
}
usuarioModel.delete=function(id,callback){
	connection.query('DELETE FROM usuario WHERE ID_usuario='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro eliminado exitosamente'});
	});
}
//Desde aqui
usuarioModel.login=function(input,callback){
	connection.query('SELECT  Contrasena from usuario WHERE Username=?',[input.username], function(err, rows, fields) {
	  if (err) throw err;
	  if(rows.length==1){
	  	if(bcrypt.compareSync(input.contrasena, rows[0].Contrasena ))
		  	callback({'Error':false,'Message':'Login realizado correctamente','Username':input.username});
		else
			callback({'Error':true,'Message':'Username o contraseña inválido'});
	  }else
	  callback({'Error':true,'Message':'Username o contraseña inválido'});
	});
}
//hasta aqui

module.exports=usuarioModel;
