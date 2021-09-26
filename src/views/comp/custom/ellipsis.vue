<template>
	<div class="page-component">
		<h1>文本省略 Ellipsis</h1>
		<p>震惊不会消失，只会转移。</p>
		<h3>基础用法</h3>
		<p>当你想看到更多信息时，信息也在看你。</p>
		<div class="meta">
			<div class="demo">
				<gz-ellipsis :width="300" :line="3" triggerClick>
					请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
					我只想让你们记住我的存在请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在</gz-ellipsis
				>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	code: `<gz-ellipsis :width="300" :line="3" triggerClick>
请不要只盯着我最奇怪的刘海 我只想让你们记住我的存在请不要只盯着我最奇怪的刘海
</gz-ellipsis>`,
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
