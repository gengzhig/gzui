<template>
	<!-- 禁止折叠 -->
	<img
		src="./icon/add-disabled.png"
		class="tree-icon"
		v-if="!item.open && item.toggleDisabled"
		@click="iconTroggle(item)"
		alt
	/>
	<img
		src="./icon/minus-disabled.png"
		class="tree-icon"
		v-if="item.open && item.toggleDisabled"
		@click="iconTroggle(item)"
		alt
	/>
	<!-- 允许折叠 -->
	<img
		src="./icon/add-icon.png"
		class="tree-icon"
		v-if="!item.open && !item.toggleDisabled"
		@click="iconTroggle(item)"
		alt
	/>
	<img
		src="./icon/minus-icon.png"
		class="tree-icon"
		v-if="item.open && !item.toggleDisabled"
		@click="iconTroggle(item)"
		alt
	/>
</template>

<script setup>
import { flatTreeData } from "./utils.js";
const props = defineProps({
	item: {
		type: Object,
	},
});

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
	width: 15px;
	height: 15px;
	margin: 0 3px;
	cursor: pointer;
}
.toggle-disabled {
	.tree-icon {
		cursor: not-allowed;
	}
}
</style>
