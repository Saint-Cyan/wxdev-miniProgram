// pages/mine/mine.js
import {
	login,
} from "../../utils/user.js";

import {
	checkQuestion,
} from "../../utils/util";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userLoginStatus: false,
		avatarUrl: "../../static/images/default-userProfile.png",
		userName: '点我登录',
		canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),// 获取微信开放数据
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
				selected: 3,
			})
		}

		checkQuestion();

		if(wx.getStorageSync('token')) {
			//登录未过期
			wx.getUserProfile({
				desc: '获取昵称与微信用户名',
				lang: 'zh_CN',
				success: (res) => {
					this.setData({
						userLoginStatus: true,
						avatarUrl: res.userInfo.avatarUrl,
						userName: res.userInfo.nickName,
					})
				}
			})
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
	/**
	 * 
	 * @param {*} e: click event.
	 */
	wxlogin:function(e) {
		wx.getUserProfile({
			desc: '获取昵称与微信用户名',
			lang: "zh_CN",
			success: (res) => {
				this.setData({
					avatarUrl: res.userInfo.avatarUrl,
					userName: res.userInfo.nickName,
				})
				wx.showToast({
					title: '登录中',
					icon: "loading",
				})
				wx.login({
					success: (res) => {
						login({
							code:res.code,
						}).then((res) => {
							if (res.statusCode == 200) {
								wx.setStorageSync('token', res.data.user_id);
								wx.setStorageSync('level', res.data.level);
								wx.setStorageSync('coin', res.data.coin);
								wx.setStorageSync('is_test', res.data.is_test);
								this.setData({
									userLoginStatus: true,
								})
								wx.showToast({
									title: '登录成功',
									icon: "success"
								})
							} else {
								console.log("ERROR! Stautus code: " + res.statusCode);
							}
						}).catch((err) => {
							console.log("ERROR! Fail to connect server. Error message :" + err);
						})
					},
					fail: (res) => {
						console.log("error occur:" + err);
					}
				})
			},
			fail: (res) => {
				console.log("error occur:" + err);
			}
		})
	},

	gotoTestPage:function(e) {
		console.log("Im ok！");
		wx.navigateTo({
			url: '../mine/mine_pages/testPage/test',
		})
	},

	gotoPlan:function(e) {
		wx.navigateTo({
			url: '../mine/mine_pages/plan/plan',
		})
	},

	gotoMoreFunction:function(e) {
		wx.navigateTo({
			url: '../mine/mine_pages/moreFunction/moreFunction',
		})
	},

	gotoClock:function(e) {
		wx.showToast({
			title: '更多功能敬请期待',
			icon: 'none',
		})
	},

})