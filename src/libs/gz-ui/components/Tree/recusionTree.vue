<!--
 * @Author: gz
 * @Date: 2021-09-10 16:13:05
 * @LastEditors: gz
 * @LastEditTime: 2021-09-15 11:08:05
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tree\recusionTree.vue
-->
<template>
	<!-- 扁平数据 -->
	<div v-for="(item, index) in treeData" :key="index" class="tree-row">
		<span
			class="indent"
			:style="{ paddingLeft: item.children ? (item.level - 1) * indent + 'px' : item.level * indent + 'px' }"
		></span>
		<img src="./add-icon.png" class="tree-icon" v-if="item.children && !item.open" @click="iconTroggle(item)" alt />
		<img src="./minus-icon.png" class="tree-icon" v-if="item.children && item.open" @click="iconTroggle(item)" alt />
		<span :class="[item.children ? 'parent' : 'leaf']">{{ item.label }}</span>
	</div>
</template>
<!-- <div ref="treeListRef" class="gz-tree-list" v-for="(item, index) in data" :key="index">
		<div class="gz-tree-item" :treeId="item.id" @click="e => handleNodeClick(item, e)">
			<img src="@/assets/icon/arrow.png" v-if="item.children && item.children.length > 0" alt />
			{{ item.label }}
		</div>
		<template v-if="item.children && item.children.length > 0">
			<recusion-tree
				:data="item.children"
				@nodeClick="nodeClick"
				:hoverBgColor="hoverBgColor"
				:highlightList="highlightList"
			></recusion-tree>
		</template>
	</div>-->
<script>
export default {
	name: "recusionTree",
};
</script>
<script setup>
import { onMounted, reactive, useSlots, ref, computed } from "vue";
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
let treeData = ref(null);
let indent = ref(15);
const treeListRef = ref(null);
const emit = defineEmits(["nodeClick"]);
// 扁平化需要渲染的数据
const flatTreeData = data => {
	return data.reduce((acc, item) => (item.open ? acc.concat(item, flatTreeData(item.children)) : acc.concat(item)), []);
};

treeData.value = flatTreeData(props.data);

const iconTroggle = item => {
	item.open = !item.open;
	treeData.value = flatTreeData(props.data);
};
// 默认高亮节点
// const highlightNode = num => {
// 	let treeNodes = document.querySelectorAll(".gz-tree .gz-tree-item");
// 	let highTreeNodes = [...treeNodes].filter(t => {
// 		return num.includes(Number(t.getAttribute("treeid")));
// 	});
// 	highTreeNodes.map(h => {
// 		h.classList.add("active");
// 	});
// };
// setTimeout(() => {
// 	highlightNode(props.highlightList);
// });

// const handleNodeClick = (item, e) => {
// 	let treeNodes = document.querySelectorAll(".gz-tree .gz-tree-item");
// 	[...treeNodes].map(t => {
// 		t.classList.remove("active");
// 	});
// 	e.target.classList.toggle("expanded");
// 	e.target.classList.toggle("active");
// 	item.active = e.target.className.includes("active");
// 	emit("nodeClick", item);
// };
// const nodeClick = val => {
// 	emit("nodeClick", val);
// };
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
.tree-row {
	display: flex;
	align-items: center;
	.tree-icon {
		width: 15px;
		height: 15px;
		margin: 0 3px;
		cursor: pointer;
	}
}

// .gz-tree-list {
// 	padding-left: 20px;
// }
// .gz-tree-item {
// 	display: flex;
// 	align-items: center;
// 	height: 26px;
// 	cursor: pointer;
// 	img {
// 		transform: rotate(0deg);
// 		transition: 0.3s ease-in-out;
// 	}
// 	&:hover {
// 		background: v-bind("hoverBgColor");
// 		color: #fff;
// 	}
// 	& ~ .gz-tree-list {
// 		display: none;
// 	}
// 	&.expanded {
// 		img {
// 			transform: rotate(90deg);
// 			transition: 0.3s ease-in-out;
// 		}
// 	}
// 	&.expanded ~ .gz-tree-list {
// 		display: block;
// 	}
// 	&.active {
// 		background: #2681ff;
// 	}
// }
</style>
