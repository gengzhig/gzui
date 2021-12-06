<template>
	<div class="breadCrumb-item">
		<span class="breadCrumb-item-text" @click="pathClick(to)">
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
import { useRouter } from "vue-router";
const props = defineProps({
	to: {
		type: Object,
		defaullt: () => {},
	},
});
const emit = defineEmits();
const router = useRouter();
const separator = inject("separator");

const pathClick = value => {
	router.push(value.path);
};
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
	&-text {
		cursor: pointer;
		&:hover{
			color:#4093ee
		}
	}
}
</style>
