<template>
	<div class="gzDatePicker" ref="datePickerRef" :style="{ width: typeof width == 'number' ? width + 'px' : width }">
		<gz-input
			:width="width"
			@blur="blur"
			@focus="focus"
			v-model="modelValue"
			inputType="text"
			placeholder="请选择日期"
		></gz-input>
		<transition name="container" v-show="show">
			<gz-calendar v-if="defaultTime" @clickValue="clickValue" v-model="defaultTime" :width="width"></gz-calendar>
		</transition>
	</div>
</template>

<script>
export default {
	name: "gzDatePicker",
};
</script>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
const props = defineProps({
	width: {
		type: [Number, String],
		default: 280,
	},
	modelValue: {
		type: [String, Number],
	},
});

const emits = defineEmits(["modelValue"]);

const show = ref(false);
const defaultTime = ref("");
const datePickerRef = ref(null);

onMounted(() => {
	if (props.modelValue) {
		defaultTime.value = props.modelValue;
	} else {
		defaultTime.value = new Date().getFullYear() + "-" + (+new Date().getMonth() + 1) + "-" + new Date().getDate();
	}
});

const focus = e => {
	show.value = true;
};

const blur = e => {
	// console.log(e);
	// console.log(datePickerRef.value);
	// console.log(datePickerRef.value.contains(e.target));
};

const clickValue = value => {
	props.modelValue = value;
	show.value = false;
	emits("update:modelValue", value);
};
</script>

<style scoped lang="scss">
.gzDatePicker {
	height: 100%;
	background-color: #fff;
	position: relative;
	.gzCalendar {
		height: auto;
		background-color: #fff;
		position: absolute;
		z-index: 999;
		top: 50px;
		padding: 5px;
		box-sizing: border-box;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	}
}
.container-enter-active,
.container-leave-active {
	transition: opacity 0.3s ease;
}

.container-enter-from,
.container-leave-to {
	opacity: 0;
}
</style>
