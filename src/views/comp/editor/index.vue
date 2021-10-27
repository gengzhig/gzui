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
				<div class="layer-panel" :class="store.state.sidebar.layerArea ? '' : 'hide'">
					<compLayer></compLayer>
				</div>
				<div class="component-panel" :class="store.state.sidebar.compLibraryArea ? '' : 'hide'">
					<compLibrary></compLibrary>
				</div>
			</div>

			<div class="appMain" ref="appMainRef">
				<div class="operateGroup">
					<gz-button type="primary" @click="compose">成组</gz-button>
					<gz-button type="primary" @click="decompose">解组</gz-button>
					<gz-selector
						:width="200"
						:height="40"
						:filtrateData="true"
						:value="state.value"
						:menuData="state.menuData"
						placeholder="搜索画布中的组件"
						@selectItem="selectItem"
					></gz-selector>
					<gz-input v-model:inputValue="state.canvas.width" placeholder="画布大小"></gz-input>
					<gz-input v-model:inputValue="state.canvas.height" placeholder="画布大小"></gz-input>
				</div>
				<div
					class="wrap"
					@drop="handleDrop"
					@dragover="handleDragOver"
					@mousedown="handleMouseDown"
					@mouseup="deselectCurComponent"
				>
					<CanvasArea :canvasStyle="state.canvas"></CanvasArea>
				</div>
			</div>
			<div class="operateMain" :class="store.state.sidebar.operateMainArea ? '' : 'hide'">
				<gz-tabs
					v-model:activeName="state.activeName"
					:width="500"
					:headerHeight="60"
					headerBgColor="#13161A"
					headerBgActiveColor="#1D2126"
				>
					<gz-tabs-pane label="属性" name="first" class="tab-pane">
						<AttrList v-if="currentCompName" />
						<p v-else class="placeholder">请选择组件(属性)</p>
					</gz-tabs-pane>
					<gz-tabs-pane label="数据" name="second" class="tab-pane">
						<DataList v-if="currentCompName" />
						<p v-else class="placeholder">请选择组件(数据)</p>
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
import { mapGetters, mapState } from "vuex";
export default {
	name: "Editor",
	computed: {
		...mapGetters(["currentCompName"]),
		...mapState(["currentComp"]),
	},
};
</script>
<script setup>
import { ref, inject, computed, reactive, toRef, watch } from "vue";
import { useStore } from "vuex";

import Navbar from "layouts/components/Navbar.vue";
import CanvasArea from "./canvas.vue";
import compLibrary from "./compLibrary.vue";
import compLayer from "./compLayer.vue";
import AttrList from "@/components/attrList/index.vue";
import DataList from "@/components/dataList/index.vue";
const store = useStore();
const appMainRef = ref(null);
const canvasRef = ref(null);
const state = reactive({
	activeName: "first",
	canvas: {
		width: 1920,
		height: 1080,
	},
});

const compInfo = inject("compInfo");
const currentCompId = computed(() => {
	return store.getters.currentCompId;
});
const currentCompList = computed(() => {
	return store.state.currentCompList;
});
watch(
	() => [store.state.sidebar.layerArea, store.state.sidebar.compLibraryArea, store.state.sidebar.operateMainArea],
	value => {
		let [layerArea, compLibraryArea, operateMainArea] = value;
		if (!layerArea && !compLibraryArea) {
			appMainRef.value.style.paddingLeft = "20px";
		} else if (layerArea && compLibraryArea) {
			appMainRef.value.style.paddingLeft = "420px";
		} else {
			appMainRef.value.style.paddingLeft = "220px";
		}
		if (operateMainArea) {
			appMainRef.value.style.paddingRight = "505px";
		} else {
			appMainRef.value.style.paddingRight = "20px";
		}
	}
);
watch(
	() => {
		return [state.canvas.width, state.canvas.height];
	},
	value => {
		let [width, height] = value;
		width = parseInt(width);
		height = parseInt(height);
		localStorage.setItem(
			"canvasStyle",
			JSON.stringify({
				width,
				height,
			})
		);
	}
);
const handleDrop = e => {
	e.preventDefault();
	e.stopPropagation();
};
const handleDragOver = e => {
	e.preventDefault();
	e.dataTransfer.dropEffect = "copy";
};
const handleMouseDown = e => {
	store.commit("setClickComponentStatus", false);
};

const deselectCurComponent = e => {
	if (!store.state.isClickComponent) {
		store.commit("setCurrentComp", { compData: null, index: null });
	}
	// 0 左击 1 滚轮 2 右击
	if (e.button != 2) {
		store.commit("hideContextMenu");
	}
};

// 撤销
const revocation = () => {
	store.commit("revocationComp");
};
// 成组
const compose = () => {
	store.commit("compose");
	store.commit("recordSnapshot");
};
// 解组
const decompose = () => {
	store.commit("decompose");
	store.commit("recordSnapshot");
};
// 复制
const copy = () => {
	store.commit("copy");
};
// 粘贴
const paste = () => {
	store.commit("paste", true);
	store.commit("recordSnapshot");
};
// ctrl快捷键操作
const keyboardEvent = () => {
	const keyCodes = {
		90: "z",
		89: "y",
		67: "c",
		86: "v",
		68: "d",
	};
	const onkeydown = e => {
		const { ctrlKey, keyCode } = e;
		let keyString = [];
		if (ctrlKey) keyString.push("ctrl");
		keyString.push(keyCodes[keyCode]);
		keyString = keyString.join("+");
		switch (keyString) {
			case "ctrl+z":
				revocation();
				break;
			case "ctrl+c":
				copy();
				break;
			case "ctrl+v":
				paste();
				break;
			case "ctrl+y":
				console.log("重做");
				break;
			default:
				console.log("一般操作");
				break;
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
		height: calc(100vh);
		.sidebar {
			height: calc(100vh - 60px);
			color: #fff;
			background-color: #1d2127;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1;
			margin-top: 60px;
			box-sizing: border-box;
			display: flex;
			.layer-panel {
				width: 200px;
				transition: width 0.3s ease;
				overflow: hidden;
				border-right: 1px solid #000;
				&.hide {
					width: 0;
				}
			}
			.component-panel {
				width: 200px;
				transition: width 0.3s ease;
				overflow: hidden;
				&.hide {
					width: 0;
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
			padding: 80px 505px 20px 420px;
			overflow: auto;
			.operateGroup {
				margin-bottom: 20px;
				display: flex;
				button {
					margin-right: 5px;
				}
			}
			.wrap {
				width: 100%;
				height: calc(100vh - 160px);
				overflow: auto;
				background: #0d2a42;
			}
		}
		.operateMain {
			width: 500px;
			height: calc(100vh - 60px);
			color: #fff;
			background-color: #1d2127;
			position: fixed;
			top: 0;
			right: 0;
			z-index: 1;
			margin-top: 60px;
			transition: width 0.25s ease-in-out;
			overflow: hidden;
			&.hide {
				width: 0;
			}
			.comp-tag {
				height: calc(100vh - 60px) !important;
			}
		}
	}
}
</style>
