<template>
	<div class="loading" :class="{ absolute, [theme]: theme }" v-show="loading">
		<div class="loading-content">
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
	// false:全屏loading true:局部loading
	absolute: {
		type: Boolean,
		default: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	theme: {
		type: String,
		default: "dark",
	},
});
</script>

<style scoped lang="scss">
.loading {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 200;
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;

	&.absolute {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 300;
	}
	&.light {
		background-color: hsla(0,0%,100%,.9);
	}
	&.dark {
		background-color: rgba(0, 0, 0, 0.8);
	}
	&-content {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	.el-icon-loading {
		color: #0960bd;
	}
	.tip {
		color: #0960bd;
	}
}
</style>
