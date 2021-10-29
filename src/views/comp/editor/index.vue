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
						:label="state.label"
						:menuData="canvasCompList"
						placeholder="搜索画布中的组件"
						@selectItem="selectItem"
					></gz-selector>
				</div>
				<div
					class="wrap"
					@drop="handleDrop"
					@dragover="handleDragOver"
					@mousedown="handleMouseDown"
					@mouseup="deselectCurComponent"
				>
					<CanvasArea :canvasStyle="state.screen"></CanvasArea>
				</div>
			</div>
			<div class="operateMain" :class="store.state.sidebar.operateMainArea ? '' : 'hide'">
				<gz-tabs
					v-if="currentCompId"
					v-model:activeName="state.activeName"
					:width="350"
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
				<div class="config-manager-tabs" v-else>
					<div class="config-manager-head">页面设置</div>
					<div class="config-manager-body">
						<el-form label-width="80px" :model="state.screen" class="demo-form-inline">
							<el-form-item label="屏幕宽度">
								<el-input-number
									v-model="state.screen.width"
									:min="0"
									controls-position="right"
									placeholder="屏幕宽度"
								/>
							</el-form-item>
							<el-form-item label="屏幕高度">
								<el-input-number
									v-model="state.screen.height"
									:min="0"
									controls-position="right"
									placeholder="屏幕高度"
								/>
							</el-form-item>
							<el-form-item label="背景颜色">
								<el-color-picker v-model="state.screen.color" show-alpha />
							</el-form-item>
							<el-form-item label="缩放方式">
								<el-radio-group v-model="state.screen.zoom" size="medium">
									<el-radio-button label="1">全屏铺满</el-radio-button>
									<el-radio-button label="2">等比宽铺满</el-radio-button>
									<el-radio-button label="3">等比高铺满</el-radio-button>
									<el-radio-button label="4">不缩放</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
			<div
				class="operateMain snapArea"
				:class="store.state.sidebar.operateMainArea ? '' : 'hide'"
				v-show="manageSnapArea"
			>
				<div class="title">
					<p class="history-snapshot-manager__title">
						快照管理
						<span class="color-base">
							<span class="color-blue">3</span>个/还可创建<span class="color-blue"> {{ 3 - snapshotData.length }}</span
							>个</span
						>
					</p>
					<div class="close-btn" @click="handleSnapAreaClose">X</div>
				</div>
				<gz-table :config="state.config" v-if="state.config.tableData">
					<template #operate="{ row }">
						<el-button size="mini" @click="lookSnap(row.row)">预览</el-button>
						<el-button size="mini" type="danger" @click="deleteSnap(row.row)">删除</el-button>
					</template>
				</gz-table>
				<span class="limit-indicator" v-if="snapshotData.length == 3">
					<i class="datav-icon datav-font icon-error error-icon"></i>快照数量已达到上限3个，可选中删除
				</span>
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
import { ref, inject, computed, reactive, toRef, watch, onMounted } from "vue";
import { useStore } from "vuex";

import Navbar from "layouts/components/Navbar.vue";
import CanvasArea from "./canvas.vue";
import compLibrary from "./compLibrary.vue";
import compLayer from "./compLayer.vue";
import AttrList from "@/components/attrList/index.vue";
import DataList from "@/components/dataList/index.vue";
import router from "../../../router";
const store = useStore();
const appMainRef = ref(null);
const canvasRef = ref(null);
const snapSync = ref(false);
const state = reactive({
	config: {
		style: {
			stripe: true,
			border: true,
			height: 500,
			index: false,
			radio: true,
			checkBox: true,
		},
		defaultSort: {
			prop: "time",
			order: "descending", // ascending 表示升序，descending 表示降序，null 表示还原为原始顺序
		},
		columnData: [
			{
				prop: "time",
				label: "名称",
				width: 100,
				tooltip: true,
				formatter: (row, column) => {
					return row.time;
				},
			},
			{
				prop: "operate",
				label: "操作",
				minWidth: 100,
				slotName: "operate",
				fixed: "right",
			},
		],
		tableData: [],
	},
	menuData: [],
	value: "",
	label: "",
	activeName: "first",
	canvas: {
		width: 1920,
		height: 1080,
	},
	screen: {
		width: 1920,
		height: 1080,
		color: "#0d2a42",
		zoom: "",
	},
});

const compInfo = inject("compInfo");
const manageSnapArea = computed(() => {
	return store.state.manageSnapArea;
});
const currentCompId = computed(() => {
	return store.getters.currentCompId;
});
const currentCompList = computed(() => {
	return store.state.currentCompList;
});

const canvasCompList = computed(() => {
	return currentCompList.value.map(c => {
		return {
			value: c.id,
			label: c.name,
		};
	});
});

const snapshotData = computed(() => {
	return store.state.snapData;
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
			appMainRef.value.style.paddingRight = "355px";
		} else {
			appMainRef.value.style.paddingRight = "20px";
		}
	}
);
watch(
	() => {
		return state.screen;
	},
	value => {
		let { width, height, color, zoom } = value;
		localStorage.setItem(
			"canvasStyle",
			JSON.stringify({
				width,
				height,
				color,
				zoom,
			})
		);
	},
	{
		deep: true,
	}
);
watch(
	() => {
		return [snapshotData.value, localStorage.getItem("snapshotData")];
	},
	value => {
		let [data, result] = value;
		state.config.tableData = JSON.parse(JSON.stringify(data));
	}
);
watch(
	() => {
		return manageSnapArea.value;
	},
	value => {
		state.config.tableData = JSON.parse(JSON.stringify(snapshotData.value));
	}
);
onMounted(() => {
	let canvasStyle = JSON.parse(localStorage.getItem("canvasStyle"));
	if (canvasStyle) {
		state.screen = canvasStyle;
	}
});

const selectItem = item => {
	state.value = item.value;
	state.label = item.label;
};
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

const handleSnapAreaClose = () => {
	store.commit("manageSnapshot");
};

const lookSnap = row => {
	let routeUrl = router.resolve({
		path: "/preview",
	});
	window.open(routeUrl.href, "_blank");
};

const deleteSnap = row => {
	store.commit("deleteSnap", row);
};
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
			padding: 80px 355px 20px 420px;
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
			width: 350px;
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
			&.snapArea {
				box-sizing: border-box;
				z-index: 99;
				padding: 20px;
				.title {
					line-height: 16px;
					color: #2681ff;
					border-bottom: 1px solid rgba(255, 255, 255, 0.15);
					padding: 5px;
					display: flex;
					justify-content: space-between;
					.history-snapshot-manager__title {
						color: #fff;
						font-size: 14px;
						margin-bottom: 10px;
						.color-base {
							font-size: 12px;
							letter-spacing: 1px;
							color: #bcc9d4;
							padding-left: 8px;
							.color-blue {
								padding: 0 2px;
								color: #2681ff;
							}
						}
					}
					.close-btn {
						cursor: pointer;
					}
				}
			}
			&.hide {
				width: 0;
			}
			.comp-tag {
				height: calc(100vh - 60px) !important;
			}

			.config-manager-tabs {
				height: 100%;
				.config-manager-head {
					width: 100%;
					height: 30px;
					line-height: 30px;
					background: #2e343c;
					color: #bcc9d4;
					text-align: center;
					user-select: none;
					font-size: 12px;
				}
				.config-manager-body {
					padding: 20px;
				}
			}
		}
	}
}
</style>
<style lang="scss">
.operateMain .el-radio-button {
	width: 110px;
}
.operateMain .el-radio-button__inner {
	width: 110px;
}
</style>
