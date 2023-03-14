var express = require('express');  //引入Express
var $mysql = require('mysql'); 	   //引入Mysql
var sql = require("./mysql.js");   //获取数据库配置文件
var $sql = $mysql.createConnection(sql.mysql);  //使用createConnection函数建立连接
$sql.connect();
module.exports = $sql