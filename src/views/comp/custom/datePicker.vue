<template>
	<div class="page-component">
		<h1>日期选择器 DatePicker</h1>
		<p>用于选择或输入日期。</p>
		<h3>基础用法</h3>
		<p>选择某一天。</p>
		<p>以”日“为基本单位，基础的日期选择控件</p>
		<div class="meta">
			<div class="demo">
				<gz-date-picker v-model="time"></gz-date-picker>
			</div>
			<base-copy :code="code" :attributeBrief="attributesBrief" :eventBrief="eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const code = ref('<gz-date-picker v-model="time"></gz-date-picker>');
const time = ref("");
const attributesBrief = ref({
	tableData: [
		{
			param: "width",
			explain: "宽度",
			type: "Number,String",
			optional: "---",
			default: "420",
		},
	],
});
const eventsBrief = ref({
	tableData: [],
});
</script>
