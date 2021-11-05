<template>
	<div class="page-component">
		<h1>Loading 加载</h1>
		<p>加载数据时显示动效。</p>
		<h3>基础用法</h3>
		<p>在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）。</p>
		<div class="meta">
			<div class="demo">
				<gz-loading :full="false" theme="dark" :loading="loading">这是一个简单的文字</gz-loading>
				测试文字
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
		<h3>指令用法</h3>
		<p>全局指令,v-gzload。</p>
		<div class="meta">
			<div class="demo">
				<div
					v-gzload="{
						full: false,
						theme: 'dark',
						loading: true,
						tips: '指令加载中...',
					}"
				>
					测试文字
				</div>
			</div>
			<base-copy
				:code="state.zlcode"
				:attributeBrief="state.attributesBrief"
				:eventBrief="state.eventsBrief"
			></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, toRefs, ref } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const loading = ref(true);
const state = reactive({
	code: `<gz-loading :full="false" theme="dark" :loading="loading">这是一个简单的文字</gz-loading>`,
	zlcode: `<div v-gzload="{full: false,theme: 'dark',loading: true,tips: '指令加载中...',}">测试文字</div>`,
	attributesBrief: {
		tableData: [
			{
				param: "full",
				explain: "加载方式",
				type: "Boolean",
				optional: "true局部加载/false全局加载",
				default: "false",
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
			{
				param: "tips",
				explain: "提示文字",
				type: "String",
				optional: "---",
				default: "加载中...",
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
