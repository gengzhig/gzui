<template>
	<div class="gz-table">
		<el-table
			:max-height="config?.style?.maxHeight"
			:height="config?.style?.height"
			:data="config?.tableData"
			:stripe="config?.style?.stripe"
			:border="config?.style?.border"
			:highlight-current-row="config?.style?.radio"
			:default-sort="{ prop: config?.defaultSort?.prop, order: config?.defaultSort?.order }"
			@current-change="handleCurrentChange"
			@cell-click="cellClick"
			@selection-change="handleSelectionChange"
			style="width: 100%"
		>
			<!-- 复选框列 -->
			<el-table-column v-if="config?.style?.checkBox" type="selection" width="55" align="center"> </el-table-column>
			<!-- 序号列 -->
			<el-table-column v-if="config?.style?.index" type="index" label="序号" width="100" fixed align="center">
			</el-table-column>
			<template v-for="item in config.columnData">
				<!-- 插槽列 -->
				<el-table-column
					v-if="item.slotName"
					:width="item.width"
					:min-width="item.minWidth"
					:prop="item.prop"
					:label="item.label"
					:fixed="item.fixed"
					v-slot="scope"
					align="center"
				>
					<slot :name="item.slotName" :row="scope"></slot>
				</el-table-column>
				<!-- 普通列 -->
				<el-table-column
					v-else
					align="center"
					:width="item.width"
					:min-width="item.minWidth"
					:fixed="item.fixed"
					:prop="item.prop"
					:label="item.label"
					:show-overflow-tooltip="item.tooltip"
					:sortable="item.sort"
					:formatter="item.formatter"
				>
				</el-table-column>
			</template>
		</el-table>
	</div>
</template>

<script>
export default {
	name: "gzTable",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({
	config: {
		type: Object,
		default: () => {},
	},
});
const emit = defineEmits(["handleCurrentChange", "handleSelectionChange", "cellClick"]);

// 单选行点击
const handleCurrentChange = (currentRow, oldCurrentRow) => {
	emit("handleCurrentChange", currentRow, oldCurrentRow);
};
// 单元格点击
const cellClick = (row, column, cell, event) => {
	emit("cellClick", row, column, cell, event);
};
// 复选框点击
const handleSelectionChange = selection => {
	emit("handleSelectionChange", selection);
};

const ctx = getCurrentInstance();
const state = reactive({});
const store = useStore();
const route = useRoute();
const slots = useSlots();
const router = useRouter();
const fn = val => {};
onMounted(() => {});
</script>

<style scoped lang="scss"></style>
