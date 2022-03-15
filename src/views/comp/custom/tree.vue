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
					:globalConfig="globalConfig"
					:singleConfig="singleConfig"
					:hoverBgColor="state.hoverBgColor"
					:data="state.data"
					@nodeClick="nodeClick"
					:highlightList="state.highlightList"
				></gz-tree>
			</div>
			<base-copy
				:code="state.code"
				:attributeBrief="state.attributesBrief"
				:eventBrief="state.eventsBrief"
			></base-copy>
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
			number: 10,
			children: [
				{
					id: 2,
					label: "二级 1-1",
					toggleDisabled: true,
					number: 10,
					open: true,
					children: [
						{
							id: 3,
							number: 10,
							label: "三级 1-1-1",
						},
					],
				},
			],
		},
		{
			id: 4,
			label: "一级 2",
			number: 11,
			children: [
				{
					id: 5,
					number: 13,
					label: "二级 2-1",
					children: [
						{
							id: 6,
							number: 14,
							label: "三级 2-1-1",
						},
					],
				},
				{
					id: 7,
					label: "二级 2-2",
					number: 15,
					children: [
						{
							id: 8, number: 16,
							label: "三级 2-2-1",
						},
					],
				},
			],
		},
		{
			id: 9,
			label: "一级 3",
			open: true, number: 17,
			children: [
				{
					id: 10, number: 18,
					label: "二级 3-1",
					children: [
						{
							id: 11, number: 19,
							label: "三级 3-1-1",
						},
					],
				},
				{
					id: 12,
					label: "二级 3-2", number: 20,
					children: [
						{
							id: 13, number: 21,
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
// 全局配置
let globalConfig = reactive({
	width: 500,
	height: 300,
	padding: 3,
	indent: 15, // 缩进距离
	bgImage: "https://t7.baidu.com/it/u=3178628428,2853935042&fm=193&f=GIF",
	directionTransition: "ltr", // 过渡动画 从左到右
	expandAll: true,
	// checkable: true,
	// moreHidden: true,
	// moreHiddenCount: 10
})

let singleConfig = reactive({
	row: {
		activeColor: "" // 行高亮颜色
	},
	icon: {
		width: 15,
		height: 15,
		horizontalPadding: 3
	},
	label: {
		fontSize: 18,
		color: "green",
		activeColor: "yellow"
	},
	number: {
		color: "orange",
		activeColor: "red",
		fontSize: 14,
		show: true
	}
})
const nodeClick = val => {
	console.log(val, "最终接收到的值");
};
</script>

<style lang="scss" scoped></style>
