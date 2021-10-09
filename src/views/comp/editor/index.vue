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
				<compLibrary></compLibrary>
			</div>
			<div class="appMain">
				<div class="operateGroup">
					<gz-button type="primary" @click="revocation">撤销</gz-button>
					<gz-button type="primary" @click="moveTop" :disabled="!store.state.currentCompList.length">置顶</gz-button>
					<gz-button type="primary" @click="moveBottom" :disabled="!store.state.currentCompList.length">置底</gz-button>
					<gz-button type="primary" @click="moveUp" :disabled="!store.state.currentCompList.length">上移</gz-button>
					<gz-button type="primary" @click="moveDown" :disabled="!store.state.currentCompList.length">下移</gz-button>
				</div>
				<div class="canvas" ref="canvasRef" :style="containerStyle">
					<comp-list v-for="(item, index) in store.state.currentCompList" :key="index" :block="item"></comp-list>
					<Grid></Grid>
				</div>
			</div>
			<div class="operateMain">
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
import { useStore, mapGetters } from "vuex";
export default {
	components: { compList },
	name: "Editor",
	computed: {
		...mapGetters(["currentCompName"]),
	},
};
</script>
<script setup>
import { ref, inject, computed, reactive, toRef } from "vue";
import { useStore, mapGetters } from "vuex";

import Navbar from "layouts/components/Navbar.vue";
import compList from "./compList.vue";
import compLibrary from "./compLibrary.vue";
import Grid from "./grid.vue";
import AttrList from "@/components/attrList/index.vue";

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

const setZindex = data => {
	data.map((c, i) => {
		c.zIndex = i + 1;
	});
	store.commit("setCurrentCompList", data);
};

// 撤销
const revocation = () => {
	store.commit("revocationComp");
};
// 置顶
const moveTop = () => {
	store.commit("topComponent");
};
// 置底
const moveBottom = () => {
	store.commit("bottomComponentt");
};
// 上移
const moveUp = () => {
	store.commit("upComponent");
};
// 下移
const moveDown = () => {
	store.commit("downComponent");
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
		height: calc(100vh);
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
			padding: 80px 505px 20px 220px;
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
			width: 500px;
			height: calc(100vh - 60px);
			color: #fff;
			background-color: #304156;
			position: fixed;
			top: 0;
			right: 0;
			z-index: 1;
			margin-top: 60px;
			.comp-tag {
				height: calc(100vh - 60px) !important;
			}
		}
	}
}
</style>
