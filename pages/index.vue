<template>
	<view class="">
		<live v-if="curIndex == 0" />
		<accompanyPlay v-if="curIndex == 1" />
		<Infos v-if="curIndex == 2" />
		<user v-if="curIndex == 3" />
		<wyg-bottom-tab-withcenter :tabIndex="curIndex" :tabListParent="tabList"></wyg-bottom-tab-withcenter>
	</view>
</template>

<script>
import wygBottomTabWithcenter from '@/components/wyg-bottom-tab/wyg-bottom-tab-withcenter.vue';
import TAB_LIST from '../static/js/botoom-list2.js';

import Live from './live.vue';
import Infos from './infos/infos.vue';
import accompanyPlay from "./accompanyPlay.vue"
import user from "./user.vue"
export default {
	components: {
		Live,
		Infos,
		user,
		accompanyPlay,
		wygBottomTabWithcenter
	},
	data() {
		return {
			tabList: TAB_LIST,
			curIndex: uni.getStorageSync('curIndex') || 0
		};
	},
	mounted() {
		let self = this;
		this.eventBus.$on('cur_index', function(data) {
			console.log(data)
			self.curIndex = data;
			uni.setStorageSync('curIndex', this.curIndex);
		});
	},
	methods: {}
};
</script>

<style></style>
