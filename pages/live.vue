<template>
	<view>
		

		<view class="QS-tabs-box ">
			<QSTabs ref="tabs" :tabs="tabs" animationMode="line3" :current="current" @change="change" activeColor="#f1505c"
			 lineColor="#f1505c" swiperWidth="750">
			</QSTabs>
		<!-- 	<view class="channel-btn">
				<uni-icons class="channel-icon" type="search" color="#333" size="80" />
			</view> -->
		</view>

		<swiper :style="{'height': wh}" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<live-mescroll :initIndex="initIndex" :i="index" :index="swiperCurrent"></live-mescroll>
			</swiper-item>
		</swiper>


	</view>
</template>

<script>
	import QSTabs from '../components/QS-tabs/QS-tabs.vue';
	import liveMescroll from "@/components/live-page/live-mescroll.vue";
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue' 
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	const Sys = uni.getSystemInfoSync(); 
	const wH = Sys.windowHeight;
	let n = 1;
	const tabs = [ "精选","可爱","御姐","火热","可爱","可爱","可爱","可爱","可爱","可爱","可爱","可爱","可爱",]

	export default {
		components: {
			QSTabs,
			liveMescroll,
			uniBadge,
			uniIcons,
		},
		data() {
			return {
				wh:wH - uni.upx2px(90) + "px",
				tabs: [...tabs],
				current: 0,
				swiperCurrent:0,
				initIndex: 0,
				dx: 0,
			}
		},
		mounted() {

		},
		methods: {
			change(index) {
				this.swiperCurrent = index;
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

<style scoped>
	// #ifdef H5
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background-color:  transparent;
	}
	// #endif

	.QS-tabs-box {
		width: 100%;
		position: fixed;
		top: var(--status-bar-height);
		z-index: 10;
		overflow: hidden;
		background-color:  #FFFFFF;
	}

	.channel-btn {
		position: absolute;
		right: 0;
		top: 0;
		background-color:  #FFFFFF;
		border-left: #333333;
		box-shadow: 0 0 20upx #333333;
		height: 100%;
		width: 80upx;
		z-index: 102;
		font-size: 40upx;
		line-height: 74upx;
		text-align: center;
	}


	.pop_item {
		border-bottom: 1px solid #f3f3f3;
		padding: 30upx;
		text-align: center;
		font-size: 30upx;
		line-height: 30upx;
		background-color:  #fff;
	}

	.qiut {
		margin-top: 20upx;
		color: #007AFF;
	}

	.uni_pop_change {
		background-color:  #f3f3f3;
	}

	.uni-popup {
		z-index: 10;
	}
</style>
