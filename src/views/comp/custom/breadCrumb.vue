<template>
	<div class="page-component">
		<h1>面包屑 breadCrumb</h1>
		<p>显示当前页面在系统层级结构中的位置，并能向上返回。。</p>
		<h3>基础用法</h3>
		<p>当需要告知用户『你在哪里』时。</p>
		<div class="meta">
			<div class="demo">
				<gzBreadCrumb separator="/">
					<gzBreadCrumbItem :to="{ path: '/' }">首页</gzBreadCrumbItem>
					<gzBreadCrumbItem :to="{ path: '/1' }">管理</gzBreadCrumbItem>
					<gzBreadCrumbItem :to="{ path: '/2' }">列表</gzBreadCrumbItem>
					<gzBreadCrumbItem>详情</gzBreadCrumbItem>
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
	code: `
<gzBreadCrumb separator="/">
	<gzBreadCrumbItem :to="{ path: '/' }">首页</gzBreadCrumbItem>
	<gzBreadCrumbItem :to="{ path: '/1' }">管理</gzBreadCrumbItem>
	<gzBreadCrumbItem :to="{ path: '/2' }">列表</gzBreadCrumbItem>
	<gzBreadCrumbItem>详情</gzBreadCrumbItem>
</gzBreadCrumb>`,
	attributesBrief: {
		tableData: [
			{
				param: "separator",
				explain: "分隔符",
				type: "String",
				optional: "---",
				default: "/",
			},
			{
				param: "to",
				explain: "路由跳转目标，同 vue-router 的 to属性",
				type: "string/object",
				optional: "---",
				default: "---",
			}
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
