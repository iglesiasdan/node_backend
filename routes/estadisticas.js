var express=require('express');
var router= express.Router();
var http = require('http');
var connection=require('./models/connection');
var estadisticas=require('./models/estadisticas');
var bodyParser=require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/',function(req,res){

	estadisticas.get(function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});

router.get('/:id',function(req,res){
	estadisticas.show(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});

module.exports= router;