<template>
	
	<view class="">
		<uni-status-bar ></uni-status-bar>
		<uni-nav-bar left-icon="arrowleft" title="" @clickLeft="back(this)" />
		<view class="padd_bvox">
			<view class="big-title">
				注册新账号
			</view>
			<!-- 	<view class="login-item border-bottom row" @click="toSelectCity">
				<view class="left-tips">
					国家/地区
				</view>
				<view class="center-text">
					{{countrysName}}
				</view>
				<uni-icons type="arrowright" color="#ccc" size="300"></uni-icons>
			</view> -->
			<view class="login-item border-bottom row">
				<view class="left-tips">
					<uni-icons class="left-icon" type="phone" color="#ccc" size="500"></uni-icons>
				</view>
				<!-- 	<view class="contriy-num">
					{{countrysNum}}
				</view> -->
				<view class="center-text">
					<input class="uni-input" placeholder="请输入手机号" v-model="inputClearValue" />
				</view>
				<view class="uni-icon uni-icon-clear" @click="clearInput"></view>
			</view>
		
			<view class="login-item border-bottom row">
				<view class="left-tips">
					<uni-icons class="left-icon" type="locked" color="#ccc" size="500"></uni-icons>
				</view>
				<view class="center-text">
					<input class="uni-input" v-model="code" placeholder="请输验证码" />
				</view>
				<view class="gray-text" @click="getCode">{{codeText}}</view>
				<uni-icons type="arrowright" color="#ccc" size="300"></uni-icons>
			</view>
		
			<button class="margin-top15" type="primary" @click="next()">下一步</button>
		
			<view class="bottom-info">
				<view class="button-items row">
					<view class="bt-item" @click="toLogin">
						账号登陆
					</view>
				</view>
				<view class="tips gray-text">
					登陆表示您却认自身满18岁并同意<text class="text-blue">用户协议</text>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import UniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
	export default {
		components: {
			uniNavBar,
			uniIcons,
			UniStatusBar
		},
		data() {
			return {
				inputClearValue: '',

				codeText: "获取验证码",
				delayTime: 0,
				code: ''
			}
		},
		mounted() {
			const self = this
			this.eventBus.$on('selectCity', function(_data) {
				const data = JSON.parse(_data)
				self.countrysName = data.name
				self.countrysNum = data.number
			});
		},
		methods: {
			getCode() {
				if (this.delayTime > 0)
					return
				if (!this.inputClearValue) {
					this.Utals.showToast("请先输入手机号")
					return
				}
				this.Utals.axios({
					url: "register",
					loading: true,
					data: {
						tel: this.inputClearValue
					},
					success: res => {
						if (res.code == 0) {
							this.Utals.hideLoading()
							this.delayTime = 5
							let timer = setInterval(() => {
								this.codeText = this.delayTime + "秒后重新获取"
								if (!this.delayTime)
								{
									this.codeText="获取验证码"
									this.delayTime = 0
									clearInterval(timer)
								}
									--this.delayTime
									
							}, 1000)
						} else {
							this.Utals.showToast(res.msg)
						}
					}
				})
			},
			next() {
				if (!this.inputClearValue) {
					this.Utals.showToast("请先输入手机号")
					return
				}
				if (!this.code) {
					this.Utals.showToast("请先输入验证码")
					return
				}
				this.Utals.axios({
					url: "register",
					type: "post",
					loading: true,
					data: {
						tel: this.inputClearValue,
						code: this.code
					},
					success: res => {
						if (res.code == 0) {
							this.Utals.hideLoading()
							uni.setStorageSync("key",res.data)
							uni.setStorageSync("phone",this.inputClearValue)
							this.toPage("/pages/rePassword")
						} else {
							this.Utals.showToast(res.msg)
						}
					}
				})
			},

			clearInput() {
				this.inputClearValue = ""
			},
			toSelectCity() {
				this.$Router.push({
					page: "/pages/selectCity"
				})
			},
			toLogin() {
				this.$Router.push({
					page: "/pages/login"
				})
			}
		}
	}
</script>

<style>
	.contriy-num {
		margin-right: 20upx;
	}

	.padd_bvox {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.bottom-info {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 30upx;
		width: 100%;
	}

	.button-items {
		justify-content: center;
		align-items: center;

	}

	.bt-item {
		margin: 0 10upx;
		color: #333333;
		text-align: center;
		font-size: 30upx;
		margin-bottom: 20upx;
	}

	.center-line {
		width: 3px;
		height: 30upx;
		background-color:  #888888;
	}

	.text-blue {
		color: #007AFF;
	}

	.gray-text {
		font-size: 24upx;
		color: #888888;
		text-align: center;
	}

	.forgetPass {
		color: red;
	}

	.big-title {
		font-size: 40upx;
		font-weight: 700;
		padding: 20upx 0;
	}

	.login-item {
		align-items: center;
		padding: 20upx 0;
	}

	.left-tips {
		margin-right: 20upx;
	}

	.left-icon {
		font-size: 50upx;
	}

	.center-text {
		flex-grow: 1;
	}
</style>
