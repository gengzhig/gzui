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
						<span class="sub-compTitle">
							{{ item.label }}
						</span>
						<div class="compTitle">
							{{ item.subLabel }}
						</div>
					</div>
				</div>
			</div>
			<div class="appMain">
				<div class="operateGroup">
					<gz-button type="primary" @click="revocation">撤销</gz-button>
					<gz-button type="primary">置顶</gz-button>
					<gz-button type="primary">置底</gz-button>
					<gz-button type="primary" @click="moveUp" :disabled="!store.state.currentCompList.length">上移</gz-button>
					<gz-button type="primary" @click="moveDown">下移</gz-button>
				</div>
				<div class="canvas" ref="canvasRef" :style="containerStyle">
					<comp-list v-for="(item, index) in store.state.currentCompList" :key="index" :block="item"></comp-list>
					<Grid></Grid>
				</div>
			</div>
			<div class="operateMain">
				<gz-tabs v-model:activeName="state.activeName" :width="400" :height="500" :headerHeight="60">
					<gz-tabs-pane label="属性" name="first" class="tab-pane">
						<AttrList v-if="store.state.currentComp[0].name" />
						<p v-else class="placeholder">请选择组件(属性)</p>
					</gz-tabs-pane>
					<gz-tabs-pane label="数据" name="second" class="tab-pane">
						<p class="placeholder">请选择组件(数据)</p>
					</gz-tabs-pane>
					<gz-tabs-pane label="交互" name="third" class="tab-pane">
						<p class="placeholder">请选择组件(交互)</p>
					</gz-tabs-pane>
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
import { useStore } from "vuex";

import Navbar from "layouts/components/Navbar.vue";
import compList from "./compList.vue";
import Grid from "./grid.vue";
import AttrList from "@/components/attrList/index.vue";
let currentComp = null;

const store = useStore();
const canvasRef = ref(null);
const state = reactive({
	activeName: "first",
});
const compInfo = inject("compInfo");

// 画布尺寸
// const containerStyle = computed(() => ({
// 	width: `${json.value.container?.width}px`,
// 	height: `${json.value.container?.height}px`,
// }));

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
	let currentCompList = [
		...store.state.currentCompList,
		{
			id: new Date().getTime(),
			name: currentComp.subLabel,
			key: currentComp.key,
			top: e.offsetY,
			left: e.offsetX,
			width: currentComp.style.width,
			height: currentComp.style.height,
			zIndex: 1,
			alignCenter: true, // 松手时居中
		},
	];
	console.log(currentCompList);
	console.log(currentComp);
	// 按照先后拖入顺序设置zIndex
	setZindex(currentCompList);
	currentComp = null;
};
const setZindex = data => {
	data.map((c, i) => {
		c.zIndex = i + 1;
	});
	store.commit("setCurrentCompList", data);
};
const dragend = e => {
	if (canvasRef.value.removeListener) {
		canvasRef.value.removeListener("dragenter", dragenter);
		canvasRef.value.removeListener("dragover", dragover);
		canvasRef.value.removeListener("dragleave", dragleave);
		canvasRef.value.removeListener("drop", drop);
	}
};

// 撤销
const revocation = () => {
	store.commit("revocationComp");
};

// 上移
const moveUp = () => {
	console.log("上移选中组件", store.state.currentComp);
	// 获取点击组件在组件列表处索引i 将此和下一组件移动位置
	// let moveIndex = store.state.currentCompList.findIndex(c => c.id == store.state.currentComp.id);
	// if (store.state.currentCompList.length > 1) {
	// 	store.state.currentCompList = swapArr(store.state.currentCompList, moveIndex, moveIndex + 1);
	// 	// 交换两个元素
	// 	function swapArr(arr, index1, index2) {
	// 		arr[index1] = arr.splice(index2, 1, arr[index1])[0];
	// 		return arr;
	// 	}
	// 	setZindex(store.state.currentCompList);
	// 	// if (moveIndex > -1) store.commit("upComponent", moveIndex);
	// 	console.log("上移组件列表", store.state.currentCompList);
	// }
	store.commit("upComponent");
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
			return;
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
					text-align: left;
					font-weight: bold;
					font-size: 18px;
					margin: 5px;
				}
				.compItem {
					height: 60px;
					margin-bottom: 5px;
					border: 1px solid #ffffff;
					position: relative;
					.sub-compTitle {
						padding: 3px;
						font-size: 12px;
						position: absolute;
						background: #2ed573;
					}
					.compTitle {
						font-weight: bold;
						text-align: center;
						line-height: 60px;
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
			padding: 80px 405px 20px 220px;
			overflow: auto;
			.operateGroup {
				margin-bottom: 20px;
				button {
					margin-right: 5px;
				}
			}
			.canvas {
				border: 1px solid rgb(124, 100, 100);
				width: 100%;
				height: calc(100vh - 160px);
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
