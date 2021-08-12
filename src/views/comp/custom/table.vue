<!--
 * @Author: gz
 * @Date: 2021-08-03 09:40:14
 * @LastEditors: gz
 * @LastEditTime: 2021-08-12 16:54:54
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
				<gz-table :config="config"></gz-table>
			</div>
			<base-copy :code="code"></base-copy>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { onMounted } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
export default {
	components: { baseCopy },
	setup() {
		const state = reactive({
			config: {
				// type:0 一般列 1：索引列 2：扩展列
				columnData: [
					{
						prop: "index",
						label: "序号",
						width: 100,
						fixed: true,
						type: 1,
					},
					{
						prop: "name",
						label: "名称",
						width: 300,
						fixed: false,
						type: 0,
					},
					{
						prop: "address",
						label: "地址",
						width: 300,
						fixed: false,
						type: 0,
					},
					{
						prop: "phone",
						label: "手机",
						width: 300,
						fixed: false,
						type: 0,
					},
					{
						prop: "isbn",
						label: "ISBN",
						width: 300,
						fixed: false,
						type: 0,
					},
					{
						prop: "publish",
						label: "出版社",
						width: 300,
						fixed: false,
						type: 0,
					},
					{
						prop: "operate",
						label: "操作",
						width: 600,
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
						name: "jquery",
						address: "北京大学",
						phone: 1234234234,
						isbn: "234234234",
						publish: "北师大",
						operate: ["edit", "del"],
					},
				],
			},
			code: `<template>
    <gz-tabs
      :width="400"
      :height="200"
      :headerHeight="60"
      :tabsData="tabsData"
    >
    </gz-tabs>
</template>`,
		});
		return {
			...toRefs(state),
		};
	},
};
</script>

<style lang="scss" scoped></style>
