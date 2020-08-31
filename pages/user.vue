<template>
	<view class="content" :style="{height:wh}">
		<view class="place-holder">
			<uni-icons class="sitting-icon" type="gear-filled" color="#ccc" size="300" @click="toPage('/pages/sitting')"></uni-icons>
		</view>
		<view class="user-box">
			<view class="head-name row">
				<image :lazy-load="true" class="user-icon" @click="userinfo&&toPage('/pages/userDetial',{id:userinfo.id})" :src="Utals.getImgUrl(userinfo.icon ||deviceinfp.initial_icon ) || '../static/images/default.1b321070.png'"
				 mode=""></image>
				<view class="">
					<view class="user-name row">
						{{userinfo.username ||deviceinfp.initial_username|| "游客模式"}}
						<view class="badge-list row" @click="toPage('/pages/myLevel')">
							<view class="badge-pink row" v-if="userinfo">
								<image :lazy-load="true" class="re-image badge-img" :src="Utals.getImgUrl(userinfo.grade.title.designation_icon)" mode=""></image>
								<view class="badge-text">{{userinfo.grade.title.designation}}</view>
							</view>
							<view class="badge-pink badge-yellow row" v-if="userinfo">
								<image :lazy-load="true" class="re-image badge-img" :src="Utals.getImgUrl(userinfo.grade.grade_icon)" mode=""></image>
								<view class="badge-text">Lv.{{userinfo.grade.grade}}</view>
							</view>
						</view>
					</view>
					<view class="today-watch">
						今日免费观影次数<text class="watch-num">{{userinfo?userinfo.day_look_num : deviceinfp.day_look_num|| 0}}</text>/{{userinfo.look_num || deviceinfp.look_num || 0}}
					</view>
				</view>

				<view class="ligin-btn" v-if="!userinfo" @click="toLogin">
					立即登录
				</view>
			</view>
			<view class="item-list row">
				<view class="item" @click="toPage('/pages/myFollow')">
					<view>{{userinfo? userinfo.follow_count+userinfo.follow: "***"}}</view>
					<view class="desc">关注</view>
				</view>
				<view class="item" @click="toPage('/pages/myFans')">
					<view>{{userinfo?userinfo.follow_me_count +userinfo.fans: "***"}}</view>
					<view class="desc">粉丝</view>
				</view>
				<view class="item" @click="toPage('/pages/myRelease')">
					<view>{{userinfo?userinfo.post_count +userinfo.release: "***"}}</view>
					<view class="desc">发布</view>
				</view>
				<view class="item" @click="toPage('/pages/myFavorite')">
					<view>{{userinfo?userinfo.collection_count +userinfo.collection: "***"}}</view>
					<view class="desc">收藏</view>
				</view>
			</view>
		</view>
		<view class="user-box vip-box row between">
			<view class="info-box">
				<!-- <view class="top row">
					<view class="lv-left">
						lv0.小白
					</view>
					<view class="lv-right">
						lv1.入门
					</view>
				</view> -->
				<progress :percent="userinfo?userinfo.promote / userinfo.promote_count *100:0" activeColor="#10AEFF" stroke-width="3" />
				<view class="bottom-text">
					离增加观影次数只差 <text class="people-num">{{(userinfo.promote_count - userinfo.promote)||'--'}}</text>人
				</view>
			</view>
			<view class="go-btn" @click="toPromote()">
				推广升级
			</view>
		</view>
		<view class="user-box vip-box menu-list row">
			<view class="menu-item" @click="toPage('/pages/myLooked')">
				<image :lazy-load="true" class="item-image" src="../static/images/zb.png" mode=""></image>
				<view class="item-name">观看记录</view>
			</view>
			<!-- <view class="menu-item">
				<image :lazy-load="true" class="item-image" src="../static/images/qb.png" mode=""></image>
				<view class="item-name">我的钱包</view>
			</view> -->
			<view class="menu-item" @click="toPromote()">
				<image :lazy-load="true" class="item-image" src="../static/images/zx.png" mode=""></image>
				<view class="item-name">任务中心</view>
			</view>
			<view class="menu-item" @click="toPage('/pages/exchangeArea')">
				<image :lazy-load="true" class="item-image" src="../static/images/dh.png" mode=""></image>
				<view class="item-name">兑换专区</view>
			</view>
			<!-- 
			<view class="menu-item">
				<image :lazy-load="true" class="item-image" src="../static/images/UP.png" mode=""></image>
				<view class="item-name">成为UP主</view>
			</view> -->
			<view class="menu-item" @click="toPage('/pages/noticeList')">
				<image :lazy-load="true" class="item-image" src="../static/images/ld.png" mode=""></image>
				<view class="item-name">消息通知</view>
			</view>

			<!-- <view class="menu-item">
				<image :lazy-load="true" class="item-image" src="../static/aixinRed.png" mode=""></image>
				<view class="item-name">离线缓存</view>
			</view>
			<view class="menu-item">
				<image :lazy-load="true" class="item-image" src="../static/images/hd.png" mode=""></image>
				<view class="item-name">我的互动</view>
			</view> -->
		</view>

		<view class="user-box vip-box">
			<!-- <view class="ment-item-m border-bottom row between">
				<view class="m-text">意见回馈</view>
				<uni-icons type="arrowright" color="#888" size="50"></uni-icons>
			</view> -->
			<view class="ment-item-m border-bottom row between" @click="toPage('/pages/about')">
				<view class="m-text">关于我们</view>
				<uni-icons type="arrowright" color="#888" size="50"></uni-icons>
			</view>
			<view class="ment-item-m border-bottom row between" @click="toPotato()">
				<view class="m-text">社区交流群</view>
				<uni-icons type="arrowright" color="#888" size="50"></uni-icons>
			</view>
			<view class="ment-item-m border-bottom row between" @click="toPage('/pages/proShare')">
				<view class="m-text">分享给Ta</view>
				<uni-icons type="arrowright" color="#888" size="50"></uni-icons>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	const  wH  = uni.getSystemInfoSync().windowHeight;
	export default {
		components: {

			uniIcons,
		},
		data() {
			return {
				wh:wH+"px",
				userinfo: uni.getStorageSync("userinfo") || '',
				deviceinfp: uni.getStorageSync("device_info"),
				community: uni.getStorageSync("community"),
			}
		},
		onLoad() {

		},
		mounted() {
			let self = this
			this.eventBus.$on("logrefresh", function(_data) {
				self.getUser()
			})
			this.eventBus.$on("logout", function(_data) {
				self.userinfo = ''
			})
			this.getUser()
		},
		methods: {
			toPotato() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.community)
				// #endif
				// #ifdef H5
				location.href = this.community
				// #endif
			},
			getUser() {
				this.Utals.tokenAxios({
					url: "user_info",
					type: "POST",
					success: res => {
						if (res.code == 0) {
							this.userinfo = res.data
							uni.setStorageSync("userinfo", res.data)
						} else {
							this.Utals.showToast(res.msg)
						}
					},
					tokenError: () => {
						
					},
				})
			},
			toPromote() {
				this.$Router.push({
					page: "/pages/promote"
				})
			},
			toLogin() {
				this.$Router.push({
					page: "/pages/login"
				})
			}
		},

	}
