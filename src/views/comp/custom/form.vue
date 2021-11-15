<template>
	<div class="page-component">
		<h1>表单 Form</h1>
		<p>表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。</p>
		<h3>基础表单</h3>
		<div class="meta">
			<div class="demo">
				{{ form }}
				<gz-form :rules="rules" :inline="false" labelAlign="right" :form="form" :labelWidth="100">
					<gz-form-item label="一name" prop="inputValue">
						<gz-input :width="150" v-model="form.inputValue" inputType="text"></gz-input>
					</gz-form-item>
					<gz-form-item label="二name" prop="count">
						<gzInputNumber v-model="form.count" :min="1" :max="10"></gzInputNumber>
					</gz-form-item>
					<gz-form-item label="三name">
						<gzRadio v-model="form.radio" :list="radioList"> </gzRadio>
					</gz-form-item>
					<gz-form-item label="四name">
						<gzCheckBox :list="list" v-model="form.checkValue"></gzCheckBox>
					</gz-form-item>
					<gz-form-item label="五name">
						<gz-selector
							:width="200"
							:height="40"
							:filtrateData="true"
							:value="state.value"
							:label="state.label"
							:menuData="state.menuData"
							placeholder="请选择"
							@selectItem="selectItem"
						></gz-selector>
					</gz-form-item>
					<gz-form-item label="六Ename">
						<gz-date-picker v-model="form.time"></gz-date-picker>
					</gz-form-item>
					<gz-form-item label="七Ename">
						<gz-five-star v-model="form.starNum" :size="20" highColor="orange" @change="change"> </gz-five-star>
					</gz-form-item>
					<gz-form-item label="八Ename">
						<gz-switch v-model="form.switch" text="开|关" activeColor="#13ce66" inactiveColor="#fdfdfd"></gz-switch>
					</gz-form-item>
					<gz-form-item>
						<gz-button>取消</gz-button>
						<gz-button type="primary" @click="submit">提交</gz-button>
					</gz-form-item>
				</gz-form>
			</div>
			<base-copy :code="code" :attributeBrief="attributesBrief" :eventBrief="eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const rules = ref({
	inputValue: [
		{
			required: true,
			message: "内容不能为空！",
			trigger: "blur",
		},
	],
	count: [{ required: true, message: "数字不能为空！", trigger: "blur" }],
});
const state = reactive({
	value: "",
	label: "",
	menuData: [
		{
			value: "1",
			label: "选项1",
		},
		{
			value: "2",
			label: "选项2",
		},
		{
			value: "3",
			label: "选项3",
		},
		{
			value: "4",
			label: "选项4",
		},
		{
			value: "5",
			label: "选项5",
		},
		{
			value: "6",
			label: "选项6",
		},
		{
			value: "7",
			label: "选项7",
		},
		{
			value: "8",
			label: "选项8",
		},
		{
			value: "9",
			label: "选项9",
		},
		{
			value: "10",
			label: "选项10",
		},
		{
			value: "11",
			label: "选项11",
		},
		{
			value: "12",
			label: "选项12",
		},
	],
});
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
const list = ref([
	{
		label: "苹果",
		value: "apple",
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
const form = reactive({
	inputValue: "",
	count: "",
	radio: "",
	checkValue: [],
	time: "",
	starNum: 4,
	switch: false,
});
// const config = ref([
// 	{ key: "0006", width: 280, height: 40, disabled: false },
// 	{ key: "0007", width: 280, height: 40, disabled: false },
// 	{ key: "0008", width: 280, height: 40, disabled: false },
// 	{ key: "0009", width: 280, height: 40, disabled: false },
// 	{ key: "0010", width: 280, height: 40, disabled: false },
// 	{ key: "0011", width: 280, height: 40, disabled: false },
// 	{ key: "0012", width: 280, height: 40, disabled: false },
// 	{ key: "0013", height: 40, disabled: false },
// ]);
const code = ref(`<gz-form :inline="false" labelAlign="right" :form="form" :labelWidth="100">
	<gz-form-item label="一name">
		<gz-input :width="150" v-model="form.inputValue" inputType="text"></gz-input>
	</gz-form-item>
	<gz-form-item label="二name">
		<gzInputNumber v-model="form.count" :min="1" :max="10"></gzInputNumber>
	</gz-form-item>
	<gz-form-item label="三name">
		<gzRadio name="group1" disabled v-model:gz="form.radio" :label="1">水果</gzRadio>
		<gzRadio name="group1" v-model:gz="form.radio" :label="2">蔬菜</gzRadio>
		<gzRadio name="group1" v-model:gz="form.radio" :label="3">鸡肉</gzRadio>
	</gz-form-item>
	<gz-form-item label="四name">
		<gzCheckBox :list="list" v-model="form.checkValue"></gzCheckBox>
	</gz-form-item>
	<gz-form-item label="五name">
		<gz-selector
			:width="200"
			:height="40"
			:filtrateData="true"
			:value="state.value"
			:label="state.label"
			:menuData="state.menuData"
			placeholder="请选择"
			@selectItem="selectItem"
		></gz-selector>
	</gz-form-item>
	<gz-form-item label="六Ename">
		<gz-date-picker v-model="form.time"></gz-date-picker>
	</gz-form-item>
	<gz-form-item label="七Ename">
		<gz-five-star v-model="form.starNum" :size="20" highColor="orange" @change="change"> </gz-five-star>
	</gz-form-item>
	<gz-form-item label="八Ename">
		<gz-switch v-model="form.switch" text="开|关" activeColor="#13ce66" inactiveColor="#fdfdfd"></gz-switch>
	</gz-form-item>
</gz-form>`);
const attributesBrief = ref({
	tableData: [
		{
			param: "inline",
			explain: "是否行排列",
			type: "Boolean",
			optional: "true/false",
			default: "false",
		},
		{
			param: "labelAlign",
			explain: "label对齐方式",
			type: "String",
			optional: "left/right",
			default: "right",
		},
		{
			param: "labelWidth",
			explain: "label宽度",
			type: "Number",
			optional: "---",
			default: "---",
		},
	],
});
const eventsBrief = ref({
	tableData: [],
});
const change = value => {
	form.starNum += value;
};
const selectItem = item => {
	state.value = item.value;
	state.label = item.label;
};
</script>
