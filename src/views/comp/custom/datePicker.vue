<template>
	<div class="page-component">
		<h1>日期选择器 DatePicker</h1>
		<p>用于选择或输入日期。</p>
		<h3>基础用法</h3>
		<p>选择某一天。</p>
		<div class="meta">
			<div class="demo">
				<gz-date-picker></gz-date-picker>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	code: ``,
	attributesBrief: {
		tableData: [
			// {
			// 	param: "text",
			// 	explain: "文字描述",
			// 	type: "String",
			// 	optional: "---",
			// 	default: "on|off",
			// },
		],
	},
	eventsBrief: {
		tableData: [],
	},
});
</script>

<style lang="scss" scoped>
.demo {
	.gz-switch:first-child {
		margin-bottom: 10px;
	}
	.el-row {
		margin-bottom: 20px;
		button {
			margin-right: 10px;
		}
	}
}
</style>
