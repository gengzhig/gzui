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
		<!-- <gz-button @click="cancel">取消</gz-button>
		<gz-button type="primary" @click="submit">提交</gz-button> -->
	</div>
</template>

<script>
export default {
	name: "gzForm",
};
</script>

<script setup>
import { ref, getCurrentInstance } from "vue";
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
const emit = defineEmits(["cancel", "submit"]);

// 取消
const cancel = () => {
	console.log(props.verify);
	// verify.value = false;
};
// 提交
const submit = () => {
	// verify.value = true;
};
</script>

<style scoped lang="scss"></style>
