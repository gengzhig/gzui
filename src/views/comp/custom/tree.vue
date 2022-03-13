<!--
 * @Author: gz
 * @Date: 2021-09-10 16:03:26
 * @LastEditors: gz
 * @LastEditTime: 2021-09-15 10:53:11
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
				<gz-tree
					:hoverBgColor="state.hoverBgColor"
					:data="state.data"
					@nodeClick="nodeClick"
					:highlightList="state.highlightList"
				></gz-tree>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive, toRefs, ref } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";

const state = reactive({
	highlightList: [1, 9],
	data: [
		{
			id: 1,
			label: "一级 1",
			open: true,
			children: [
				{
					id: 2,
					label: "二级 1-1",
					toggleDisabled: true,
					open: true,
					children: [
						{
							id: 3,
							label: "三级 1-1-1",
						},
					],
				},
			],
		},
		{
			id: 4,
			label: "一级 2",
			open: true,
			children: [
				{
					id: 5,
					open: true,
					label: "二级 2-1",
					children: [
						{
							id: 6,
							label: "三级 2-1-1",
						},
					],
				},
				{
					id: 7,
					label: "二级 2-2",
					open: true,
					children: [
						{
							id: 8,
							label: "三级 2-2-1",
						},
					],
				},
			],
		},
		{
			id: 9,
			label: "一级 3",
			open: true,
			children: [
				{
					id: 10,
					label: "二级 3-1",
					children: [
						{
							id: 11,
							label: "三级 3-1-1",
						},
					],
				},
				{
					id: 12,
					label: "二级 3-2",
					children: [
						{
							id: 13,
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
		tableData: [
			{
				methodName: "nodeClick",
				explain: "树组件获取当前点击节点内容",
				param: "共一个参数，为当前点击节点内容。",
			},
		],
	},
	hoverBgColor: "#3333337d",
});

const nodeClick = val => {
	console.log(val, "最终接收到的值");
};
</script>

<style lang="scss" scoped></style>
