<template>
	<div class="mark-line" ref="lineRef">
		<div
			v-for="line in state.lines"
			:key="line"
			class="line"
			:class="line.includes('x') ? 'xline' : 'yline'"
			v-show="state.lineStatus[line] || false"
		></div>
	</div>
</template>

<script setup>
import { computed, inject, ref, onMounted, reactive, watch, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import mitt from "@/mitt.js";
const $tool = inject("$tool");
const store = useStore();
const lineRef = ref(null);
const ctx = getCurrentInstance();
const state = reactive({
	lines: ["xt", "xc", "xb", "yl", "yc", "yr"], // 分别对应三条横线和三条竖线
	diff: 3, // 相距 3 像素将自动吸附
	lineStatus: {
		xt: false,
		xc: false,
		xb: false,
		yl: false,
		yc: false,
		yr: false,
	},
});
onMounted(() => {
	// 监听元素移动和不移动的事件
	mitt.on("move", (isDownward, isRightward) => {
		showLine(isDownward, isRightward);
	});
	mitt.on("unmove", () => {
		hideLine();
	});
});
const hideLine = () => {
	Object.keys(state.lineStatus).forEach(line => {
		state.lineStatus[line] = false;
	});
};

const showLine = (isDownward, isRightward) => {
	let lines = {};
	let aLines = lineRef.value && lineRef.value.getElementsByClassName("line");
	if (aLines) {
		for (let i = 0; i < state.lines.length; i++) {
			lines[state.lines[i]] = [aLines[i]];
		}
	}

	const components = store.state.currentCompList;
	const curComponentStyle = $tool.getComponentRotatedStyle(store.state.currentComp.style);
	const curComponentHalfwidth = curComponentStyle.width / 2;
	const curComponentHalfHeight = curComponentStyle.height / 2;
	hideLine();
	components.forEach(component => {
		if (component.id == store.state.currentComp.id) return;
		const componentStyle = $tool.getComponentRotatedStyle(component.style);
		const { top, left, bottom, right } = componentStyle;
		const componentHalfwidth = componentStyle.width / 2;
		const componentHalfHeight = componentStyle.height / 2;
		const conditions = {
			top: [
				{
					isNearly: isNearly(curComponentStyle.top, top),
					lineNode: lines.xt[0], // xt
					line: "xt",
					dragShift: top,
					lineShift: top,
				},
				{
					isNearly: isNearly(curComponentStyle.bottom, top),
					lineNode: lines.xt[0], // xt
					line: "xt",
					dragShift: top - curComponentStyle.height,
					lineShift: top,
				},
				{
					// 组件与拖拽节点的中间是否对齐
					isNearly: isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
					lineNode: lines.xc[0], // xc
					line: "xc",
					dragShift: top + componentHalfHeight - curComponentHalfHeight,
					lineShift: top + componentHalfHeight,
				},
				{
					isNearly: isNearly(curComponentStyle.top, bottom),
					lineNode: lines.xb[0], // xb
					line: "xb",
					dragShift: bottom,
					lineShift: bottom,
				},
				{
					isNearly: isNearly(curComponentStyle.bottom, bottom),
					lineNode: lines.xb[0], // xb
					line: "xb",
					dragShift: bottom - curComponentStyle.height,
					lineShift: bottom,
				},
			],
			left: [
				{
					isNearly: isNearly(curComponentStyle.left, left),
					lineNode: lines.yl[0], // yl
					line: "yl",
					dragShift: left,
					lineShift: left,
				},
				{
					isNearly: isNearly(curComponentStyle.right, left),
					lineNode: lines.yl[0], // yl
					line: "yl",
					dragShift: left - curComponentStyle.width,
					lineShift: left,
				},
				{
					// 组件与拖拽节点的中间是否对齐
					isNearly: isNearly(curComponentStyle.left + curComponentHalfwidth, left + componentHalfwidth),
					lineNode: lines.yc[0], // yc
					line: "yc",
					dragShift: left + componentHalfwidth - curComponentHalfwidth,
					lineShift: left + componentHalfwidth,
				},
				{
					isNearly: isNearly(curComponentStyle.left, right),
					lineNode: lines.yr[0], // yr
					line: "yr",
					dragShift: right,
					lineShift: right,
				},
				{
					isNearly: isNearly(curComponentStyle.right, right),
					lineNode: lines.yr[0], // yr
					line: "yr",
					dragShift: right - curComponentStyle.width,
					lineShift: right,
				},
			],
		};

		const needToShow = [];
		const { rotate } = store.state.currentComp.style;
		Object.keys(conditions).forEach(key => {
			// 遍历符合的条件并处理
			conditions[key].forEach(condition => {
				if (!condition.isNearly) return;
				// 修改当前组件位移
				store.state.currentComp.style[key] =
					rotate != 0 ? translatecurComponentShift(key, condition, curComponentStyle) : condition.dragShift;
				store.commit("setCurrentComp", { compData: store.state.currentComp, index: store.state.curComponentIndex });
				if (condition.lineNode) {
					condition.lineNode.style[key] = `${condition.lineShift}px`;
					needToShow.push(condition.line);
				}
			});
		});

		// 同一方向上的线只显示一条，例如多条横条只显示一条横线
		if (needToShow.length) {
			chooseTheTureLine(needToShow, isDownward, isRightward);
		}
	});
};

const translatecurComponentShift = (key, condition, curComponentStyle) => {
	const { width, height } = store.state.currentComp.style;
	if (key == "top") {
		return Math.round(condition.dragShift - (height - curComponentStyle.height) / 2);
	}

	return Math.round(condition.dragShift - (width - curComponentStyle.width) / 2);
};

const chooseTheTureLine = (needToShow, isDownward, isRightward) => {
	// 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
	// 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
	if (isRightward) {
		if (needToShow.includes("yr")) {
			state.lineStatus.yr = true;
		} else if (needToShow.includes("yc")) {
			state.lineStatus.yc = true;
		} else if (needToShow.includes("yl")) {
			state.lineStatus.yl = true;
		}
	} else {
		// eslint-disable-next-line no-lonely-if
		if (needToShow.includes("yl")) {
			state.lineStatus.yl = true;
		} else if (needToShow.includes("yc")) {
			state.lineStatus.yc = true;
		} else if (needToShow.includes("yr")) {
			state.lineStatus.yr = true;
		}
	}

	if (isDownward) {
		if (needToShow.includes("xb")) {
			state.lineStatus.xb = true;
		} else if (needToShow.includes("xc")) {
			state.lineStatus.xc = true;
		} else if (needToShow.includes("xt")) {
			state.lineStatus.xt = true;
		}
	} else {
		if (needToShow.includes("xt")) {
			state.lineStatus.xt = true;
		} else if (needToShow.includes("xc")) {
			state.lineStatus.xc = true;
		} else if (needToShow.includes("xb")) {
			state.lineStatus.xb = true;
		}
	}
};

const isNearly = (dragValue, targetValue) => {
	return Math.abs(dragValue - targetValue) <= state.diff;
};
</script>

<style lang="scss" scoped>
.mark-line {
	height: 100%;
}
.line {
	background: #333;
	position: absolute;
	z-index: 1000;
}
.xline {
	width: 100%;
	height: 1px;
}
.yline {
	width: 1px;
	height: 100%;
}
</style>
