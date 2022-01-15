<template>
	<div :class="style"><slot> </slot></div>
</template>

<script>
export default {
	name: "gzCol",
};
</script>
<script setup>
import { computed } from "vue";

const props = defineProps({
	span: {
		type: Number,
		default: 24,
	},
});
const style = computed(() => {
	return ["gz-col", `col-${props.span}`];
});
</script>

<style lang="scss" scoped>
.col-1 {
	grid-column: span 1;
}
.col-2 {
	grid-column: span 2;
}
.col-3 {
	grid-column: span 3;
}
.col-4 {
	grid-column: span 4;
}
.col-5 {
	grid-column: span 5;
}
.col-6 {
	grid-column: span 6;
}
.col-7 {
	grid-column: span 7;
}
.col-8 {
	grid-column: span 8;
}

.col-9 {
	grid-column: span 9;
}
.col-10 {
	grid-column: span 10;
}
.col-11 {
	grid-column: span 11;
}
.col-12 {
	grid-column: span 12;
}
.col-13 {
	grid-column: span 13;
}
.col-14 {
	grid-column: span 14;
}
.col-15 {
	grid-column: span 15;
}
.col-16 {
	grid-column: span 16;
}

.col-17 {
	grid-column: span 17;
}
.col-18 {
	grid-column: span 18;
}
.col-19 {
	grid-column: span 19;
}
.col-20 {
	grid-column: span 20;
}
.col-21 {
	grid-column: span 21;
}
.col-22 {
	grid-column: span 22;
}
.col-23 {
	grid-column: span 23;
}
.col-24 {
	grid-column: span 24;
}
</style>