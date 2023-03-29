//引入express组件
const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
	res.send('I love you. BB');
})




module.exports = router
