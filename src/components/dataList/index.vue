<template>
	<div class="dataList">数据响应结果（只读）</div>
	<monaco ref="monacoRef" :opts="state.opts"></monaco>
</template>

<script>
export default {
	name: "dataList",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useStore } from "vuex";
import monaco from "@/components/monaco/index.vue";
const props = defineProps({});
const ctx = getCurrentInstance();
const emit = defineEmits();
const monacoRef = ref(null);
const state = reactive({
	opts: {
		value: "",
		readOnly: false, // 是否可编辑
		language: "java", // 语言类型
		theme: "vs-dark", // 编辑器主题
	},
});
const contentHeight = computed(() => {});
const store = useStore();
const slots = useSlots();
onMounted(() => {
	monacoRef.value.getVal();
});
</script>

<style scoped lang="scss"></style>
