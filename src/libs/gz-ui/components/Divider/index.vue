<template>
	<div class="divider" :class="[direction == 'horizontal' ? 'is-horizontal' : 'is-vertical']">
		<div class="divider-text" :class="computedClass" v-if="direction == 'horizontal'">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzDivider",
};
</script>

<script setup>
import { computed } from "vue";
const props = defineProps({
	contentPosition: {
		type: String,
		default: "center",
	},
	direction: {
		type: String,
		default: "horizontal",
	},
});
const computedClass = computed(() => {
	let contentPosition = props.contentPosition;
	switch (contentPosition) {
		case "left":
			return ["is-left"];
		case "right":
			return ["is-right"];
		case "center":
			return ["is-center"];
		default:
			return ["is-center"];
	}
});
</script>

<style scoped lang="scss">
.divider {
	display: block;
	height: 1px;
	width: 100%;
	margin: 24px 0;
	border-top: 1px solid #ccc;
	position: relative;
	&.is-vertical {
		display: inline-block;
		width: 1px;
		height: 1em;
		margin: 0 8px;
		vertical-align: middle;
		position: relative;
		border-left: 1px solid #ccc;
	}
	&-text {
		position: absolute;
		background-color: #fff;
		padding: 0 20px;
		font-weight: 500;
		color: #303133;
		font-size: 14px;
		&.is-left {
			left: 20px;
			transform: translateY(-50%);
		}
		&.is-right {
			right: 20px;
			transform: translateY(-50%);
		}
		&.is-center {
			left: 50%;
			transform: translate(-50%) translateY(-50%);
		}
	}
}
</style>
