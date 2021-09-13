<!--
 * @Author: gz
 * @Date: 2021-09-13 09:27:36
 * @LastEditors: gz
 * @LastEditTime: 2021-09-13 17:50:34
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\carousel.vue
-->
<template>
	<div class="page-component">
		<h1>轮播图</h1>
		<p>轮播展示图片。</p>
		<h3>基础用法</h3>
		<p>轮播展示图片。</p>
		<div class="meta">
			<div class="demo">
				<gz-carousel
					dotBgColor="#333"
					imgFit="cover"
					:autoplay="true"
					:duration="2000"
					:initial="0"
					:hasDot="true"
					:hasDirector="true"
					@dotClickIndex="dotClickIndex"
				>
					<gz-carousel-item v-for="(item, index) in cData" :key="index">
						<img :src="item.src" />
					</gz-carousel-item>
				</gz-carousel>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";

import cData from "@/libs/gz-ui/components/Carousel/data.js";
const state = reactive({
	code: `<gz-carousel
	dotBgColor="#333"
	:autoplay="true"
	:duration="2000"
	:initial="0"
	:hasDot="true"
	:hasDirector="true"
>
	<gz-carousel-item v-for="(item, index) in cData" :key="index">
		<img :src="item.src" />
	</gz-carousel-item>
</gz-carousel>`,
	attributesBrief: {
		columnData: [
			{
				prop: "param",
				label: "参数",
				width: 150,
				fixed: false,
				type: 1,
			},
			{
				prop: "explain",
				label: "说明",
				width: 150,
				fixed: false,
				type: 1,
			},
			{
				prop: "type",
				label: "类型",
				width: 150,
				fixed: false,
				type: 1,
			},
			{
				prop: "optional",
				label: "可选值",
				width: 150,
				fixed: false,
				type: 1,
			},
			{
				prop: "default",
				label: "默认值",
				width: 150,
				fixed: false,
				type: 1,
			},
		],
		tableData: [
			{
				param: "dotBgColor",
				explain: "底部小圆点激活背景色",
				type: "String",
				optional: "---",
				default: "#333",
			},
			{
				param: "imgFit",
				explain: "图片填充方式contain:原比例 cover:铺满",
				type: "String",
				optional: "contain/cover",
				default: "contain",
			},
			{
				param: "initial",
				explain: "默认显示第几张图片",
				type: "Number",
				optional: "---",
				default: "0",
			},
			{
				param: "autoplay",
				explain: "是否自动轮播",
				type: "Boolean",
				optional: "true/false",
				default: "true",
			},
			{
				param: "duration",
				explain: "切换时间",
				type: "Number",
				optional: "---",
				default: "2000",
			},
			{
				param: "hasDot",
				explain: "底部小圆点是否显示",
				type: "Boolean",
				optional: "true/false",
				default: "true",
			},
			{
				param: "hasDirector",
				explain: "左右箭头是否显示",
				type: "Boolean",
				optional: "true/false",
				default: "true",
			},
		],
	},
	eventsBrief: {
		columnData: [
			{
				prop: "methodName",
				label: "方法名",
				width: 150,
				fixed: false,
				type: 1,
			},
			{
				prop: "explain",
				label: "说明",
				width: 150,
				fixed: false,
				type: 1,
			},
			{
				prop: "param",
				label: "参数",
				width: 150,
				fixed: false,
				type: 1,
			},
		],
		tableData: [
			{
				methodName: "dotClickIndex",
				explain: "获取点击小圆圈时图片索引",
				param: "共一个参数，为：图片索引。",
			},
		],
	},
});

const dotClickIndex = index => {
	console.log(index, "dotClickIndex");
};
</script>

<style lang="scss" scoped></style>
