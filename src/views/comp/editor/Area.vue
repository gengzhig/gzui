<template>
	<!-- <div
		:style="{
			left: start.x + 'px',
			top: start.y + 'px',
			width: width + 'px',
			height: height + 'px',
		}"
		class="area"
	></div> -->
	<div>
		{{ start }}
	</div>
</template>

<script setup>
const defineProps = {
	start: {
		type: Object,
	},
	width: {
		type: Number,
	},
	height: {
		type: Number,
	},
};
console.log(defineProps);
</script>

<style lang="scss" scoped>
.area {
	border: 1px solid #70c0ff;
	position: absolute;
}
</style>