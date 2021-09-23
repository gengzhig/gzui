<!--
 * @Author: gz
 * @Date: 2021-09-09 16:45:45
 * @LastEditors: gz
 * @LastEditTime: 2021-09-14 17:46:29
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\pagination.vue
-->
<template>
	<div class="page-component">
		<h1>Pagination 分页</h1>
		<p>当数据量过多时，使用分页分解数据。</p>
		<h3>基础用法</h3>
		<p>基础分页器展示用法。</p>

		<div class="meta">
			<div class="demo">
				<gz-pagination
					:showTotal="state.showTotal"
					:showLimit="state.showLimit"
					:total="state.total"
					:defaultLimit="state.defaultLimit"
					:defaultLimitData="state.defaultLimitData"
					@handleCurrentChange="handleCurrentChange"
					@handleSizeChange="handleSizeChange"
				></gz-pagination>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	showTotal: true,
	showLimit: true,
	total: 51,
	defaultLimit: 10,
	defaultLimitData: [
		{
			id: 1,
			value: "10",
			text: "10条/页",
		},
		{
			id: 2,
			value: "20",
			text: "20条/页",
		},
		{
			id: 3,
			value: "50",
			text: "50条/页",
		},
		{
			id: 4,
			value: "100",
			text: "100条/页",
		},
	],
	code: `<gz-pagination
	:total="state.total"
	:defaultLimit="state.defaultLimit"
	:defaultLimitData="state.defaultLimitData"
	@handleCurrentChange="handleCurrentChange"
	@handleSizeChange="handleSizeChange"
></gz-pagination>`,
	attributesBrief: {
		tableData: [
			{
				param: "showTotal",
				explain: "显示分页器总数",
				type: "Boolean",
				optional: "true/false",
				default: "true",
			},
			{
				param: "showLimit",
				explain: "显示分页器每页条数",
				type: "Boolean",
				optional: "true/false",
				default: "true",
			},
			{
				param: "total",
				explain: "分页器总数",
				type: "Number",
				optional: "---",
				default: "---",
			},
			{
				param: "defaultLimit",
				explain: "默认分页器每页条数",
				type: "Number",
				optional: "---",
				default: 10,
			},
			{
				param: "defaultLimitData",
				explain: "分页器每页配置",
				type: "Array",
				optional: "---",
				default: "[{id: 1,value: '10',text: '10条/页'}]",
			},
		],
	},
	eventsBrief: {
		tableData: [
			{
				methodName: "handleCurrentChange",
				explain: "分页器获取当前页数",
				param: "共一个参数，为当前页数。",
			},
			{
				methodName: "handleSizeChange",
				explain: "分页器获取当前页面数据条数",
				param: "共一个参数，为当前页面最大限制条数。",
			},
		],
	},
});
const handleCurrentChange = val => {
	console.log(`当前页: ${val}`);
};

const handleSizeChange = val => {
	console.log(`每页 ${val}条`);
};
</script>

<style lang="scss" scoped></style>
