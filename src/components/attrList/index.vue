<template>
	<div v-if="compName" class="comp-attrList">
		<h3 class="comp-name">{{ compName }}</h3>
		{{ compInfo }}
		<br />
		{{ state.compBaseInfo }}
		<el-form label-width="80px" :model="state.compBaseInfo" class="demo-form-inline">
			<el-form-item label="组件尺寸">
				<el-col :span="11">
					<el-input-number v-model="compProperty.width" :min="0" controls-position="right" placeholder="组件宽度" />
				</el-col>
				<el-col class="line" :span="2"> - </el-col>
				<el-col :span="11">
					<el-input-number v-model="compProperty.height" :min="0" controls-position="right" placeholder="组件高度" />
				</el-col>
			</el-form-item>
			<el-form-item label="组件位置">
				<el-col :span="11">
					<el-input-number v-model="compProperty.left" :min="0" controls-position="right" placeholder="x" />
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-input-number v-model="compProperty.top" :min="0" controls-position="right" placeholder="y" />
				</el-col>
			</el-form-item>
			<el-form-item label="旋转角度">
				<el-input-number v-model="compProperty.rotate" :step="0.1" controls-position="right" placeholder="旋转角度" />
			</el-form-item>
			<el-form-item label="不透明度">
				<el-slider v-model="compProperty.opacity" show-input> </el-slider>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useStore } from "vuex";
const props = defineProps({});
const ctx = getCurrentInstance();
const emit = defineEmits();
const store = useStore();
const slots = useSlots();
const compProperty = computed(() => {
	return store.state.currentComp.style;
});
const compName = computed(() => {
	return store.state.currentComp.name;
});
const compInfo = computed(() => {
	return store.state.currentComp;
});
const state = reactive({
	compBaseInfo: compProperty.value,
});
// watch(
// 	compProperty.value,
// 	value => {
// 		console.log(value);
// 	},
// 	{ deep: true }
// );
</script>

<style scoped lang="scss">
.comp-attrList {
	padding: 15px;
	.comp-name {
		margin-bottom: 15px;
	}
	.el-col.el-col-2.line {
		text-align: center;
	}
}
</style>
