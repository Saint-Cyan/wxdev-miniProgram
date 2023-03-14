// pages/questionaire/questionaire.js

import {
	askQuestion,
} from "../../utils/user";

import {
	remove,
} from "../../utils/storage";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		items: [
			{value: 'opt_1', name: '没有，且我不打算开始'},
			{value: 'opt_2', name: '没有，但我正在考虑'},
			{value: 'opt_3', name: '没有，但我认真打算开始'},
			{value: 'opt_4', name: '是的，但是只是开始一段时间'},
			{value: 'opt_5', name: '是的，已经持续很长时间'},
			]
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
	/**
	 * 在wx storage中缓存问卷答题情况。
	 * @param {*} e 
	 */
	handleRadio:function(e) {
		wx.setStorageSync('questionaireAnswer', e.detail.value);
	},
	/**
	 * 向服务器提交问卷并对本地缓存进行修改。
	 * @param {*} e 
	 * 301: 用户验证信息错误，重新登录
	 * 200：用户修改信息成功
	 * 500：服务器错误
	 */
	submitQuestion:function(e) {
		askQuestion({
			id: wx.getStorageSync('token'),
			test: wx.getStorageSync('questionaireAnswer'),
		}).then((res) => {
			//错误处理
			if (res.statusCode == 301) {
				console.log("ERROR! User login status overdue.");
				remove();
				wx.removeStorageSync('questionaireAnswer');
				wx.showModal({
					title: '登录过期',
					content: '请重新验证登录',
					showCancel: false,
					complete: (res) => {
						if (res.confirm) {
							wx.reLaunch({
								url: '../userIndex',
							})
						}
					}
				})
			} else if (res.statusCode == 500) {
				console.log("ERROR! Server has error.");
				remove();
				wx.removeStorageSync('questionaireAnswer');
				wx.showModal({
					title: '发生错误',
					content: '请稍后再试',
					showCancel: false,
					complete: (res) => {
						if (res.confirm) {
							wx.reLaunch({
								url: '../userIndex',
							})
						}
					}
				})
			} else if (res.statusCode == 200) {
				console.log("Opt success, data is: " + res.data.level);
				wx.removeStorageSync('questionaireAnswer');
				wx.setStorageSync('is_test', '1');
				wx.setStorageSync('level', JSON.stringify(res.data.level));
				wx.showModal({
					title: '谢谢您的参与!',
					content: '请点击左上角返回主页.',
					showCancel: false,
					complete: (res) => {			
						if (res.confirm) {
							//这里遇到了一个问题，wx.navigateTo等导航API都无响应。无论是跳TabBar页面还是普通页面.
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			} else {
				console.log("Unknown message." + res.statusCode + res.data);
			}
		})
	}

})