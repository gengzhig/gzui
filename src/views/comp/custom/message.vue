<template>
	<div class="page-component">
		<h1>Message 消息提示</h1>
		<p>常用于主动操作后的反馈提示。 与 Notification 的区别是后者更多用于系统级通知的被动提醒。</p>
		<h3>基础用法</h3>
		<p>从顶部出现，3 秒后自动消失。</p>
		<div class="meta">
			<div class="demo">
				<gz-button plain @click="open">Show message</gz-button>
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
		<base-copy :code="state.zlcode" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
	</div>
</template>
<script setup>
import { reactive, toRefs, ref, getCurrentInstance } from "vue";
import { gzMessage } from "@/libs/gz-ui/components/Message/index.js";
import { Notification, Msgbox, Message } from "element3";
import baseCopy from "@/components/baseFunction/Copy.vue";
const loading = ref(true);
const ctx = getCurrentInstance();
const state = reactive({
	code: ``,
	attributesBrief: {
		tableData: [
			// {
			// 	param: "full",
			// 	explain: "加载方式",
			// 	type: "Boolean",
			// 	optional: "true局部加载/false全局加载",
			// 	default: "false",
			// },
			// {
			// 	param: "theme",
			// 	explain: "主题",
			// 	type: "String",
			// 	optional: "dark/light",
			// 	default: "dark",
			// },
			// {
			// 	param: "loading",
			// 	explain: "是否加载",
			// 	type: "Boolean",
			// 	optional: "true/false",
			// 	default: "false",
			// },
			// {
			// 	param: "tips",
			// 	explain: "提示文字",
			// 	type: "String",
			// 	optional: "---",
			// 	default: "加载中...",
			// },
		],
	},
	eventsBrief: {
		tableData: [],
	},
});
const open = () => {
	gzMessage({
		message: "CZZCADad",
		type: "warning",
		duration: 4000,
	});
	// Message({
	// 	showClose: true,
	// 	message: "Oops, this is a error message.",
	// 	// type: "error",
	// 	duration: 0,
	// });
};
</script>

<style lang="scss" scoped>
</style>
