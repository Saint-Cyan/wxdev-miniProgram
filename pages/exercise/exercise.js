// pages/exercise/exercise.js
import {
	checkQuestion,
} from "../../utils/util.js";


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
		userLevel: "登录后查看等级",
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
		exerciseData: [{
			message: '1'
		},{
			message: '2'
		},{
			message: '3'
		},{
			message: '4'
		},{
			message: '5'
		},{
			message: '6'
		},{
			message: '7'
		},{
			message: '8'
		},{
			message: '9'
		},{
			message: '10'
		},{
			message: '11'
		},{
			message: '12'
		},{
			message: '13'
		},{
			message: '14'
		},{
			message: '15'
		},{
			message: '16'
		},{
			message: '17'
		},{
			message: '18'
		},{
			message: '19'
		},{
			message: '20'
		}],
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
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 2
			})
	}
	checkQuestion();

	let userLevel = wx.getStorageSync('level');
	if (userLevel) {
		if (userLevel == 1) {
			this.setData({
				role: "无意向者"
			})
			wx.showModal({
				title: '锻炼功能尚未解锁',
				content: '完成测试和健康评估后即可自由锻炼',
				showCancel: false,
			})
		} else if (userLevel == 2) {
			this.setData({
				role: "意向者"
			})
			wx.showModal({
				title: '锻炼功能尚未解锁',
				content: '完成测试和健康评估后即可自由锻炼',
				showCancel: false,
			})
		} else if (userLevel == 3) {
			this.setData({
				role: "行动者",
				canUserGetExercise: true
			})
		}
	}
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
			currentTap: e.currentTarget.dataset.index
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
		console.log(e);
		this.setData({
			showPop: false,
			exerciseSelected: e.detail.value[0] + '/' + e.detail.value[1]
		})
	}
})