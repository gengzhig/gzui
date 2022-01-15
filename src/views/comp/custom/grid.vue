<template>
	<div class="page-component">
		<h1>Grid 栅格</h1>
		<p>基于 CSS Grid，响应式，远离 IE。</p>
		<h3>基础用法</h3>
		<p>使用列创建基础网格布局(24列)。</p>
		<div class="meta">
			<div class="demo">
				<gz-row :gutter="20" justify="center">
					<gz-col :span="10">10</gz-col>
					<gz-col :span="4">测试文字</gz-col>
					<gz-col :span="10">10</gz-col>
				</gz-row>
			</div>
		</div>
		<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
	</div>
</template>
<script setup>
import { reactive, toRefs, ref, getCurrentInstance } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const state = reactive({
	code: `<gz-row :gutter="20">
 <gz-col :span="10">10</gz-col>
 <gz-col :span="4">测试文字</gz-col>
 <gz-col :span="10">10</gz-col>
</gz-row>`,
	attributesBrief: {
		tableData: [
			{
				param: "gutter",
				explain: "栅格间距",
				type: "Number",
				optional: "-",
				default: "0",
			},
			{
				param: "justify",
				explain: "布局下的水平排列方式",
				type: "string",
				optional: "flex-start/flex-end/center",
				default: "flex-start",
			},
			{
				param: "span",
				explain: "栅格占据的列数",
				type: "Number",
				optional: "-",
				default: "24",
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
