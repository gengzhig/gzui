<!--
 * @Author: gz
 * @Date: 2021-09-10 16:04:30
 * @LastEditors: gz
 * @LastEditTime: 2021-09-15 11:07:47
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tree\index.vue
-->
<!-- 支持展开收起动作 -->
<template>
	<button @click="toggleTree">展开/收起</button>
	<div class="gz-tree" ref="gzTreeRef" :style="gzTreeStyle">
		<!-- 扁平数据 -->
		<div
			v-for="(item, index) in treeData"
			:key="index"
			:class="['tree-row', item.toggleDisabled && 'toggle-disabled']"
			:style="{ paddingLeft: paddingLeft(item) }"
			@click="e => nodeClick(item, e)"
		>
			<!-- icons -->
			<renderIcon v-if="item.children" :item="item" @iconClick="iconClick"></renderIcon>
			<!-- label -->
			<span class="tree-node" :title="item.label" :style="treeNodeStyle">
				{{ item.label }}
				<span
					v-if="singleConfig.number.show"
					class="tree-node-count"
					:style="treeNodeCountStyle"
				>({{ item.number }})</span>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzTree",
};
</script>

<script setup>
import { ref, computed, onMounted } from "vue";
import renderIcon from "./renderIcon.vue";

import { flatTreeData } from "./utils.js";
import { highLight } from "./composable/highLight.js";
import { color } from "echarts";

const emit = defineEmits(["nodeClick"]);
let props = defineProps({
	globalConfig: {
		type: Object,
		default: () => { }
	},
	singleConfig: {
		type: Object,
		default: () => { }
	},
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

let gzTreeStyle = computed(() => {
	let { width, height, padding, bgImage, expandAll } = props.globalConfig;
	if (expandAll) {
		treeData.value = formatterExpandAll(props.data);
	}
	return {
		width: width + "px",
		height: height + "px",
		padding: padding + "px",
		"background-image": `url(${bgImage})`
	}
});

// 过渡方向
let directTransition = computed(() => {
	let { directionTransition } = props.globalConfig;
	switch (directionTransition) {
		case "ltr":
			return `translateX(100%)`
			break;
		case "rtl":
			return `translateX(-100%)`
			break;
		default:
			break;
	}
})

let treeNodeStyle = computed(() => {
	let { color, activeColor, fontSize } = props.singleConfig.label;
	return {
		color: color,
		activeColor: activeColor,
		fontSize: fontSize + "px"
	}
})

let treeNodeCountStyle = computed(() => {
	let { color, activeColor, fontSize, show } = props.singleConfig.number;
	return {
		color: color,
		activeColor: activeColor,
		fontSize: fontSize + "px",
		show: show
	}
})

const paddingLeft = item => {
	let { level } = item;
	let { indent } = props.globalConfig
	return item.children ? (level - 1) * indent + "px" : level * indent + "px";
};

let treeData = ref(null);
let gzTreeRef = ref(null);

onMounted(() => {
	treeData.value = flatTreeData(formatterTreeData(props.data));
});

// 全部展开
const formatterExpandAll = data => {
	data.map(d => {
		if (d.children) {
			d.open = true;
			formatterExpandAll(d.children)
		}
	})
	return data;
}

// 格式化数据，添加层级(调整输入错误open的情况)
const formatterTreeData = (data, level = 1) => {
	data.map((d, i) => {
		d.level = level;
		if (d.children) {
			formatterTreeData(d.children, d.level + 1);
		} else {
			delete d.open
		}
	});
	return data;
};

const iconClick = item => {
	treeData.value = flatTreeData(props.data);
};

// 节点点击
const nodeClick = (item, e) => {
	// 高亮函数
	highLight(item, e);
	console.log(item, e.target.getAttribute("class"))
	// emit("nodeClick", val);
};

// 暴露方法
const toggleTree = () => {
	gzTreeRef.value.classList.toggle("hide")
}

defineExpose({
	toggleTree
})
</script>

<style lang="scss">
.gz-tree {
	background-size: 100% 100%;
	background-repeat: no-repeat;
	opacity: 1;
	transition: all 0.3s ease-in-out;
	overflow: auto;
	box-sizing: border-box;
	.tree-row {
		display: flex;
		align-items: center;
		padding: 3px 0;
		box-sizing: border-box;
		cursor: pointer;
		.tree-node {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		&.toggle-disabled {
			cursor: not-allowed;
			span {
				color: #adb0b8;
			}
		}
		&.active {
			background-color: rgba(24, 160, 88, 0.1);
			.tree-node {
				color: v-bind("treeNodeStyle.activeColor") !important;
				.tree-node-count {
					color: v-bind("treeNodeCountStyle.activeColor") !important;
				}
			}
		}
		// &:hover {
		// 	background-color: rgb(243, 243, 245);
		// }
	}
	&.hide {
		opacity: 0;
		transform: v-bind(directTransition);
		transition: all 0.3s ease-in-out;
	}
}
</style>
