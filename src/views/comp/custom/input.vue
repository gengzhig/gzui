<!--
 * @Author: gz
 * @Date: 2021-09-10 13:44:26
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 15:13:42
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\input.vue
-->
<template>
	<div class="page-component">
		<h1>Input 输入框</h1>
		<p>支持普通输入，密码可禁选，文本域。</p>
		<h3>基础用法</h3>

		<div class="meta">
			<div class="demo">
				<!-- <gz-input :inputType="state.type" :rows="rows" :placeholder="state.placeholder"></gz-input> -->
				<gz-input
					v-model:inputValue="state.inputValue"
					:inputType="state.type"
					:disabled="state.disabled"
					:placeholder="state.placeholder"
				></gz-input>
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";

const state = reactive({
	inputValue: "",
	rows: 5,
	disabled: false,
	placeholder: "请输入内容",
	type: "text",
	code: `<gz-input
    v-model:inputValue="state.inputValue"
    :inputType="state.type"
    :disabled="state.disabled"
    :placeholder="state.placeholder"
></gz-input>`,
});
</script>

<style scoped lang="scss"></style>
