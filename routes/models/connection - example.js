var express = require('express');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'sao'

});
connection.connect();
module.exports=connection;
