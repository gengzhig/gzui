<template>
	<div class="page-component">
		<h1>Loading 加载</h1>
		<p>加载数据时显示动效。</p>
		<h3>基础用法</h3>
		<p>在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）。</p>
		<div class="meta">
			<div class="demo">
				<!-- 默认为局部加载 absolute:false为全局加载 -->
				<gz-loading :absolute="true" theme="dark" :loading="loading"></gz-loading>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, toRefs, ref } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const loading = ref(true);
const state = reactive({
	code: `<gz-loading :absolute="true" theme="dark" :loading="loading"></gz-loading>`,
	attributesBrief: {
		tableData: [
			{
				param: "absolute",
				explain: "加载方式",
				type: "Boolean",
				optional: "true局部加载/false全局加载",
				default: "true",
			},
			{
				param: "theme",
				explain: "主题",
				type: "String",
				optional: "dark/light",
				default: "dark",
			},
			{
				param: "loading",
				explain: "是否加载",
				type: "Boolean",
				optional: "true/false",
				default: "false",
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
	position: relative;
	.el-row {
		margin-bottom: 20px;
	}
}
</style>
