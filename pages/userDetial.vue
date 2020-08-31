<template>
	<view @touchend="ListTouchEnd" @touchstart="ListTouchStart" @touchmove="ListTouchMove">

		<view class="bakc-img">
			<image :lazy-load="true" class="re-image back-rimg" src="../static/images/16sucai_p20161023024_07d.png" mode=""></image>
			<view class="navBar-self row" :style="{height:topHeight+'px','padding-top':statusBarHeight}">
				<view class="back-fff border-bottom" :style="{opacity:topOpacity,height:topHeight+'px'}"></view>
				<view class="row">
					<uni-icons class="left-back" type="arrowleft" :color="isAtTop?'#ccc':'#fff'" size="80" @click="back(this)"></uni-icons>
					<view class="user-info row" :style="{opacity:topOpacity}">
						<view class="image-warp small-img">
							<image :lazy-load="true" class="re-image " :src="Utals.getImgUrl(user.icon)" mode=""></image>
						</view>
						<view class="name-brows small-font">
							<view class="name">{{user.username}}</view>
						</view>
					</view>
				</view>
				<uni-icons class="group-info" type="more-filled" size="50" v-if="this.Utals.getUserId() != user.id" @click="showBottom"
				 :style="{color:isAtTop?'#ccc':'#fff'}"></uni-icons>
			</view>
		</view>


		<view class="radius5px padd_bvox user-box">
			<view class="top_info border-bottom">
				<view class="image-warp">
					<image :lazy-load="true" class="re-image" :src="Utals.getImgUrl(user.icon)" mode=""></image>
				</view>
				<view class="name-brows ">
					<view class="name">{{user.username}}</view>
					<view class="desc small-text gray-text">{{user.autograph}}</view>
				</view>
				<view class="fav-btn gray-text" v-if="this.Utals.getUserId() == user.id" @click="toPage('/pages/myInfo')">编辑</view>
				<view class="fav-btn" v-else @click="doFollow(user.id)" :class="{'followed':user.follow_status}">{{user.follow_status?'已关注':'+关注'}}
				</view>
			</view>
			<view class="brows row">
				<text class="small-text brows-itme gray-text">{{user.follow + user.follow_count}}关注 </text>
				<text class="small-text brows-itme gray-text">{{user.posts_num}}帖子</text>
			</view>

		</view>
		<view class="no-back"></view>
		<view class="move-box" ref="moveDiv" :style="{top:top}">
			<QSTabs ref="tabs" :tabs="tabs" animationMode="line3" :current="current" @change="change" activeColor="#f1505c"
			 lineColor="#f1505c" swiperWidth="750" minWidth="240">
			</QSTabs>
			<swiper v-if="user.id" ref="swiper" :style="{'height': wh}" :current="swiperCurrent" @transition="transition"
			 @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
					<user-mescroll-item v-if="index == 0" :top="0" :_id="user.id" :initIndex="initIndex" :i="index" :index="swiperCurrent"></user-mescroll-item>
					<user-mescroll-item v-if="index == 1" :top="0" :_id="user.id" :initIndex="initIndex" :i="index" :index="swiperCurrent"></user-mescroll-item>
					<view v-if="index == 2" class="user-info padd_bvox">
						<view class="item-box border-bottom">
							<view class="title">
								身份信息
							</view>
							<view class="gray-text">
								身份：普通用户
							</view>
							<view class="gray-text">
								经验值：{{user.experience}}
							</view>
						</view>
						<view class="item-box border-bottom">
							<view class="title">
								基本信息
							</view>
							<view class="gray-text">
								性别：{{user.gender==1?'男':'女'}}
							</view>
							<view class="gray-text">
								地区：{{user.address||''}}
							</view>
							<view class="gray-text">
								注册日期：{{user.create_time}}
							</view>
						</view>
						<view class="item-box border-bottom">
							<view class="title">
								社交信息
							</view>
							<view class="gray-text">
								生日：{{user.birthday || '未知'}}
							</view>
							<view class="gray-text">
								性取向：{{orientations[user.orientation] || '未知'}}
							</view>
							<view class="gray-text">
								婚恋：{{loves[user.love] || '未知'}}
							</view>
							<view class="gray-text">
								交友意向：{{intentions[user.intention] || '未知'}}
							</view>
						</view>
						<view class="item-box border-bottom">
							<view class="title">
								账号状态
							</view>
							<view class="gray-text">
								{{user.status == 1?"账号无异常":"账号冻结"}}
							</view>

						</view>
						<view class="item-box border-bottom">
							<view class="title">
								个性签名
							</view>
							<view class="gray-text">
								{{user.autograph}}
							</view>

						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import QSTabs from '../components/QS-tabs/QS-tabs.vue';
	import userMescrollItem from "@/components/user-mescroll-item.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {
	    mapState 
	} from 'vuex'; 
	const tabs = ["最热", "最新", "档案"]
	const  wH  = uni.getSystemInfoSync().windowHeight;
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {
		components: {
			uniIcons,
			QSTabs,
			userMescrollItem,
			uniPopup,

		},
		data() {
			return {
					wh:wH - uni.upx2px(161) + "px",
				orientations: ["", "男", "女", "双性恋"],
				loves: ["", "单身", "恋爱中", "已婚", "离异", "丧偶"],
				intentions: ["", "勿扰", "求撩", "走心", "走肾"],
				tabs: [...tabs],
				current: 0,
				swiperCurrent: 0,
				initIndex: 0,
				tabsHeight: 0,
				dx: 0,
				top: "556upx",
				currentTop: 556,
				baseTop: 556,
				touchStartPosY: 0,
				topOpacity: 0,
				topHeight: 120,
				isAtTop: false,
				user: {},
				moveTimer: null,
				offsetY: 0,
				statusBarHeight: statusBarHeight
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo','getMsg'])
			
		},
		onLoad(options) {
			this.user = this.userInfo
			console.log(this.user)
		},
		mounted() {
			this.top = uni.upx2px(this.baseTop) + "px"
			this.currentTop = uni.upx2px(this.baseTop)
			this.baseTop = uni.upx2px(this.baseTop)
			this.topHeight = uni.upx2px(this.topHeight)
		},
		methods: {
			doFollow(id) {
				// this.Utals.tokenAxios({
				// 	url: "users_follow",
				// 	type: "POST",
				// 	data: {
				// 		uids: id
				// 	},
				// 	success: res => {
				// 		if (res.code == 0) {
				// 			this.user.follow_status = res.data.status
				// 		} else {
				// 			this.Utals.showToast(res.msg)
				// 		}
				// 	}
				// })
			},
			showBottom() {
				uni.showActionSheet({
					itemList: ['举报', '关注', '屏蔽'],
					success: (e) => {
						switch (e.tapIndex) {
							case 0:
								{
									this.toPage("/pages/reportUser", {
										id: this.user.id,
										tag_type: 3
									})
									break;
								}
							case 1:
								{
									this.doFollow(this.user.id)
									break;
								}
						}
					}
				})
			},
			ListTouchStart(e) {
				clearInterval(this.moveTimer)
				this.touchStartPosY = e.touches[0].clientY
			},
			ListTouchMove(e) {
				const offsetY = e.touches[0].clientY - this.touchStartPosY
				this.touchStartPosY = e.touches[0].clientY
				this.isStop(offsetY)
			},
			ListTouchEnd(e) {
				this.isStop(this.offsetY - this.offsetY * 0.05,true)
			},
			change(index) {
				this.swiperCurrent = index;
			},
			isStop(offsetY,ended) {
				
				let self = this

				this.currentTop += offsetY
				this.topOpacity = 1 - (this.currentTop) / (this.baseTop - this.topHeight)
				this.isAtTop = false
				if (offsetY > 0) {
					if (this.currentTop >= this.baseTop) {
						this.currentTop = this.baseTop
						this.topOpacity = 0
					}
				} else {
					if (this.currentTop <= this.topHeight) {
						this.currentTop = this.topHeight
						this.topOpacity = 1
						this.isAtTop = true
					}
				}
				this.top = this.currentTop + "px"
				this.offsetY = offsetY
				if (Math.abs(this.offsetY) > 0.5 && !this.isAtTop && ended)
					setTimeout(() => {
							self.isStop(self.offsetY - self.offsetY * 0.05,true)
					}, 20)
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
		}
	}
</script>

<style>
	.item-box {
		padding: 10upx 0;
	}

	.title {
		margin-bottom: 10upx;
		font-size: 30upx;
	}

	.bakc-img {

		height: 280upx;
	}

	.back-rimg {
		position: absolute;
		left: 0;
		top: 0;
		height: 280upx;
		width: 100%;
	}

	.user-box {
		background-color: #fff;
		margin-top: -30upx;
	}

	.top_info {
		display: flex;
		flex-direction: row;
		padding: 10upx 0;
		align-items: center;
	}

	.user-info {
		z-index: 10;
		flex-grow: 1;
	}

	.group-info {
		z-index: 10;
		font-size: 64upx;
	}

	.image-warp {
		border-radius: 50%;
		overflow: hidden;
		vertical-align: middle;
		width: 120upx;
		height: 120upx;
		justify-content: center;
		margin-right: 20upx;

	}

	.small-img {
		width: 60upx;
		height: 60upx;
	}

	.name-brows {
		display: block;
		width: 400upx;
		line-height: 60upx;
		flex-grow: 1;

	}

	.left-back {
		margin-right: 30upx;
		z-index: 10;
		font-size: 50upx;
	}

	.fav-btn {
		width: 100upx;
		background-color: red;
		border-radius: 100upx;
		height: 40upx;
		color: #fff;
		text-align: center;
		line-height: 40upx;
	}

	.brows {
		font-size: 24upx;
		padding: 20upx 0;
	}

	.brows-itme {
		margin-right: 80upx;
	}

	.small-text {
		margin-right: 20upx;
		font-size: 24upx;
	}

	.no-back {
		background-color: #F3F3F3;
		height: 12upx;
	}

	.notice-badge {
		background-color: #F3F3F3;
		border-radius: 3px;
		color: red;
		width: 100upx;
		text-align: center;
		margin-right: 30upx;
	}

	.pop_item {
		border-bottom: 1px solid #f3f3f3;
		padding: 30upx;
		text-align: center;
		font-size: 30upx;
		line-height: 30upx;
		background-color: #fff;
	}

	.qiut {
		margin-top: 20upx;
		color: #007AFF;
	}

	.uni_pop_change {
		background-color: #f3f3f3;
	}

	.uni-popup {
		z-index: 10;
	}

	.move-box {
		position: fixed;
		left: 0;
		width: 100%;
		background-color: #fff;
	}

	.navBar-self {
		position: relative;
		width: 100%;
		justify-content: space-between;
		padding: 0 20upx;
	}

	.back-fff {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #fff;
		width: 100%;
	}
</style>
