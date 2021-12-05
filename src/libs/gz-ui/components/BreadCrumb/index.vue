<template>
	<div class="breadCrumb-index">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "gzBreadCrumb",
};
</script>

<script setup>
import { provide } from "vue";
const props = defineProps({
	separator: {
		type: String,
		default: "/",
	},
});
const emit = defineEmits();
provide("separator", props.separator);
</script>

<style scoped  lang="scss">
.breadCrumb-index {
	display: flex;
	align-items: center;
}
</style>
