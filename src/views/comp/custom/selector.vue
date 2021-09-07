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
		<h1>Select 下拉菜单</h1>
		<p>当选项过多时，使用下拉菜单展示并选择内容。</p>
		<h3>基础用法</h3>
		<p>适用广泛的基础单选，支持搜索</p>

		<div class="meta">
			<div class="demo">
				<gz-selector
					:width="200"
					:height="40"
					:filtrateData="true"
					:value="state.value"
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
	code: `<gz-selector
    :value="value"
    placeholder="请选择"
    @selectItem="selectItem"
  >
  </gz-selector>`,
	menuData: [
		{
			id: 1,
			value: "1",
			text: "选项1",
		},
		{
			id: 2,
			value: "2",
			text: "选项2",
		},
		{
			id: 3,
			value: "3",
			text: "选项3",
		},
		{
			id: 4,
			value: "4",
			text: "选项4",
		},
		{
			id: 5,
			value: "5",
			text: "选项5",
		},
		{
			id: 6,
			value: "6",
			text: "选项6",
		},
		{
			id: 7,
			value: "7",
			text: "选项7",
		},
		{
			id: 8,
			value: "8",
			text: "选项8",
		},
		{
			id: 9,
			value: "9",
			text: "选项9",
		},
		{
			id: 10,
			value: "10",
			text: "选项10",
		},
		{
			id: 11,
			value: "11",
			text: "选项11",
		},
		{
			id: 12,
			value: "12",
			text: "选项12",
		},
	],
});
const selectItem = item => {
	state.value = item.text;
};
</script>

<style scoped lang="scss"></style>
