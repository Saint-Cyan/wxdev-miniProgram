var express = require('express');
const sqlQuery = require("../../db/resetSet/index");
var router = express.Router();

router.post('/',function(req,res) {

	const { userid , password , phoneNumber} = {...req.body };
	const sql = `select * from user where user_id = '${userid}'`;
	
	sqlQuery(sql,(data,err)=>{
		if(err){
			return res.sendStatus(301).send(err).end()
		}
		if(data.length == 0){
			const sql = `insert into user (user_id,password,phoneNumber) values('${userid}','${password}','${phoneNumber}')`;
			sqlQuery(sql,(data,err)=>{
				if(err){
					return res.sendStatus(301).send(err).end()
				}
				return res.sendStatus(200).end()
			})
		}
		else{
			return res.sendStatus(500).end()
		}
	})
	
	
})



module.exports = router;