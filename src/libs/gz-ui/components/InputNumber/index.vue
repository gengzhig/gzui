<template>
	<div class="gzInputNumber">
		<gz-button @click="subtract" :disabled="count == min || disabled">-</gz-button>
		<gz-input
			center
			number
			:width="100"
			:disabled="disabled"
			class="gzInput"
			v-model="count"
			placeholder=""
			inputType="text"
		></gz-input>
		<gz-button @click="add" :disabled="count == max || disabled">+</gz-button>
	</div>
</template>

<script>
export default {
	name: "gzInputNumber",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed } from "vue";

const props = defineProps({
	min: {
		type: Number,
	},
	max: {
		type: Number,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	step: {
		type: Number,
		default: 1,
	},
	modelValue: {
		type: Number,
	},
});
const emits = defineEmits(["modelValue"]);
const count = ref(1);

watch(
	() => count.value,
	value => {
		emits("update:modelValue", value);
	}
);
onMounted(() => {
	if (props.modelValue) {
		count.value = props.modelValue;
	}
});
const subtract = () => {
	if (props.min) {
		if (count.value > props.min) {
			count.value--;
		}
	} else {
		count.value--;
	}
};
const add = () => {
	if (props.max) {
		if (count.value < props.max) {
			count.value++;
		}
	} else {
		count.value++;
	}
};
</script>

<style scoped lang="scss">
.gzInputNumber {
	display: flex;
	align-items: center;
	width: max-content;
	display: flex;
	overflow: hidden;
	button:first-child {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	button:last-child {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
}
</style>
<style lang="scss">
.gzInputNumber input {
	border-left: 0;
	border-right: 0;
	border-radius: 0 !important;
}
</style>
