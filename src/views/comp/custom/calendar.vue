<template>
	<div class="page-component">
		<h1>日历 Calendar</h1>
		<p>显示日期。</p>
		<h3>基础用法</h3>
		<p>
			设置 defaultTime 来指定当前显示的日期。 如果 defaultTime 未指定，则显示当日。 defaultTime 支持 v-model
			双向绑定。。
		</p>
		<div class="meta">
			<div class="demo">
				<gz-calendar v-model="defaultTime" :width="350"></gz-calendar>
			</div>
			<base-copy :code="code" :attributeBrief="attributesBrief" :eventBrief="eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const defaultTime = ref("");
const code = ref('<gz-calendar v-model="defaultTime" :width="350"></gz-calendar>');
const attributesBrief = ref({
	tableData: [
		{
			param: "width",
			explain: "宽度",
			type: "Number,String",
			optional: "---",
			default: "420",
		},
		{
			param: "defaultTime",
			explain: "默认值",
			type: "String",
			optional: "---",
			default: "---",
		},
	],
});
const eventsBrief = ref({
	tableData: [],
});
</script>
