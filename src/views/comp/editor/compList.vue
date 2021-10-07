<template>
	<div
		draggable="true"
		:class="['editor-block', state.comp.focus ? 'editor-block-focus' : '']"
		:style="blockStyle"
		@mousedown="e => blockMouseDown(e, state.comp)"
		@mouseup="e => blockMouseUp(e, state.comp)"
		ref="blockRef"
	>
		<component :is="state.comp.render()"></component>
		<!-- 防止触发组件上的事件，加的一层遮罩 -->
		<div class="assistDom" @contextmenu.prevent.native="openMenu($event, state.comp)"></div>
	</div>

	<div v-if="state.visible" class="rightMenu" :style="{ left: state.left + 'px', top: state.top + 'px' }">
		<h3>右键功能菜单</h3>
		<ul>
			<li>左对齐</li>
			<li>右对齐</li>
			<li>上对齐</li>
			<li>下对齐</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "compList",
};
</script>

<script setup>
import { computed, inject, ref, onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
const props = defineProps({
	block: {
		type: Object,
	},
});
const store = useStore();
const compInfo = inject("compInfo");
const comp = compInfo.compMapList.get(props.block.key); // 当前渲染组件信息
const blockRef = ref(null);
const state = reactive({
	rightClickItem: null,
	top: null,
	left: null,
	visible: false,
	comp: comp,
});
const blockStyle = computed(() => ({
	name: props.block.name,
	top: `${props.block.top}px`,
	left: `${props.block.left}px`,
	width: `${props.block.width}px`,
	height: `${props.block.height}px`,
	zIndex: `${props.block.zIndex}`,
}));
onMounted(() => {
	let { offsetWidth, offsetHeight } = blockRef.value;
	blockStyle.value.width = offsetWidth + "px";
	blockStyle.value.height = offsetHeight + "px";
});

watch(
	() => state.visible,
	value => {
		if (value) {
			document.body.addEventListener("click", closeMenu);
		} else {
			document.body.removeEventListener("click", closeMenu);
		}
	}
);
const blockMouseDown = (e, comp) => {
	e.preventDefault();
	e.stopPropagation();
	// e.dataTransfer.dropEffect = "move";
	if (!state.comp.focus) {
		state.comp.focus = true;
	} else {
		state.comp.focus = false;
	}
	e.target.style.cursor = "move";
	const pos = { ...blockStyle.value };

	const startY = e.clientY;
	const startX = e.clientX;
	// 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
	const startTop = parseInt(pos.top);
	const startLeft = parseInt(pos.left);
	const move = moveEvent => {
		const curX = moveEvent.clientX;
		const curY = moveEvent.clientY;
		pos.top = curY - startY + startTop + "px";
		pos.left = curX - startX + startLeft + "px";
		props.block.left = parseInt(pos.left);
		props.block.top = parseInt(pos.top);
		store.commit("setCurrentComp", blockStyle.value);
	};

	const up = () => {
		document.removeEventListener("mousemove", move);
		document.removeEventListener("mouseup", up);
	};
	document.addEventListener("mousemove", move);
	document.addEventListener("mouseup", up);
};

const blockMouseUp = (e, comp) => {
	store.commit("setCurrentComp", blockStyle.value);
};
// 打开右键菜单
const openMenu = (e, comp) => {
	state.rightClickItem = comp;
	let x = e.clientX;
	let y = e.clientY;
	state.top = y - 90;
	state.left = x - 200;
	state.visible = true;
};

// 关闭右键菜单
const closeMenu = () => {
	state.visible = false;
};
</script>

<style scoped lang="scss">
.editor-block {
	position: absolute;
}

.editor-block-focus {
	border: 1px #70c0ff solid;
}

.assistDom {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 999999999999999999999999999;
	top: 0;
}

.rightMenu {
	width: 200px;
	height: 300px;
	position: absolute;
	border: 1px solid yellowgreen;
	list-style-type: none;
	padding: 5px 0;
	border-radius: 4px;
	font-size: 12px;
	font-weight: 400;
	color: #333;
	background: gainsboro;
	padding: 5px;
	margin: 0;
	box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
	z-index: 99999999999999;
	ul {
		list-style: none;
	}
}
</style>
