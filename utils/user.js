//封装用户请求

import {
	request
} from "./request.js";

// 用户登录

export const login = (param) => {
	console.log("User login with data:" + param.code);
	console.log("Param is:" + param + " with type of:" + typeof(param));
	return request({
		url: '/login',
		data: param,
		method: 'POST',
	})
}