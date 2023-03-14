/**
 * 用户操作库
 */

import {
	request,
} from "./request.js";

import { 
	remove,
	set,
} from "./storage.js";

// 用户登录

export const login = (param) => {
	return request({
		url: '/login',
		data: param,
		method: 'POST',
	})
}

//用户提交问卷

export const askQuestion = (param) => {
	return request({
		url: '/test',
		data: param,
		method: 'POST',
	});
}

//用户缓存初始化

export const userStorageInit = (param) => {
		return set({
		user_id: '0',
		level: '0',
		coin: '0',
		is_test: '0',
	});
}

//用户缓存删除

export const deleteUserStorage = (param) => {
	return remove();
}