var connection = {}

connection.mysql = {
	host:"localhost",  //服务器地址
	user:"root",	   //服务器用户
	password:"123456", //服务器密码
	port: 3308,        //服务器端口  SHOW GLOBAL VARIVALES LIKE ‘port’
	database:"my_programdb"  //链接数据库名
}

module.exports = connection
