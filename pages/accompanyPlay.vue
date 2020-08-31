<template>
	<view class="">
		<QSTabs ref="tabs" :tabs="tabs" animationMode="line1" :current="current" @change="change"
		 activeColor="#f1505c" lineColor="#f1505c" >
		</QSTabs>
		<swiper  ref="swiper" :style="{'height': wh}" :current="swiperCurrent" @transition="transition"
		 @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<follow-user-mescroll :top="30" :initIndex="initIndex" :i="index" :index="swiperCurrent"></follow-user-mescroll>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import QSTabs from '../components/QS-tabs/QS-tabs.vue';
	import followUserMescroll from "@/components/follow-user-mescroll.vue";
		import UniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
			var statusBarHeight =uni.getSystemInfoSync().statusBarHeight + 'px'
			const  wH  = uni.getSystemInfoSync().windowHeight;
	export default {
		components: {
			uniNavBar,
			followUserMescroll,
			QSTabs,
			UniStatusBar
		},
		data() {
			return {
				wh:wH - uni.upx2px(89) + "px",
				tabs: ["LOL", "绝地求生","穿越火线","DNF"],
				current: 0,
				swiperCurrent: 0,
				initIndex: 0,
				tabsHeight: 0,
				dx: 0,
				statusBarHeight:statusBarHeight
			}
		},
		methods:{
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

<style>
	
	
</style>
