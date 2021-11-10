<template>
	<div class="page-component">
		<h1>多选 Checkbox</h1>
		<p>一组备选项中进行多选。</p>
		<h3>基础用法</h3>
		<p>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</p>
		<div class="meta">
			<div class="demo">
				{{ checkValue }}
				<gzCheckBox :list="list" v-model:defaults="checkValue"></gzCheckBox>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const list = ref([
	{
		label: "苹果",
		value: "apple",
		disabled: true,
	},
	{
		label: "西瓜",
		value: "watermelon",
	},
	{
		label: "葡萄",
		value: "grape",
	},
	{
		label: "香蕉",
		value: "banana",
	},
]);
const checkValue = ref(["apple", "banana"]);

const state = reactive({
	code: `<gzCheckBox :list="list" v-model:defaults="checkValue"></gzCheckBox>`,
	attributesBrief: {
		tableData: [
			{
				param: "list",
				explain: "展示数据",
				type: "Array",
				optional: "---",
				default: "[]",
			},
			{
				param: "checkValue",
				explain: "默认勾选值",
				type: "Array",
				optional: "---",
				default: "[]",
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
