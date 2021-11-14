<template>
	<div class="gzFormItem">
		<div class="gzFormItem-label">{{ labelName }}</div>
		<div class="gzFormItem-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzFormItem",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
const props = defineProps({});
const ctx = getCurrentInstance();
const emit = defineEmits();
const state = reactive({});
const slots = useSlots();
const labelName = computed(() => {
	return ctx?.attrs?.label;
});
const labelWidth = computed(() => {
	return ctx?.parent?.ctx?.labelWidth + "px";
});
const labelAlign = computed(() => {
	return ctx?.parent?.attrs?.labelAlign || "right";
});
onMounted(() => {});
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
}
</style>
