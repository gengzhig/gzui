<template>
	<div class="compLibrary">
		<div class="compLibrary-top">
			<div class="compLibrary-num">组件库</div>
		</div>
		<div class="compList">
			<!-- <div class="header">组件列表</div> -->
			<div
				class="compItem"
				v-for="(item, index) in compInfo.compList"
				:key="index"
				draggable="true"
				@dragstart="e => dragstart(e, item)"
				@dragend="e => dragend(e)"
			>
				<span class="sub-compTitle">
					{{ item.label }}
				</span>
				<div class="compTitle">
					{{ item.subLabel }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "compLibrary",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const compInfo = inject("compInfo");
const ctx = getCurrentInstance();

const store = useStore();
let currentComp = null; // 当前组件

const dragstart = (e, comp) => {
	let canvas = document.querySelector(".canvas");
	// dragenter 进入元素中，标识改为移动标识
	// dragover 在目标元素经过，阻止默认行为，否则无法触发drop
	// dragleave 离开元素时，增加一个禁用标识
	// drop 松手时，根据拖拽组件添加进去
	canvas.addEventListener("dragenter", dragenter);
	canvas.addEventListener("dragover", dragover);
	canvas.addEventListener("dragleave", dragleave);
	canvas.addEventListener("drop", drop);
	currentComp = comp;
};

const dragenter = e => {
	e.dataTransfer.dropEffect = "move";
};

const dragover = e => {
	e.preventDefault();
};

const dragleave = e => {
	e.dataTransfer.dropEffect = "none";
};

const drop = e => {
	let currentCompList = [
		...store.state.currentCompList,
		{
			id: new Date().getTime(),
			name: currentComp.subLabel,
			key: currentComp.key,
			top: e.offsetY,
			left: e.offsetX,
			width: currentComp.style.width,
			height: currentComp.style.height,
			zIndex: 1,
			alignCenter: true, // 松手时居中
		},
	];
	// 按照先后拖入顺序设置zIndex
	setZindex(currentCompList);
	currentComp = null;
};
const dragend = e => {
	let canvas = document.querySelector(".canvas");
	// if (ctx.parent.ctx.canvasRef.removeListener) {
	// canvas.removeListener("dragenter", dragenter);
	// canvas.removeListener("dragover", dragover);
	// canvas.removeListener("dragleave", dragleave);
	// canvas.removeListener("drop", drop);
	// }
};

const setZindex = data => {
	data.map((c, i) => {
		c.zIndex = i + 1;
	});
	store.commit("setCurrentCompList", data);
};
</script>

<style scoped lang="scss">
.compLibrary {
	.compLibrary-top {
		background: #2e343c;
		text-indent: 10px;
		height: 30px;
		color: #bcc9d4;
		line-height: 30px;
		position: relative;
		user-select: none;
	}
	.compList {
		padding: 5px;
		// .header {
		// 	text-align: left;
		// 	font-weight: bold;
		// 	font-size: 18px;
		// 	margin: 5px;
		// }
		.compItem {
			height: 60px;
			margin-bottom: 5px;
			border: 1px solid #ffffff;
			position: relative;
			cursor: pointer;
			.sub-compTitle {
				padding: 3px;
				font-size: 12px;
				position: absolute;
				background: #2ed573;
			}
			.compTitle {
				font-weight: bold;
				text-align: center;
				line-height: 60px;
			}
		}
	}
}
</style>
