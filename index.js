//引入express框架
const express = require('express');
//服务器搭建
const app = express();
//测试路由
const router = require('./router/index');
//注册路由
const enrollRouter = require('./router/enroll/enroll');
//登录路由
const loginRouter = require('./router/login/login');
//测试问卷路由
const testRouter = require('./router/test/test');

//在服务器看来，用户端直接传来的参数并不安全，需要进行一定的处理让能被正常读取
app.use (express.urlencoded ({ extended: true }));
app.use ('/public',express.static ('public'));
app.use (express.json());

//配置路由
app.use ('/enroll',enrollRouter);
app.use ('/login',loginRouter);
app.use ('/test', testRouter);

//服务器监听7788端口
app.listen (7788,(res, rep) => {
	console.log("服务器启动成功........");
	console.log("http://localhost:7788");
})


