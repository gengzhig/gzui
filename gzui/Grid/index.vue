<template>
	<div class="gz-row">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "gzRow",
};
</script>
<script setup>
import { computed } from "vue";
const props = defineProps({
	gutter: {
		type: Number,
		default: 0,
	},
	justify: {
		type: String,
		default: "flex-start",
	},
});
const gap = computed(() => {
	return formatterStyle(props.gutter);
});
const formatterStyle = style => {
	return style + "px";
};
</script>

<style lang="scss" scoped>
.gz-row {
	display: grid;
	grid-template-columns: repeat(24, 1fr);
	gap: v-bind(gap);
	justify-items: v-bind(justify);
}
</style>