//---http---
//引入全局配置文件
// Api URL 

const baseUrl = "http://localhost:7788";

const request = (param) => {
  let url = param.url;
  let data = param.data;
  let method = param.method;
  let header = {
    "Content-Type": "application/json"
	};
	console.log("this is data in request.js");
	console.log(data);
	//检查token是否存在，如果存在就将token封装进入header中

	//创建Promise对象，进行request请求
	return new Promise((resolve, reject) => {
		try {
			wx.request({
				url: baseUrl + url,
				header: header,
				method: method,
				data: data,
				success: (res) => {
					
					console.log(data);
					//用户登录信息错误，重新登录
					resolve(res);
				},
				fail: (err) => {
					reject(err);
				}
			})
		} catch (err) {
			reject(err);
		}
	})
}

module.exports = {
	request
};