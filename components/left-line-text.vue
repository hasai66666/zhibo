<template>
	<view class="left-lint-text">
		<view class="row">
			<view class="lef-line"></view>
			<text>{{text}}</text>
		</view>
		<view class="right_slot">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			text:{
				type:String,
				default:function(){
					return ""
				}
			}
		}
	}
</script>

<style>
	.left-lint-text{
		padding:  30upx 0;
		display: flex;
		flex-direction: row;
		color: #808080;
		font-size:26upx;
		line-height: 30upx;
		justify-content: space-between;
	}
	.lef-line{
		width: 8upx;
		height: 30upx;
		background-color:  #808080;
		border-radius: 4upx;
		margin-right: 10upx;
	}
</style>
