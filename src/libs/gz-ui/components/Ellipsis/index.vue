<template>
	<span class="gz-ellipsis" :class="[line > 1 ? 'lineClamp' : '']" @click="expandTrigger">
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
		type: Number,
		default: 100,
	},
	line: { type: Number, default: 1 },
	triggerClick: { type: Boolean, default: false },
});
const ellipsWidth = ref(props.width + "px");
const ellipsRow = ref(props.line);
const expandTrigger = () => {
	if (props.triggerClick) {
		ellipsRow.value = "Infinity";
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
