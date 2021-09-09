<!--
 * @Author: gz
 * @Date: 2021-09-09 16:48:33
 * @LastEditors: gz
 * @LastEditTime: 2021-09-09 17:32:09
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Pagination\index.vue
-->
<!--
 * @Author: gz
 * @Date: 2021-08-03 09:35:42
 * @LastEditors: gz
 * @LastEditTime: 2021-09-07 15:19:19
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Table\index.vue
-->
<template>
	<!-- 分页器 -->
	<div class="div_pagation">
		<span class="total">共{{ total }}-444{{limitDesc}}-------条</span>
		<gz-selector
			:width="120"
			:height="35"
			:filtrateData="false"
			:value="limitDesc"
			:menuData="defaultLimitData"
			placeholder="请选择"
			@selectItem="selectItem"
		></gz-selector>
		<button class="btn-prev" :disabled="state.prevDisabled" @click="prevPage">上一页</button>
		<ul class="pager">
			<li
				class="number"
				:class="{ active: state.currentIndex === index }"
				v-for="(item, index) in state.pageCount"
				:key="index"
				@click="toggleCurrentPage(index)"
			>
				{{ item }}
			</li>
		</ul>
		<button class="btn-next" :disabled="state.endDisabled" @click="nextPage">下一页</button>
	</div>
</template>

<script>
export default {
	name: "gzPagination",
};
</script>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
const props = defineProps({
	total: {
		type: Number,
	},
	defaultLimitData: {
		type: Array,
	},
	defaultLimit: {
		type: String,
	},
});

let limitDesc = computed(() => props.defaultLimit);

let emit = defineEmits(["rClick", "toggleCurrentPage", "prevPage", "nextPage"]);

let headerRef = ref(null);
let state = reactive({
	pageCount: 0,
	currentIndex: -1,
	currentData: [],
	firstIndex: 0,
	endIndex: 10,
	prevDisabled: true,
	endDisabled: false,
	baseLimit: 10,
});
onMounted(() => {
	// 总条数 先按1页显示10条计算
	state.pageCount = Math.ceil(props.total / state.baseLimit);
	state.currentIndex = 0;
});

// 分页器数字切换
const toggleCurrentPage = index => {
	state.currentIndex = index;
	state.firstIndex = index * state.baseLimit;
	state.endIndex = (index + 1) * state.baseLimit;
	if (state.currentIndex !== 0) {
		state.prevDisabled = false;
	} else {
		state.prevDisabled = true;
	}

	if (state.currentIndex === state.pageCount - 1) {
		state.endDisabled = true;
	} else {
		state.endDisabled = false;
	}
	emit("toggleCurrentPage", state.currentIndex);
};

// 分页器上一页
const prevPage = () => {
	if (state.currentIndex == 0) {
		// 按钮禁止点击
		state.prevDisabled = true;
		return false;
	}
	state.currentIndex--;
	toggleCurrentPage(state.currentIndex);
	emit("prevPage", state.currentIndex);
};

// 分页器下一页
const nextPage = () => {
	if (state.currentIndex == state.pageCount - 1) {
		state.endDisabled = true;
		return false;
	}
	state.currentIndex++;
	toggleCurrentPage(state.currentIndex);
	emit("nextPage", state.currentIndex);
};

// 设置limit
const selectItem = item => {
	console.log(item);
	limitDesc.value = item.text;
	let limit = parseInt(limitDesc.value);
	state.baseLimit = limit;
	state.currentIndex = 0;
	toggleCurrentPage(0);
};
</script>

<style lang="scss" scoped>
.div_pagation {
	margin-top: 5px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	.total {
		color: #606266;
		margin-right: 10px;
		font-weight: 400;
	}
	button {
		min-width: 30px;
		height: 30px;
		color: #606266;
		background: #f4f4f5;
		border: none;
		padding: 0 4px;
		margin: 10px;
		border-radius: 2px;
		cursor: pointer;
	}
	.btn-prev {
		&:disabled {
			color: #c0c4cc;
			cursor: not-allowed;
		}
	}
	.btn-next {
		margin: 0;
		&:disabled {
			color: #c0c4cc;
			cursor: not-allowed;
		}
	}
	.pager {
		display: flex;
		.number {
			list-style: none;
			min-width: 30px;
			height: 30px;
			color: #606266;
			background: #f4f4f5;
			margin-right: 10px;
			padding: 0 4px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 2px;
			cursor: pointer;
			&.active {
				background: rgb(255, 124, 64);
				color: #fff;
			}
		}
	}
}
</style>
