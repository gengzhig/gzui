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
			:style="getCompStyle(item.style, index, item.isGroup)"
			:defaultStyle="item.style"
			:active="item.id == (currentComp || {}).id"
			:class="{ lock: item.isLock }"
		>
			<!-- 单个真实组件 -->
			<component
				v-if="!item.isGroup"
				:is="compInfo.compMapList.get(item.key).render()"
				class="component"
				:id="'component' + item.id"
			></component>
			<!-- 成组组件 -->
			<template v-else>
				<div class="group">
					<template v-for="gItem in item.group">
						<component
							class="singleGroup"
							:is="compInfo.compMapList.get(gItem.key).render()"
							:style="gItem.groupStyle"
							:id="'component' + gItem.id"
						/>
					</template>
				</div>
			</template>
		</gz-drag-resize>
		<!-- 网格线 -->
		<Grid></Grid>
		<!-- 右击菜单 -->
		<ContextMenu />
		<!-- 标线 -->
		<MarkLine></MarkLine>
		<!-- 选中区域 -->
		<Area :start="area.start" :width="area.width" :height="area.height" v-show="area.isShowArea" />
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
import mitt from "../../../mitt";
const props = defineProps({});
const ctx = getCurrentInstance();
const state = reactive({});
const store = useStore();
const currentCompId = computed(() => {
	return store.getters.currentCompId;
});
const compInfo = inject("compInfo");
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

onMounted(() => {
	mitt.on("hideArea", () => {
		hideArea();
	});
});
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
	// 如果没有选中组件 在画布上点击时调用 e.preventDefault() 防止触发 drop 事件
	if (!store.state.currentComp) {
		e.preventDefault();
	}
	hideArea();
	// 获取编辑器的位移信息，每次点击时都需要获取一次。
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

const getSelectArea = () => {
	const result = [];
	// 区域起点坐标
	const { x, y } = area.start;
	// 计算所有的组件数据，判断是否在选中区域内
	store.state.currentCompList.forEach(component => {
		if (component.isLock) return;
		const { left, top, width, height } = vm.$tool.getComponentRotatedStyle(component.style);
		if (x <= left && y <= top && left + width <= x + area.width && top + height <= y + area.height) {
			result.push(component);
		}
	});

	// 返回在选中区域内的所有组件
	return result;
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
		if (component.isGroup) {
			component.group.forEach(item => {
				const rectInfo = document.querySelector(`#component${item.id}`).getBoundingClientRect();
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
			style = vm.$tool.getComponentRotatedStyle(component.style);
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
const getCompStyle = (style, index, isGroup) => {
	const result = {};
	["width", "height", "top", "left", "z-index"].forEach(attr => {
		if (attr == "z-index") {
			result["z-index"] = index + 1;
		} else if (attr == "opacity") {
			result[attr] = isGroup ? style[attr] : style[attr] / 100;
		} else if (attr == "rotate") {
			result.transform = "rotate(" + style[attr] + "deg)";
		} else {
			result[attr] = style[attr] + "px";
		}
	});
	return result;
};
</script>

<style scoped lang="scss">
.canvas {
	border: 1px solid rgb(124, 100, 100);
	width: 100%;
	height: calc(100vh - 160px);
	position: relative;
	.group {
		width: 100%;
		height: 100%;
		position: relative;
		.singleGroup {
			position: absolute;
		}
	}
}
</style>
