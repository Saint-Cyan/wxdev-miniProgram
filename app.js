// app.js
import {
	login
} from "utils/user.js";


App({
  onLaunch() {
	// 自动进行登录
		console.log("APP launch");
		wx.login({
			success: (res) => {
				var dataCode = res.code;
				console.log("This is user code: " + dataCode);
				if (dataCode) {
					login({
						code: dataCode,
					}).then((res) => {
						let data = JSON.stringify(res.data);
						console.log("This is statusCode:" + res.statusCode);
						console.log("This is data: " + data);
						/** 
						 * Data set。
						 * token: int 
						 * level: varchar
						 * coin: int
						 * is_test: varchar
						*/
						wx.setStorageSync('token', data.user_id);
						wx.setStorageSync('level', data.level);
						wx.setStorageSync('coin', data.coin);
						wx.setStorageSync('is_test', data.is_test);
					}).catch ((err) => {
						console.log(err)
					} )
				}
			},
			fail: (err) => {
				console.log(err);
			}
		})
	},
  globalData: {
    userInfo: null
  }
})
