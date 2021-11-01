<!--
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-08-30 11:52:36
 * @LastEditors: gz
 * @Description: In User Settings Edit
 * @FilePath: \gi-ui\src\views\comp\custom\selector.vue
-->
<template>
	<div class="page-component">
		<h1>Select 选择器</h1>
		<p>当选项过多时，使用选择器展示并选择内容。</p>
		<h3>基础用法</h3>
		<p>适用广泛的基础单选，支持搜索</p>

		<div class="meta">
			<div class="demo">
				<gz-selector
					:width="200"
					:height="40"
					:filtrateData="true"
					:value="state.value"
					:label="state.label"
					:menuData="state.menuData"
					placeholder="请选择"
					@selectItem="selectItem"
				></gz-selector>
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";

const state = reactive({
	value: "",
	label: "",
	code: `<gz-selector
    :value="value"
    placeholder="请选择"
    @selectItem="selectItem"
  >
  </gz-selector>`,
	menuData: [
		{
			value: "1",
			label: "选项1",
		},
		{
			value: "2",
			label: "选项2",
		},
		{
			value: "3",
			label: "选项3",
		},
		{
			value: "4",
			label: "选项4",
		},
		{
			value: "5",
			label: "选项5",
		},
		{
			value: "6",
			label: "选项6",
		},
		{
			value: "7",
			label: "选项7",
		},
		{
			value: "8",
			label: "选项8",
		},
		{
			value: "9",
			label: "选项9",
		},
		{
			value: "10",
			label: "选项10",
		},
		{
			value: "11",
			label: "选项11",
		},
		{
			value: "12",
			label: "选项12",
		},
	],
});
const selectItem = item => {
	state.value = item.value;
	state.label = item.label;
};
</script>

<style scoped lang="scss"></style>
