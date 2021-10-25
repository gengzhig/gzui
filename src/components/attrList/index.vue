<template>
	<div v-if="compName" class="comp-attrList">
		<h3 class="comp-name">{{ compName }}</h3>
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
				<el-input-number v-model="compProperty.rotate" :step="1" controls-position="right" placeholder="旋转角度" />
			</el-form-item>
			<el-form-item label="不透明度">
				<el-slider v-model="compProperty.opacity" show-input> </el-slider>
			</el-form-item>
			<el-form-item label="动画系列">
				<el-select v-model="state.animationGroup" multiple collapse-tags placeholder="请选择" @change="changeAnimation">
					<el-option-group v-for="group in state.animationClassData" :key="group.label" :label="group.label">
						<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item"> </el-option>
					</el-option-group>
				</el-select>
				<el-button @click="previewAnimate">预览动画</el-button>
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
import mitt from "@/mitt.js";
import animationClassData from "@/assets/js/animationClassData";
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
	animationClassData,
	animationGroup: "",
});

const changeAnimation = value => {
	store.commit("addAnimation", value);
};

const previewAnimate = () => {
	mitt.emit("runAnimation");
};
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
.el-scrollbar__view {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding-left: 10px;

	.animate > div {
		width: 100px;
		height: 60px;
		background: #f5f8fb;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 12px;
		margin-bottom: 10px;
		font-size: 12px;
		color: #333;
		border-radius: 3px;
		user-select: none;
		cursor: pointer;
	}
}
</style>
