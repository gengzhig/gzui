<!--
 * @Author: gz
 * @Date: 2021-09-10 13:44:26
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 15:12:38
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\input.vue
-->
<template>
	<div class="page-component">
		<h1>Input 输入框</h1>
		<p>
			Input 为受控组件，它总会显示 Vue 绑定值。 通常情况下，应当处理 input
			事件，并更新组件的绑定值（或使用v-model）。否则，输入框内显示的值将不会改变。 不支持 v-model 修饰符。
		</p>
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
