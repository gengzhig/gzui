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
	<div class="gz-tree" ref="gzTreeRef" :style="gzTreeStyle" @scroll="handleScroll">
		<!-- 滚动层 -->
		<div
			v-if="globalConfig.virtualScroll"
			class="gz-tree-view-phantom"
			:style="{ height: phantomHeight }"
		></div>
		<!-- 扁平数据 -->
		<div class="gz-tree-container" ref="realContainer">
			<div
				v-for="(item, index) in visibleData"
				:key="index"
				:class="['tree-row', item.toggleDisabled && 'toggle-disabled']"
				:style="treeRowStyle(item)"
				@click="e => nodeClick(item, e)"
			>
				<!-- 展开图标 设置插槽-->
				<renderIcon
					v-if="item.children"
					:item="item"
					:singleConfig="singleConfig"
					@iconClick="iconClick"
				></renderIcon>
				<!-- 复选框 -->
				<renderCheckBox
					v-if="globalConfig.checkable"
					:checkableRelation="globalConfig.checkableRelation"
					:item="item"
					@checkboxClick="checkboxClick"
				></renderCheckBox>
				<!-- label -->
				<span :data-check="item.checked" class="tree-node" :title="item.label" :style="treeNodeStyle">
					{{ item.label }}
					<span
						v-if="singleConfig.number.show"
						class="tree-node-count"
						:style="treeNodeCountStyle"
					>({{ item.number }})</span>
				</span>
			</div>
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
import renderCheckBox from "./renderCheckBox.vue";

import { flatTreeData } from "./utils.js";

import { highLight } from "./composable/highLight.js";
import { checkClick } from "./composable/checkClick.js";


const emit = defineEmits(["nodeClick"]);
let props = defineProps({
	globalConfig: {
		type: Object,
		default: () => { },
	},
	singleConfig: {
		type: Object,
		default: () => { },
	},
	data: {
		type: Array,
		default: () => [],
	},
});

let gzTreeStyle = computed(() => {
	let { width, height, padding, bgImage, expand } = props.globalConfig;
	if (expand == "all" || expand == "none") {
		expand = (expand == "all" ? true : false);
		treeData.value = formatterExpandAll(props.data, expand);
	}
	return {
		width: width + "px",
		height: height + "px",
		padding: padding + "px",
		"background-image": `url(${bgImage})`,
	};
});

let phantomHeight = computed(() => {
	let { height } = props.singleConfig.row;
	let pHeight = treeData.value ? treeData.value.length * height : props.globalConfig.height;
	return pHeight + "px";
});

// 过渡方向
let directTransition = computed(() => {

	let { directionTransition } = props.globalConfig;
	switch (directionTransition) {
		case "ltr":
			return `translateX(100%)`;
			break;
		case "rtl":
			return `translateX(-100%)`;
			break;
		default:
			break;
	}
});

let treeNodeStyle = computed(() => {
	let { color, activeColor, fontSize } = props.singleConfig.label;
	return {
		color: color,
		activeColor: activeColor,
		fontSize: fontSize + "px",
	};
});

let treeNodeCountStyle = computed(() => {
	let { color, activeColor, fontSize, show } = props.singleConfig.number;
	return {
		color: color,
		activeColor: activeColor,
		fontSize: fontSize + "px",
		show: show,
	};
});

const treeRowStyle = item => {
	let { level } = item;
	let { indent } = props.globalConfig;
	let { height } = props.singleConfig.row;
	return {
		height: height + "px",
		paddingLeft: item.children ? (level - 1) * indent + "px" : level * indent + "px"
	}
};

let treeData = ref(null);
let gzTreeRef = ref(null);
let visibleData = ref(null);
let realContainer = ref(null);

onMounted(() => {
	treeData.value = flatTreeData(formatterTreeData(props.data));
	let { virtualScroll } = props.globalConfig;
	if (!virtualScroll) {
		visibleData.value = treeData.value;
	} else {
		// 虚拟滚动
		virtualScroll && updateVisibleData();
	}
});

const updateVisibleData = scrollTop => {
	scrollTop = scrollTop || 0;
	const visibleCount = Math.ceil(props.globalConfig.height / props.singleConfig.row.height);
	const start = Math.floor(scrollTop / props.singleConfig.row.height);
	const end = start + visibleCount;
	visibleData.value = treeData.value.slice(start, end);
	realContainer.value.style.webkitTransform = `translate3d(0, ${start * props.singleConfig.row.height}px, 0)`;
};

const handleScroll = () => {
	const scrollTop = gzTreeRef.value.scrollTop;
	let { virtualScroll } = props.globalConfig
	virtualScroll && updateVisibleData(scrollTop);

};

// 全部展开/收起
const formatterExpandAll = (data, expand) => {
	data.map(d => {
		if (d.children) {
			d.open = expand;
			formatterExpandAll(d.children, expand);
		}
	});
	return data;
};

// 格式化数据，添加层级(调整输入错误open的情况)
const formatterTreeData = (data, level = 1) => {
	data.map((d, i) => {
		d.level = level;
		if (d.children) {
			formatterTreeData(d.children, d.level + 1);
		} else {
			delete d.open;
		}
	});
	return data;
};

// 图标点击
const iconClick = item => {
	treeData.value = flatTreeData(props.data);
	visibleData.value = treeData.value;
};

// 复选框点击 
const checkboxClick = (type, item) => {
	let { sendCheckDataWay } = props.globalConfig;
	checkClick(type, item, sendCheckDataWay, treeData.value, allData => {
		console.log(allData);
	}, singleData => {
		console.log(singleData);
	});
};

// 节点点击
const nodeClick = (item, e) => {
	// 高亮函数
	highLight(item, e, status => {
		console.log(item, status);
	});
	// console.log(item, e.target.getAttribute("class"))
	// emit("nodeClick", val);
};

// 显示隐藏树
const toggleTree = () => {
	gzTreeRef.value.classList.toggle("hide");
};

// 暴露方法
defineExpose({
	toggleTree,
});
</script>

<style lang="scss">
.gz-tree {
	background-size: 100% 100%;
	background-repeat: no-repeat;
	opacity: 1;
	transition: all 0.3s ease-in-out;
	overflow: auto;
	box-sizing: border-box;
	position: relative;
	&-view-phantom {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
	}
	&-container {
		left: 0;
		right: 0;
		top: 0;
		position: absolute;
	}
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
				color: #adb0b8 !important;
			}
		}
		&.active {
			background-color: v-bind("singleConfig.row.activeColor");
			.tree-node {
				color: v-bind("treeNodeStyle.activeColor") !important;
				.tree-node-count {
					color: v-bind("treeNodeCountStyle.activeColor") !important;
				}
			}
		}
	}
	&.hide {
		opacity: 0;
		transform: v-bind(directTransition);
		transition: all 0.3s ease-in-out;
	}
}
</style>
