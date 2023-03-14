//小程序功能库

export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export const checkQuestion = () => {
		try{
			if (wx.getStorageSync('token') && wx.getStorageSync('is_test') == 0) {
			wx.showModal({
				title: '开始前请您回答一个问题。',
				content: '这不会占用太久时间',
				showCancel: false,
				complete: (res) => {	
				if (res.confirm) {
					wx.navigateTo({
						url: '../questionaire/questionaire',
					})
				}
				}
			})
			}
		}catch(err){
			throw err;
		}
}
