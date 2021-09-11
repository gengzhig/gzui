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
		<recusion-tree ref="treeRef" :data="data"></recusion-tree>
	</div>
</template>

<script>
export default {
	name: "gzTree",
};
</script>

<script setup>
import { defineProps, onMounted, ref, useSlots } from "vue";
import recusionTree from "./recusionTree.vue";

const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
});
const treeRef = ref(null);
onMounted(() => {
	console.log(treeRef.value);
});
const slots = useSlots();
</script>

<style lang="scss"></style>
