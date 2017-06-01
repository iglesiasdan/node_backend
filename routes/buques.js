var express=require('express');
var router= express.Router();
var http = require('http');
var connection=require('./models/connection');
var buques=require('./models/buques');
var bodyParser=require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//DESDE AQUI
router.get('/',function(req,res){

	if(req.query.from && req.query.from.length >0){
		buques.getFrom(req.query.from,function(data){
			res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(data));
		});
	}else {
		buques.get(function(data){
			res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(data));
		});
	}

});
//HASTA AQUI
router.post('/',function(req,res){

	if (typeof req.body.Numero_imo !== 'undefined'){
    	buques.insert(req.body,function(data){
    		res.setHeader('Content-Type','application/json');
    		res.send(JSON.stringify(data));
    	})

	}else{
		var resp={
			'Error':true,
			'message':'Error, imo del buque no ingresado'
		}
		res.setHeader('Content-Type','application/json');
		res.send(JSON.stringify(resp));
	}
});
router.put('/:id',function(req,res){
		buques.update(req.params.id,req.body,function(data){
			res.setHeader('Content-Type','application/json');
			res.send(JSON.stringify(data));
		});
});
router.get('/:id',function(req,res){
	buques.show(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
router.delete('/:id',function(req,res){
	buques.delete(req.params.id,function(data){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	});
});
module.exports= router;
