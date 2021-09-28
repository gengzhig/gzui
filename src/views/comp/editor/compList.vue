<template>
	<div
		:class="['editor-block', state.compFocus ? 'editor-block-focus' : '']"
		:style="blockStyle"
		@mousedown="e => blockMouseDown(e, comp)"
		ref="blockRef"
	>
		<component :is="comp.render()"></component>
		<div class="assistDom" @contextmenu.prevent.native="openMenu($event, comp)"></div>
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
const props = defineProps({
	block: {
		type: Object,
	},
});
const compInfo = inject("compInfo");
const comp = compInfo.compMapList.get(props.block.key);
const state = reactive({
	compFocus: comp.focus,
	rightClickItem: null,
	top: null,
	left: null,
	visible: false,
});
const blockStyle = computed(() => ({
	top: `${props.block.top}px`,
	left: `${props.block.left}px`,
	width: `${props.block.width}px`,
	height: `${props.block.height}px`,
	zIndex: `${props.block.zIndex}`,
}));
const blockRef = ref(null);
onMounted(() => {
	let { offsetWidth, offsetHeight } = blockRef.value;
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
	console.log(comp);
	if (!state.compFocus) {
		state.compFocus = true;
	} else {
		state.compFocus = false;
	}
};

// 打开右键菜单
const openMenu = (e, comp) => {
	state.rightClickItem = comp;
	let x = e.clientX;
	let y = e.clientY;
	state.top = y - 90;
	state.left = x - 200;
	state.visible = true;
	console.log(state);
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
	border: 1px red dashed;
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
