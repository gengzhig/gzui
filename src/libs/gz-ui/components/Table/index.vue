<!--
 * @Author: gz
 * @Date: 2021-08-03 09:35:42
 * @LastEditors: gz
 * @LastEditTime: 2021-08-12 17:50:13
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Table\index.vue
-->
<template>
	<div class="gz-table" style="">
		<button class="gz-btn gz-small-btn gz-btn-confirm" @click="add">add</button>

		<!-- 表头 -->
		<div class="div_thead" style="padding-right: 17px">
			<table border="" class="div-table" cellspacing="" cellpadding="">
				<colgroup>
					<col :style="{ width: item.width + 'px' }" v-for="(item, index) in config.columnData" :key="index" />
				</colgroup>
				<thead>
					<tr style="height: 48px; line-height: 48px; background-color: rgb(255, 124, 64)">
						<th style="" v-for="(item, index) in config.columnData" :key="index">{{ item.label }}</th>
					</tr>
				</thead>
			</table>
		</div>
		<!-- 主体 -->
		<div class="div_tbody" style="max-height: 200px; overflow: auto">
			<table border="" cellspacing="" cellpadding="" class="div-table">
				<colgroup>
					<col :style="{ width: item.width + 'px' }" v-for="(item, index) in config.columnData" :key="index" />
				</colgroup>
				<tbody>
					<tr v-for="(item, index) in config.tableData" :key="index">
						<td>{{ index + 1 }}</td>
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
	</div>
</template>

<script>
export default {
	name: "gzTable",
};
</script>

<script setup>
import { onMounted, reactive } from "vue";
const props = defineProps({
	config: {
		default: {
			tableData: [],
			columnData: [],
		},
		type: Object,
	},
});
let state = reactive({
	tableData: [],
});
onMounted(() => {
	state.tableData = JSON.parse(JSON.stringify(props.tableData));
});
</script>

<style lang="scss" scoped>
.gz-table {
	col {
		display: table-column;
	}
	.div_thead {
		color: #909399;
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
}
</style>
