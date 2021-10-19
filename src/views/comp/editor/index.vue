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
					<gz-button type="primary" @click="revocation">撤销</gz-button>
					<gz-button type="primary" @click="compose">成组</gz-button>
					<gz-selector
						:width="200"
						:height="40"
						:filtrateData="true"
						:value="state.value"
						:menuData="state.menuData"
						placeholder="搜索画布中的组件"
						@selectItem="selectItem"
					></gz-selector>
				</div>
				<div
					class="canvas"
					ref="canvasRef"
					:style="containerStyle"
					@click="e => canvasClick(e)"
					@mousedown="handleMouseDown"
					@contextmenu="handleContextMenu"
				>
					<comp-list v-for="(item, index) in store.state.currentCompList" :key="index" :block="item"></comp-list>
					<!-- 网格线 -->
					<Grid></Grid>
					<!-- 右击菜单 -->
					<ContextMenu />
					<!-- 标线 -->
					<MarkLine></MarkLine>
					<!-- 选中区域 -->
					<Area :start="area.start" :width="area.width" :height="area.height" v-show="area.isShowArea" />
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
import { mapGetters } from "vuex";
export default {
	components: { compList },
	name: "Editor",
	computed: {
		...mapGetters(["currentCompName"]),
	},
};
</script>
<script setup>
import { ref, inject, computed, reactive, toRef, watch } from "vue";
import { useStore } from "vuex";

import Navbar from "layouts/components/Navbar.vue";
import compList from "./compList.vue";
import compLibrary from "./compLibrary.vue";
import compLayer from "./compLayer.vue";
import MarkLine from "./MarkLine.vue";
import Grid from "./grid.vue";
import Area from "./Area.vue";
import ContextMenu from "./ContextMenu.vue";
import AttrList from "@/components/attrList/index.vue";

const store = useStore();
const appMainRef = ref(null);
const canvasRef = ref(null);
const state = reactive({
	activeName: "first",
});
const area = reactive({
	editorX: 0,
	editorY: 0,
	// 选中区域的起点
	start: {
		x: 0,
		y: 0,
	},
	width: 0,
	height: 0,
	isShowArea: false,
});
const compInfo = inject("compInfo");

// 画布尺寸
// const containerStyle = computed(() => ({
// 	width: `${json.value.container?.width}px`,
// 	height: `${json.value.container?.height}px`,
// }));
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
const handleContextMenu = e => {
	e.stopPropagation();
	e.preventDefault();
	// 计算菜单相对于编辑器的位移
	let target = e.target;
	let top = e.offsetY;
	let left = e.offsetX;

	while (target instanceof SVGElement) {
		target = target.parentNode;
	}

	while (!target.className.includes("canvas")) {
		left += target.offsetLeft;
		top += target.offsetTop;
		target = target.parentNode;
	}
	store.commit("showContextMenu", { top, left });
};

const hideArea = () => {
	area.isShowArea = 0;
	area.width = 0;
	area.height = 0;
	store.commit("setAreaData", {
		style: {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
		},
		components: [],
	});
};
const handleMouseDown = e => {
	// 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
	if (store.state.currentComp.length == 0) {
		e.preventDefault();
	}

	hideArea();
	// 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
	const rectInfo = canvasRef.value.getBoundingClientRect();
	area.editorX = rectInfo.x;
	area.editorY = rectInfo.y;

	const startX = e.clientX;
	const startY = e.clientY;
	area.start.x = startX - area.editorX;
	area.start.y = startY - area.editorY;
	// 展示选中区域
	area.isShowArea = true;

	const move = moveEvent => {
		area.width = Math.abs(moveEvent.clientX - startX);
		area.height = Math.abs(moveEvent.clientY - startY);
		if (moveEvent.clientX < startX) {
			area.start.x = moveEvent.clientX - area.editorX;
		}

		if (moveEvent.clientY < startY) {
			area.start.y = moveEvent.clientY - area.editorY;
		}
	};

	const up = e => {
		console.log(123);
		document.removeEventListener("mousemove", move);
		document.removeEventListener("mouseup", up);

		if (e.clientX == startX && e.clientY == startY) {
			hideArea();
			return;
		}

		createGroup();
	};

	document.addEventListener("mousemove", move);
	document.addEventListener("mouseup", up);
};

const createGroup = () => {
	// 获取选中区域的组件数据
	const areaData = getSelectArea();
	// 圈选区域组件个数小于1个时隐藏Area组件
	if (areaData.length < 1) {
		hideArea();
		return;
	}

	// 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
	// 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
	let top = Infinity,
		left = Infinity;
	let right = -Infinity,
		bottom = -Infinity;
	areaData.forEach(component => {
		let style = {};
		console.log(component);
		if (component.isGroup) {
			component.group.forEach(item => {
				const rectInfo = $(`#component${item.id}`).getBoundingClientRect();
				style.left = rectInfo.left - area.editorX;
				style.top = rectInfo.top - area.editorY;
				style.right = rectInfo.right - area.editorX;
				style.bottom = rectInfo.bottom - area.editorY;

				if (style.left < left) left = style.left;
				if (style.top < top) top = style.top;
				if (style.right > right) right = style.right;
				if (style.bottom > bottom) bottom = style.bottom;
			});
		} else {
			style = vm.$tool.getComponentRotatedStyle(component);
		}

		if (style.left < left) left = style.left;
		if (style.top < top) top = style.top;
		if (style.right > right) right = style.right;
		if (style.bottom > bottom) bottom = style.bottom;
	});
	area.start.x = left;
	area.start.y = top;
	area.width = right - left;
	area.height = bottom - top;

	// 设置选中区域位移大小信息和区域内的组件数据
	store.commit("setAreaData", {
		style: {
			left,
			top,
			width: area.width,
			height: area.height,
		},
		components: areaData,
	});
};

const getSelectArea = () => {
	const result = [];
	// 区域起点坐标
	const { x, y } = area.start;
	// 计算所有的组件数据，判断是否在选中区域内
	store.state.currentCompList.forEach(component => {
		if (component.isLock) return;
		const { left, top, width, height } = vm.$tool.getComponentRotatedStyle(component);
		if (x <= left && y <= top && left + width <= x + area.width && top + height <= y + area.height) {
			result.push(component);
		}
	});

	// 返回在选中区域内的所有组件
	return result;
};
const canvasClick = e => {
	let canvasDom = e.path;
	let isCompClickArea = canvasDom.some(c => {
		return c.className && typeof c.className == "string" && c.className.indexOf("editor-block") > -1;
	});
	if (!isCompClickArea) {
		// 将画布内所有组件的active 类清掉;同时将全局state组件索引置为-1
		let editorBlock = document.querySelectorAll(".canvas .editor-block");
		[...editorBlock].map(b => {
			b.classList.remove("editor-block-focus");
		});
		store.commit("resetCurrentCompIndex");
	}
};
const setZindex = data => {
	data.map((c, i) => {
		c.zIndex = i + 1;
		c.style.zIndex = i + 1;
	});
	store.commit("setCurrentCompList", data);
};

// 撤销
const revocation = () => {
	store.commit("revocationComp");
};
// 成组
const compose = () => {
	store.commit("compose");
};
// 复制
const copy = () => {
	store.commit("copy");
};
// 粘贴
const paste = () => {
	store.commit("paste", true);
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
			.canvas {
				border: 1px solid rgb(124, 100, 100);
				width: 100%;
				height: calc(100vh - 160px);
				position: relative;
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
