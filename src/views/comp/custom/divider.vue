<template>
	<div class="page-component">
		<h1>Divider 分割线</h1>
		<p>区隔内容的分割线。</p>
		<h3>基础用法</h3>
		<p>对不同段落的文本进行分割。</p>
		<div class="meta">
			<div class="demo">
				<gz-divider direction="horizontal" content-position="right">adadad</gz-divider>
			</div>
		</div>
		<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
	</div>
</template>
<script setup>
import { reactive, toRefs, ref, getCurrentInstance } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	code: `<gz-divider direction="horizontal" content-position="right">adadad</gz-divider>`,
	attributesBrief: {
		tableData: [
			{
				param: "direction",
				explain: "设置分割线方向",
				type: "string",
				optional: "horizontal / vertical",
				default: "horizontal",
			},
			{
				param: "content-position",
				explain: "文案布局",
				type: "String",
				optional: "left / right / center",
				default: "center",
			},
		],
	},
	eventsBrief: {
		tableData: [],
	},
});
</script>

<style lang="scss" scoped>
</style>
