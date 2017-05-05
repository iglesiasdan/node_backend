var express = require('express');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host:'http://107.180.21.16',
	user:'saorinoco01',
	password:'saorinoco',
	database:'saoapp'

});
connection.connect();
module.exports=connection;
