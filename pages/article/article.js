// pages/article/article.js

import {
	getStaticFile,
} from '../../utils/user'

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		url: '',
		article: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			url: options.url,
		})
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
		getStaticFile(this.data.url).then((res) => {
			this.setData({
				article: res.data,
			})
		}).catch((err) => {
			console.log(err);
			wx.showToast({
				title: '发生错误',
				icon: 'error',
			})
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

	}
})