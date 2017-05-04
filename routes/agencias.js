var express=require('express');
var router= express.Router();
var http = require('http');
var connection=require('./models/connection');
var agencias=require('./models/agencias');
var bodyParser=require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/',function(req,res){

	agencias.get(function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
router.post('/',function(req,res){
	if (typeof req.body.nombre_agencia !== 'undefined'){
    	agencias.insert(req.body,function(data){
    		res.setHeader('Content-Type','application/json');
    		res.send(JSON.stringify(data));
    	})

	}else{
		var resp={
			'Error':true,
			'message':'Error nombre de la agencia no ingresado'
		}
		res.setHeader('Content-Type','application/json');
		res.send(JSON.stringify(resp));
	}
});
router.put('/:id',function(req,res){
		agencias.update(req.params.id,req.body,function(data){
			res.setHeader('Content-Type','application/json');
			res.send(JSON.stringify(data));
		});
});
router.get('/:id',function(req,res){
	agencias.show(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
router.delete('/:id',function(req,res){
	agencias.delete(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
module.exports= router;