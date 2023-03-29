//引入express
const express = require('express')
//引入Router
const router = express.Router()
//引入sql访问
const sqlQuery = require('../../db/resetSet/index')

router.post('/',function(req,res){
	
	const {id , test} = {...req.body}
	
	const sql = `select * from all_user where user_id = ${id}`
	
	var userLevel = ''
	
	try{
		sqlQuery(sql,(data)=>{
			//数据库无法查询到对应用户
			if(data.length == 0){
				console.log('用户错误重新登录')
				return res.status(301).send('用户id错误').end()
			}else{
				if(test == 'opt_1' || test == 'opt_2'){
					console.log('用户是无意向者')
					userLevel = '1'
					const sql = `update all_user set user_level = '1' , user_teststatus = '1'`
					sqlQuery(sql,(data)=>{
						console.log(data)
					})
				}else if(test == 'opt_3'){
					console.log('用户是意向者')
					userLevel = '2'
					const sql = `update all_user set user_level = '2' , user_teststatus = '1'`
					sqlQuery(sql,(data)=>{
						console.log(data)
					})
				}else if(test == 'opt_4' || test == 'opt_5'){
					console.log('用户是行动者')
					userLevel = '3'
					const sql = `update all_user set user_level = '3' , user_teststatus = '1'`
					sqlQuery(sql,(data)=>{
						console.log(data)
					})
				}
				return res.status(200).send({level: userLevel}).end()
			}
		})
	}catch(err){
		console.log(err)
		return res.status(500).end()
	}
	
})


module.exports = router;
