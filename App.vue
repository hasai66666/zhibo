<script>
	import Vue from 'vue'
	import store from './store'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight; 
					// #endif
				} 
			})
		
		},
		
		onShow: function() {
		  ///验证是否掉线
  //          var that=this;
  //           var logined=(store.getters.hasLogin);
		// 	if(logined){
		// 		///检测是否当前还处于在线
		// 		let checkdata= store.getters.userinfo.data.mine;
		// 		 that.$apiconfig.checklogout_f({data:checkdata}).then(res=>{
		// 			if(parseInt(res.data.code)==0){
		// 				that.$mysocket.connectserver(checkdata.id)
		// 			}
		// 		 })
		// 	}else{
		// 		uni.reLaunch({
		// 			url:"pages/login"
		// 		})
		// 	}
		
		
		
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	
	
	.row {
		display: flex;
		flex-direction: row !important;
		align-items: center;
	}
	
	.border-bottom {
		border-bottom: 1upx solid #f3f3f3;
	}
	
	.padd_bvox {
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.re-image {
		width: 100%;
		max-width: 100%;
		opacity: 1;
		height: 100%;
	}
	
	.text-center {
		text-align: center;
	}
	
	.margin-top15 {
		margin-top: 30upx;
	}
	
	.full-screen {
		position: absolute;
		left: 0;
		top: 0;
		margin: auto;
		width: 100%;
		height: 0;
		max-width: 750upx;
		z-index: 999;
	}
	
	.circle-icon {
		border-radius: 100upx;
	}
	
	.radius5px {
		border-radius: 5px;
	}
	
	.gray-text {
		color: #888888;
	}
	.place-hoder{
		height:100upx;
	}
	.followed{
		background-color:  #F3F3F3 !important;
		color: #555 !important;
	}
</style>
