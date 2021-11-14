<!--
 * @Author: gz
 * @Date: 2021-09-13 09:27:36
 * @LastEditors: gz
 * @LastEditTime: 2021-09-13 09:30:57
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\fiveStar.vue
-->
<template>
	<div class="page-component">
		<h1>评分组件</h1>
		<p>直接地表达对应分数。</p>
		<h3>基础用法</h3>
		<p>评分用来展示分数。</p>
		<div class="meta">
			<div class="demo">
				<gz-five-star v-model="num" :size="20" highColor="orange" @change="change"> </gz-five-star>
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
	</div>
</template>

<script setup>
import { reactive, toRefs, ref } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const num = ref(5);
const state = reactive({
	code: `<gz-five-star :num="num" :size="20" highColor="orange" @change="change"> </gz-five-star>`,
});
const change = value => {
	num.value += value;
};
</script>

<style lang="scss" scoped></style>
