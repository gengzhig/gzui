<!--
 * @Author: gz
 * @Date: 2021-09-13 09:27:36
 * @LastEditors: gz
 * @LastEditTime: 2021-09-15 09:12:08
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Input\index.vue
-->
<template>
	<!-- 基础、密码框 -->
	<template v-if="inputType != 'textarea'">
		<input
			:type="inputType"
			:disabled="disabled"
			:placeholder="placeholder"
			:style="{ textAlign: center ? 'center' : 'left', width: typeof width == 'number' ? width + 'px' : width }"
			v-model="inputContent"
			@input="input"
			@keyup="keyup"
			@focus="focus($event)"
			@blur="blur($event)"
		/>
	</template>
	<!-- 文本域 -->
	<template v-if="inputType == 'textarea'">
		<textarea
			:placeholder="placeholder"
			:rows="rows"
			:disabled="disabled"
			v-model="textAreaValue"
			@input="textAreaInput"
			:style="{ textAlign: center ? 'center' : 'left', width: typeof width == 'number' ? width + 'px' : width }"
		/>
	</template>
</template>

<script>
export default {
	name: "gzInput",
};
</script>
<script setup>
import { reactive, ref, getCurrentInstance, watch } from "vue";

const { emit } = getCurrentInstance();
const props = defineProps({
	modelValue: {
		default: "",
	},
	inputType: {
		type: String,
		default: "text",
	},
	placeholder: {
		type: String,
		default: "请输入内容",
	},
	rows: {
		type: Number,
		default: 5,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	width: {
		type: [Number, String],
		default: 180,
	},
	center: {
		type: Boolean,
		default: false,
	},
	textAreaValue: {
		type: [String, Boolean, Number],
		default: "请输入内容",
	},
	number: {
		type: Boolean,
		default: false,
	},
	password: {
		type: Boolean,
		default: false,
	},
});
let inputContent = ref(props.modelValue);
watch(
	() => props.modelValue,
	value => {
		inputContent.value = value;
	}
);
const input = e => {
	// 正则校验 只允许输入数字
	if (props.number) {
		emit("update:modelValue", e.target.value.replace(/\D/g, ""));
	} else {
		emit("update:modelValue", e.target.value);
	}
};
const focus = e => {
	emit("focus", e.target.value);
};
const blur = e => {
	emit("blur", e);
};
const keyup = e => {
	if (props.number) {
		inputContent.value = (inputContent.value || "").replace(/\D/g, "");
	}
};
const textAreaInput = e => {
	emit("update:textAreaValue", e.target.value);
};
</script>

<style lang="scss" scoped>
input {
	height: 40px;
	line-height: 40px;
	outline: none;
	padding: 0 15px;
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	box-sizing: border-box;
	&:disabled {
		cursor: not-allowed;
	}
}
textarea {
	resize: vertical;
	width: 100%;
	padding: 5px 15px;
	line-height: 1.5;
	box-sizing: border-box;
	&:disabled {
		cursor: not-allowed;
	}
}
textarea:focus {
	outline: none !important;
	border-color: #719ece;
	box-shadow: 0 0 10px #719ece;
}
</style>
