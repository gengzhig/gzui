<template>
	<div class="page-component">
		<h1>日历 Calendar</h1>
		<p>显示日期。</p>
		<h3>基础用法</h3>
		<p>设置 value 来指定当前显示的月份。 如果 value 未指定，则显示当月。 value 支持 v-model 双向绑定。</p>
		<div class="meta">
			<div class="demo">
				<!-- <gz-form></gz-form> -->
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
