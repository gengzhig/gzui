<template>
	<label v-for="(item, index) in list" :key="index" class="gzRadio" :for="item.label" @click="e => toggle(e, item)">
		<input
			type="radio"
			class="radio-input"
			:id="item.label"
			:name="item.name"
			:value="item.label"
			v-model="radioValue"
		/>
		<div class="radio-dot" :class="{ disabled: item.disabled, 'radio-dot-checked': index == selectIndex }"></div>
		<div class="radio-label" :class="{ disabled: item.disabled, 'radio-label-checked': index == selectIndex }">
			{{ item.value }}
		</div>
	</label>
</template>

<script>
export default {
	name: "gzRadio",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
const props = defineProps({
	list: {
		type: Array,
		default: () => [],
	},
	color: {
		type: String,
		default: "#18A058",
	},
	borderColor: {
		type: String,
		default: "#18A058",
	},
	modelValue: {
		type: [String, Number, Boolean],
	},
});
const ctx = getCurrentInstance();
const emits = defineEmits(["modelValue"]);
const slots = useSlots();
const radioValue = ref();
const selectIndex = ref(-1);
onMounted(() => {
	if (props.modelValue) {
		radioValue.value = props.modelValue;
		let findIndex = props.list.findIndex(l => l.label == props.modelValue);
		selectIndex.value = findIndex;
	}
});

const toggle = (e, item) => {
	// 禁选时没有小圆点
	if (item.disabled) {
		return false;
	}
	let findIndex = props.list.findIndex(l => l.label == item.label);
	selectIndex.value = findIndex;
	if (!item.disabled) {
		emits("update:modelValue", item.label);
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
		&.radio-label-checked {
			color: v-bind(color);
		}
	}
}
</style>
