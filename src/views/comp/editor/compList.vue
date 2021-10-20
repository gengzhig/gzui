<template>
	<div
		draggable="true"
		:class="['editor-block']"
		:style="$tool.getUnitStyle(blockStyle)"
		:comp-id="block.id"
		:id="block.id"
		@mousedown="e => blockMouseDown(e, block)"
		@mouseup="e => blockMouseUp(e, block)"
		@click="hideMenu"
		ref="blockRef"
	>
		<!-- 旋转图标 -->
		<i class="el-icon-refresh-right" @mousedown="e => handleRotate(e, block)"></i>
		<!-- 锁定图标 -->
		<!-- <i class="el-icon-lock"></i> -->
		<!-- 8个坐标点 -->
		<i
			class="shape-point"
			v-for="item in state.pointList"
			:key="item"
			@mousedown="handleMouseDownOnPoint(item, $event, block)"
			:style="getPointStyle(item)"
		></i>
		<component v-if="!block.isGroup" :is="compInfo.compMapList.get(block.key).render()"></component>
		<component v-if="block.isGroup" :is="block.group"></component>
		<!-- 防止触发组件上的事件，加的一层遮罩 -->
		<div class="assistDom"></div>
		<div class="navigator-line">
			<div class="navigator-line-left" :style="{ width: $tool.getUnitStyle(blockStyle).left }"></div>
			<div class="navigator-line-top" :style="{ height: $tool.getUnitStyle(blockStyle).top }"></div>
			<div class="navigator-line-account" style="font-size: 16px; left: -15px; top: -15px">
				{{ blockStyle.left }},{{ blockStyle.top }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "compList",
};
</script>

<script setup>
import { computed, inject, ref, onMounted, reactive, watch, nextTick } from "vue";
import { useStore } from "vuex";
import mitt from "@/mitt.js";
const props = defineProps({
	block: {
		type: Object,
	},
});
console.log(props.block);
const store = useStore();
const compInfo = inject("compInfo");
const blockRef = ref(null);
const state = reactive({
	rightClickItem: null,
	pointList: ["lt", "t", "rt", "r", "rb", "b", "lb", "l"], // 八个方向
	initialAngle: {
		// 每个点对应的初始角度
		lt: 0,
		t: 45,
		rt: 90,
		r: 135,
		rb: 180,
		b: 225,
		lb: 270,
		l: 315,
	},
	angleToCursor: [
		// 每个范围的角度对应的光标
		{ start: 338, end: 23, cursor: "nw" },
		{ start: 23, end: 68, cursor: "n" },
		{ start: 68, end: 113, cursor: "ne" },
		{ start: 113, end: 158, cursor: "e" },
		{ start: 158, end: 203, cursor: "se" },
		{ start: 203, end: 248, cursor: "s" },
		{ start: 248, end: 293, cursor: "sw" },
		{ start: 293, end: 338, cursor: "w" },
	],
});
const blockStyle = computed(() => ({
	top: `${props.block.style.top}`,
	left: `${props.block.style.left}`,
	width: `${props.block.style.width}`,
	height: `${props.block.style.height}`,
	zIndex: `${props.block.style.zIndex}`,
	opacity: props.block.style.opacity / 100,
	rotate: props.block.style.rotate,
}));

// 处理旋转
const handleRotate = (e, block) => {
	e.preventDefault();
	e.stopPropagation();
	// 初始坐标和初始角度
	const pos = blockStyle.value;
	const startY = e.clientY;
	const startX = e.clientX;
	const startRotate = props.block.style.rotate;

	// 获取元素中心点位置
	const rect = document.querySelector(".canvas").getBoundingClientRect();
	const centerX = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;

	// 旋转前的角度
	const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);

	// 如果元素没有移动，则不保存快照
	let hasMove = false;
	const move = moveEvent => {
		hasMove = true;
		const curX = moveEvent.clientX;
		const curY = moveEvent.clientY;
		// 旋转后的角度
		const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
		// 获取旋转的角度值(精度设为0.1)
		pos.rotate = vm.$tool.fomatFloat(startRotate + rotateDegreeAfter - rotateDegreeBefore, 1);
		props.block.style.rotate = Number(pos.rotate);
		// 修改当前组件样式
		// this.$store.commit("setShapeStyle", pos);
		store.commit("setCurrentComp", { compData: block, index: block.style.zIndex - 1 });
	};

	const up = () => {
		// hasMove && this.$store.commit("recordSnapshot");
		document.removeEventListener("mousemove", move);
		document.removeEventListener("mouseup", up);
		getCursor(); // 根据旋转角度获取光标位置
		// this.cursors = this.getCursor();
	};

	document.addEventListener("mousemove", move);
	document.addEventListener("mouseup", up);
};

