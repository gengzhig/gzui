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
					:data="state.data"
					@nodeClick="nodeClick"
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
	data: [
		{
			id: 1,
			label: "一级 1",
			pId: 0,
			open: true,
			number: 1,
			checked: true,
			children: [
				{
					id: 2,
					pId: 1,
					label: "二级 1-1",
					number: 2,
					open: true,
					checked: true,
					children: [
						{
							id: 3,
							pId: 2,
							number: 3,
							label: "三级 1-1-1",
						},
					],
				},
			],
		},
		{
			id: 4,
			pId: 0,
			label: "一级 2",
			number: 4,
			children: [
				{
					id: 5,
					pId: 4,
					number: 5,
					label: "二级 2-1",
					children: [
						{
							id: 6,
							pId: 5,
							number: 6,
							label: "三级 2-1-1",
						},
					],
				},
				{
					id: 7,
					pId: 4,
					label: "二级 2-2",
					number: 7,
					children: [
						{
							id: 8,
							pId: 7,
							number: 8,
							label: "三级 2-2-1",
						},
					],
				},
			],
		},
		{
			id: 9,
			pId: 0,
			label: "一级 3",
			open: true, number: 9,
			children: [
				{
					id: 10,
					pId: 9,
					number: 10,
					label: "二级 3-1",
					children: [
						{
							id: 11,
							pId: 10,
							number: 11,
							label: "三级 3-1-1",
						},
					],
				},
				{
					id: 12,
					pId: 9,
					label: "二级 3-2",
					number: 12,
					children: [
						{
							id: 13,
							pId: 12,
							number: 13,
							toggleDisabled: true,
							label: "三级 3-2-1",
							children: [
								{
									id: 14,
									pId: 13,
									number: 14,
									label: "四级 3-2-1-1",
								},
							]
						},
						{
							id: 15,
							pId: 12,
							number: 15,
							label: "三级 3-2-2",
							children: [
								{
									id: 16,
									pId: 15,
									number: 16,
									label: "四级 3-2-2-1",
								},
								{
									id: 17,
									pId: 15,
									number: 17,
									label: "四级 3-2-2-2",
								},
							]
						},
						{
							id: 18,
							pId: 12,
							number: 18,
							label: "三级 3-2-3",
							children: [
								{
									id: 19,
									pId: 18,
									number: 19,
									label: "四级 3-2-3-1",
								},
								{
									id: 20,
									pId: 18,
									number: 20,
									label: "四级 3-2-3-2",
								},
							]
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
	indent: 20, // 缩进距离
	// bgImage: "https://t7.baidu.com/it/u=3178628428,2853935042&fm=193&f=GIF",
	bgImage: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F911%2F111G5133543%2F15111G33543-1.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650000194&t=de4345f59b09b51b6ac1814ea309fd6d",
	directionTransition: "ltr", // 过渡动画 从左到右
	expand: "all", // 展开状态 all:全部打开 none:全部收起 默认状态:"default"或""
	checkable: true,
	virtualScroll: true, // 虚拟滚动 （试验功能）
	sendCheckDataWay: "change", // 点击复选框发送数据方式 all:全部勾选数据; single:当前点击数据；change：变化的数据，符合地图图层 
	checkableRelation: "both" // 父子节点选中关系'upward' | 'downward' | 'both' | 'none' 
	// moreHidden: true,
	// moreHiddenCount: 10
})

let singleConfig = reactive({
	row: {
		height: 30,
		activeColor: "rgba(24, 160, 88, 0.1)", // 行高亮颜色
		disabledColor: "#adb0b8"
	},
	icon: {
		width: 15,
		height: 15,
		horizontalMargin: 3 // 水平margin
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
