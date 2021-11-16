<template>
	<div
		ref="form"
		class="gzForm"
		v-bind="attrs"
		:form="form"
		:labelWidth="labelWidth"
		:style="{ display: inline ? 'flex' : '' }"
	>
		<slot :rules="rules" :verify="verify"></slot>
	</div>
</template>

<script>
export default {
	name: "gzForm",
};
</script>

<script setup>
import { ref, watch, computed, getCurrentInstance } from "vue";
const props = defineProps({
	labelWidth: {
		type: [String, Number],
	},
	inline: {
		type: Boolean,
		default: false,
	},
	verify: {
		type: Boolean,
		default: false,
	},
});
const ctx = getCurrentInstance();

const form = ref();
const emit = defineEmits();
</script>

<style scoped lang="scss"></style>
