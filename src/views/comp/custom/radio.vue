<template>
	<div class="page-component">
		<h1>单选 Radio</h1>
		<p>在一组备选项中进行单选。</p>
		<h3>基础用法</h3>
		<p>单选框不应该有太多的可选项， 如果你有很多的可选项你应该使用选择框而不是单选框。</p>
		<p>
			要使用 Radio 组件，只需要设置v-model绑定变量， 选中意味着变量的值为相应 Radio label属性的值，
			label可以是String、Number 或 Boolean。
		</p>
		<div class="meta">
			<div class="demo">
				<gzRadio v-model="radio1" :list="radioList"> </gzRadio>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const radio1 = ref("jirou");
const radioList = ref([
	{
		label: "shuiguo",
		value: "水果",
		name: "group1",
		disabled: true,
	},
	{
		label: "shucai",
		value: "蔬菜",
		name: "group1",
	},
	{
		label: "jirou",
		value: "鸡肉",
		name: "group1",
	},
]);
const state = reactive({
	code: `<gzRadio name="group1" v-model="radio1" :label="1">水果</gzRadio>`,
	attributesBrief: {
		tableData: [
			{
				param: "borderColor",
				explain: "单选框边框颜色",
				type: "String",
				optional: "---",
				default: "#18A058",
			},
			{
				param: "color",
				explain: "单选框原点和文字颜色",
				type: "String",
				optional: "---",
				default: "#18A058",
			},
			{
				param: "list",
				explain: "单选框数据",
				type: "Array",
				optional: "---",
				default: "[]",
			},
			{
				param: "disabled",
				explain: "禁用状态",
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
	.el-row {
		margin-bottom: 20px;
		button {
			margin-right: 10px;
		}
	}
}
</style>
