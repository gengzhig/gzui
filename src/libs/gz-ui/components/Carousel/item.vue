<!--
 * @Author: gz
 * @Date: 2021-09-13 09:27:36
 * @LastEditors: gz
 * @LastEditTime: 2021-09-13 10:06:24
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Carousel\item.vue
-->
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
import { getCurrentInstance, reactive, ref, watch } from "vue";

const instance = getCurrentInstance();
// const imgFit = ref(instance.parent.ctx.imgFit);
const state = reactive({
	imgFit: instance.parent.ctx.imgFit,
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

<style lang="scss">
.carousel-item {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	img {
		width: 100%;
		height: 100%;
		object-fit: v-bind("state.imgFit");
	}
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
