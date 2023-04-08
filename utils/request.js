//---http---
//系统http访问库
// Api URL 

const baseUrl = "http://43.136.245.249:7788";

const request = (param) => {
  let url = param.url;
  let data = param.data;
  let method = param.method;
  let header = {
    "Content-Type": "application/json"
	};
	//创建Promise对象，进行request请求
	return new Promise((resolve, reject) => {
		try {
			wx.request({
				url: baseUrl + url,
				header: header,
				method: method,
				data: data,
				success: (res) => {
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
	request,
};