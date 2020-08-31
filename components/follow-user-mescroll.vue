<template>
	<!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
	<mescroll-uni :fixed="false" :top="top" bottom="40" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
	 @emptyclick="emptyClick" @init="mescrollInit">
	 <view class="user-list">
			<view class="user-item row border-bottom" v-for="(item,index) in pdList" :key="item.id">
				<image :lazy-load="true" class="re-image" :src="Utals.getImgUrl(item.icon)" mode=""  @click="toPage('/pages/userDetial',{id:item.id})"></image>
				<view class="infos"  @click="toPage('/pages/userDetial',{id:item.id})">
					<view class="name row">
						<text>{{item.username}}</text>
						<image :lazy-load="true" class="gender-img" :src="`../../../static/images/g_${item.gender}.png`" mode=""></image>
					</view>
					<view class="servered row">
						<text>服务{{item.severed}}人</text>
						<text>{{item.nice}}人推荐</text>
					</view>
					<view class="desc price small-font">
						{{item.price}}/局
					</view>
				</view>
				<view class="follow follow_removed"  :class="{'followed':item.online}">{{item.online?'离线':'在线'}} </view>
			</view>

	 </view>
		
	</mescroll-uni>
</template>

<style>
	.user-list{
		padding: 0 30upx;
	}
	.user-item{
		padding: 16upx 0;
		justify-content: space-between;
	}
	.re-image{
		border-radius: 50%;
		width: 90upx;
		height:90upx;
		margin:0 10upx;
		margin-right: 20upx;
	}
	.gender-img{
		margin-left: 10upx;
		border-radius: 50%;
		width: 40upx;
		height: 40upx;
	}
	.small-font{
		font-size: 24upx;
	}
	.infos{
		flex-grow: 1;
	}
	.name{
		font-size: 32upx;
	}
	.follow{
		border-radius: 100upx;
		background-color: #888888;
		color: #F3F3F3;
		padding: 0upx 20upx;
		
	}
	.follow_removed{
		background-color: red;
		color: #fff;
	}
	.servered{
		justify-content: space-between;
		width: 300upx;
	}
	.price{
		color: #F0AD4E;
	}
</style>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			MescrollUni,
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false, // 不自动加载
				},
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
						
					}
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
		},
		watch: {
			index(val) {
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.triggerDownScroll();
				}
			}
		},
		mounted() {
			if (this.i === this.initIndex) {
				this.isInit = true; // 标记为true
				this.mescroll.triggerDownScroll();
			}
		},
		methods: {
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
					this.pdList = this.pdList.concat(curPageData); 
				}, () => {
					mescroll.endErr();
				})
			},
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			},
			doFollow(id,index){
				this.Utals.tokenAxios({
					url:"users_follow",
					type:"POST",
					data:{
						uids:id
					},
					success:res=>{
						if(res.code == 0)
						{
							this.pdList[index].follow_status = res.data.status
						}
						else{
							this.Utals.showToast(res.msg)
						}
					}
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				successCallback && successCallback([{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:true,
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:true,
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:true,
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:false,
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:false,
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:true,
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:true,
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:true,
				},{
					icon:"https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/51/28_avatar_max.jpg",
					gender:1,
					username:"卡卡爱卡卡",
					price:"81",
					severed:999,
					nice:333,
					online:true,
				},]);
				// this.Utals.tokenAxios({
				// 	url: "user_low",
				// 	type:"POST",
				// 	data: {
				// 		limit: pageSize,
				// 		page: pageNum,
				// 		name:"follow"
				// 	},
				// 	success: (res) => {
				// 		if (res.code == 0)
				// 		{
				// 			res.data.data.map(item=>{
				// 				item.follow_status = true
				// 			})
				// 			successCallback && successCallback(res.data.data);
				// 		}
				// 		else
				// 			errorCallback && errorCallback();
				// 	}
				// })
			},
			
		}
	}
</script>
