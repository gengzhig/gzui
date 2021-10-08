<template>
	<div
		draggable="true"
		:class="['editor-block', state.isActive ? 'editor-block-focus' : '']"
		:style="blockStyle"
		:comp-id="blockStyle.id"
		@mousedown="e => blockMouseDown(e)"
		@mouseup="e => blockMouseUp(e)"
		ref="blockRef"
	>
		<component :is="compInfo.compMapList.get(blockStyle.key).render()"></component>
		<!-- 防止触发组件上的事件，加的一层遮罩 -->
		<div class="assistDom" @contextmenu.prevent.native="openMenu($event)"></div>
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
const blockRef = ref(null);
const state = reactive({
	rightClickItem: null,
	top: null,
	left: null,
	visible: false,
	isActive: false,
});
const blockStyle = computed(() => ({
	id: props.block.id,
	key: props.block.key,
	name: props.block.name,
	top: `${props.block.top}px`,
	left: `${props.block.left}px`,
	width: `${props.block.width}px`,
	height: `${props.block.height}px`,
	zIndex: `${props.block.zIndex}`,
	alignCenter: props.block.alignCenter,
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

const blockMouseDown = e => {
	e.preventDefault();
	e.stopPropagation();
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

		let selectCompId = e.target.parentElement.getAttribute("comp-id");
		let selectComp = store.state.currentCompList.filter(c => c.id == selectCompId);
		let selectCompIndex = store.state.currentCompList.findIndex(c => c.id == selectCompId);
		store.commit("setCurrentComp", { compData: selectComp, index: selectCompIndex });
	};

	const up = () => {
		document.removeEventListener("mousemove", move);
		document.removeEventListener("mouseup", up);
	};
	document.addEventListener("mousemove", move);
	document.addEventListener("mouseup", up);
};

const blockMouseUp = e => {
	state.isActive = !state.isActive;
	let selectCompId = e.target.parentElement.getAttribute("comp-id");
	let selectComp = store.state.currentCompList.filter(c => c.id == selectCompId);
	let selectCompIndex = store.state.currentCompList.findIndex(c => c.id == selectCompId);
	store.commit("setCurrentComp", { compData: selectComp, index: selectCompIndex });
};
// 打开右键菜单
const openMenu = (e, comp) => {
	state.rightClickItem = store.state.currentComp;
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