const getPointStyle = point => {
	let { width, height } = blockStyle.value;
	let numberWidth = parseInt(width);
	let numberHeight = parseInt(height);
	const hasT = /t/.test(point);
	const hasB = /b/.test(point);
	const hasL = /l/.test(point);
	const hasR = /r/.test(point);
	let newLeft = 0;
	let newTop = 0;
	// 四个角的点
	if (point.length === 2) {
		newLeft = hasL ? 0 : numberWidth;
		newTop = hasT ? 0 : numberHeight;
	} else {
		// 上下两点的点，宽度居中
		if (hasT || hasB) {
			newLeft = numberWidth / 2;
			newTop = hasT ? 0 : numberHeight;
		}

		// 左右两边的点，高度居中
		if (hasL || hasR) {
			newLeft = hasL ? 0 : numberWidth;
			newTop = Math.floor(numberHeight / 2);
		}
	}
	const style = {
		left: `${newLeft - 4}px`,
		top: `${newTop - 4}px`,
		cursor: getCursor()[point],
	};
	return style;
};

const getCursor = () => {
	let { angleToCursor, initialAngle, pointList } = state;
	let rotate = null;
	if (store.state.currentComp) {
		rotate = vm.$tool.mod360(store.state.currentComp?.style?.rotate); // 取余 360
	}
	const result = {};
	let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

	pointList.forEach(point => {
		const angle = vm.$tool.mod360(initialAngle[point] + rotate);
		const len = angleToCursor.length;
		while (true) {
			lastMatchIndex = (lastMatchIndex + 1) % len;
			const angleLimit = angleToCursor[lastMatchIndex];
			if (angle < 23 || angle >= 338) {
				result[point] = "nw-resize";

				return;
			}

			if (angleLimit.start <= angle && angle < angleLimit.end) {
				result[point] = angleLimit.cursor + "-resize";

				return;
			}
		}
	});
	return result;
};

const handleMouseDownOnPoint = (point, e, block) => {
	store.commit("setCurrentComp", { compData: block, index: block.style.zIndex - 1 });
	e.stopPropagation();
	e.preventDefault();

	let style = blockStyle.value;
	style.width = parseInt(style.width);
	style.height = parseInt(style.height);
	style.top = parseInt(style.top);
	style.left = parseInt(style.left);
	// 组件宽高比
	const proportion = parseInt(style.width) / parseInt(style.height);

	// 组件中心点
	const center = {
		x: parseInt(style.left) + parseInt(style.width) / 2,
		y: parseInt(style.top) + parseInt(style.height) / 2,
	};

	// 获取画布位移信息
	const editorRectInfo = document.querySelector(".canvas").getBoundingClientRect();

	// 获取 point 与实际拖动基准点的差值

	const pointRect = e.target.getBoundingClientRect();
	// 当前点击圆点相对于画布的中心坐标
	const curPoint = {
		x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
		y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2),
	};

	// 获取对称点的坐标
	const symmetricPoint = {
		x: center.x - (curPoint.x - center.x),
		y: center.y - (curPoint.y - center.y),
	};

	// 是否需要保存快照
	let needSave = false;
	let isFirst = true;

	const needLockProportion = false;
	const move = moveEvent => {
		// 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
		// 因此第一次点击时不触发 move 事件
		if (isFirst) {
			isFirst = false;
			return;
		}

		needSave = true;
		const curPositon = {
			x: moveEvent.clientX - editorRectInfo.left,
			y: moveEvent.clientY - editorRectInfo.top,
		};

		vm.$tool.calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
			center,
			curPoint,
			symmetricPoint,
		});

		props.block.style.left = parseInt(style.left);
		props.block.style.top = parseInt(style.top);
		props.block.style.width = parseInt(style.width);
		props.block.style.height = parseInt(style.height);

		store.commit("setCurrentComp", { compData: block, index: block.style.zIndex - 1 });
	};

	const up = () => {
		document.removeEventListener("mousemove", move);
		document.removeEventListener("mouseup", up);
		// needSave && this.$store.commit("recordSnapshot");
	};

	document.addEventListener("mousemove", move);
	document.addEventListener("mouseup", up);
};

