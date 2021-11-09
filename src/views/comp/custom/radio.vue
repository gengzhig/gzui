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
				<gzRadio name="group1" v-model:gz="radio1" :label="1" :disabled="true">水果</gzRadio>
				<gzRadio name="group1" v-model:gz="radio1" :label="2">蔬菜</gzRadio>
				<gzRadio name="group1" v-model:gz="radio1" :label="3">鸡肉</gzRadio>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const radio1 = ref(1);
const state = reactive({
	code: `<gzRadio name="group1" v-model:gz="radio1" :label="1" :disabled="true">水果</gzRadio>
<gzRadio name="group1" v-model:gz="radio1" :label="2">蔬菜</gzRadio>
<gzRadio name="group1" v-model:gz="radio1" :label="3">鸡肉</gzRadio>`,
	attributesBrief: {
		tableData: [
			{
				param: "label",
				explain: "单选框对应的值",
				type: "string/number/boolean",
				optional: "---",
				default: "---",
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
