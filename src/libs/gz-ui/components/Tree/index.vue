<!--
 * @Author: gz
 * @Date: 2021-09-10 16:04:30
 * @LastEditors: gz
 * @LastEditTime: 2021-09-15 11:07:47
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tree\index.vue
-->
<template>
	<div class="gz-tree">
		<recusion-tree :data="data" :highlightList="highlightList" @nodeClick="nodeClick"></recusion-tree>
	</div>
</template>

<script>
export default {
	name: "gzTree",
};
</script>

<script setup>
import { ref, useSlots } from "vue";
import recusionTree from "./recusionTree.vue";

const emit = defineEmits(["nodeClick"]);
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
const slots = useSlots();
const nodeClick = val => {
	emit("nodeClick", val);
};
</script>

<style lang="scss"></style>
