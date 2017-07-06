var express= require('express');
var connection=require('./connection');
var bcrypt=require('bcrypt-nodejs');
var arriboModel={};
//DESDE AQUI
arriboModel.get=function(callback){
	connection.query(`SELECT ID_arribo,Fecha_arribo,Observaciones,Volumen_total,b.Abanderamiento,Numero_IMO,arr.ID_agencia,arr.ID_puerto,Nombre_puerto,arr.ID_buque,Nombre_buque,ag.Nombre_agencia
		FROM arribo AS arr,agencia AS ag, puerto AS p, buque AS b WHERE ag.ID_agencia=arr.ID_agencia AND p.ID_puerto=arr.ID_puerto AND b.ID_buque=arr.ID_buque
		ORDER BY Fecha_arribo desc`, function(err, rows, fields) {
	  if (err) {
	  	rows={resp:'Error'};
	  };
	  callback(rows);
	});
}
arriboModel.getFrom=function(id,callback){
	connection.query(`SELECT ID_arribo,Fecha_arribo,Observaciones,Volumen_total,Numero_IMO,arr.ID_agencia,arr.ID_puerto,Nombre_puerto,arr.ID_buque,Nombre_buque,ag.Nombre_agencia
		FROM arribo AS arr,agencia AS ag, puerto AS p, buque AS b WHERE ag.ID_agencia=arr.ID_agencia AND p.ID_puerto=arr.ID_puerto AND b.ID_buque=arr.ID_buque AND ID_arribo>?
		ORDER BY Fecha_arribo desc`,[id],function(err, rows, fields) {
	  if (err) {
	  	rows={resp:'Error'};
	  };
	  callback(rows);
	});
}
//HASTA AQUI
arriboModel.insert=function(input,callback){
	arribo={
		ID_buque:input.id_buque,
		ID_puerto:input.id_puerto,
		ID_agencia:input.id_agencia,
		Fecha_arribo:input.fecha_arribo,
		Calado_proa:input.calado_proa,
		Calado_popa:input.calado_popa,
		Diferencias_calado:input.diferencias_calado,
		Observaciones:input.observaciones,
		Volumen_total:input.Volumen_total
	}
	connection.query('INSERT INTO arribo SET ?',arribo,function(err,rows,fields){
		callback({'Error':false,'id':rows.insertId,'message':'Registro insertado exitosamente'});
	})
}
arriboModel.update=function(id,input,callback){
	arribo={
		Fecha_arribo:input.fecha_arribo,
		ID_buque:input.id_buque,
		ID_puerto:input.id_puerto,
		ID_agencia:input.id_agencia,
		Calado_proa:input.calado_proa,
		Calado_popa:input.calado_popa,
		Diferencias_calado:input.diferencias_calado,
		Observaciones:input.observaciones,
		Volumen_total:input.Volumen_total
	}
	connection.query('UPDATE arribo set ? WHERE ID_arribo=?',[arribo,id],function(err,rows,fields){
		callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro actualizado exitosamente'});
	})
}
arriboModel.show=function(id,callback){
 connection.query(`select ID_arribo,Fecha_arribo,Observaciones,Volumen_total,Numero_IMO,arr.ID_agencia,arr.ID_puerto,arr.Calado_popa,arr.Calado_proa,arr.Diferencias_calado,Nombre_puerto,arr.ID_buque,Nombre_buque,ag.Nombre_agencia
  from arribo as arr,agencia as ag, puerto as p, buque as b where ag.ID_agencia=arr.ID_agencia and p.ID_puerto=arr.ID_puerto AND b.ID_buque=arr.ID_buque AND ID_arribo=?
  order by Fecha_arribo desc `,[id], function(err, rows, fields) {
   if (err) throw err;
   callback(rows[0]);
 });
}
arriboModel.delete=function(id,callback){
	connection.query('DELETE FROM arribo WHERE ID_arribo='+id, function(err, rows, fields) {
	  if (err) throw err;
	  callback({'Error':false,'affectedRows':rows.affectedRows,'message':'Registro eliminado exitosamente'});
	});
}



module.exports=arriboModel;
