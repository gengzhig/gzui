<!--
 * @Author: gz
 * @Date: 2021-09-13 10:14:29
 * @LastEditors: gz
 * @LastEditTime: 2021-09-14 17:16:18
 * @Description: file content
 * @FilePath: \gi-ui\src\components\baseFunction\EventsBrief.vue
-->
<template>
	<div class="description">事件介绍</div>
	<div class="highlight code">
		<gz-table :config="state.config"> </gz-table>
	</div>
</template>

<script>
export default {
	name: "EventsBrief",
};
</script>
<script setup>
import { reactive } from "vue";
const props = defineProps({
	eBrief: {
		type: Object,
		default: () => {},
	},
});
const state = reactive({
	config: {
		style: {
			stripe: true,
			border: true,
		},
		// type:0 一般列 1：索引列 2：扩展列
		columnData: [
			{
				prop: "methodName",
				label: "方法名",
				width: 200,
				fixed: false,
			},
			{
				prop: "explain",
				label: "说明",
				fixed: false,
			},
			{
				prop: "param",
				label: "参数",
				fixed: false,
			},
		],
		tableData: props.eBrief.tableData,
	},
});
</script>
<style lang="scss" scoped>
.description {
	padding: 20px;
	box-sizing: border-box;
	border-top: 1px solid #ebebeb;
	border-bottom: 1px solid #ebebeb;
	a {
		color: rgba(24, 228, 24, 0.733);
		float: right;
		text-decoration: none;
	}
}
.highlight {
	font-size: 12px;
	padding: 18px 24px;
	background-color: #fafafa;
	textarea {
		width: 100%;
	}
}
</style>
