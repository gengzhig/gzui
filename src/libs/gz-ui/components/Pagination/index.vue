<template>
	<!-- 分页器 -->
	<div class="div_pagation">
		<span class="total" v-if="showTotal">共{{ total }}条</span>
		<gz-selector
			v-if="showLimit"
			:width="120"
			:height="35"
			:filtrateData="false"
			:value="pager"
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
import { computed, onMounted, reactive, ref, toRefs } from "vue";

const props = defineProps({
	showTotal: {
		type: Boolean,
		default: true,
	},
	showLimit: {
		type: Boolean,
		default: true,
	},
	total: {
		type: Number,
	},
	defaultLimitData: {
		type: Array,
	},
	defaultLimit: {
		type: Number,
	},
});

let pager = ref(props.defaultLimit + "条/页");

let emit = defineEmits(["rClick", "handleCurrentChange", "handleSizeChange"]);

let state = reactive({
	pageCount: 0,
	currentIndex: -1,
	currentData: [],
	firstIndex: 0,
	endIndex: 10,
	prevDisabled: true,
	endDisabled: false,
	limit: 10,
});

onMounted(() => {
	// 总条数 先按1页显示10条计算
	state.pageCount = Math.ceil(props.total / state.limit);
	state.currentIndex = 0;
});

// 分页器数字切换
const toggleCurrentPage = index => {
	state.currentIndex = index;
	state.firstIndex = index * state.limit;
	state.endIndex = (index + 1) * state.limit;
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

	emit("handleCurrentChange", state.currentIndex);
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
};

// 分页器下一页
const nextPage = () => {
	if (state.currentIndex == state.pageCount - 1) {
		state.endDisabled = true;
		return false;
	}
	state.currentIndex++;
	toggleCurrentPage(state.currentIndex);
};

// 设置limit
const selectItem = item => {
	pager.value = item.text;
	let limit = parseInt(pager.value);
	state.limit = limit;
	state.currentIndex = 0;
	state.pageCount = Math.ceil(props.total / state.limit);
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
	emit("handleSizeChange", limit);
};
</script>

<style lang="scss" scoped>
.div_pagation {
	display: flex;
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
