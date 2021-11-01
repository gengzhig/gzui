<template>
	<div class="page-component">
		<h1>Button按钮</h1>
		<p>常用的操作按钮。</p>
		<h3>基础用法</h3>
		<p>使用 type、plain、round 和 circle 来定义按钮的样式。</p>
		<div class="meta">
			<div class="demo">
				<h3>按钮类型</h3>
				<el-row>
					<gz-button>Default</gz-button>
					<gz-button type="primary">Primary</gz-button>
					<gz-button type="success">Success</gz-button>
					<gz-button type="info">Info</gz-button>
					<gz-button type="warning">Warning</gz-button>
					<gz-button type="danger">Danger</gz-button>
				</el-row>
				<h3>禁用按钮</h3>
				<el-row>
					<gz-button disabled>Default</gz-button>
					<gz-button type="primary" disabled>Primary</gz-button>
					<gz-button type="success" disabled>Success</gz-button>
					<gz-button type="info" disabled>Info</gz-button>
					<gz-button type="warning" disabled>Warning</gz-button>
					<gz-button type="danger" disabled>Danger</gz-button>
				</el-row>
				<h3>朴素按钮</h3>
				<el-row>
					<gz-button plain>Plain</gz-button>
					<gz-button type="primary" plain>Primary</gz-button>
					<gz-button type="success" plain>Success</gz-button>
					<gz-button type="info" plain>Info</gz-button>
					<gz-button type="warning" plain>Warning</gz-button>
					<gz-button type="danger" plain>Danger</gz-button>
				</el-row>
				<h3>圆角按钮</h3>
				<el-row>
					<gz-button round>Round</gz-button>
					<gz-button type="primary" round>Primary</gz-button>
					<gz-button type="success" round>Success</gz-button>
					<gz-button type="info" round>Info</gz-button>
					<gz-button type="warning" round>Warning</gz-button>
					<gz-button type="danger" round>Danger</gz-button>
				</el-row>
				<h3>按钮大小</h3>
				<el-row>
					<gz-button>Default</gz-button>
					<gz-button size="medium">Medium</gz-button>
					<gz-button size="small">Small</gz-button>
					<gz-button size="mini">Mini</gz-button>
				</el-row>
				<h3>文字按钮</h3>
				<el-row>
					<gz-button type="text">Text Button</gz-button>
					<gz-button type="text" disabled>Text Button</gz-button>
				</el-row>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	code: `<gz-button type="primary" plain>Primary</gz-button>`,
	attributesBrief: {
		tableData: [
			{
				param: "type",
				explain: "按钮类型",
				type: "String",
				optional: "primary/success/info/warning/danger/text",
				default: "default",
			},
			{
				param: "disabled",
				explain: "是否禁用",
				type: "Boolean",
				optional: "true/false",
				default: "false",
			},
			{
				param: "plain",
				explain: "是否朴素",
				type: "Boolean",
				optional: "true/false",
				default: "false",
			},
			{
				param: "round",
				explain: "是否带圆角",
				type: "Boolean",
				optional: "true/false",
				default: "false",
			},
			{
				param: "size",
				explain: "按钮大小",
				type: "String",
				optional: "medium/small/mini",
				default: "default",
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
	}
}
</style>
