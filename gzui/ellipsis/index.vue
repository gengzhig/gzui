<template>
	<span class="gz-ellipsis" ref="ellipsisRef" :class="[line > 1 ? 'lineClamp' : '']" @click="expandTrigger">
		<slot></slot>
	</span>
</template>
<script>
export default {
	name: "gzEllipsis",
};
</script>
<script setup>
import { watch, ref, onMounted } from "vue";
const props = defineProps({
	width: {
		type: [Number, String],
		default: "100%",
	},
	line: { type: [Number, String], default: 1 },
	triggerClick: { type: Boolean, default: false },
});
let ellipsisRef = ref(null);
let ellipsWidth = ref(null);
onMounted(() => {
	if (props.triggerClick) {
		ellipsisRef.value.style.cursor = "pointer";
	}
});

if (typeof props.width == "number") {
	ellipsWidth.value = props.width + "px";
} else {
	ellipsWidth.value = props.width;
}

const ellipsRow = ref(props.line);
let count = false;
const expandTrigger = e => {
	if (props.triggerClick) {
		ellipsRow.value = count ? props.line : "Infinity";
		count = !count;
		e.target.style.cursor = "pointer";
	}
};
</script>

<style lang="scss" scoped>
.gz-ellipsis {
	white-space: nowrap;
	text-overflow: ellipsis;
	display: inline-block;
	overflow: hidden;
	width: v-bind("ellipsWidth");
	&.lineClamp {
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: v-bind(ellipsRow);
		-webkit-box-orient: vertical;
	}
}
</style>
