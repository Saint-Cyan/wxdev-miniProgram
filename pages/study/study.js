// pages/study/study.js
import {
	checkQuestion,
} from "../../utils/util";

import {
	getInitResourceData,
} from "../../utils/user";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		resourceData: [],
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
				selected: 1
			})
	}
	getInitResourceData({}).then((res) => {
		this.setData({
			resourceData: res.data,
		})
		console.log(this.data.resourceData);
	})
	checkQuestion();
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

	checkStudy:function(e){
		console.log("Check in study");
	},

	handleCellClick:function(e) {
		wx.navigateTo({
			url: '../article/article?url=' + e.currentTarget.dataset.url,
		})
	}
})