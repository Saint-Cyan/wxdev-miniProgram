//引入express
const express = require('express')
//引入router
const router = express.Router()

router.get('/:imageName'(req,res)=>{
	const imageName = req.params.imageName
	return res.sendFile("http://localhost:7788/public/" + imageName)
})