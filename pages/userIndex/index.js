// pages/userIndex/index.js
import {
	checkQuestion,
} from "../../utils/util";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		title: 'Hello',
		userLevel: "未登录",
		playSrc: "http://localhost:7788/public/gaoxueyayufang.mp4",
		swiperList:[
			{
				image:"http://localhost:7788/public/gaoxueyayufang.png",
				title:"高血压的危害",
				source:"http://localhost:7788/public/gaoxueyayufang.mp4"
			},
			{
				image:"http://localhost:7788/public/gaoxueyaweihai.png",
				title:"高血压危害",
				source:"http://localhost:7788/public/gaoxueyaweihai.mp4",
			},
			{
				image:"http://localhost:7788/public/gaoxueyazhuyi.png",
				title:"高血压注意",
				source:"http://localhost:7788/public/gaoxueyazhuyi.mp4"
			}
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
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 0
			})
	}
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

	}
})