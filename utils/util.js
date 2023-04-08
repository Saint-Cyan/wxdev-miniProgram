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

//check whether user already answered question
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

//not use 
export const initExerciseDate = (date) => {
	const today = new Date();
	var day = today.getDate();
	const month = today.getMonth() + 1;
	let initTime = 14; //初始化时间长度
	let i = 0;
	while(i < initTime) {
		if((day - i) == 0) {
			if(month == 1 || month == 2 || month == 4 || month ==6 || month == 8 || month ==9 || month == 11) {
				day = 31;
			} else if(month == 3) {
				day = 28;
			} else {
				day = 30;
			}
		}
		date[initTime - i - 1] = {
			message: day - i,
			time: 0,
		}
		i++;
	}
}
