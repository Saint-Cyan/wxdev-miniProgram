/**
 * wx Storage操作库类
 * @param {*} param 
 */


export const set = (param) => {
	return new Promise((resolve,reject) =>{
		try{
			wx.setStorageSync('token', param.user_id);
			wx.setStorageSync('level', param.level);
			wx.setStorageSync('coin', param.coin);
			wx.setStorageSync('is_test', param.is_test);
			resolve("Success");
	}catch(err){
		reject(err);
	}
	})
}

export const remove = () => {
	return new Promise((resolve, reject) => {
		try{
			wx.removeStorageSync('token');
			wx.removeStorageSync('level');
			wx.removeStorageSync('coin');
			wx.removeStorageSync('is_test');
			wx.removeStorageSync('questionaireAnswer');
			resolve("Success");
		}catch(err){
			reject(err);
		}
	})
}