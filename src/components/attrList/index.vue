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
		</el-form>
		<gz-button @click="state.isShowAnimation = true">添加动画</gz-button>
		<gz-button @click="previewAnimate">预览动画</gz-button>
		<div>
			<el-tag
				v-for="(tag, index) in store.state.currentComp.animations"
				:key="index"
				closable
				@close="removeAnimation(index)"
			>
				{{ tag.label }}
			</el-tag>
		</div>
		<!-- 选择动画 -->
		{{ state.isShowAnimation }}
		<Modal v-model="state.isShowAnimation">
			<el-tabs v-model="state.animationActiveName">
				<el-tab-pane v-for="item in animationClassData" :key="item.label" :label="item.label" :name="item.label">
					<el-scrollbar class="animate-container">
						<div
							class="animate"
							v-for="(animate, index) in item.children"
							:key="index"
							@mouseover="state.hoverPreviewAnimate = animate.value"
							@click="addAnimation(animate)"
						>
							<div :class="[state.hoverPreviewAnimate === animate.value && animate.value + ' animated']">
								{{ animate.label }}
							</div>
						</div>
					</el-scrollbar>
				</el-tab-pane>
			</el-tabs>
		</Modal>
	</div>
</template>

<script>
export default {
	name: "",
};
</script>

<script setup>
import Modal from "@/components/Modal.vue";
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
	isShowAnimation: false,
	hoverPreviewAnimate: "",
	animationActiveName: "进入",
	animationClassData,
	showAnimatePanel: false,
});
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
