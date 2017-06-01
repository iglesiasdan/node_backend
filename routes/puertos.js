var express=require('express');
var router= express.Router();
var http = require('http');
var connection=require('./models/connection');
var puertos=require('./models/puertos');
var bodyParser=require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.use(bodyParser.urlencoded({extended:true}));
//DE AQUI
router.get('/',function(req,res){
	if(req.query.from && req.query.from.length >0){
		puertos.getFrom(req.query.from,function(data){
			res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(data));
		});
	}else {
		puertos.get(function(data){
			res.setHeader('Content-Type', 'application/json');
	    	res.send(JSON.stringify(data));
		});
	}

});

//HASTA AQUI
router.post('/',function(req,res){
	if (typeof req.body.nombre_puerto !== 'undefined'){
    	puertos.insert(req.body,function(data){
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
		// console.log(data);
		puertos.update(req.params.id,req.body,function(data){
			res.setHeader('Content-Type','application/json');
			res.send(JSON.stringify(data));
		});
});
router.get('/:id',function(req,res){
	puertos.show(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
router.delete('/:id',function(req,res){
	puertos.delete(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
module.exports= router;
