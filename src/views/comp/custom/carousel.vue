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
					:autoplay="true"
					:duration="2000"
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
const state = reactive({
	code: `<gz-carousel></gz-carousel>`,
});
</script>

<style lang="scss" scoped>
</style>