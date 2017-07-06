var express=require('express');
var router= express.Router();
var http = require('http');
var connection=require('./models/connection');
var buques=require('./models/buques');
var bodyParser=require('body-parser');
var formidable= require('formidable');
var fs= require('fs');
var path = require('path');
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

var form = new formidable.IncomingForm();
var body=req.body;
if(Object.keys(body).length>0){
	if (typeof body.numero_imo !== 'undefined'){
	    	buques.insert(body,function(data){
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
}

  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');

  form.on('field',function(field,value){
  	// console.log(field);
  	body[field]=value;
  })
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
  	nombre=Date.now()+'.jpg';
    fs.rename(file.path, path.join(form.uploadDir, nombre));
    body.fotos=nombre;
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  form.on('end', function() {
  	// console.log(body);
   	if (typeof body.numero_imo !== 'undefined'){
    	buques.insert(body,function(data){
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

  // parse the incoming request containing the form data
  form.parse(req);



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
