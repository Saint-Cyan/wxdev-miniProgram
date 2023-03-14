//引入express组件
const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
	res.send("测试成功")
})




module.exports = router