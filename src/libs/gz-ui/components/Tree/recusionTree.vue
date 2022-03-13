<!--
 * @Author: gz
 * @Date: 2021-09-10 16:13:05
 * @LastEditors: gz
 * @LastEditTime: 2021-09-15 11:08:05
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tree\recusionTree.vue
-->
<!---
  1.禁用，展开/折叠
	2.点选高亮
	3.节点禁选
-->
<template>
	<!-- 扁平数据 -->
	<div
		v-for="(item, index) in treeData"
		:key="index"
		:class="['tree-row', item.toggleDisabled && 'toggle-disabled']"
		:style="{ paddingLeft: paddingLeft(item) }"
		@click="e => highLight(item, e)"
	>
		<!-- icons -->
		<renderIcon v-if="item.children" :item="item" @iconClick="iconClick"></renderIcon>
		<!-- label -->
		<span>{{ item.label }}</span>
	</div>
</template>
<script>
export default {
	name: "recusionTree",
};
</script>
<script setup>
import { onMounted, reactive, useSlots, ref, computed } from "vue";
import renderIcon from "./renderIcon.vue";

import { flatTreeData } from "./utils.js";
import { highLight } from "./composable/highLight.js";

const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	hoverBgColor: {
		type: String,
		default: "#f5f7fa",
	},
	highlightList: {
		type: Array,
		default: () => [],
	},
});
const emit = defineEmits(["nodeClick"]);

let indent = ref(15);
let treeData = ref(null);
const treeListRef = ref(null);

onMounted(() => {
	treeData.value = flatTreeData(props.data);
});
const paddingLeft = item => {
	let { level } = item;
	return item.children ? (level - 1) * indent.value + "px" : level * indent.value + "px";
};
const iconClick = item => {
	treeData.value = flatTreeData(props.data);
};
</script>

<style lang="scss" scoped>
.tree-row {
	display: flex;
	align-items: center;
	cursor: pointer;
	&.toggle-disabled {
		cursor: not-allowed;
		span {
			color: #adb0b8;
		}
	}
	&.active {
		background-color: rgba(24, 160, 88, 0.1);
	}
	// &:hover {
	// 	background-color: rgb(243, 243, 245);
	// }
}
</style>
