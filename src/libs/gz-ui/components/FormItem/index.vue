<template>
	<div class="gzFormItem">
		<div :class="[prop ? 'gzFormItem-label-required' : 'gzFormItem-label']">{{ labelName }}</div>
		<div class="gzFormItem-content">
			<slot></slot>
			<div
				v-if="formVerify && prop && errorData[prop] && errorData[prop].length > 0 && errorData[prop][0]?.message"
				class="gzFormItem__error"
			>
				{{ errorData[prop][0]?.message }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzFormItem",
};
</script>

<script setup>
import { computed, getCurrentInstance, useSlots, inject } from "vue";
const formVerify = inject("formVerify");
const props = defineProps({
	verify: {
		type: Boolean,
		default: false,
	},
});
const ctx = getCurrentInstance();
// 必填项
const prop = computed(() => {
	return ctx?.attrs?.prop;
});
const errorData = computed(() => {
	return ctx.parent.attrs.rules;
});
const labelName = computed(() => {
	return ctx?.attrs?.label;
});
const labelWidth = computed(() => {
	return ctx?.parent?.ctx?.labelWidth + "px";
});
const labelAlign = computed(() => {
	return ctx?.parent?.attrs?.labelAlign || "right";
});
</script>

<style scoped lang="scss">
.gzFormItem {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	text-align: v-bind(labelAlign);

	.gzFormItem-label {
		line-height: 40px;
		padding: 0 12px 0 0;
		box-sizing: border-box;
		width: v-bind(labelWidth);
	}
	.gzFormItem-label-required {
		line-height: 40px;
		padding: 0 12px 0 0;
		box-sizing: border-box;
		width: v-bind(labelWidth);
		&::before {
			content: "*";
			color: red;
			margin-right: 4px;
		}
	}

	.gzFormItem-content {
		position: relative;
		.gzFormItem__error {
			white-space: nowrap;
			color: red;
			font-size: 12px;
			line-height: 1;
			padding-top: 4px;
			position: absolute;
			top: 100%;
			left: 0;
		}
	}
}
</style>
