<template>
	<!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
	<mescroll-uni class="" :fixed="false" :top="top"  :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
	 @emptyclick="emptyClick" @init="mescrollInit">
		<view  class="only-home padd_bvox">
			<uni-swiper-dot :info="info" :current="current" mode="round" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change" :loop="true" :duration="1000" autoplay=true :interval="3000">
					<swiper-item v-for="(item, index) in info" :key="index">
						<view  class="swiper-item">
							<image :lazy-load="true" class="re-image" :src="Utals.getImgUrl(item.img)" mode="" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		
		<!-- 数据列表 -->
		<view class="padd_bvox">
			<pd-list class="" :liveList="pdList" ></pd-list>
		</view>
		
	</mescroll-uni>
</template>

<style>
	view,
	text {
		box-sizing: border-box;
	}
	
	page {
		background-color: white;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
		max-width: 750upx;
		padding-left: 0;
		margin-left: 0;
		margin: 0 auto;
		font-family: "PingFangSC-Medium", "microsoft yahei", "\5FAE\8F6F\96C5\9ED1" !important;
	}
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background-color:  transparent;
	}
	
.only-home{
	padding-bottom: 10upx;
}
.swiper-item{
	width: 100%;
	height: 100%;
	border-radius: 5px;
	overflow: hidden;
}
.re-image{
	border-radius: 5px;
	overflow: hidden;
}
.swiper-box{
	border-radius: 5px;
	overflow: hidden;
	height: 250upx;
}
.rank{
	padding: 16upx 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.rank_img{
	width: 70upx;
	height: 70upx;
}
.rank_info{
	line-height: 38upx;
}
.rank_title{
	font-size: 30upx;
}
.rank_desc{
	font-size: 24upx;
	color: #F0AD4E;
}
.img_list{
	display: flex;
	flex-direction: row;
}
.list_item{
	margin: 0 10upx;
}
.padd_bvox{
	
}

</style>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import PdList from "@/components/live-page/live-list.vue";
	import leftLineText from "@/components/left-line-text.vue";
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
		import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
		import TestData from "../../static/js/vertrul.js"
	export default {
		components: {
			MescrollUni,
			PdList,
			leftLineText,
			uniTag,
			uniIcons,
			uniSwiperDot
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false, // 不自动加载
				},
				upOption: {
					auto: false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
						
					}
				},
				pdList: [], //列表数据
				isInit: false, // 列表是否已经初始化
				scrollY: 0,
				
				info: [
					{img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=229417636,103135504&fm=26&gp=0.jpg"},
					{img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=229417636,103135504&fm=26&gp=0.jpg"},
					{img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=229417636,103135504&fm=26&gp=0.jpg"},
					{img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=229417636,103135504&fm=26&gp=0.jpg"}
				],
				dotsStyles: {
					backgroundColor: 'rgba(255, 90, 95,0.3)',
					border: '1px rgba(255, 90, 95,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
					selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
				},
					current: 0,
			}
		},
		props: {
			initIndex: Number,
			i: Number, // 每个tab页的专属下标
			index: { // 当前tab的下标
				type: Number,
				default () {
					return 0
				}
			},
			top:{
				type:Number,
				default:function(){
					return 100
				}
			}
		},
		watch: {
			index(val) {
				if (this.i === val && !this.isInit) {
					this.isInit = true; 
					this.mescroll.triggerDownScroll();
				}
			}
		},
		mounted() {
			
			if (this.i === this.initIndex) {
				// this.Utals.axios({
				// 	url:"circle_matters",
				// 	success:res=>{
				// 		this.info = res.data
				// 	}
				// })
				this.isInit = true; // 标记为true
				this.mescroll.triggerDownScroll();
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			upCallback(mescroll) {
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData) => {
					mescroll.endSuccess(curPageData.length);
					if (mescroll.num == 1) this.pdList = [];
					this.pdList = this.pdList.concat(curPageData); //追加新数据
					
				}, () => {
					mescroll.endErr();
				})
			},
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			},

			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				setTimeout(()=>{
					successCallback && successCallback(TestData);
				},2000)
				// this.Utals.axios({
				// 	url: "posts_channel_posts",
				// 	data: {
				// 		cid: 6,
				// 		uid: this.Utals.getUserId(),
				// 		limit: pageSize,
				// 		page: pageNum,
				// 		type:"",
				
				// 	},
				// 	success: (res) => {
				// 		if (res.code == 0)
				// 			{
				// 				res.data.data.splice(res.data.data.length-1, 1)
				// 				successCallback && successCallback(res.data.data);
				// 			}
				// 		else
				// 			errorCallback && errorCallback();
				// 	}
				// })
			}
		}
	}
</script>
