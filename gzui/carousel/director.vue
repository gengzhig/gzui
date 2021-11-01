<!--
 * @Author: gz
 * @Date: 2021-09-13 09:27:36
 * @LastEditors: gz
 * @LastEditTime: 2021-09-13 10:04:46
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Carousel\director.vue
-->
<template>
	<div class="director dir-next" v-if="hasDirector && dir == 'next'">
		<a href="javascript:;" @click="dirClick(dir)">&gt;</a>
	</div>
	<div class="director dir-prev" v-else-if="hasDirector && dir == 'prev'">
		<a href="javascript:;" @click="dirClick(dir)">&lt;</a>
	</div>
</template>

<script>
export default {
	name: "CarDirector",
};
</script>
<script setup>
const emit = defineEmits(["dirClick"]);
const props = defineProps({
	dir: String,
	hasDirector: Boolean,
});
const dirClick = dir => {
	emit("dirClick", dir);
};
</script>

<style lang="scss" scoped>
.director {
	position: absolute;
	top: 50%;
	z-index: 1;
	margin-top: -20px;
	width: 30px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.5);
	a {
		color: #fff;
		text-decoration: none;
	}
	&.dir-next {
		right: 0;
	}
	&.dir-prev {
		left: 0;
	}
}
</style>
