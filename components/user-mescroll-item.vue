<template>
	<!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
	<mescroll-uni :fixed="false"  @scroll="onScroll" :top="top" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
	 @emptyclick="emptyClick" @init="mescrollInit">
		<!-- 数据列表 -->
		<pd-list v-if="pdList.length"  :list="pdList"></pd-list>
	</mescroll-uni>
</template>

<style>
	
</style>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import PdList from "@/components/live-page/live-list.vue";
	import leftLineText from "@/components/left-line-text.vue";
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue' 
	export default {
		components: {
			MescrollUni,
			PdList,
			leftLineText,
			uniTag,
			uniIcons
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false, // 不自动加载
				},
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 4, 
					empty: {
						tip: '~ 空空如也 ~', // 提示
						
					},
					onScroll: true,
				},
				pdList: [], //列表数据
				isInit: false, // 列表是否已经初始化
				scrollY: 0,
				topPost: null
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
			top: {
				type: Number,
				default: function() {
					return 100
				}
			},
			_id: ""
		},
		watch: {
			// 监听下标的变化
			index(val) {
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.triggerDownScroll();
				}
			}
		},
		mounted() {
			// 第一个tab,自动加载数据
			if (this.i === this.initIndex) {
				this.isInit = true; // 标记为true
				this.mescroll.triggerDownScroll();
			}
		},
		methods: {
			onScroll(e) {
				this.eventBus.$emit('hideAll')
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if (mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					this.pdList = this.pdList.concat(curPageData); //追加新数据
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			},

			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				this.Utals.axios({
					url: "user_posts",
					data: {
						id:this.Utals.getUserId(),
						uid: this._id,
						limit: pageSize,
						page: pageNum,
					},
					success: (res) => {
						if (res.code == 0)
							successCallback && successCallback(res.data.data);
						else
							errorCallback && errorCallback();
					}
				})
			},
			
		}
	}
</script>
