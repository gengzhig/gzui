<template>
	<div ref="visualContent" class="list-view" @scroll="handleScroll" :style="{ height: height + 'px' }">
		<div class="list-view-phantom" :style="{ height: contentHeight }"></div>
		<div ref="realContent" class="list-view-content">
			<div
				class="list-view-item"
				:style="{
					height: itemHeight + 'px',
				}"
				v-for="item in state.visibleData"
				:key="item"
			>
				{{ item.title }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzVirtualList",
};
</script>

<script setup>
import { computed, onMounted, reactive, ref, watch, defineProps } from "vue";
const props = defineProps({
	data: {
		type: Array,
		required: false,
	},
	height: {
		type: Number,
		default: 400,
	},
	itemHeight: {
		type: Number,
		default: 30,
	},
});

const visualContent = ref(null); // 可视高度
const realContent = ref(null); // 总高度
const contentHeight = computed(() => {
	return props.data.length * props.itemHeight + "px";
});
const state = reactive({
	visibleData: [],
});
watch(
	() => {
		return props.data;
	},
	value => {
		state.visibleData = value;
	}
);
onMounted(() => {
	updateVisibleData();
});
const updateVisibleData = scrollTop => {
	scrollTop = scrollTop || 0;
	const visibleCount = Math.ceil(visualContent.value.clientHeight / props.itemHeight);
	const start = Math.floor(scrollTop / props.itemHeight);
	const end = start + visibleCount;
	state.visibleData = props.data.slice(start, end);
	realContent.value.style.webkitTransform = `translate3d(0, ${start * props.itemHeight}px, 0)`;
};
const handleScroll = () => {
	const scrollTop = visualContent.value.scrollTop;
	updateVisibleData(scrollTop);
};
</script>

<style lang="scss" scoped>
.list-view {
	overflow: auto;
	position: relative;
	border: 1px solid #aaa;
}

.list-view-phantom {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	z-index: -1;
}

.list-view-content {
	left: 0;
	right: 0;
	top: 0;
	position: absolute;
}

.list-view-item {
	padding: 5px;
	color: #666;
	line-height: 30px;
	box-sizing: border-box;
}
</style>
