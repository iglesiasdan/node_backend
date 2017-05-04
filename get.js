express= require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.send('Hola vv');
	console.log('Petición hecha al servidor por GET');
});
module.exports=router;