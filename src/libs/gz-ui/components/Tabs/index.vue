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
				@click="select(index, item)"
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
import { ref, onMounted, computed, reactive, useSlots, getCurrentInstance, provide } from "vue";
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
	headerBgColor: {
		type: String,
		default: "#2ed573",
	},
	headerBgActiveColor: {
		type: String,
		default: "chartreuse",
	},
});
const slots = useSlots();
const state = reactive({
	content: "",
	curIndex: 0,
	slots: slots.default().length > 1 ? slots.default() : slots.default()[0].children,
});

let activeKey = ref(props.activeName); //当前key
const select = (index, item) => {
	activeKey.value = item.props.name;
	state.curIndex = index;
};
provide("activeKey", activeKey);
</script>

<style lang="scss">
.comp-tag {
	height: 100%;
	width: 100%;
	border: 1px solid #ccc;
	.header {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		background: v-bind(headerBgColor);
		.tab {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			cursor: pointer;
			border-top: 2px solid transparent;
			&.active {
				background: v-bind(headerBgActiveColor);
				border-top: 2px solid #2681ff;
			}
		}
	}
	.tag-content {
		max-height: calc(100vh - 120px);
		overflow-y: auto;
		overflow-x: hidden;
	}
}
</style>
