<template>
	<div class="carousel" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
		<div class="inner">
			<car-dots
				:hasDot="hasDot"
				:itemLen="state.itemLen"
				:currentIndex="state.currentIndex"
				:dotBgColor="dotBgColor"
				@dotClickIndex="dotClickIndex"
			></car-dots>
			<car-director dir="prev" @dirClick="dirClick"></car-director>
			<car-director dir="next" @dirClick="dirClick"></car-director>
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: "gzCarousel",
};
</script>
<script setup>
import { onMounted, onBeforeUnmount, reactive, getCurrentInstance } from "vue";
import carDots from "./dots.vue";
import carDirector from "./director.vue";
const props = defineProps({
	autoplay: {
		type: Boolean,
		default: true,
	},
	duration: {
		type: Number,
		default: 2000,
	},
	initial: {
		type: Number,
		default: 0,
	},
	hasDot: {
		type: Boolean,
		default: true,
	},
	hasDirector: {
		type: Boolean,
		default: true,
	},
	dotBgColor: {
		type: String,
		default: "#ff5000",
	},
});
let t = null;
const instance = getCurrentInstance();
const state = reactive({
	currentIndex: props.initial,
	itemLen: 0,
});
onMounted(() => {
	state.itemLen = instance.slots.default()[0].children.length;
	autoplay();
});

const autoplay = () => {
	if (props.autoplay) {
		t = setInterval(() => {
			setIndex("next");
		}, props.duration);
	}
};

const setIndex = dir => {
	switch (dir) {
		case "next":
			state.currentIndex += 1;
			if (state.currentIndex == state.itemLen) {
				state.currentIndex = 0;
			}
			break;
		case "prev":
			state.currentIndex -= 1;
			if (state.currentIndex == -1) {
				state.currentIndex = state.itemLen - 1;
			}
			break;
		default:
			break;
	}
};

const dotClickIndex = value => {
	console.log(value);
	state.currentIndex = value;
};

const mouseEnter = () => {
	clearIntervalFn();
};

const mouseLeave = () => {
	autoplay();
};

const dirClick = dir => {
	setIndex(dir);
};
function clearIntervalFn() {
	clearInterval(t);
	t = null;
}

onBeforeUnmount(() => {
	clearIntervalFn();
});
</script>

<style lang="scss" scoped>
.carousel {
	width: 500px;
	height: 300px;
	.inner {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
}
</style>