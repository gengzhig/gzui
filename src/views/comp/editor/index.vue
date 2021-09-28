<!--
 * @Author: gz
 * @Date: 2021-09-07 15:29:01
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 13:26:11
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\editor\index.vue
-->
<template>
	<div class="layouts">
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
						@dragend="e => dragend(e)"
					>
						<span class="compTitle">
							{{ item.label }}
						</span>
					</div>
				</div>
			</div>
			<div class="appMain">
				<div class="operateGroup">
					<gz-button type="primary" @click="revocation">撤销</gz-button>
					<gz-button type="primary">置顶</gz-button>
					<gz-button type="primary">置底</gz-button>
					<gz-button type="primary">上移</gz-button>
					<gz-button type="primary">下移</gz-button>
				</div>
				<div class="canvas" ref="canvasRef" :style="containerStyle">
					<comp-list v-for="(item, index) in json.blocks" :key="index" :block="item"></comp-list>
				</div>
			</div>
			<div class="operateMain" @click="change">
				<gz-tabs v-model:activeName="state.activeName" :width="400" :height="500" :headerHeight="60">
					<div label="属性" name="first" class="tab-pane">属性</div>
					<div label="数据" name="second" class="tab-pane">数据</div>
					<div label="交互" name="third" class="tab-pane">交互</div>
				</gz-tabs>
			</div>
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
import { ref, inject, computed, reactive, toRef } from "vue";
import Navbar from "layouts/components/Navbar.vue";
import configJson from "./property.json";
import compList from "./compList.vue";

let currentComp = null;

const json = ref(configJson);
const canvasRef = ref(null);
const state = reactive({
	activeName: "first",
});
const compInfo = inject("compInfo");
const containerStyle = computed(() => ({
	width: `${json.value.container?.width}px`,
	height: `${json.value.container?.height}px`,
}));

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
	let blocks = json.value.blocks; // 画布内已存在组件
	json.value = {
		...json.value,
		blocks: [
			...blocks,
			{
				key: currentComp.key,
				top: e.offsetY,
				left: e.offsetX,
				zIndex: 1,
				alignCenter: true, // 松手时居中
			},
		],
	};
	console.log(json.value.blocks, " 画布内已存在组件");
	currentComp = null;
};

const dragend = e => {
	// canvasRef.value.removeListener("dragenter", dragenter);
	// canvasRef.value.removeListener("dragover", dragover);
	// canvasRef.value.removeListener("dragleave", dragleave);
	// canvasRef.value.removeListener("drop", drop);
};

// 撤销
const revocation = () => {
	json.value.blocks.pop();
	console.log(json.value.blocks, " 画布内已存在组件");
};

// ctrl快捷键操作
const keyboardEvent = () => {
	const keyCodes = {
		90: "z",
		89: "y",
	};
	const onkeydown = e => {
		const { ctrlKey, keyCode } = e;
		let keyString = [];
		if (ctrlKey) keyString.push("ctrl");
		keyString.push(keyCodes[keyCode]);
		keyString = keyString.join("+");
		if (keyString === "ctrl+z") {
			console.log("撤销快捷键");
			revocation();
		} else if (keyString === "ctrl+y") {
			console.log("重做");
		} else {
			console.log("一般操作");
		}
	};
	const init = () => {
		window.addEventListener("keydown", onkeydown);
		return () => {
			window.removeEventListener("keydown", onkeydown);
		};
	};
	return init;
};

window.addEventListener("keydown", keyboardEvent());
</script>

<style lang="scss" scoped>
.layouts {
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
			.operateGroup {
				button {
					margin-right: 5px;
				}
			}
			.canvas {
				border: 1px solid rgb(124, 100, 100);
				height: 100%;
				position: relative;
				overflow: auto;
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
