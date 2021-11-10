<template>
	<div class="page-component">
		<h1>数字输入 InputNumber</h1>
		<p>仅允许输入标准的数字值，可定义范围。</p>
		<h3>基础用法</h3>
		<p>要使用它，只需要在 'gz-input-number' 元素中使用 v-model 绑定变量即可，变量的初始值即为默认值。</p>
		<div class="meta">
			<div class="demo">
				<gzInputNumber></gzInputNumber>
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
			{
				param: "text",
				explain: "文字描述",
				type: "String",
				optional: "---",
				default: "on|off",
			},
			{
				param: "activeColor",
				explain: "开颜色",
				type: "String",
				optional: "---",
				default: "#13ce66",
			},
			{
				param: "inactiveColor",
				explain: "关颜色",
				type: "String",
				optional: "---",
				default: "#ff4949",
			},
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
