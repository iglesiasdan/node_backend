var express = require('express');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host:'http://saorinoco.com',
	user:'saorinoco01',
	password:'saorinoco',
	database:'saoapp'

});
connection.connect();
module.exports=connection;
