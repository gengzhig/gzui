<template>
	<div class="gradientText" :style="{ backgroundImage: backgroundImage }">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "gzGradientText",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
const props = defineProps({
	type: {
		type: String,
		default: "error",
	},
	size: {
		type: Number,
		default: 16,
	},
});
const backgroundImage = ref(null);
const fontSize = ref(props.size + "px");
switch (props.type) {
	case "error":
		backgroundImage.value = "linear-gradient(252deg, rgba(208, 48, 80, 0.6) 0%, #d03050 100%)";
		break;
	case "info":
		backgroundImage.value = "linear-gradient(252deg, rgba(32, 128, 240, 0.6) 0%, #2080f0 100%)";
		break;
	case "warning":
		backgroundImage.value = "linear-gradient(252deg, rgba(240, 160, 32, 0.6) 0%, #f0a020 100%)";
		break;
	case "success":
		backgroundImage.value = "linear-gradient(252deg, rgba(24, 160, 88, 0.6) 0%, #18a058 100%)";
		break;
	default:
		break;
}
const state = reactive({});
</script>

<style scoped lang="scss">
.gradientText {
	display: inline-block;
	font-weight: 500;
	-webkit-background-clip: text;
	color: #0000;
	white-space: nowrap;
	font-size: v-bind(fontSize);
}
</style>
