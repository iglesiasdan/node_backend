var express = require('express');
var router= express.Router();
var http = require('http');
var connection=require('./models/connection');
var usuario=require('./models/usuarios');
var bodyParser=require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/',function(req,res){

	usuario.get(function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
router.get('/:id',function(req,res){
	usuario.show(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
router.post('/',function(req,res){
	if (typeof req.body.username !== 'undefined'
			&&  typeof req.body.correo!== 'undefined'
			&& typeof req.body.contrasena!== 'undefined'
			&& typeof req.body.privilegio !== 'undefined'){
    	usuario.insert(req.body,function(data){
    		res.setHeader('Content-Type','application/json');
    		res.send(JSON.stringify(data));
    	})

	}else{
		var resp={
			'error':true,
			'Message':'Error, ingrese todos los campos de usuario'
		}
		res.setHeader('Content-Type','application/json');
		res.send(JSON.stringify(resp));
	}
});
//desde aqui
router.post('/login',function(req,res){
	if (typeof req.body.username !== 'undefined'
		&& typeof req.body.contrasena!== 'undefined'
		){
		usuario.login(req.body,function(data){
    		res.setHeader('Content-Type','application/json');
    		res.send(JSON.stringify(data));
    		})
		}else{
			var resp={
			'Error':true,
			'Message':'Error, ingrese todos los campos de usuario'
			}
			res.setHeader('Content-Type','application/json');
			res.send(JSON.stringify(resp));
		}
});
//hasta aqui
router.put('/:id',function(req,res){
	if(typeof req.body.contrasena !== 'undefined'){
		usuario.updatePass(req.params.id,req.body,function(data){
			res.setHeader('Content-Type','application/json');
			res.send(JSON.stringify(data));
		})
	}else{
		usuario.update(req.params.id,req.body,function(data){
			res.setHeader('Content-Type','application/json');
			res.send(JSON.stringify(data));
		});
	}
});
router.delete('/:id',function(req,res){
	usuario.delete(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
module.exports= router;
