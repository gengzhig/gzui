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
			name=""
			id=""
			:disabled="disabled"
			:value="inputValue"
			:placeholder="placeholder"
			@input="input"
		/>
	</template>
	<!-- 文本域 -->
	<template v-if="inputType == 'textarea'">
		<textarea :placeholder="placeholder" :rows="rows" />
	</template>
</template>

<script>
export default {
	name: "gzInput",
};
</script>
<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();
const props = defineProps({
	inputValue: {
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
});
const input = e => {
	emit("update:inputValue", e.target.value);
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
}
textarea:focus {
	outline: none !important;
	border-color: #719ece;
	box-shadow: 0 0 10px #719ece;
}
</style>
