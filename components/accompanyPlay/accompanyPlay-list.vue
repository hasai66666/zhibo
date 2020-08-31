<template>
	<view class="live-list">
		<view class="live-item" v-for="item in liveList" :key="item.id" @click="toLiveing(item.id)">
			<image :lazy-load="true" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587326239429&di=497cec29ace80499686f4d532549b081&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2F0%2Fe6%2Ff119621393.jpg" class="re-image" mode="aspectFill"></image>
			<view class="bottom-info">
				<view class="title">
					{{item.title}}
				</view>
				<view class="name-brows row">
					<view class="name-warp row">
						<view class="dot">•</view>
						<text class="name">{{item.user.username}}</text>
					</view>
					<view class="love row">
						<image :lazy-load="true" src="../../static/aixinRed.png" class="re-image love-img" mode=""></image>
					
						<view class="">
							{{item.fabulous }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			liveList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},

	}
</script>

<style>
	.love-img{
		width: 40upx;
		height: 40upx;
	}
	.live-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.live-item {
		border-radius: 5px;
		background-image: url(../../static/images/default.1b321070.png) no-repeat center;
		background-size: 100% 100%;
		margin-bottom: 30upx;
		width: 330upx;
		height: 250upx;
		position: relative;
		overflow: hidden;
	}

	.bottom-info {
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 10upx;
		color: #fff;
		width: 100%;
		line-height: 34upx;
	}

	.title {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
	}

	.name-brows {
		justify-content: space-between;
		align-content: center;
		font-size: 24upx;
	}
	.brows{
		flex-grow: 1;
		text-align: right;
	}
	.dot {
		color: #DD524D;
		margin-right: 5upx;
		font-size: 50upx;
	}
</style>
