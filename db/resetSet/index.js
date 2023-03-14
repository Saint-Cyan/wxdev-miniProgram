var $sql = require('../connect/db');   //取得数据库对象
function sqlQuery(sql,callback){			
	$sql.query(sql,(err,result)=>{
		if(err){
			return console.log("err:",err);
		}
		callback(result)
	})
}
module.exports = sqlQuery;