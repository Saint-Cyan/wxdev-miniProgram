//引入Express
var express = require('express');
//数据库二次封装
const sqlQuery = require("../../db/resetSet/index");
//引入express路由对象
var router = express.Router();
//引入Node.js中http访问
var Https = require('https');
//引入icon-lite
var icon = require ("iconv-lite");
//引入密钥验证
const secure = require('../../secure/index');

 //加入异步处理的后端代码
router.post('/',async function(req,res){
	
	console.log(req.body)
	const code = req.body.code
	console.log(code)
	const apiURL = `https://api.weixin.qq.com/sns/jscode2session?appid=${secure.app.appID}&secret=${secure.app.appSecret}&js_code=${code}&grant_type=authorization_code`
	
	
	try{
		//运用await，保证result在异步调用中一定得到更新
		const result = await new Promise((resolve,reject) =>{
			Https.get(apiURL,(res) =>{
				console.log(res.statusCode)
				
				var data = []
				var size = 0
				
				res.on('data',(d)=>{
					data.push(d)
					size += d.length
				})
				
				res.on('end',()=>{
					var buff = Buffer.concat(data, size)
					const result = icon.decode(buff, "utf8")
					resolve(result)
				})
			}).on('error',(err)=>{
				console.log(err)
				reject(err)
			})
		})
		console.log(result);
		//将string类型的result改编为json格式
		const jsonObj = JSON.parse(result)
		console.log(jsonObj);
		if(jsonObj.errcode){
			return res.status(401).send("invaild user")
		}
		//数据库查询
		const sql = `select * from all_user where user_openid = '${jsonObj.openid}'`
		
		sqlQuery(sql,(data, err)=>{
			if(err){
				return res.status(500).send("Database err");
			}
			//用户不存在
			if(data.length == 0){
				console.log("新用户")
				//插入新用户
				const sql = `insert into all_user (user_openid) values ('${jsonObj.openid}')`;
				sqlQuery(sql,(data)=>{
					console.log(data);
					const sql = `select * from all_user where user_openid = '${jsonObj.openid}'`;
					sqlQuery(sql,(data)=>{
						returnData = {
							user_id:data[0].user_id,
							level:data[0].user_level,
							is_test:data[0].user_teststatus,
						}
						return res.status(200).send(returnData).end();
					})
				})
			}
			//用户存在
			if(data.length != 0){
				returnData = {
					user_id:data[0].user_id,
					level:data[0].user_level,
					is_test:data[0].user_teststatus,
				}
				
				return res.status(200).send(returnData).end()
			}
		})
		
	}catch(err){
		console.log(err)
		return res.status(500).end()
		}
	

	
})




module.exports = router;
