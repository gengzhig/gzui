<template>
	<div class="breadCrumb-item">
		<span class="breadCrumb-item-text">
			<slot></slot>
		</span>
		<span class="breadCrumb-item-separator"> {{ separator }} </span>
	</div>
</template>

<script>
export default {
	name: "gzBreadCrumbItem",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, inject, computed, getCurrentInstance, useSlots, nextTick } from "vue";
const props = defineProps({});
const emit = defineEmits();

const separator = inject("separator");
</script>

<style scoped lang="scss">
.breadCrumb-item {
	&-separator {
		margin: 0 5px;
	}
	&:last-child {
		.breadCrumb-item-separator {
			display: none;
		}
	}
}
</style>
