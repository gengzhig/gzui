<!--
 * @Author: gz
 * @Date: 2021-07-29 16:33:23
 * @LastEditors: gz
 * @LastEditTime: 2021-09-09 14:24:59
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tabs\index.vue
-->
<template>
	<div class="tag" :style="{ width: width + 'px', height: height + 'px' }">
		<div class="header" :style="{ height: headerHeight + 'px' }">
			<span
				:class="['tab', index == state.curIndex ? 'active' : '']"
				v-for="(item, index) in state.slots"
				:key="index"
				@click="select(index)"
			>
				{{ item.props.label }}
			</span>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzTabs",
};
</script>

<script setup>
import {
	computed,
	defineProps,
	onMounted,
	reactive,
	toRefs,
	ref,
	nextTick,
	watch,
	getCurrentInstance,
	callWithAsyncErrorHandling,
} from "vue";
const props = defineProps({
	activeName: {
		type: String,
	},
	width: {
		type: Number,
		default: 400,
	},
	height: {
		type: Number,
		default: 200,
	},
	headerHeight: {
		type: Number,
		default: 60,
	},
});
const ctx = getCurrentInstance();

const state = reactive({
	content: "",
	curIndex: 0,
	slots: ctx.slots.default().filter(t => t.type == "div"),
});
onMounted(() => {
	state.curIndex = state.slots.findIndex(s => s.props.name === props.activeName);
	ctx.slots.default()[state.curIndex].el.classList.add("active");
});
const select = index => {
	state.curIndex = index;
	ctx.slots.default().map(s => s.el.classList.remove("active"));
	ctx.slots.default()[state.curIndex].el.classList.add("active");
};
</script>

<style lang="scss" scoped>
.tag {
	border: 1px solid #ccc;
	.header {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		background: #2ed573;
		.tab {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			cursor: pointer;
			&.active {
				background: chartreuse;
			}
		}
	}
}
</style>
