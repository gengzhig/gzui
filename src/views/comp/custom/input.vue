<!--
 * @Author: gz
 * @Date: 2021-09-10 13:44:26
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 15:13:42
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\input.vue
-->
<template>
	<div class="page-component">
		<h1>Input 输入框</h1>
		<p>支持普通文本输入,文本域和密码,可禁选。</p>
		<h3>基础用法</h3>
		<div class="meta">
			<div class="demo">
				<gz-input password :width="150" v-model="inputValue" :inputType="type" :placeholder="placeholder"></gz-input>
			</div>
			<base-copy :code="code"></base-copy>
		</div>
		<h3>禁用状态</h3>
		<p>通过 disabled 属性指定是否禁用 input 组件</p>
		<h3>只允许输入数字</h3>
		<p>通过 number 属性指定是否只允许输入数字</p>
		<h3>文本域</h3>
		<div class="meta">
			<div class="demo">
				<gz-input v-model:textAreaValue="textAreaValue" inputType="textarea" width="100%" :rows="rows" :readonly="false"
					:maxlength="100" :placeholder="placeholder"></gz-input>
			</div>
			<base-copy :code="textAreaCode" :attributeBrief="attributesBrief" :eventBrief="eventsBrief"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const textAreaValue = ref("测试文本域输入");
const inputValue = ref("");
const rows = ref(5);
const disabled = ref(true);
const type = ref("type");
const placeholder = ref("请输入内容");
const code = ref(`<gz-input
	:width="150"
	v-model="inputValue"
	:inputType="type"
	:placeholder="placeholder">
</gz-input>`);

const textAreaCode = ref(`<gz-input
	v-model:textAreaValue="textAreaValue"
	inputType="textarea"
	:rows="rows"
	:placeholder="placeholder">
</gz-input>`);

const attributesBrief = ref({
	tableData: [
		{
			param: "width",
			explain: "宽度",
			type: "String/Number",
			optional: "---",
			default: "180",
		},
		{
			param: "center",
			explain: "对齐方式",
			type: "Boolean",
			optional: "true/false",
			default: "false",
		},
		{
			param: "inputType",
			explain: "输入框类型",
			type: "String",
			optional: "text/textarea/password",
			default: "type",
		},
		{
			param: "disabled",
			explain: "禁用状态",
			type: "Boolean",
			optional: "true/false",
			default: "false",
		},
		{
			param: "number",
			explain: "限制只能输入数字",
			type: "Boolean",
			optional: "true/false",
			default: "false",
		},
		{
			param: "rows",
			explain: "文本域最大展示行数",
			type: "Number",
			optional: "---",
			default: "5",
		},
		{
			param: "maxlength",
			explain: "允许用户输入的最大字符长度 (Unicode) 。未指定表示无限长度。",
			type: "Number",
			optional: "---",
			default: 200,
		},
		{
			param: "minlength",
			explain: "允许用户输入的最小字符长度 (Unicode) 。未指定表示无限长度。",
			type: "Number",
			optional: "---",
			default: 0,
		},
		{
			param: "readonly",
			explain: "文本域是否只读",
			type: "Boolean",
			optional: "---",
			default: false,
		},
		{
			param: "placeholder",
			explain: "输入框占位文本",
			type: "String",
			optional: "---",
			default: "请输入内容",
		},
	],
});
const eventsBrief = ref({
	tableData: [],
});
</script>

<style scoped lang="scss">
</style>
