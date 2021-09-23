<!--
 * @Author: gz
 * @Date: 2021-08-11 09:36:48
 * @LastEditors: gz
 * @LastEditTime: 2021-09-13 17:39:48
 * @Description: file content
 * @FilePath: \gi-ui\src\components\baseFunction\Copy.vue
-->
<template>
	<div class="description">
		代码
		<a href="javascript:;" v-copy>copy</a>
	</div>
	<div class="highlight code">
		<textarea rows="10" readonly :value="code.toString()"> </textarea>
	</div>
	<!-- 属性简介 -->
	<attributes-brief v-if="attributeBrief" :aBrief="attributeBrief"></attributes-brief>
	<!-- 事件简介 -->
	<events-brief v-if="eventBrief" :eBrief="eventBrief"></events-brief>
</template>

<script>
import copy from "@/libs/gz-ui/directives/copy.js";
export default {
	name: "CopyVue",
	directives: {
		copy,
	},
};
</script>

<script setup>
import attributesBrief from "@/components/baseFunction/AttributesBrief.vue";
import eventsBrief from "@/components/baseFunction/EventsBrief.vue";

const props = defineProps({
	code: {
		type: String,
		default: "",
	},
	attributeBrief: {
		type: Object,
		default: () => {},
	},
	eventBrief: {
		type: Object,
		default: () => {},
	},
});
</script>

<style lang="scss" scoped>
.description {
	padding: 20px;
	box-sizing: border-box;
	border-top: 1px solid #ebebeb;
	border-bottom: 1px solid #ebebeb;
	a {
		color: rgba(24, 228, 24, 0.733);
		float: right;
		text-decoration: none;
	}
}
.highlight {
	font-size: 12px;
	padding: 18px 24px;
	background-color: #fafafa;
	textarea {
		width: 100%;
	}
}
</style>
