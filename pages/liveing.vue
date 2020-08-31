<template>
	<view class="back-black">
		<cover-view>
			<view class="full-screen ">
				<view class="top-group row padd_bvox">
					<view class="user-box row">
						<view class="cu-avatar round " :style="[{ backgroundImage: 'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)' }]"></view>
						<view class="name-box">
							<view class="name">啦啦啦</view>
							<view class="id">ID:554126</view>
						</view>
						<button class="cu-btn round sm text-blue">关注</button>
					</view>
					<view class="">
						<view class="cu-avatar round " v-for="(item, index) in avatar" :key="index" :style="[{ backgroundImage: 'url(' + avatar[index] + ')' }]"></view>
						<text class="cu-avatar round text-sm text-white text-gray ">50</text>
						<text class="cu-avatar round  text-gray cuIcon-close"></text>
					</view>
					
				</view>

				<view class="bottom-group padd_bvox">
					<view class="message-box">
						<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
						@scroll="scroll">
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							<view>54sd4asd45ads</view>
							v
						</scroll-view>
						
					</view>
					<view class="row userbtns">
						<view class="input-box ">
							<input  class="say-input"  placeholder="说点什么" ></input>
						</view>
						<view class="icons">
							<text class="cu-avatar round  text-white cuIcon-forwardfill"></text>
							<text class="cu-avatar round  text-white cuIcon-choicenessfill"></text>
							<text class="cu-avatar round  text-white cuIcon-close"></text>
							<text class="cu-avatar round  text-white cuIcon-likefill"></text>
						</view>
					</view>
				</view>
			</view>
		</cover-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			avatar: [
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
			]
		};
	},
	methods: {
		upper: function(e) {
			console.log(e)
		},
		lower: function(e) {
			console.log(e)
		},
		scroll: function(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		},
		goTop: function(e) {
			// 解决view层不同步的问题
			this.scrollTop = this.old.scrollTop
			this.$nextTick(function() {
				this.scrollTop = 0
			});
			uni.showToast({
				icon:"none",
				title:"纵向滚动 scrollTop 值已被修改为 0"
			})
		}
	}
};
</script>

<style>
	.icons{
		width: 300upx;
		display: flex;
		justify-content: space-between;
	}
	.userbtns{
		justify-content: space-between;
	}
.message-box {
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 10upx;

	width: 600upx;
	height: 40vh;
	margin-bottom: 10upx;
	color: #ffffff;
	font-size: 36upx;
	padding: 10upx;
}
.scroll-Y {
		height: 39vh;
	}
.back-black {
	background-color: #ffffff;
	width: 100%;
	height: 100vh;
}
.full-screen {
	position: absolute;
	left: 0;
	top: 0;
	margin: auto;
	width: 100%;
	height: 100%;
	max-width: 750upx;
	z-index: 999;
}
.top-group {
	justify-content: space-between;
}
.user-box {
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 100upx;
	width: 300upx;
	justify-content: space-between;
}
.name-box {
	color: #ffffff;
	text-align: left;
	margin-left: 6upx;
}
.name {
	font-size: 26upx;
}
.id {
	font-size: 22upx;
}
.input-box {
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 100upx;
	width: 300upx;
	padding: 10upx;
}
.say-input {
	font-size: 24upx;
}
.bottom-group {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
