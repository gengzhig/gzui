<template>
	<div class="page-component">
		<h1>轮播图</h1>
		<p>直接地表达对应分数。</p>
		<h3>基础用法</h3>
		<p>评分用来展示分数。</p>
		<div class="meta">
			<div class="demo">
				<gz-carousel
					:autoplay="true"
					:duration="2000"
					dotBgColor="#333"
					:initial="0"
					:hasDot="true"
					:hasDirector="true"
				>
					<gz-carousel-item v-for="(item, index) in cData" :key="index">
						<img :src="item.src" />
					</gz-carousel-item>
				</gz-carousel>
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
import copy from "@/libs/gz-ui/directives/copy.js";

import cData from "@/libs/gz-ui/components/Carousel/data.js";
console.log(cData);
const state = reactive({
	code: `<gz-carousel></gz-carousel>`,
});
</script>

<style lang="scss" scoped>
</style>