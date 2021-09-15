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
				<gz-tree ref="gTree" :data="state.data"></gz-tree>
				<gz-table
					:headerColor="state.headerColor"
					:headerbgColor="state.headerbgColor"
					:headerBorderColor="state.headerBorderColor"
					:pagination="state.pagination"
					:maxHeight="state.maxHeight"
					:config="state.config"
					@rowClick="rowClick"
					@cellClick="cellClick"
				>
					<template #operateSlot>
						<button class="gz-btn gz-small-btn gz-btn-confirm">授权</button>
						<button class="gz-btn gz-small-btn gz-btn-confirm">激活</button>
					</template>
				</gz-table>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>

<script>
export default {
	components: { baseCopy },
};
</script>
<script setup>
import { onMounted, reactive, ref } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const gTree = ref(null);
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
	headerColor: "#FFF",
	headerbgColor: "rgb(255, 124, 64)",
	headerBorderColor: "",
	pagination: true,
	maxHeight: 300,
	config: {
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
		// type:0 一般列 1：索引列 2：扩展列
		columnData: [
			{
				prop: "index",
				label: "序号",
				minWidth: 100,
				fixed: true,
				type: 0,
			},
			{
				prop: "name",
				label: "名称",
				minWidth: 200,
				fixed: false,
				type: 1,
			},
			{
				prop: "address",
				label: "地址",
				minWidth: 200,
				fixed: false,
				type: 1,
			},
			{
				prop: "phone",
				label: "手机",
				minWidth: 200,
				fixed: false,
				type: 1,
			},
			{
				prop: "isbn",
				label: "ISBN",
				minWidth: 200,
				fixed: false,
				type: 1,
			},
			{
				prop: "publish",
				label: "出版社",
				minWidth: 150,
				fixed: false,
				type: 1,
			},
			{
				prop: "operate",
				label: "操作",
				minWidth: 300,
				fixed: true,
				type: 2,
			},
		],
		tableData: [
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
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
			{
				name: "set",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
		],
	},
	code: `<gz-table
	:headerColor="state.headerColor"
	:headerbgColor="state.headerbgColor"
	:headerBorderColor="state.headerBorderColor"
	:pagination="state.pagination"
	:maxHeight="state.maxHeight"
	:config="state.config"
	@rClick="rowClick"
>
	<template #operateSlot>
		<button class="gz-btn gz-small-btn gz-btn-confirm">授权</button>
		<button class="gz-btn gz-small-btn gz-btn-confirm">激活</button>
	</template>
</gz-table>`,
	attributesBrief: {
		tableData: [
			{
				param: "headerColor",
				explain: "表格表头文字颜色",
				type: "String",
				optional: "---",
				default: "#FFF",
			},
			{
				param: "headerbgColor",
				explain: "表格表头背景色",
				type: "String",
				optional: "---",
				default: "rgb(255, 124, 64)",
			},
			{
				param: "headerBorderColor",
				explain: "表格表头边框颜色",
				type: "String",
				optional: "---",
				default: "#e6e6e6",
			},
			{
				param: "maxHeight",
				explain: "表格最大显示高度",
				type: "Number",
				optional: "---",
				default: "---",
			},
			{
				param: "pagination",
				explain: "开启分页",
				type: "Boolean",
				optional: "true/false",
				default: "true",
			},
		],
	},
	eventsBrief: {
		tableData: [
			{
				methodName: "rowClick",
				explain: "表格行点击回调函数",
				param: "共一个参数，为当前行数据。",
			},
			{
				methodName: "cellClick",
				explain: "表格单元格点击回调函数",
				param: "共一个参数，为当前单元格数据。",
			},
		],
	},
});

const rowClick = data => {
	console.log(data);
	gTree.value.recuTree.isExpose();
};
const cellClick = data => {
	console.log(data);
};
</script>

<style lang="scss" scoped></style>
