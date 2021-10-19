<template>
	<div
		:style="{
			left: start && start.x + 'px',
			top: start && start.y + 'px',
			width: width + 'px',
			height: height + 'px',
		}"
		class="area"
	></div>
</template>

<script setup>
const props = defineProps({
	start: {
		type: Object,
	},
	width: {
		type: Number,
		default: 0,
	},
	height: {
		type: Number,
		default: 0,
	},
});
</script>

<style lang="scss" scoped>
.area {
	border: 1px solid #70c0ff;
	position: absolute;
}
</style>
