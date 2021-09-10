<!--
 * @Author: gz
 * @Date: 2021-08-03 09:40:14
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 11:49:49
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
				<gz-table ref="tableRef" :config="state.config" @rClick="rClick">
					<template #operateSlot>
						<button class="gz-btn gz-small-btn gz-btn-confirm">授权</button>
						<button class="gz-btn gz-small-btn gz-btn-confirm">激活</button>
					</template>
				</gz-table>
			</div>
			<base-copy :code="state.code"></base-copy>
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

const tableRef = ref(null);
const state = reactive({
	config: {
		defaultLimit: "10条/页",
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
		maxHeight: 500,
		headerStyle: {
			color: "#fff",
		},
		pagination: true,
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
	code: `<gz-table ref="tableRef" :config="state.config" @rClick="rClick">
	<template #operateSlot>
		<button class="gz-btn gz-small-btn gz-btn-confirm">授权</button>
		<button class="gz-btn gz-small-btn gz-btn-confirm">激活</button>
	</template>
</gz-table>`,
});

const rClick = data => {
	console.log(data);
};

</script>

<style lang="scss" scoped></style>
