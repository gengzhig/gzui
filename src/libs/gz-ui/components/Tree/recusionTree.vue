<!--
 * @Author: gz
 * @Date: 2021-09-10 16:13:05
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 16:59:22
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tree\recusionTree.vue
-->
<template>
	<div class="gz-tree-list" v-for="(item, index) in data" :key="index">
		<div class="gz-tree-item" @click="handleNodeClick(item)">
			<span v-if="item.children && item.children.length > 0"> 》 </span>
			{{ item.label }}
		</div>
		<template v-if="item.children && item.children.length > 0">
			<recusion-tree :data="item.children"></recusion-tree>
		</template>
	</div>
</template>

<script>
export default {
	name: "recusionTree",
};
</script>
<script setup>
import { defineProps, onMounted, reactive, useSlots } from "vue";
const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
});
const handleNodeClick = item => {
	console.log(item);
};
</script>

<style lang="scss" scoped>
.gz-tree-list {
	padding-left: 36px;
	// display: none;
}
.gz-tree-item {
	display: flex;
	align-items: center;
	height: 26px;
	cursor: pointer;
	&:hover {
		background: #f5f7fa;
	}
}
</style>
