<template>
	<div class="page-component">
		<h1>Image 图片</h1>
		<p>图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等。</p>
		<h3>基础用法</h3>
		<p>可通过fit确定图片如何适应到容器框，同原生 object-fit。</p>
		<div class="meta">
			<div class="demo">
				<gz-image width="100" height="100" :src="state.src" :fit="state.fit" :alt="state.alt"></gz-image>
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
		<h3>加载失败</h3>
		<p>可通过slot = error可自定义加载失败内容。</p>
		<div class="meta">
			<div class="demo">
				<gz-image width="100" height="100" :src="state.errorSrc" :fit="state.fit" :alt="state.alt">
					<template #error>
						<i class="el-icon-picture-outline"></i>
					</template>
				</gz-image>
			</div>
			<base-copy :code="state.errorCode"></base-copy>
		</div>
		<h3>懒加载</h3>
		<p>可通过lazy开启懒加载。</p>
		<div class="meta">
			<div class="demo">
				<gz-image width="900" height="600" :urls="state.urls" lazy :fit="state.fit" :alt="state.alt"> </gz-image>
			</div>
			<base-copy
				:code="state.lazyCode"
				:attributeBrief="state.attributesBrief"
				:eventBrief="state.eventsBrief"
			></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";

const state = reactive({
	alt: "gz图片",
	urls: [
		"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
		"https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
		"https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
		"https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
		"https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
		"https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
		"https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
	],
	errorSrc: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F28%2F54%2F5923688f44190_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638670781&t=9dd32002bfe338d97e74ade1f36d1907",
	src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
	fit: "fill",
	code: `<gz-image :width="100" :height="100" :src="state.src" :fit="state.fit"></gz-image>`,
	errorCode: `<gz-image :width="100" :height="100" :src="state.src" :fit="state.fit">
  <template #error>
    <i class="el-icon-picture-outline"></i>
  </template>
</gz-image>`,
	lazyCode: `<gz-image :width="900" :height="600" :urls="state.urls" lazy :fit="state.fit"></gz-image>`,
	attributesBrief: {
		tableData: [
			{
				param: "alt",
				explain: "原生 alt",
				type: "String",
				optional: "",
				default: "",
			},
			{
				param: "fit",
				explain: "确定图片如何适应容器框，同原生 object-fit",
				type: "String",
				optional: "fill / contain / cover / none / scale-down	",
				default: "fill",
			},
			{
				param: "lazy",
				explain: "是否开启懒加载",
				type: "Boolean",
				optional: "true/false",
				default: "false",
			},
			{
				param: "src",
				explain: "图片源，同原生",
				type: "String",
				optional: "-",
				default: "-",
			},
			{
				param: "width",
				explain: "图片宽度",
				type: "Number",
				optional: "-",
				default: "50",
			},
			{
				param: "height",
				explain: "图片高度",
				type: "Number",
				optional: "-",
				default: "50",
			},
		],
	},
	eventsBrief: {
		tableData: [],
	},
});
</script>

<style scoped lang="scss"></style>
