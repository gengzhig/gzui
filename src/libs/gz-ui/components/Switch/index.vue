<template>
	<div class="gz-switch" :class="{ 'gz-switch-on': isChecked, disabled: disabled }" @click="toggle">
		<div v-if="isChecked && direction.length > 0" class="gz-switch-rail" style="line-height: 20px; color: #fff">
			{{ direction[0] }}
		</div>
		<div
			v-if="!isChecked && direction.length > 0"
			class="gz-switch-rail"
			style="right: 2px; line-height: 22px; color: #7a7a7a; text-align: right"
		>
			{{ direction[1] }}
		</div>
	</div>
</template>
<script>
export default {
	name: "gzSwitch",
};
</script>
<script setup>
import { watch, ref, computed, onMounted } from "vue";

const props = defineProps({
	text: {
		type: String,
		default: "on|off",
	},
	width: {
		type: [Number, String],
		default: 70,
	},
	activeColor: {
		type: String,
		default: "#13ce66",
	},
	inactiveColor: {
		type: String,
		default: "#ff4949",
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	modelValue: {
		type: Boolean,
		default: false,
	},
});
const switchWidth = computed(() => {
	if (typeof props.width == "number") {
		return props.width + "px";
	} else {
		return props.width;
	}
});
const emits = defineEmits(["modelValue"]);
const direction = computed(() => {
	if (props.text) {
		return props.text.split("|");
	} else {
		return [];
	}
});
const isChecked = ref(props.modelValue);
watch(
	() => props.modelValue,
	val => {
		isChecked.value = val;
	}
);
watch(
	() => isChecked.value,
	val => {
		emits("update:modelValue", val);
	}
);
const toggle = () => {
	if (props.disabled) {
		return false;
	}
	isChecked.value = !isChecked.value;
};
</script>
<style lang="scss">
.gz-switch {
	display: block;
	position: relative;
	width: v-bind(switchWidth);
	height: 24px;
	border: 1px solid #dfdfdf;
	outline: 0;
	border-radius: 16px;
	box-sizing: border-box;
	background-color: #dfdfdf;
	transition: background-color 0.1s, border 0.1s;
	cursor: pointer;
	position: relative;
	&.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.gz-switch-rail {
		width: 100%;
		height: 100%;
		position: absolute;
		padding: 0 5px;
		user-select: none;
	}
}
.gz-switch:before {
	content: " ";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 22px;
	border-radius: 15px;
	background-color: v-bind(inactiveColor);
	transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.gz-switch:after {
	content: " ";
	position: absolute;
	top: 0;
	left: 0;
	width: 22px;
	height: 22px;
	border-radius: 15px;
	background-color: #ffffff;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	transition: left 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.gz-switch-on {
	border-color: #6f6f6f;
	background-color: #1aad19;
}
.gz-switch-on:before {
	border-color: #1aad19;
	background-color: v-bind(activeColor);
}
.gz-switch-on:after {
	left: calc(100% - 22px);
}
</style>
