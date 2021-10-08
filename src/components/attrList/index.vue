<template>
	<div v-if="state.comp[0].name" class="comp-attrList">
		<h3 class="comp-name">{{ state.comp[0].name }}</h3>
		<el-form label-width="80px" :model="state.comp" class="demo-form-inline">
			<el-form-item label="组件尺寸">
				<el-col :span="11">
					<el-input v-model="state.comp[0].width" placeholder="组件宽度"></el-input>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-input v-model="state.comp[0].height" placeholder="组件高度"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="组件位置">
				<el-col :span="11">
					<el-input v-model="state.comp[0].left" placeholder="x"></el-input>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-input v-model="state.comp[0].top" placeholder="y"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="旋转角度">
				<el-input v-model="state.comp[0].rotationAngle" placeholder="旋转角度"></el-input>
			</el-form-item>
			<el-form-item label="不透明度">
				<el-input v-model="state.comp[0].opacity" placeholder="不透明度"></el-input>
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
const contentHeight = computed(() => {});
const store = useStore();
const slots = useSlots();
onMounted(() => {});

const state = reactive({
	comp: {},
});
watch(
	() => store.state.currentComp,
	value => {
		state.comp = value;
	}
);
</script>

<style scoped lang="scss">
.comp-attrList {
	padding: 15px;
	.comp-name {
	}
}
</style>
