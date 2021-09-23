<!--
 * @Author: gz
 * @Date: 2021-08-03 09:40:14
 * @LastEditors: gz
 * @LastEditTime: 2021-09-14 17:51:45
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\table.vue
-->
<template>
	<div class="page-component">
		<h1>Table表格</h1>
		<p>用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。</p>
		<h3>基础用法</h3>
		<p>基础的表格展示用法。</p>

		<div class="meta">
			<div class="demo">
				<gz-table
					:config="state.config"
					@handleCurrentChange="handleCurrentChange"
					@handleSelectionChange="handleSelectionChange"
					@cellClick="cellClick"
				>
					<template #operate="{ row }">
						<gz-button @click="handleEdit(row.row)">编辑</gz-button>
					</template>
				</gz-table>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	config: {
		style: {
			stripe: true,
			border: true,
			height: 500,
			index: true,
			radio: true,
			checkBox: true,
		},
		defaultSort: {
			prop: "phone",
			order: "descending", // ascending 表示升序，descending 表示降序，null 表示还原为原始顺序
		},
		columnData: [
			{
				prop: "name",
				label: "名称",
				minWidth: 200,
				tooltip: true,
				formatter: (row, column) => {
					return row.name;
				},
			},
			{
				prop: "address",
				label: "地址",
				width: 200,
				tooltip: true,
			},
			{
				prop: "phone",
				label: "手机",
				width: 200,
				tooltip: true,
				sort: true,
				template: "selectPhone",
			},
			{
				prop: "isbn",
				label: "ISBN",
				width: 200,
				tooltip: true,
				sort: true,
			},
			{
				prop: "publish",
				label: "出版社",
				width: 150,
				tooltip: true,
				sort: true,
			},
			{
				prop: "operate",
				label: "操作",
				width: 300,
				slotName: "operate",
				fixed: "right",
			},
		],
		tableData: [
			{
				name: "webwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebweb",
				address: "陕西宝鸡",
				phone: 18829290520,
				isbn: "123456789",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "map",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
		],
	},
	code: `<gz-table
	:config="state.config"
	@handleCurrentChange="handleCurrentChange"
	@handleSelectionChange="handleSelectionChange"
	@cellClick="cellClick"
>
	<template #operate="{ row }">
		<el-button size="mini" @click="handleEdit(row.row)">编辑</el-button>
	</template>
</gz-table>`,
	attributesBrief: {
		tableData: [
			{
				param: "stripe",
				explain: "是否为斑马纹",
				type: "Boolean",
				optional: "---",
				default: "---",
			},
			{
				param: "border",
				explain: "是否带有纵向边框",
				type: "Boolean",
				optional: "---",
				default: "---",
			},
			{
				param: "height",
				explain: "Table 的高度",
				type: "Number",
				optional: "---",
				default: "---",
			},
			{
				param: "index",
				explain: "是否带有表格序号",
				type: "Boolean",
				optional: "---",
				default: "---",
			},
			{
				param: "radio",
				explain: "是否开启点击当前行回调",
				type: "Boolean",
				optional: "---",
				default: "---",
			},
			{
				param: "checkBox",
				explain: "是否开启复选框",
				type: "Boolean",
				optional: "---",
				default: "---",
			},
		],
	},
	eventsBrief: {
		tableData: [
			{
				methodName: "handleCurrentChange",
				explain: "表格行点击回调函数",
				param: "共两个参数，为currentRow, oldCurrentRow,。",
			},
			{
				methodName: "cellClick",
				explain: "表格单元格点击回调函数",
				param: "共四个参数，row, column, cell, event。",
			},
			{
				methodName: "handleSelectionChange",
				explain: "当选择项发生变化时会触发该事件",
				param: "共一个参数，为selection。",
			},
		],
	},
});

const handleCurrentChange = (currentRow, oldCurrentRow) => {
	console.log(currentRow, oldCurrentRow, "当前行数据");
};
const cellClick = (row, column, cell, event) => {
	console.log(cell, "单元格点击");
};
const handleSelectionChange = selection => {
	console.log(selection, "当前页勾选数据");
};
</script>

<style lang="scss" scoped></style>
