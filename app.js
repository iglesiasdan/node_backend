var express= require('express');
var cookieParser= require('cookie-parser');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var app = express();


var usuarios=require('./routes/usuarios');
var agencias=require('./routes/agencias');
var puertos=require('./routes/puertos');
var buques=require('./routes/buques');
var arribos=require('./routes/arribos');
var estudios=require('./routes/estudios');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(function(req,res,next){

	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	console.log('Se hizo una peticion el '+ Date.now());
	next();
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});
app.use('/usuarios',usuarios);
// GET usuarios = lista todos los usuarios
// POST usuarios => {username,correo,contrasena,privilegio} =agrega nuevo usuario (si no le das esos 4 datos devolverá error)
// GET usuarios/{ID_usuario} =lista el usuario con el id en el url
// PUT usuario/{ID_usuario} => {privilegio,*contrasena*}= modifica solamente el privilegio y la contrasena del usuario(la contraseña es opcional)
// DELETE usuario/{ID_usuario} elimina al usuario
//prueba de upload file

// fin de la prueba
app.use('/agencias',agencias);
app.use('/puertos',puertos);
app.use('/buques',buques);
app.use('/arribos',arribos);
app.use('/estudios',estudios)

app.listen(3000)
