export default class Utals {
	constructor() {
		this.baseUrl = "http://fq.595969.com"
		this.userinfo = null
	}

	getUrl(url) {
		return `${this.baseUrl}/${url}`
	}
	getImgUrl(url) {
	
		if (!url)
			return null
			if(url.indexOf("http://")>-1 ||url.indexOf("https://")>-1 )
			return url;
		if (url[0] == "/")
			return this.baseUrl + url
		else
			return `${this.baseUrl}/${url}`
	}
	getUserId() {
		if (!this.userinfo) {
			let user = uni.getStorageSync("userinfo")
			if (!user) {
				this.getUser()
				return ""
			} else {
				this.userinfo = user
			}
		}
		return this.userinfo.id
	}
	getUserToken() {
		return uni.getStorageSync("token")
	}
	getUser(call) {

		return this.tokenAxios({
			url: "user_info",
			type: "POST",
			success: res => {
				if (res.code == 0) {
					uni.setStorageSync("userinfo", res.data)
					call && call(res)
				}
			},
			tokenError: () => {

			},
		})
	}
	axios(config) {
		
		if (!config.header || !config.header['api-token']) {
			config.data = config.data || {}
		}
		
	
		config.loading && this.showLoading()
		const self = this
		config.url = this.getUrl(config.url)
		return new Promise((resolve, reject) => {
			uni.request({
				url: config.url,
				method: config.type || "GET",
				data: config.data,
				header: config.header,
				success: (res) => {
					config.loading && this.hideLoading()
					config.success(res.data)
					resolve(res.data)
				},
				fail: (err) => {
					config.loading && this.hideLoading()
					reject(err)
				}
			});
		})
	}
	clearToken() {
		uni.removeStorageSync("token")
		uni.removeStorageSync("userinfo")
	}
	tokenAxios(config) {
		const token = uni.getStorageSync("token")
		if (!token) {
			if (config.tokenError) {
				this.clearToken()
				config.tokenError()
			} else {
				this.noLogin()
			}
			return
		}
		config.header = {
			"api-token": token
		}
		const con_success = Object.assign({}, {
			success: config.success
		}).success
		config.success = (res) => {
			if (res.errorCode == 1001 || res.errorCode == 1000) {
				if (config.tokenError) {
					config.tokenError()
					this.clearToken()
				} else {
					let self = this
					uni.showModal({
						content: "您的登陆信息已失效,请重新登陆",
						showCancel: false,
						confirmText: "确定",
						success: function(res) {
							if (res.confirm) {
								self.toPage("/pages/login")
							} else if (res.cancel) {

							}
						}
					})
					this.clearToken()
				}

				return
			}
			con_success(res)
		}
		this.axios(config)
	}
	upImage_APP(config) {

		config.url = this.baseUrl + "/" + config.url
		config.header = {
			"api-token": uni.getStorageSync("token")
		}
		let uploadTask  =uni.uploadFile(config)
		 uploadTask.onProgressUpdate(function (res) {
		      console.log('上传进度' + res.progress);
		      console.log('已经上传的数据长度' + res.totalBytesSent);
		      console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
		     });
	}
	uploadFile(_url, file, uploadComplete, uploadFailed) {
		this.showLoading()
		let url = this.getUrl(_url);
		let form = new FormData();
		if (file.length)
			for (var i = 0; i < file.length; i++) {
				form.append('file[]', file[i]);
			}
		else
			form.append('file', file);
		form.append("device", this.device)
		let xhr = new XMLHttpRequest();
		xhr.open("post", url, true);
		xhr.setRequestHeader("api-token", uni.getStorageSync("token"));
		xhr.onload = res => {
			this.hideLoading();
			uploadComplete(res)
		}; //请求完成
		xhr.onerror = err => {
			this.hideLoading();
			uploadFailed(err)
		}; //请求失败
		xhr.send(form);
	}


	showLoading() {
		// #ifdef APP-PLUS
		plus.nativeUI.showWaiting("等待中...")
		// #endif
		// #ifdef H5
		uni.showToast({
			title: "loading",
			icon: "loading",

		})
		// #endif

	}
	hideLoading() {
		// #ifdef APP-PLUS
		plus.nativeUI.closeWaiting()
		// #endif
		// #ifdef H5
		uni.hideToast()
		// #endif
	}
	hideToast() {
		uni.hideToast()
	}
	showToast(title, icon, duration) {
		uni.showToast({
			title: title,
			icon: icon || "none",
			duration: duration || 3000
		})
	}
	noLogin() {
		uni.showModal({
			title: "登陆提醒",
			content: "请先登陆",
			showCancel: false,
			confirmText: "确定",
			success: () => {
				this.toPage("/pages/login")
			}
		})
	}


	timeRule(time, isAll) {

		if (!time)
			return

		if (typeof time != "number")
			time = Date.parse(new Date(time.replace(/-/g, "/")));
		var nowDate = new Date();
		var timeDiff = parseInt((nowDate.getTime() - time) / 1000);
		if (timeDiff < 1 * 60 * 60) {
			// 1小時内 
			return parseInt(timeDiff / 60) ? parseInt(timeDiff / 60) + "分鐘前" : "剛剛";
		} else if (timeDiff < 24 * 60 * 60) {
			// 24小時内
			return parseInt(timeDiff / 3600) + "小時前";
		} else {
			// 今天凌晨
			var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime();
			// 昨天凌晨
			var yestday = today - 24 * 3600 * 1000;
			// 是否昨天
			if (yestday <= time && time < today) {
				return "昨天";
			} else {
				// 正常显示时间
				var myDate = this.timeFormat(time);
				if (isAll) {
					return myDate.year + "-" + myDate.month + "-" + myDate.date + "  " + myDate.hours + ":" + myDate.min;
				} else {
					return myDate.year + "-" + myDate.month + "-" + myDate.date;
				}
			}
		}
	}
	timeFormat(time) {
		var myDate = new Date(time);

		var osec = parseInt(time / 1000 % (3600 * 24));
		return {
			year: myDate.getFullYear(),
			month: this.placeholder(myDate.getMonth() + 1, 2),
			date: this.placeholder(myDate.getDate(), 2),
			hours: this.placeholder(myDate.getHours(), 2),
			min: this.placeholder(myDate.getMinutes(), 2),
			sec: this.placeholder(myDate.getSeconds(), 2)
		};
	}
	// 用0占位
	placeholder(value, num) {
		if (String(value).length < num) {
			value = this.placeholder("0" + value, num);
		}
		return value;
	}
}
