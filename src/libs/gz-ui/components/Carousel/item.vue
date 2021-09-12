<template>
	<transition>
		<div class="carousel-item" v-if="state.selfIndex === state.currentIndex">
			<slot></slot>
		</div>
	</transition>
</template>
<script>
export default {
	name: "gzCarouselItem",
};
</script>
<script setup>
import { getCurrentInstance, reactive, watch } from "vue";

const instance = getCurrentInstance();

const state = reactive({
	selfIndex: instance.vnode.key,
	currentIndex: instance.parent.ctx.state.currentIndex,
});

watch(
	() => {
		return instance.parent.ctx.state.currentIndex;
	},
	value => {
		state.currentIndex = value;
	}
);
</script>

<style lang="scss" scoped>
.carousel-item {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
img {
	width: 100%;
	height: 100%;
}

.v-enter-active,
.v-leave-active {
	transition: all 0.3s linear;
}
.v-enter-active {
	transform: translateX(100%);
}
.v-enter-to {
	transform: translateX(0);
}
.v-leave-active {
	transform: translateX(0);
}

.v-leave-to {
	transform: translateX(-100%);
}
</style>