const blockMouseDown = (e, block) => {
	try {
		let editorBlock = blockRef.value.parentElement.querySelectorAll(".editor-block");
		[...editorBlock].map(b => {
			b.classList.remove("editor-block-focus");
		});
		e.currentTarget.classList.add("editor-block-focus");
		e.preventDefault();
		e.stopPropagation();
		// e.target.cursor = "move";
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
			props.block.style.left = parseInt(pos.left);
			props.block.style.top = parseInt(pos.top);
			store.commit("setCurrentComp", { compData: block, index: block.style.zIndex - 1 });

			// 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
			// 如果不使用 $nextTick，吸附后将无法移动
			nextTick(() => {
				// 触发元素移动事件，用于显示标线、吸附功能
				// 后面两个参数代表鼠标移动方向
				// curY - startY > 0 true 表示向下移动 false 表示向上移动
				// curX - startX > 0 true 表示向右移动 false 表示向左移动
				mitt.emit("move", curY - startY > 0, curX - startX > 0);
			});
		};

		const up = () => {
			// 触发元素停止移动事件，用于隐藏标线
			mitt.emit("unmove");
			document.removeEventListener("mousemove", move);
			document.removeEventListener("mouseup", up);
		};
		document.addEventListener("mousemove", move);
		document.addEventListener("mouseup", up);
	} catch (error) {
		console.log(error);
	}
};

const blockMouseUp = (e, block) => {
	// console.log("blockMouseUp");
	// let selectCompId = e.target.parentElement.getAttribute("comp-id");
	// let selectComp = store.state.currentCompList.filter(c => c.id == selectCompId);
	// let selectCompIndex = store.state.currentCompList.findIndex(c => c.id == selectCompId);
	// store.commit("setCurrentComp", { compData: selectComp, index: selectCompIndex });
	store.commit("setCurrentComp", { compData: block, index: block.style.zIndex - 1 });
};

// 隐藏菜单
const hideMenu = e => {
	// 阻止向父组件冒泡
	e.stopPropagation();
	e.preventDefault();
	store.commit("hideContextMenu");
};
</script>

<style scoped lang="scss">
.editor-block {
	position: absolute;
	border: 1px transparent solid;
	&:hover {
		cursor: move;
	}
	.el-icon-refresh-right {
		display: none;
	}
	.navigator-line {
		display: none;
	}
}

.editor-block-focus {
	border: 1px #70c0ff solid;
	// outline: 1px solid #70c0ff;
	.el-icon-refresh-right {
		display: block;
		position: absolute;
		top: -30px;
		left: 50%;
		transform: translateX(-50%);
		cursor: grab;
		color: #59c7f9;
		font-size: 20px;
		font-weight: 600;
	}
	.el-icon-lock {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		color: #9e9e9ec4;
		font-size: 20px;
		font-weight: 600;
	}
	.shape-point {
		position: absolute;
		background: #fff;
		border: 1px solid #59c7f9;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		z-index: 1;
	}
	.navigator-line {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		box-sizing: content-box;
		.navigator-line-left {
			position: absolute;
			border-top: 1px dashed #2483ff;
			height: 0;
			top: 0;
			transform: translateX(-100%);
		}
		.navigator-line-top {
			position: absolute;
			border-left: 1px dashed #2483ff;
			width: 0;
			left: 0;
			transform: translateY(-100%);
		}
		.navigator-line-account {
			position: absolute;
			transform: translate(-100%, -100%);
			color: #2483ff;
			text-shadow: 1px 1px 1px #222;
			white-space: nowrap;
		}
	}
}

.assistDom {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 999999999999999999999999999;
	top: 0;
}
</style>
