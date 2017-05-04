var express = require('express');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host:'http://198.71.228.20',
	user:'saorinoco01',
	password:'saorinoco',
	database:'saoapp'

});
connection.connect();
module.exports=connection;
