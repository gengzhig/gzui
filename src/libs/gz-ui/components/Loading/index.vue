<template>
	<div class="loading-comp" :class="{ full, [theme]: theme }" v-show="loading">
		<div class="loading-comp-content">
			<i class="el-icon-loading"></i>
			<div class="tip">
				<slot>加载中...</slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzLoading",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
const props = defineProps({
	// true:全屏 false:局部
	full: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: true,
	},
	theme: {
		type: String,
		default: "dark",
	},
});
</script>

<style scoped lang="scss">
.loading-comp {
	// position: fixed;
	// top: 0;
	// left: 0;
	z-index: 200;
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	padding: 5px 0;

	&.full {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 300;
	}
	&.light {
		background-color: hsla(0, 0%, 100%, 0.9);
	}
	&.dark {
		background-color: rgba(0, 0, 0, 0.8);
	}
	&-content {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}
	.el-icon-loading {
		color: #0960bd;
	}
	.tip {
		color: #0960bd;
	}
}
</style>
