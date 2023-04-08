// pages/usertest/usertest.js
import {
	getStaticFile,
	testAnsSubmit,
} from "../../utils/user.js";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: '',
		testConten: [],
		ans: [],
		radio: [],
		currentQuestion: 0,
		buttonDisable: true,
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
		console.log(this.data.url);
		getStaticFile(this.data.url).then((res) => {
			this.setData({
				testConten: res.data,
			})
			console.log(this.data.testConten);
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
	
	handleClick:function(e) {
		var ansTemp = this.data.ans;
		var radioTemp = this.data.radio;
		var currentTemp = e.currentTarget.dataset.questionindex;
		ansTemp[e.currentTarget.dataset.questionindex] = e.currentTarget.dataset.ansindex;
		radioTemp[e.currentTarget.dataset.questionindex] = e.currentTarget.dataset.ansindex;
		if(currentTemp < 5) {
			this.setData({
				ans: ansTemp,
				radio: radioTemp,
				currentQuestion: currentTemp + 1,
			})
		} else {
			this.setData({
				ans: ansTemp,
				radio: radioTemp,
				currentQuestion: currentTemp,
				buttonDisable: false,
			})
		}
	},

	submitAnswer:function(e) {
		var score = 0;
		for(let i = 0 ; i < this.data.ans.length ; i++) {
			score += this.data.ans[i] + 1;
		}
		console.log(score);
		testAnsSubmit({
			user_id: wx.getStorageSync('token'),
			testUrl: this.data.url,
			score: score,
		}).then((res) => {
			console.log(res);
			if(res.data == "success") {
				if(wx.getStorageSync('level') == "\"1\""){
					wx.setStorageSync('level', "2");
				}
				wx.showModal({
					title: '测试通过',
					content: '您的得分为' + score + "分",
					showCancel: false,
					complete: (res) => {
						if (res.confirm) {
							wx.navigateBack({
								url: '../mine/mine_pages/testPage/test',
							})			
						}
					}
				})
			} else if(res.data == "fail") {
				wx.showModal({
					title: '很遗憾,测试未通过',
					content: '您可以前往学习模块了解运动对于健康的积极作用',
					showCancel: false,
					complete: (res) => {
						if (res.confirm) {
							wx.navigateBack({
								url: '../mine/mine_pages/testPage/test',
							})			
						}
					}
				})
			}
		})
	}
})