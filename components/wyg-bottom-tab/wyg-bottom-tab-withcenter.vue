<template>
	<view class="bottom-tab">
		<view :class="item.center==true?'bottom-tab-item-center':'bottom-tab-item-sider' " @click="changeTap(item)" v-for="(item,index) in tabList"
		 :key="index">
			<image :lazy-load="true" v-if="curTab==item.id" class="first-img" :src="item.imgOn"></image>
			<image :lazy-load="true" v-if="curTab!=item.id" class="first-img" :src="item.imgOff"></image>
			<text :class="curTab==item.id?'text-position text-on':'text-position'">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "wyg-bottom-tab-withcenter",
		props: {
			tabIndex: {
				//图片的尺寸
				type: Number,
				default: 0
			},
			tabListParent: {
				type: Array,
				default: function() {
					return []
				}
			},
		},
		data() {
			return {
				curTab: 1,
				tabList: [

				]

			}
		},

		mounted: function() {

		},
		activated: function() {
			this.curTab = new Number(this.tabIndex);
		},
		deactivated: function() {

		},


		created() {
			this.curTab = new Number(this.tabIndex);
			if (this.tabListParent.length > 0) {
				this.tabList = this.tabListParent;
			}
		},
		methods: {
			
			changeTap(e) {
				this.curTab = e.id;
				this.eventBus.$emit("cur_index",e.id)
			}

		}
	}
</script>

<style lang="scss">
	.bottom-tab {
		position: fixed;
		background-color: #FDFDFD;
		bottom: 0%;
		width: 100%;
		height: 90upx;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
	}
	.bottom-tab-item-sider {
		width: 19%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.first-img {
		width: 1.4rem;
		height: 1.4rem;
	}
	
	.text-position {
		margin-top: 0rem;
		font-size: 0.6rem;
		color:rgb(241, 80, 92);
	}
	
	.text-on {
		color: #FFB400;
	}
	.bottom-tab-item-center {
		width: 24%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-position {
		margin-top: 0rem;
		font-size: 0.6rem;
		color: #757575;
	}
		
	.text-on {
		color: rgb(241, 80, 92);
	}
</style>
