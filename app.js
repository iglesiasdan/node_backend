var express= require('express');
var cookieParser= require('cookie-parser');
var mysql=require('mysql');
var multer = require('multer');
var bodyParser=require('body-parser');
var app = express();


var usuarios=require('./routes/usuarios');
var agencias=require('./routes/agencias');
var puertos=require('./routes/puertos');
var buques=require('./routes/buques');
var arribos=require('./routes/arribos');
var estudios=require('./routes/estudios');
var estadisticas=require('./routes/estadisticas');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(function(req,res,next){

	   res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    console.log('Se hizo una peticion '+req.method+' el '+Date.now() +' en el URL:'+req.originalUrl);
    next();
});

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});



app.use('/usuarios',usuarios);
// GET usuarios = lista todos los usuarios
// POST usuarios => {username,correo,contrasena,privilegio} =agrega nuevo usuario (si no le das esos 4 datos devolverá error)
// GET usuarios/{ID_usuario} =lista el usuario con el id en el url
// PUT usuario/{ID_usuario} => {privilegio,*contrasena*}= modifica solamente el privilegio y la contrasena del usuario(la contraseña es opcional)
// DELETE usuario/{ID_usuario} elimina al usuario
app.use('/agencias',agencias);
app.use('/puertos',puertos);
app.use('/buques',buques);
app.use('/arribos',arribos);
app.use('/estudios',estudios);
app.use('/estadisticas',estadisticas)

app.listen(3000)
