<template>
	<div class="gzRadio">
		<input type="radio" class="radio-input" :name="name" />
		<div class="radio-dot" :class="{ disabled: disabled }" @click="toggleA"></div>
		<div class="radio-label" :class="{ disabled: disabled }" @click="toggleB"><slot></slot></div>
	</div>
</template>

<script>
export default {
	name: "gzRadio",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
const props = defineProps({
	name: {
		type: String,
	},
	label: {
		type: [String, Number, Boolean],
	},
	color: {
		type: String,
		default: "#18A058",
	},
	borderColor: {
		type: String,
		default: "#18A058",
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});
const ctx = getCurrentInstance();
const emit = defineEmits(["gz"]);
const slots = useSlots();
const toggleA = val => {
	// 获取页面上所有name相同的单选框
	let radios = document.querySelectorAll(`.gzRadio .radio-input[name=${props.name}]`);
	radios.forEach(r => {
		r.nextElementSibling.classList.remove("radio-dot-checked");
	});
	val.target.classList.add("radio-dot-checked");
	if (!val.target.classList.contains("disabled")) {
		emit("update:gz", props.label);
	}
};

const toggleB = val => {
	// 获取页面上所有name相同的单选框
	let radios = document.querySelectorAll(`.gzRadio .radio-input[name=${props.name}]`);
	radios.forEach(r => {
		r.nextElementSibling.classList.remove("radio-dot-checked");
	});
	val.target.previousElementSibling.classList.add("radio-dot-checked");
	if (!val.target.classList.contains("disabled")) {
		emit("update:gz", props.label);
	}
};
</script>

<style scoped lang="scss">
.gzRadio {
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	.radio-input {
		border: 0;
		width: 0;
		height: 0;
		opacity: 0;
		margin: 0;
	}
	.radio-dot {
		width: 16px;
		height: 16px;
		background: #fff;
		box-shadow: inset 0 0 0 1px v-bind(borderColor);
		transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		border-radius: 50%;
		&.disabled {
			cursor: not-allowed;
			box-shadow: inset 0 0 0 1px rgb(224, 224, 230) !important;
			&::before {
				background: rgb(224, 224, 230);
			}
		}
		&.radio-dot-checked {
			box-shadow: inset 0 0 0 1px v-bind(borderColor);
			&::before {
				opacity: 1;
				transform: scale(1);
			}
		}
		&::before {
			content: "";
			opacity: 0;
			position: absolute;
			left: 4px;
			top: 4px;
			height: calc(100% - 8px);
			width: calc(100% - 8px);
			border-radius: 50%;
			transform: scale(0.8);
			background: v-bind(color);
			transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
				transform 0.3s var(--bezier);
		}
	}
	.radio-label {
		color: rgb(51, 54, 57);
		padding: 0 8px;
		display: inline-block;
		white-space: nowrap;
		transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		&.disabled {
			cursor: not-allowed;
			color: rgba(194, 194, 194, 1);
		}
	}
}
</style>
