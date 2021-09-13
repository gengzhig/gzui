<!--
 * @Author: gz
 * @Date: 2021-09-13 10:14:29
 * @LastEditors: gz
 * @LastEditTime: 2021-09-13 17:38:22
 * @Description: file content
 * @FilePath: \gi-ui\src\components\baseFunction\AttributesBrief.vue
-->
<template>
	<div class="description">属性介绍</div>
	<div class="highlight code">
		<gz-table :config="state.config"> </gz-table>
	</div>
</template>

<script>
export default {
	name: "AttributesBrief",
};
</script>
<script setup>
import { reactive } from "vue";
const props = defineProps({
	aBrief: {
		type: Object,
		default: () => {},
	},
});
const state = reactive({
	config: {
		maxHeight: 500,
		headerStyle: {
			color: "#fff",
		},
		pagination: false,
		// type:0 一般列 1：索引列 2：扩展列
		columnData: props.aBrief.columnData,
		tableData: props.aBrief.tableData,
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
