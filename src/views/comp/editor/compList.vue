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

	<div v-if="state.visible" class="rightMenu" :style="{ left: state.left + 'px', top: state.top + 'px' }">右键菜单</div>
</template>

<script>
export default {
	name: "compList",
};
</script>
<script setup>
import { computed, inject, ref, onMounted, reactive } from "vue";
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
}
</style>
