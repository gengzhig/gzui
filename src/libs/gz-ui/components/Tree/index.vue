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
		<recusion-tree
			:hoverBgColor="hoverBgColor"
			:data="data"
			:highlightList="highlightList"
			@nodeClick="nodeClick"
		></recusion-tree>
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
let props = defineProps({
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

// 格式化数据，添加层级
const formatterTreeData = (data, level = 1) => {
	data.map((d, i) => {
		d.level = level;
		if (d.children) {
			formatterTreeData(d.children, d.level + 1);
		}
	})

}

formatterTreeData(props.data)
console.log(props.data);

// // 扁平化需要渲染的数据
// const flatTreeData = (data) => {
// 	return data.reduce((acc, item) => (
// 		item.open
// 			? acc.concat(item, flatTreeData(item.children))
// 			: acc.concat(item)
// 	), [])
// }
// let treeData = ref(null)
// treeData = flatTreeData(props.data)

// console.log(treeData);

const slots = useSlots();
const nodeClick = val => {
	emit("nodeClick", val);
};


</script>

<style lang="scss"></style>
