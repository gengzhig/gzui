<template>
	<div
		class="image"
		:style="{
			width: width.includes('%') ? width : width + 'px',
			height: height.includes('%') ? height : height + 'px',
		}"
	>
		<div class="image-error-slot" v-if="error">
			<slot name="error"></slot>
		</div>
		<div class="image-lazy" v-else-if="lazy">
			<img class="iamge-lazy-item" v-for="url in urls" :key="url" :src="url" />
		</div>

		<img
			v-else
			v-bind="$attrs"
			class="image-inner"
			:src="src"
			:alt="alt"
			:style="{
				'object-fit': fit,
			}"
		/>
	</div>
</template>

<script>
export default {
	name: "gzImage",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance } from "vue";
const ctx = getCurrentInstance();
const props = defineProps({
	src: String,
	alt: String,
	fit: {
		type: String,
		default: "fill",
	},
	width: {
		type: Number,
		default: 50,
	},
	height: {
		type: Number,
		default: 50,
	},
	urls: {
		type: Array,
		default: () => [],
	},
	lazy: {
		type: Boolean,
		default: false,
	},
});
const imageWidth = ref(null);
const imageHeight = ref(null);
const error = ref(false);
onMounted(() => {
	if (props.lazy) {
		addLazyLoadListener();
	} else {
		loadImage();
	}
	imageWidth.value = props.width + "px";
	imageHeight.value = props.height + "px";
});
const loadImage = () => {
	const img = new Image();
	img.src = props.src;
	img.onload = e => handleLoad(e, img);
	img.onerror = e => handleError(e);
};

const handleLoad = (e, img) => {
	// img.src = props.src;
};
const handleError = e => {
	error.value = true;
};

const addLazyLoadListener = () => {};
</script>

<style scoped lang="scss">
.image {
	// width: v-bind(imageWidth);
	// height: v-bind(imageHeight);
	.image-error-slot {
		width: 100%;
		height: 100%;
		font-size: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f5f7fa;
		color: #909399;
	}
	.image-inner {
		width: 100%;
		height: 100%;
	}

	.image-lazy {
		height: v-bind(imageHeight);
		overflow: auto;
		width: 100%;
		.iamge-lazy-item {
			width: 100%;
			height: 100%;
			object-fit: v-bind(fit);
		}
	}
}
</style>
