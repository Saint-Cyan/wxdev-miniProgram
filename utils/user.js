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

//get init data when init exercise page
export const initExerciseDate = (param) => {
	return request({
		url: '/exercise/init',
		data: param,
		method: 'POST',
	})
}

//insert user exercise time
export const insertExerciseDate = (param) => {
	return request({
		url: '/exercise/insert',
		data: param,
		method: 'POST',
	})
}

//init userIndex by getting resource
export const getInitResourceData = (param) => {
	return request({
		url: '/resource/init',
		data: param,
		method: 'POST',
	})
}

// get static json file
export const getStaticFile = (param) => {
	return request({
		url: param,
		method: 'GET',
	})
}

//init test module by getting testlist
export const getInittestlistData = (param) => {
	return request({
		url: '/test/getList',
		data: param,
		method: 'POST',
	})
}

// user test submit and pass check
export const testAnsSubmit =  (param) => {
	return request({
		url: '/test/subAns',
		data: param,
		method: 'POST',
	})
}
