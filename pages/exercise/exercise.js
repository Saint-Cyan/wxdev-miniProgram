// pages/exercise/exercise.js
import {
	checkQuestion,
} from "../../utils/util.js";

import {
	initExerciseDate,
	insertExerciseDate,
} from "../../utils/user.js";

import {
	remove,
} from "../../utils/storage.js"

const exerciseProject = {
	室内有氧:['跑步机','划船机','瑜伽','健美操','自由运动'],
	室外有氧:['跑步','跳绳','游泳','健身操','散步','自由运动'],
	计划运动:['五禽戏','徒手健身项目','自由项目'],
}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		role:"未登录",
		exerciseTime: 0,
		canUserGetExercise: false,
		showPop: false,
		currentTap: 0,
		exerciseSelected: "未选择",
		columns: [{
			values: Object.keys(exerciseProject),
			className: 'column1',
		},{
			values:exerciseProject['室内有氧'],
			className: 'column2',
			defaultIndex: 0,
		}],
		exerciseData: [],
		sliderValue: "30",
		time: 1000*60*30,
		sliderdisable: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		//tab bar
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 2
			})
	}
	//user level check
	checkQuestion();

	let userLevel = wx.getStorageSync('level');
	console.log(userLevel != null, userLevel == 1, userLevel);
	if (userLevel != null) {
		if (userLevel == "1" || userLevel == "\"1\"") {
			console.log("im here")
			this.setData({
				role: "无意向者"
			})
			wx.showModal({
				title: '锻炼功能尚未解锁',
				content: '完成测试和健康评估后即可自由锻炼',
				showCancel: false,
			})
		} else if (userLevel == "2") {
			this.setData({
				role: "意向者",
				canUserGetExercise: true
			})
		} else if (userLevel == "3") {
			this.setData({
				role: "行动者",
				canUserGetExercise: true
			})
		}
	}
	//user exercise time get
		initExerciseDate({
			user_id: wx.getStorageSync('token'),
		}).then((res) => {
			this.setData({
				exerciseData: res.data,
				exerciseTime: res.data[0].time,
			})
		}).catch((err) => {
			console.log(err);
		})

	
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},

	gotoOther:function(e) {
		console.log("Im in exercise.");
		wx.navigateTo({
			url: '../navigateTest/test',
			success: (res) => {
				console.log(res);
			},
			fail: (err) => {
				console.log(err);
			}
		})
	},

	handleClick:function(e) {
		this.setData({
			currentTap: e.currentTarget.dataset.index,
			exerciseTime: this.data.exerciseData[e.currentTarget.dataset.index].time,
		})
	},

	showPopup:function(e) {
		this.setData({
			showPop: true
		})
	},

	closepopup:function(e) {
		this.setData({
			showPop: false,
		})
	},

	onChange:function(e) {
		const { picker, value, index} = e.detail;
		picker.setColumnValues(1,exerciseProject[value[0]]);
	},

	onCancel:function(e) {
		this.setData({
			showPop: false
		})
	},

	onConfirm:function(e) {
		this.setData({
			showPop: false,
			exerciseSelected: e.detail.value[0] + '/' + e.detail.value[1]
		})
	},

	dragslider:function(e) {
		this.setData({
			time: e.detail.value * 1000 * 60,
		})
	},

	start:function(e) {
		if (this.data.exerciseSelected == "未选择") {
			wx.showToast({
				title: '请选择运动',
				icon: 'error'
			})
			return ;
		}
		const countDown = this.selectComponent('.exercise-count-down');
		countDown.start();
		this.setData({
			sliderdisable: true,
		})
	},

	pause:function(e) {
		const countDown = this.selectComponent('.exercise-count-down');
		countDown.pause();
	},

	reset:function(e) {
		const countDown = this.selectComponent('.exercise-count-down');
		countDown.reset();
		this.setData({
			sliderdisable: false,
		})
	},

	timerfinish:function(e) {
		var exerciseDataTemp = this.data.exerciseData;
		insertExerciseDate({
			user_id: wx.getStorageSync('token'),
			time: '00:' + String(this.data.time / 1000 / 60),
		}).then((res) => {
			if(res.statusCode == 200) {
				wx.setStorageSync('level', '3');
				exerciseDataTemp[13].time += this.data.time / 1000 / 60;
				this.setData({
					exerciseData: exerciseDataTemp,
				});
				wx.showToast({
					title: '运动记录成功',
					icon: 'success',
				});
				wx.redirectTo({
					url: '../exercise/exercise',
				});
			} else if(res.statusCode == 401) {
				wx.showToast({
					title: '用户身份验证失败，请重新登录后再次提交',
					icon: 'error',
				})
				setTimeout(() => {
					remove();
					wx.reLaunch({
						url: '../userIndex',
					})
				},2000)
			} else {
				wx.showToast({
					title: '服务器错误',
					icon: 'error',
				})
			}
		}).catch((err) => {
			console.log("ERROR:" + err);
			wx.showToast({
				title: '发生错误',
				icon: 'error',
			})
		})
	}

})