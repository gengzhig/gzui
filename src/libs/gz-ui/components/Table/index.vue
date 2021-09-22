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
			@selection-change="handleSelectionChange"
			style="width: 100%"
		>
			<el-table-column v-if="config?.style?.checkBox" type="selection" width="55"> </el-table-column>
			<el-table-column v-if="config?.style?.index" type="index" label="序号" width="100" fixed> </el-table-column>
			<!-- <el-table-column
				:fixed="item.fixed"
				:prop="item.prop"
				:label="item.label"
				:show-overflow-tooltip="item.tooltip"
				:sortable="item.sort"
				width="180"
				v-for="item in notSlotColumnData"
				:formatter="item.formatter"
			>
			</el-table-column> -->
			<el-table-column
				:fixed="item.fixed"
				:prop="item.prop"
				:label="item.label"
				:show-overflow-tooltip="item.tooltip"
				:sortable="item.sort"
				width="180"
				v-for="item in config.columnData"
				:formatter="item.formatter"
			>
				<template slot-scope="scope">
					<slot v-if="item.slotName" :name="item.slotName" :row="scope"></slot>
				</template>
			</el-table-column>
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

// 单选行点击
const handleCurrentChange = val => {
	console.log(val);
};
// 多选点击
const handleSelectionChange = val => {
	console.log(val);
};

const ctx = getCurrentInstance();
const emit = defineEmits();
const state = reactive({});
const notSlotColumnData = computed(() => {
	return props.config.columnData.filter(item => !item.slotName);
});

const slotColumnData = computed(() => {
	return props.config.columnData.filter(item => item.slotName);
});
const store = useStore();
const route = useRoute();
const slots = useSlots();
const router = useRouter();
const fn = val => {};
onMounted(() => {});
// watch(
// 	() => [name, title],
// 	([nname, ntitle], [oname, otitle]) => {
// 		console.log(nname, oname), console.log(ntitle, otitle);
// 	}
// );
</script>

<style scoped lang="scss"></style>
