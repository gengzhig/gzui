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
				:data-index="index"
				draggable="true"
				@dragstart="e => dragstart(e, item)"
				@dragend="e => dragend(e)"
			>
				<div class="sub-compTitle">
					{{ item.label }}
				</div>
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
	e.dataTransfer.setData("index", e.target.dataset.index);
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
			isLock: false,
			isHide: false,
			isGroup: false,
			animations: [],
			events: {},
			groupStyle: {},
			group: [],
			style: {
				top: e.offsetY,
				left: e.offsetX,
				width: currentComp.style.width,
				height: currentComp.style.height,
				zIndex: 1,
				opacity: 100,
				rotate: 0,
			},
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
		c.style.zIndex = i + 1;
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
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #0a0b0d;
		overflow: auto;
		height: calc(100vh - 90px);
		.compItem {
			width: 100%;
			cursor: pointer;
			display: inline-block;
			color: #bcc9d4;
			vertical-align: top;
			user-select: none;
			flex: none;
			margin-bottom: 16px;
			border-radius: 3px;
			border: 1px #d9caca70 solid;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
			.sub-compTitle {
				font-size: 12px;
				padding: 0 5px;
				text-align: left;
				overflow: hidden;
				background: #212326;
				white-space: nowrap;
				text-overflow: ellipsis;
				line-height: 22px;
			}
			.compTitle {
				height: 92px;
				font-weight: bold;
				text-align: center;
				line-height: 92px;
			}
		}
	}
}
</style>
