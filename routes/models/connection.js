var express = require('express');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host:'localhost',
	user:'daniel',
	password:'1234',
	database:'SAO'

});
connection.connect();
module.exports=connection;
