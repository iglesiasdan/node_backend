var express=require('express');
var router= express.Router();
var http = require('http');
var connection=require('./models/connection');
var agencias=require('./models/agencias');
var bodyParser=require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//DE AQUI
router.get('/',function(req,res){

	if(req.query.from && req.query.from.length >0){
		agencias.getFrom(req.query.from,function(data){
			res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(data));
		});
	}else {
		agencias.get(function(data){
			res.setHeader('Content-Type', 'application/json');
	    	res.send(JSON.stringify(data));
		});
	}


});

//HASTA AQUI
router.post('/',function(req,res){
	//cosole.log(req.body);
	//if (typeof req.body.nombre_agencia !== 'undefined'){
    	agencias.insert(req.body,function(data){
    		res.setHeader('Content-Type','application/json');
    		res.send(JSON.stringify(data));
    	})


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
