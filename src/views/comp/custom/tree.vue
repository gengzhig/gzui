<!--
 * @Author: gz
 * @Date: 2021-09-10 16:03:26
 * @LastEditors: gz
 * @LastEditTime: 2021-09-14 12:06:07
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\tree.vue
-->
<template>
	<div class="page-component">
		<h1>Tree 树形控件</h1>
		<p>用清晰的层级结构展示信息，可展开或折叠。</p>
		<h3>基础用法</h3>
		<p>基础的树形结构展示。</p>

		<div class="meta">
			<div class="demo">
				<gz-tree :data="state.data"></gz-tree>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive, toRefs, ref } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	data: [
		{
			label: "一级 1",
			children: [
				{
					label: "二级 1-1",
					children: [
						{
							label: "三级 1-1-1",
						},
					],
				},
			],
		},
		{
			label: "一级 2",
			children: [
				{
					label: "二级 2-1",
					children: [
						{
							label: "三级 2-1-1",
						},
					],
				},
				{
					label: "二级 2-2",
					children: [
						{
							label: "三级 2-2-1",
						},
					],
				},
			],
		},
		{
			label: "一级 3",
			children: [
				{
					label: "二级 3-1",
					children: [
						{
							label: "三级 3-1-1",
						},
					],
				},
				{
					label: "二级 3-2",
					children: [
						{
							label: "三级 3-2-1",
						},
					],
				},
			],
		},
	],
	code: `<gz-tree :data="state.data"></gz-tree>`,
	attributesBrief: {
		tableData: [],
	},
	eventsBrief: {
		tableData: [],
	},
});
</script>

<style lang="scss" scoped></style>
