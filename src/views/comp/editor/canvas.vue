<template>
	<div
		class="canvas"
		ref="canvasRef"
		:style="containerStyle"
		@contextmenu="handleContextMenu"
		@mousedown="handleMouseDown"
	>
		<!--页面组件列表展示-->
		<gz-drag-resize
			v-for="(item, index) in store.state.currentCompList"
			:key="item.id"
			:element="item"
			:index="index"
			:style="getCompStyle(item.style, index)"
			:defaultStyle="item.style"
			:active="item.id == (currentComp || {}).id"
			:class="{ lock: item.isLock }"
		>
			<component
				:is="compInfo.compMapList.get(item.key).render()"
				class="component"
				:style="getRotateStyle(item.style)"
				:id="'component' + item.id"
			></component>
		</gz-drag-resize>
		<!-- 网格线 -->
		<Grid></Grid>
		<!-- 右击菜单 -->
		<ContextMenu />
		<!-- 标线 -->
		<MarkLine></MarkLine>
		<!-- 选中区域 -->
		<!-- <Area :start="area.start" :width="area.width" :height="area.height" v-show="area.isShowArea" /> -->
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
	name: "canvas",
	computed: {
		...mapGetters(["currentCompName"]),
		...mapState(["currentComp"]),
	},
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, inject, getCurrentInstance, useSlots, nextTick } from "vue";
import { useStore } from "vuex";
import gzDragResize from "./gzDragResize.vue";
import MarkLine from "./MarkLine.vue";
import Grid from "./grid.vue";
import Area from "./Area.vue";
import ContextMenu from "./ContextMenu.vue";
const props = defineProps({});
const ctx = getCurrentInstance();
const state = reactive({});
const store = useStore();
const compInfo = inject("compInfo");
console.log(compInfo);
const canvasRef = ref(null);
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
onMounted(() => {});
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
	if (currentCompId.value) {
		store.commit("showContextMenu", { top, left });
	}
};
const getCompStyle = (style, index) => {
	const result = {};
	["width", "height", "top", "left", "z-index", "rotate", "opacity"].forEach(attr => {
		if (attr == "z-index") {
			result["z-index"] = index + 1;
		} else if (attr == "opacity") {
			result[attr] = style[attr] / 100;
		} else if (attr == "rotate") {
			result.transform = "rotate(" + style[attr] + "deg)";
		} else {
			result[attr] = style[attr] + "px";
		}
	});
	return result;
};

const getRotateStyle = style => {
	const result = {};
	// ["rotate"].forEach(attr => {
	// 	if (attr == "rotate") {
	// 		result.transform = "rotate(" + style[attr] + "deg)";
	// 	} else {
	// 		result[attr] = style[attr] + "px";
	// 	}
	// });
	return result;
};
</script>

<style scoped lang="scss">
.canvas {
	border: 1px solid rgb(124, 100, 100);
	width: 100%;
	height: calc(100vh - 160px);
	position: relative;
}
</style>
