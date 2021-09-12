<template>
	<div class="dot-wrapper" v-if="hasDot">
		<div class="dot-item" v-for="item in itemLen" :key="item">
			<a
				href="javascript:;"
				class="dot-link"
				:style="{ backgroundColor: item - 1 == currentIndex ? dotBgColor : '#ffffff' }"
				@click="dotClick(item - 1)"
			></a>
		</div>
	</div>
</template>
<script>
export default {
	name: "CarDot",
};
</script>
<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["dotClickIndex"]);
const props = defineProps({
	itemLen: Number,
	currentIndex: Number,
	hasDot: {
		type: Boolean,
		default: true,
	},
	dotBgColor: {
		type: String,
		default: "#ff5000",
	},
});

const dotClick = index => {
	emit("dotClickIndex", index);
};
</script>

<style lang="scss" scoped>
.dot-wrapper {
	position: absolute;
	width: 100%;
	height: 50px;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
	.dot-item {
		.dot-link {
			display: inline-block;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin: 0 5px;
			cursor: pointer;
		}
	}
}
</style>