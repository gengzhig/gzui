<template>
	<!-- 传统箭头 -->
	<svg
		:style="treeIconStyle"
		t="1647408323860"
		class="tree-icon"
		viewBox="0 0 1024 1024"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		p-id="5397"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		v-if="!item.open"
		@click="iconTroggle(item)"
	>
		<defs />
		<path
			d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6c9.6-9.6 9.6-25.6 0-35.2z"
			fill
			p-id="5398"
		/>
	</svg>
	<svg
		:style="treeIconStyle"
		t="1647408300632"
		class="tree-icon"
		viewBox="0 0 1024 1024"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		p-id="4640"
		width="16"
		height="16"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		v-else
		@click="iconTroggle(item)"
	>
		<defs />
		<path
			d="M966.4 323.2c-9.6-9.6-25.6-9.6-35.2 0l-416 416-425.6-416c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l441.6 432c9.6 9.6 25.6 9.6 35.2 0l435.2-432C976 345.6 976 332.8 966.4 323.2z"
			p-id="4641"
		/>
	</svg>
</template>

<script setup>
import { flatTreeData } from "./utils.js";
import { computed } from "vue";
const props = defineProps({
	item: {
		type: Object,
	},
	singleConfig: {
		type: Object
	}
});

let treeIconStyle = computed(() => {
	let { icon: { width, height, horizontalMargin: margin }, row: { disabledColor } } = props.singleConfig;
	return {
		width: width + "px",
		height: height + "px",
		margin: `0 ${margin}px`,
		disabledColor: disabledColor
	}
})


const emit = defineEmits(["iconClick"]);
const iconTroggle = item => {
	if (!item.children) return;
	if (item.toggleDisabled) return;
	item.open = !item.open;
	emit("iconClick", item);
};
</script>

<style scoped lang="scss">
.tree-icon {
	cursor: pointer;
	position: relative;
}
.toggle-disabled {
	cursor: not-allowed;
	.tree-icon {
		cursor: not-allowed;
		rect {
			stroke: v-bind("treeIconStyle.disabledColor");
		}
		path {
			fill: v-bind("treeIconStyle.disabledColor");
		}
	}
}
</style>
