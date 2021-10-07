<template>
	<div v-if="state.comp.name">
		<h3>{{ state.comp.name }}</h3>
		<el-form label-width="80px" :model="state.comp" class="demo-form-inline">
			<el-form-item label="图标尺寸">
				<el-col :span="11">
					<el-input v-model="state.comp.width" placeholder="Approved by"></el-input>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-input v-model="state.comp.height" placeholder="Approved by"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="图标位置">
				<el-col :span="11">
					<el-input v-model="state.comp.left" placeholder="Approved by"></el-input>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-input v-model="state.comp.top" placeholder="Approved by"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="旋转角度">
				<el-input v-model="state.comp.widths" placeholder="旋转角度"></el-input>
			</el-form-item>
			<el-form-item label="不透明度">
				<el-input v-model="state.comp.widths" placeholder="不透明度"></el-input>
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

<style scoped lang="scss"></style>
