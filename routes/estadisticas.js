var express=require('express');
var router= express.Router();
var http = require('http');
var connection=require('./models/connection');
var estadisticas=require('./models/estadisticas');
var bodyParser=require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/estabuques/:id/:f1/:f2',function(req,res){

	estadisticas.get(req.params.id,req.params.f1,req.params.f2,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});

router.get('/:id/:f1/:f2',function(req,res){
	estadisticas.show(req.params.id,req.params.f1,req.params.f2,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});

router.get('/detalle/:id/:f1/:f2/:idp',function(req,res){
	estadisticas.detalles(req.params.id,req.params.f1,req.params.f2,req.params.idp,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});

module.exports= router;