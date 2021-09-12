<!--
 * @Author: gz
 * @Date: 2021-09-10 16:04:30
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 16:13:48
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tree\index.vue
-->
<template>
	<div class="gz-tree">
		<recusion-tree :data="data" @nodeClick="nodeClick"></recusion-tree>
	</div>
</template>

<script>
// import bus from "./bus.js";
export default {
	name: "gzTree",
};
</script>

<script setup>
import { defineProps, onMounted, onUpdated, ref, useSlots } from "vue";
import recusionTree from "./recusionTree.vue";

onUpdated(() => {
	// new bus().$on("11111", val => {
	// 	console.log(val);
	// });
});
const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
});
const slots = useSlots();

const nodeClick = val => {
	console.log(123);
	console.log(val);
};
</script>

<style lang="scss"></style>
