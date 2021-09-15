<!--
 * @Author: gz
 * @Date: 2021-09-10 16:13:05
 * @LastEditors: gz
 * @LastEditTime: 2021-09-15 11:08:05
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tree\recusionTree.vue
-->
<template>
	<div class="gz-tree-list" v-for="(item, index) in data" :key="index">
		<div class="gz-tree-item" @click="e => handleNodeClick(item, e)">
			<img src="@/assets/icon/arrow.png" v-if="item.children && item.children.length > 0" alt="" />
			{{ item.label }}
		</div>
		<template v-if="item.children && item.children.length > 0">
			<recusion-tree :data="item.children" @nodeClick="nodeClick"></recusion-tree>
		</template>
	</div>
</template>

<script>
export default {
	name: "recusionTree",
};
</script>
<script setup>
import { onMounted, reactive, useSlots } from "vue";
const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
});
const emit = defineEmits(["nodeClick", "subNodeClick"]);
const handleNodeClick = (item, e) => {
	e.target.classList.toggle("expanded");
	emit("nodeClick", item);
};
const nodeClick = val => {
	emit("nodeClick", val);
};
// 查找所有兄弟元素
const findSiblings = tag => {
	let parentEl = tag.parentNode;
	let childs = parentEl.children;
	let siblings = [];
	for (let i = 0; i < childs.length; i++) {
		if (tag != childs[i]) {
			siblings.push(childs[i]);
		}
	}
	return siblings;
};
</script>

<style lang="scss" scoped>
.gz-tree-list {
	padding-left: 36px;
}
.gz-tree-item {
	display: flex;
	align-items: center;
	height: 26px;
	cursor: pointer;
	img {
		transform: rotate(0deg);
		transition: 0.3s ease-in-out;
	}
	&:hover {
		background: #f5f7fa;
	}
	& ~ .gz-tree-list {
		display: none;
	}
	&.expanded {
		img {
			transform: rotate(90deg);
			transition: 0.3s ease-in-out;
		}
	}
	&.expanded ~ .gz-tree-list {
		display: block;
	}
}
</style>
