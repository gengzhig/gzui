<template>
	<!-- <addIcon /> -->
	<!-- <minusIcon /> -->
	<!-- <svg
		t="1647140533734"
		class="tree-icon"
		viewBox="0 0 1024 1024"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		p-id="2865"
		width="16"
		height="16"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		v-if="!item.open"
		@click="iconTroggle(item)"
	>
		<defs />
		<path
			d="M960.031235 159.921913v703.656418c0 52.974134-42.979014 95.953148-95.953148 95.953148h-703.656418c-52.974134 0-95.953148-42.979014-95.953148-95.953148v-703.656418c0-52.974134 42.979014-95.953148 95.953148-95.953148h703.656418c52.974134 0 95.953148 42.979014 95.953148 95.953148z m-831.593949-159.921913C57.771791 0 0.499756 57.272035 0.499756 127.937531v767.625183c0 70.665495 57.272035 127.937531 127.93753 127.93753h767.625183c70.665495 0 127.937531-57.272035 127.937531-127.93753v-767.625183c0-70.665495-57.272035-127.937531-127.937531-127.937531h-767.625183z"
			p-id="2866"
		/>
		<path
			d="M831.593948 513.149439c-0.499756 17.391508-15.192582 31.084822-32.684041 31.084822H559.726696c-8.795705 0-15.992191 7.196486-15.992191 15.992191v239.183211c0 17.391508-13.693314 32.184285-31.084822 32.684041-18.091166 0.499756-32.883943-13.993167-32.883944-31.984382V560.226452c0-8.795705-7.196486-15.992191-15.992191-15.992191H224.590337c-17.391508 0-32.184285-13.693314-32.684041-31.084822-0.499756-18.091166 13.993167-32.883943 31.984382-32.883944h239.88287c8.795705 0 15.992191-7.196486 15.992191-15.992191V225.090093c0-17.391508 13.693314-32.184285 31.084822-32.684041 18.091166-0.499756 32.883943 13.993167 32.883944 31.984382v239.88287c0 8.795705 7.196486 15.992191 15.992191 15.992191h239.88287c17.991215 0 32.484139 14.792777 31.984382 32.883944z"
			p-id="2867"
		/>
	</svg>
	<svg
		t="1647140570053"
		class="tree-icon"
		viewBox="0 0 1024 1024"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		p-id="4510"
		width="16"
		height="16"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		v-if="item.open"
		@click="iconTroggle(item)"
	>
		<defs />
		<path
			d="M960.031235 159.921913v703.656418c0 52.974134-42.979014 95.953148-95.953148 95.953148h-703.656418c-52.974134 0-95.953148-42.979014-95.953148-95.953148v-703.656418c0-52.974134 42.979014-95.953148 95.953148-95.953148h703.656418c52.974134 0 95.953148 42.979014 95.953148 95.953148z m-831.593949-159.921913C57.771791 0 0.499756 57.272035 0.499756 127.937531v767.625183c0 70.665495 57.272035 127.937531 127.93753 127.93753h767.625183c70.665495 0 127.937531-57.272035 127.937531-127.93753v-767.625183c0-70.665495-57.272035-127.937531-127.937531-127.937531h-767.625183z"
			p-id="4511"
		/>
		<path
			d="M799.609566 544.234261H223.890678c-17.691362 0-31.984383-14.293021-31.984382-31.984383s14.293021-31.984383 31.984382-31.984383h575.718888c17.691362 0 31.984383 14.293021 31.984382 31.984383s-14.293021 31.984383-31.984382 31.984383z"
			p-id="4512"
		/>
	</svg>-->
	<!-- 禁止折叠 -->
	<!-- <img
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
	/>-->
	<!-- 允许折叠 -->
	<!-- <img
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
	/>-->
</template>

<script setup>
import { flatTreeData } from "./utils.js";
// import addIcon from './svg/add.svg';
// import minusIcon from './svg/minus.svg';
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
