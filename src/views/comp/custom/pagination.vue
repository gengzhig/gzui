<!--
 * @Author: gz
 * @Date: 2021-09-09 16:45:45
 * @LastEditors: gz
 * @LastEditTime: 2021-09-09 17:19:34
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
				<gzPagination
					:total="state.total"
					:defaultLimit="state.defaultLimit"
					:defaultLimitData="state.defaultLimitData"
					@prevPage="prevPage"
					@nextPage="nextPage"
					@toggleCurrentPage="toggleCurrentPage"
				></gzPagination>
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	total: 51,
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
	code: `<gz-table></gz-table>`,
});
const prevPage = val => {
	console.log(val);
};
const nextPage = val => {
	console.log(val);
};

const toggleCurrentPage=val=>{
    console.log(val);
}
</script>

<style lang="scss" scoped></style>
