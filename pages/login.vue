<template>
	<view class="back-write">
		<uni-status-bar></uni-status-bar>
		<uni-nav-bar left-icon="arrowleft" title="" @clickLeft="back(this)" />

		<view class="padd_bvox">
			<view class="big-title">
				{{loginTitles[loginType]}}
			</view>
			<!-- <view v-if="loginType!=1" class="login-item border-bottom row" @click="toSelectCity">
			<view class="left-tips">
				国家/地区
			</view>
			<view class="center-text">
				{{countrysName}}
			</view>
			<uni-icons type="arrowright" color="#ccc" size="300"></uni-icons>
		</view> -->
			<view v-if="loginType!=1" class="login-item border-bottom row">
				<view class="left-tips">
					<uni-icons class="left-icon" type="phone" color="#ccc" size="500"></uni-icons>
				</view>
				<!-- <view class="contriy-num">
				{{countrysNum}}
			</view> -->
				<view class="center-text">
					<input placeholder="请输入手机号" v-model="inputClearValue" />
				</view>
				<!-- <view class="uni-icon uni-icon-clear" @click="clearInput"></view> -->
			</view>
			<view v-if="loginType==1" class="login-item border-bottom row">
				<view class="left-tips">
					<uni-icons class="left-icon" type="locked" color="#ccc" size="500"></uni-icons>
				</view>
				<view class="center-text">
					<input placeholder="请输入账号/手机" v-model="inputClearValue" />
				</view>
			</view>
			<view v-if="loginType!=2" class="login-item border-bottom row">
				<view class="left-tips">
					<uni-icons class="left-icon" type="locked" color="#ccc" size="500"></uni-icons>
				</view>
				<view class="center-text">
					<input type="password" placeholder="请输入密码" v-model="password" />
				</view>
				<view class="forgetPass" @click="toPage('/pages/forgetPass')">忘记密码</view>
			</view>
			<view v-if="loginType==2" class="login-item border-bottom row">
				<view class="left-tips">
					<uni-icons class="left-icon" type="locked" color="#ccc" size="500"></uni-icons>
				</view>
				<view class="center-text">
					<input placeholder="请输验证码" v-model="code" />
				</view>
				<view class="gray-text" @click="getCode">{{codeText}}</view>
				<uni-icons type="arrowright" color="#ccc" size="300"></uni-icons>
			</view>

			<button class="margin-top15" type="primary" @click="login">登陆</button>
			<view class="gray-text text-center margin-top15" @click="toRegist()">
				没有账号，去注册
			</view>
			<view class="bottom-info">
				<view v-if="loginType!=2" class="button-items row">
					<!-- <view v-if="loginType==0" class="bt-item" @click="loginType=1">
					账号登陆
				</view> -->
					<!-- <view v-if="loginType==1" class="bt-item" @click="loginType=0">
					手机号登陆
				</view> -->
					<!-- <view class="bt-item center-line"></view> -->
					<view class="bt-item" @click="loginType=2">
						快速登陆
					</view>
				</view>
				<view v-else class="button-items row">
					<view class="bt-item" @click="loginType=1">
						密码登陆
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
				loginTitles: ["手机号登录", "账号登录", "快速登录"],
				inputClearValue: '',
				loginType: 1,
				password: '',
				code: '',
				delayTime: 0,
				codeText: '获取验证码'
			}
		},
		created() {

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
					url: "index_login_tel",
					loading: true,
					data: {
						tel: this.inputClearValue
					},
					success: res => {
						if (res.code == 0) {
							this.Utals.hideLoading()
							this.delayTime = 60
							let timer = setInterval(() => {
								this.codeText = this.delayTime + "秒后重新获取"
								if (!this.delayTime) {
									this.codeText = "获取验证码"
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
			login() {
				uni.hideKeyboard()
				if (!this.inputClearValue) {
					this.Utals.showToast("请输入账号")
					return
				}
				if (!this.password && this.loginType == 1) {
					this.Utals.showToast("请输入密码")
					return
				}
				if (!this.code && this.loginType == 2) {
					this.Utals.showToast("请输入验证码")
					return
				}

				let succe = (res) => {
					if (res.code == 0) {
						this.Utals.hideLoading()
						this.Utals.clearToken()

						uni.setStorageSync("token", res.data)
						this.eventBus.$emit("logrefresh")
						this.back(this)
						// this.toPage("/pages/index")
					} else {
						this.Utals.showToast(res.msg)
					}
				}
				if (this.loginType == 1)
					this.Utals.axios({
						url: "index_login",
						type: "POST",
						loading: true,
						data: {
							tel: this.inputClearValue,
							password: this.password,
						},
						success: succe
					})
				else
					this.Utals.axios({
						url: "index_login_tel",
						type: "POST",
						loading: true,
						data: {
							tel: this.inputClearValue,
							code: this.code,
						},
						success: succe
					})
			},
			clearInput() {
				this.inputClearValue = ""
			},
			toRegist() {
				this.$Router.push({
					page: "/pages/regist"
				})
			},
			toSelectCity() {
				this.$Router.push({
					page: "/pages/selectCity"
				})
			}
		}
	}
</script>

<style>
	.back-write{
		background-color: #fff;
		height: 100%;
	}
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
		bottom: 100upx;
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
	}

	.center-line {
		width: 3px;
		height: 30upx;
		background-color: #888888;
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
