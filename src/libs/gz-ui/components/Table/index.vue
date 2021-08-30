<!--
 * @Author: gz
 * @Date: 2021-08-03 09:35:42
 * @LastEditors: gz
 * @LastEditTime: 2021-08-30 12:02:03
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Table\index.vue
-->
<template>
	<div class="gz-table" style="">
		<div class="div_thead" style="padding-right: 17px">
			<table border="" class="div-table" cellspacing="" cellpadding="">
				<colgroup>
					<col :style="{ width: item.width + 'px' }" v-for="(item, index) in config.columnData" :key="index" />
				</colgroup>
				<thead>
					<tr
						:style="{
							height: '48px',
							lineHeight: '48px',
							color: config.headerStyle.color,
							backgroundColor: 'rgb(255, 124, 64)',
						}"
					>
						<th style="" v-for="(item, index) in config.columnData" :key="index">{{ item.label }}</th>
					</tr>
				</thead>
			</table>
		</div>
		<!-- 主体 -->
		<div
			v-loading="state.loading"
			ref="tableBodyRef"
			class="div_tbody"
			:style="{ maxHeight: config.maxHeight + 'px', overflow: 'auto' }"
		>
			<table border="" cellspacing="" cellpadding="" class="div-table">
				<colgroup>
					<col :style="{ width: item.width + 'px' }" v-for="(item, index) in config.columnData" :key="index" />
				</colgroup>
				<tbody>
					<tr v-for="(item, index) in state.currentData" :key="index" @click="rowClick(item)">
						<td>{{ item.index }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.address }}</td>
						<td>{{ item.phone }}</td>
						<td>{{ item.isbn }}</td>
						<td>{{ item.publish }}</td>
						<td class="td-operate">
							<template v-for="(bItem, bIndex) in item.operate" :key="bIndex">
								<button v-if="bItem == 'edit'" class="gz-btn gz-small-btn gz-btn-confirm">编辑</button>
								<button v-if="bItem == 'del'" class="gz-btn gz-small-btn gz-btn-cancel">删除</button>
							</template>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- 底部合计 -->
		<div class="div_footer" style="display: none">
			<table border="" cellspacing="" cellpadding="" class="div-table">
				<colgroup>
					<col :style="{ width: item.width + 'px' }" v-for="(item, index) in config.columnData" :key="index" />
				</colgroup>
				<tfoot>
					<tr style="height: 48px; line-height: 48px; background-color: #f1f1f1">
						<td>合计</td>
						<td>4</td>
						<td>4</td>
						<td>4</td>
						<td>4</td>
						<td>4</td>
						<td>4</td>
					</tr>
				</tfoot>
			</table>
		</div>

		<!-- 分页器 -->
		<div class="div_pagation" v-if="config.pagination">
			<span class="total">共{{ state.tableData.length }}条</span>
			<gz-selector
				:width="120"
				:height="35"
				:filtrateData="false"
				:value="state.defaultLimit"
				:menuData="state.defaultLimitData"
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
	</div>
</template>

<script>
export default {
	name: "gzTable",
};
</script>

<script setup>
import { onMounted, reactive, ref } from "vue";
const props = defineProps({
	config: {
		// default: {
		// 	headerStyle: {
		// 		type: Object,
		// 		default: {},
		// 	},
		// 	maxHeight: {
		// 		type: Number,
		// 		default: 200,
		// 	},
		// 	pagination: {
		// 		type: Boolean,
		// 		default: true,
		// 	},
		// 	tableData: [],
		// 	columnData: [],
		// },
		type: Object,
	},
});

let emit = defineEmits(["rClick"]);

let tableBodyRef = ref(null);
let state = reactive({
	loading: true,
	tableData: [],
	pageCount: 0,
	currentIndex: -1,
	currentData: [],
	firstIndex: 0,
	endIndex: 10,
	prevDisabled: true,
	endDisabled: false,
	baseLimit: 10,
	defaultLimit: "10条/页",
	defaultLimitData: [
		{
			id: 1,
			value: "10",
			text: "10条/页",
		},
		{
			id: 2,
			value: "20",
			text: "20条/页",
		},
		{
			id: 3,
			value: "50",
			text: "50条/页",
		},
		{
			id: 4,
			value: "100",
			text: "100条/页",
		},
	],
});
onMounted(() => {
	state.tableData = JSON.parse(JSON.stringify(props.config.tableData));
	state.tableData.map((s, i) => {
		s.index = i + 1;
	});
	// 总条数 先按1页显示10条计算
	state.pageCount = Math.ceil(state.tableData.length / state.baseLimit);
	state.currentIndex = 0;
	state.currentData = state.tableData.slice(state.firstIndex, state.endIndex);
	setTimeout(() => {
		state.loading = false;
	});
});

// 行点击
const rowClick = data => {
	emit("rClick", data);
};

// 分页器数字切换
const toggleCurrentPage = index => {
	state.loading = true;
	state.currentIndex = index;
	state.firstIndex = index * state.baseLimit;
	state.endIndex = (index + 1) * state.baseLimit;
	state.currentData = state.tableData.slice(state.firstIndex, state.endIndex);
	tableBodyRef.value.scrollTo(0, 0);
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
	setTimeout(() => {
		state.loading = false;
	}, 200);
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
	state.defaultLimit = item.text;
	let limit = parseInt(state.defaultLimit);
	state.baseLimit = limit;
	state.pageCount = Math.ceil(state.tableData.length / state.baseLimit);
	state.currentIndex = 0;
	toggleCurrentPage(0);
};
</script>

<style lang="scss" scoped>
.gz-table {
	col {
		display: table-column;
	}
	.div_thead {
		.div-table {
			width: 100%;
			text-align: center;
			border: 1px solid #e6e6e6;
			border-collapse: collapse;
		}
	}
	.div_tbody {
		width: 100%;
		// height: 500px;
		.div-table {
			width: 100%;
			text-align: center;
			border: 1px solid #e6e6e6;
			border-collapse: collapse;
			tbody {
				tr {
					td {
						color: #606266;
						height: 48px;
						text-align: center;
						&.td-operate {
							button {
								margin: 0 5px;
							}
						}
					}

					&:nth-child(even) {
						background-color: #fafafa;
					}
					&:nth-child(odd) {
						background-color: #fff;
					}
					&:hover {
						background-color: #f5f7fa;
					}
				}
			}
		}
	}
	.div_footer {
		.div-table {
			width: 100%;
			text-align: center;
			border: 1px solid #e6e6e6;
			border-collapse: collapse;
		}
	}

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
					background: #409eff;
					color: #fff;
				}
			}
		}
	}
}
</style>