</script>

<style>
	.badge-list {
		align-items: center;
		line-height: 24upx;
	}

	.badge-pink {
		background-color: pink;
		border-radius: 100upx;
		padding: 4upx 6upx;
		color: #E474BC;
		align-content: center;

	}

	.badge-yellow {
		background-color: #fdeb00;
	}

	.badge-text {
		line-height: 30upx;

		margin-left: 6upx;
		font-size: 24upx;
	}

	.badge-img {
		width: 30upx;
		height: 30upx;
		border-radius: 20upx;
	}

	.content {
		background-color: #F3F3F3;
		padding-bottom: 90upx;
		box-sizing: border-box;
	}

	.over-list {
		padding: 20upx;
	}

	.menu-list {
		flex-wrap: wrap;
	}

	.menu-item {
		width: 25%;
		text-align: center;
		margin: 24upx 0;
		font-size: 24upx;
	}

	.item-image {
		margin: 0 auto;
		width: 84upx;
		height: 84upx;
	}

	.place-holder {
		width: 100%;
		text-align: right;
		padding: 20upx;
	}

	.sitting-icon {
		font-size: 60upx;
	}

	.user-box {
		margin: 20upx auto;
		width: 720upx;
		border-radius: 5px;
		background-color: #fff;
		box-sizing: border-box;
	}

	.head-name {
		line-height: 50upx;
		padding: 20upx;
		align-items: center;
		position: relative;
	}

	.user-icon {
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		margin-right: 20upx;
	}

	.user-name {
		font-weight: bold;
	}

	.item {
		width: 25%;
	}

	.big-num {
		font-size: 40upx;
	}

	.item-list {
		text-align: center;
		padding: 40upx 0;
	}

	.desc {
		font-size: 24upx;
		color: #808080;
	}

	.top-title {
		justify-content: space-between;
		align-items: center;
		color: #e68e10;
		margin: 20upx 0;
	}

	.vip-box {
		box-shadow: 0 3px 11px #eee;
		padding: 20upx;
	}

	.vip-left {
		font-size: 30upx;
	}

	.vip-right {
		font-size: 24upx;
	}

	.bottom-ad {
		padding: 10upx;
	}

	.ad-item {
		margin: 0 10upx;
		padding: 16upx;
		border-radius: 5px;
		color: #fff;
		background-color: #007AFF;
		line-height: 50upx;
		width: 50%;
	}

	.ad-title {
		font-size: 30upx;
	}

	.ad-desc {
		font-size: 24upx;
	}

	.share-box {
		background: #F0AD4E;
		position: relative;
		padding: 30upx 20upx;
		font-size: 24upx;
		margin-bottom: 20upx;
	}

	.go-btn {
		margin-left: 10upx;
		border-radius: 100upx;
		box-shadow: 0 0 40upx #ff0000;
		color: #FFF;
		background-color: #ff0000;
		padding: 0upx 8upx;
		font-size: 24upx;
		height: 40upx;
	}

	.info-box {
		width: 530upx;
	}

	.lv-left {
		color: red;
		text-align: left;
		width: 50%;
	}

	.people-num {
		color: #F0AD4E;
		color: red;
	}

	.lv-right {
		text-align: right;
		width: 50%;
	}

	.ligin-btn {
		position: absolute;
		right: 20upx;
		top: 34upx;
		color: #fff;
		font-size: 30upx;
		padding: 6upx 16upx;
		border-radius: 5px;
		background-color: red
	}

	.between {
		justify-content: space-between;
	}

	.ment-item-m {
		padding: 20upx 0;
	}
</style>
