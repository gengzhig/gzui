<!--
 * @Author: gz
 * @Date: 2021-09-07 15:29:01
 * @LastEditors: gz
 * @LastEditTime: 2021-09-08 16:06:57
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\editor\index.vue
-->
<template>
	<div class="layout">
		<Navbar></Navbar>
		<div class="container">
			<div class="sidebar">
				<div class="compList">
					<div class="header">组件列表</div>
					<div
						class="compItem"
						v-for="(item, index) in compInfo.compList"
						:key="index"
						draggable="true"
						@dragstart="e => dragstart(e, item)"
					>
						<span class="compTitle">
							{{ item.label }}
						</span>
					</div>
				</div>
			</div>
			<div class="appMain">
				<div class="canvas" ref="canvasRef" :style="containerStyle">
					<!-- <div v-for="(item, index) in state.json.blocks" :key="index"> -->
					<comp-list :json="state.json"></comp-list>
					<!-- </div> -->
				</div>
			</div>
			<div class="operateMain">操作区</div>
		</div>
	</div>
</template>

<script>
export default {
	components: { compList },
	name: "Editor",
};
</script>
<script setup>
import { ref, inject, computed, reactive } from "vue";
import Navbar from "layouts/components/Navbar.vue";
import configJson from "./property.json";
import compList from "./compList.jsx";

let currentComp = null;
const state = reactive({
	json: {
		container: {
			height: 850,
			width: 1250,
		},
		blocks: [
			// {
			// 	key: "0001",
			// 	top: 0,
			// 	left: 0,
			// 	zIndex: 0,
			// 	width: 0,
			// 	height: 0,
			// },
		],
	},
});
const canvasRef = ref(null);
const compInfo = inject("compInfo");
const containerStyle = computed(() => ({
	width: `${state.json.container?.width}px`,
	height: `${state.json.container?.height}px`,
}));

console.log(containerStyle.value);

const dragstart = (e, comp) => {
	// dragenter 进入元素中，标识改为移动标识
	// dragover 在目标元素经过，阻止默认行为，否则无法触发drop
	// dragleave 离开元素时，增加一个禁用标识
	// drop 松手时，根据拖拽组件添加进去
	canvasRef.value.addEventListener("dragenter", dragenter);
	canvasRef.value.addEventListener("dragover", dragover);
	canvasRef.value.addEventListener("dragleave", dragleave);
	canvasRef.value.addEventListener("drop", drop);
	currentComp = comp;
};

const dragenter = e => {
	e.dataTransfer.dropEffect = "move";
};

const dragover = e => {
	e.preventDefault();
};

const dragleave = e => {
	e.dataTransfer.dropEffect = "none";
};

const drop = e => {
	console.log(currentComp, "当前拖动组件");
	state.json.blocks.push({
		key: currentComp.key,
		top: e.offsetY,
		left: e.offsetX,
		zIndex: 1,
	});

	console.log(state.json.blocks);
	// 内部已渲染组件
	currentComp = null;
};
</script>

<style lang="scss" scoped>
.layout {
	height: 100vh;
	.container {
		.sidebar {
			width: 200px;
			height: calc(100vh - 60px);
			color: #fff;
			background-color: #304156;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1;
			margin-top: 60px;
			padding: 0 5px;
			box-sizing: border-box;
			.compList {
				.header {
					text-align: center;
					font-weight: bold;
					font-size: 18px;
					margin: 5px;
				}
				.compItem {
					height: 60px;
					margin-bottom: 5px;
					border: 1px solid #ffffff;
					.compTitle {
						background: #2ed573;
					}
				}
			}
		}
		.appMain {
			width: 100%;
			height: 100%;
			color: #333;
			background-color: #fff;
			position: fixed;
			top: 0;
			left: 0;
			box-sizing: border-box;
			padding: 90px 415px 30px 230px;
			overflow: auto;
			.canvas {
				border: 1px solid rgb(124, 100, 100);
				height: 100%;
				position: relative;
			}
		}
		.operateMain {
			width: 400px;
			height: calc(100vh - 60px);
			color: #fff;
			background-color: #304156;
			position: fixed;
			top: 0;
			right: 0;
			z-index: 1;
			margin-top: 60px;
		}
	}
}
</style>
