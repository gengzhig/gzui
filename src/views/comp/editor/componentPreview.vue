<template>
	<div class="preview-comp">
		<component v-if="!item.isGroup" :is="compInfo.compMapList.get(item.key).render()"></component>
		<template v-else>
			<div class="group">
				<template v-for="gItem in item.group">
					<component
						class="singleGroup"
						:is="compInfo.compMapList.get(gItem.key).render()"
						:style="gItem.groupStyle"
						:id="'component' + gItem.id"
					/>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: "componentPreview",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const compInfo = inject("compInfo");
const props = defineProps({
	item: {},
	index: {
		type: Number,
	},
});
const ctx = getCurrentInstance();
const emit = defineEmits();
const state = reactive({});
const contentHeight = computed(() => {});
const store = useStore();
const route = useRoute();
const slots = useSlots();
const router = useRouter();
const fn = val => {};
onMounted(() => {
	let compList = JSON.parse(localStorage.getItem("currentCompList"));
	vm.$tool.runAnimation(ctx.ctx.$el, compList[props.index].animations);
});
</script>

<style scoped lang="scss">
.preview-comp {
	width: 100%;
	height: 100%;
}
</style>
