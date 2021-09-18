<!--
 * @Author: gz
 * @Date: 2021-08-03 09:35:42
 * @LastEditors: gz
 * @LastEditTime: 2021-09-14 17:12:47
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Table\index.vue
-->
<template>
	<div class="gz-table" style="">
		<div class="div_thead" style="padding-right: 17px; overflow: auto" ref="headerRef" @scroll="scrollHeader">
			<table
				border=""
				class="div-table"
				cellspacing=""
				cellpadding=""
				:style="{
					borderColor: headerBorderColor,
				}"
			>
				<colgroup>
					<col
						:style="{ width: item.width + 'px', minWidth: item.minWidth + 'px' }"
						v-for="(item, index) in config.columnData"
						:key="index"
					/>
				</colgroup>
				<thead>
					<tr
						:style="{
							height: '48px',
							lineHeight: '48px',
							color: headerColor,
							backgroundColor: headerbgColor,
						}"
					>
						<th style="" v-for="(item, index) in config.columnData" :key="index" @click="cellClick(item.label)">
							{{ item.label }}
						</th>
					</tr>
				</thead>
			</table>
		</div>
		<!-- 主体 -->
		<div
			v-loading="state.loading"
			ref="tableBodyRef"
			class="div_tbody"
			@scroll="scrollBody"
			:style="{ maxHeight: maxHeight + 'px', overflow: 'auto' }"
		>
			<table border="" cellspacing="" cellpadding="" class="div-table">
				<colgroup v-if="state.currentData && state.currentData.length > 0">
					<col
						:style="{ width: item.width + 'px', minWidth: item.minWidth + 'px' }"
						v-for="(item, index) in config.columnData"
						:key="index"
					/>
				</colgroup>
				<tbody>
					<template v-if="state.currentData && state.currentData.length > 0">
						<tr v-for="(item, index) in state.currentData" :key="index" @click="rowClick(item)">
							<!-- 索引列 -->
							<td
								class="index"
								v-if="config.columnData.findIndex(c => c.prop == 'index') >= 0"
								:style="{ 'text-align': tableIndexColumnAlign }"
								@click="cellClick(item.index)"
							>
								{{ item.index }}
							</td>

							<template v-for="(kValue, kKey, kIndex) in item" :key="kKey">
								<!-- 基础列 -->
								<!-- {{ config.columnData.findIndex(c => c.type == "slot") - 1 }} -->
								<!-- <td
									:title="kValue"
									v-if="kKey != 'operate' && kKey != 'index' && config.columnData.findIndex(c => c.type == 'slot')"
									class="singleRow"
									:style="{
										width: config.columnData[kIndex + 1] && config.columnData[kIndex + 1].width + 'px',
										minWidth: config.columnData[kIndex + 1] && config.columnData[kIndex + 1].minWidth + 'px',
										maxWidth: config.columnData[kIndex + 1] && config.columnData[kIndex + 1].width + 'px',
									}"
									@click="cellClick(kValue)"
								>
									{{ kValue }}
								</td> -->
								{{ config.columnData.filter(c => c.type == "slot")[1] }}
								<!-- 插槽列 -->
								<!-- <td
									:title="kValue"
									v-if="
										kKey != 'operate' &&
										kKey != 'index' &&
										kIndex == config.columnData.findIndex(c => c.type == 'slot') - 1
									"
									class="singleRow"
									:style="{
										width: config.columnData[kIndex + 1] && config.columnData[kIndex + 1].width + 'px',
										minWidth: config.columnData[kIndex + 1] && config.columnData[kIndex + 1].minWidth + 'px',
										maxWidth: config.columnData[kIndex + 1] && config.columnData[kIndex + 1].width + 'px',
									}"
									@click="cellClick(kValue)"
								>
									{{ kValue }}
								</td> -->
								<!-- 操作列 -->
								<td class="td-operate" v-if="kKey == 'operate'">
									<template v-for="(bItem, bIndex) in item.operate" :key="bIndex">
										<button v-if="bItem == 'edit'" class="gz-btn gz-small-btn gz-btn-confirm">编辑</button>
										<button v-if="bItem == 'del'" class="gz-btn gz-small-btn gz-btn-cancel">删除</button>
										<slot v-else name="operateSlot"></slot>
									</template>
								</td>
							</template>
						</tr>
					</template>
					<div class="noData" v-else>暂无数据</div>
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
		<gz-pagination
			v-if="pagination && config.tableData.length > 0"
			:total="config.tableData.length"
			:defaultLimit="config.defaultLimit"
			:defaultLimitData="config.defaultLimitData"
			@handleCurrentChange="handleCurrentChange"
			@handleSizeChange="handleSizeChange"
		></gz-pagination>
	</div>
</template>

<script>
export default {
	name: "gzTable",
};
</script>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
const props = defineProps({
	config: {
		type: Object,
	},
	headerColor: {
		type: String,
		default: "#fff",
	},
	headerbgColor: {
		type: String,
		default: "rgb(255, 124, 64)",
	},
	headerBorderColor: {
		type: String,
		default: "#e6e6e6",
	},
	pagination: {
		type: Boolean,
		default: true,
	},
	maxHeight: {
		type: Number,
		default: "300",
	},
});

let emit = defineEmits(["rowClick", "cellClick"]);

let tableBodyRef = ref(null);
let headerRef = ref(null);
let state = reactive({
	loading: true,
	tableData: [],
	currentData: [],
	columnData: [],
	firstIndex: 0,
	endIndex: 10,
	baseLimit: 10,
});

const tableIndexColumnAlign = computed(
	() => props.config.columnData.filter(c => c.prop == "index")[0].align || "center"
);
onMounted(() => {
	state.tableData = JSON.parse(JSON.stringify(props.config.tableData || []));
	state.columnData = JSON.parse(JSON.stringify(props.config.columnData || []));
	if (state.tableData.length > 0) {
		state.tableData.map((s, i) => {
			s.index = i + 1;
			// state.columnData.map(c=>{
			// 	if (c.prop==) {

			// 	}
			// })
		});
	}
	// 总条数 先按1页显示10条计算
	state.currentData = state.tableData.slice(state.firstIndex, state.endIndex);
	setTimeout(() => {
		state.loading = false;
	});
});

// 行点击
const rowClick = data => {
	emit("rowClick", data);
};
const cellClick = data => {
	emit("cellClick", data);
};
// 分页器数字切换
const toggleCurrentPage = index => {
	state.loading = true;
	state.firstIndex = index * state.baseLimit;
	state.endIndex = (index + 1) * state.baseLimit;
	state.currentData = state.tableData.slice(state.firstIndex, state.endIndex);
	tableBodyRef.value.scrollTo(0, 0);
	setTimeout(() => {
		state.loading = false;
	}, 200);
};

// 设置limit
const selectItem = item => {
	state.baseLimit = parseInt(item.text);
	toggleCurrentPage(0);
};

const scrollBody = e => {
	// console.log(e.target.scrollLeft);
};

const handleCurrentChange = val => {
	console.log(`当前页: ${val}`);
	toggleCurrentPage(val);
};

const handleSizeChange = val => {
	let value = {
		text: `${val}条/页`,
	};
	selectItem(value);
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
						&.td-operate {
							button {
								margin: 0 5px;
							}
						}
						&.singleRow {
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
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
				.noData {
					margin: 10px 0;
					font-weight: bold;
					font-size: 1.4em;
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
					background: rgb(255, 124, 64);
					color: #fff;
				}
			}
		}
	}
}
</style>
