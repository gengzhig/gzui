<!--
 * @Author: gz
 * @Date: 2021-07-29 16:33:23
 * @LastEditors: gz
 * @LastEditTime: 2021-09-15 09:12:11
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tabs\index.vue
-->
<template>
	<div class="comp-tag" :style="{ width: width + 'px', height: height + 'px' }">
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

		<div class="tag-content">
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
	onMounted,
	reactive,
	useSlots,
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
const slots = useSlots();
const state = reactive({
	content: "",
	curIndex: 0,
	slots: slots.default().filter(t => t.type == "div"),
});
onMounted(() => {
	state.curIndex = state.slots.findIndex(s => s.props.name === props.activeName);
	if (slots.default() && slots.default()[state.curIndex].el) {
		slots.default()[state.curIndex].el.classList.add("active");
	}
});
const select = index => {
	state.curIndex = index;
	if (slots.default() && slots.default()[state.curIndex].el) {
		slots.default().map(s => s.el.classList.remove("active"));
		slots.default()[state.curIndex].el.classList.add("active");
	}
};
</script>

<style lang="scss">
.comp-tag {
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
	.tag-content {
		.tab-pane {
			display: none;
			&.active {
				display: block;
			}
		}
	}
}
</style>
