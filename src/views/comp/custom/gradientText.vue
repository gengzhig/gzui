<template>
	<div class="page-component">
		<h1>渐变文字 gradientText</h1>
		<p>这个东西看起来没啥用，实际上确实没啥用。</p>
		<h3>基础用法</h3>
		<p>它有不同的类型。。</p>
		<div class="meta">
			<div class="demo">
				<gzGradientText type="info" :size="30">asdasdas</gzGradientText>
				<br />
				<gzGradientText type="warning" :size="30">asdasdas</gzGradientText>
				<br />
				<gzGradientText type="error" :size="30">asdasdas</gzGradientText>
				<br />
				<gzGradientText type="success" :size="30">asdasdas</gzGradientText>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	code: `<gzGradientText type="info" :size="30">asdasdas</gzGradientText>
<gzGradientText type="warning" :size="30">asdasdas</gzGradientText>
<gzGradientText type="error" :size="30">asdasdas</gzGradientText>
<gzGradientText type="success" :size="30">asdasdas</gzGradientText>`,
	attributesBrief: {
		tableData: [
			{
				param: "type",
				explain: "渐变文字类型",
				type: "String",
				optional: "info/warning/error/success",
				default: "---",
			},
			{
				param: "size",
				explain: "文字大小",
				type: "Number",
				optional: "---",
				default: "16",
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
	.el-row {
		margin-bottom: 20px;
		button {
			margin-right: 10px;
		}
	}
}
</style>
