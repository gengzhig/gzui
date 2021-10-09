<template>
	<div
		class="carousel"
		:style="{ height: height + 'px', maxWidth: widthStyle ? '' : 'max-content' }"
		@mouseenter="mouseEnter"
		@mouseleave="mouseLeave"
	>
		<div class="inner">
			<car-dots
				:hasDot="hasDot"
				:itemLen="state.itemLen"
				:currentIndex="state.currentIndex"
				:dotBgColor="dotBgColor"
				@dotClickIndex="dotClickIndex"
			></car-dots>
			<car-director dir="prev" :hasDirector="hasDirector" @dirClick="dirClick"></car-director>
			<car-director dir="next" :hasDirector="hasDirector" @dirClick="dirClick"></car-director>
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
import { onMounted, onBeforeUnmount, reactive, computed, getCurrentInstance } from "vue";
import carDots from "./dots.vue";
import carDirector from "./director.vue";
const props = defineProps({
	width: {
		type: [Number, String],
		default: 300,
	},
	height: {
		type: [Number, String],
		default: 300,
	},
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
		default: "#333",
	},
	imgFit: {
		type: String,
		default: "contain",
	},
});
const widthStyle = computed(() => {
	if (typeof props.width == "string") {
		return true;
	} else {
		return false;
	}
});
let t = null;
const instance = getCurrentInstance();
const state = reactive({
	currentIndex: props.initial,
	itemLen: 0,
});
const emits = defineEmits(["dotClickIndex"]);
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
	state.currentIndex = value;
	emits("dotClickIndex", value);
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
	width: 100%;
	height: 100%;
	.inner {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
}
</style>
