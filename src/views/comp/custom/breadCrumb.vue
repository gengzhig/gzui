<template>
	<div class="page-component">
		<h1>面包屑 breadCrumb</h1>
		<p>显示当前页面在系统层级结构中的位置，并能向上返回。。</p>
		<h3>基础用法</h3>
		<p>当需要告知用户『你在哪里』时。</p>
		<div class="meta">
			<div class="demo">
				<gzBreadCrumb separator="/">
					<gzBreadCrumbItem>Home</gzBreadCrumbItem>
					<gzBreadCrumbItem><a href="">Application Center</a></gzBreadCrumbItem>
					<gzBreadCrumbItem><a href="">Application List</a></gzBreadCrumbItem>
					<gzBreadCrumbItem>An Application</gzBreadCrumbItem>
				</gzBreadCrumb>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	code: ``,
	attributesBrief: {
		tableData: [
			{
				param: "width",
				explain: "显示宽度",
				type: "Number",
				optional: "---",
				default: "---",
			},
			{
				param: "line",
				explain: "显示行数",
				type: "Number",
				optional: "---",
				default: "---",
			},
			{
				param: "triggerClick",
				explain: "点击展示完整文本",
				type: "Boolean",
				optional: "true/false",
				default: "---",
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
