<template>
	<div ref="contRef">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "gzTabsPane",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useStore } from "vuex";
import mitt from "@/mitt.js";
const ctx = getCurrentInstance();

const props = defineProps({
	label: {
		type: String,
	},
	name: {
		type: String,
	},
});
const slots = useSlots();
const contRef = ref(null);
const state = reactive({
	content: "",
	curIndex: 0,
	slots: slots.default(),
});
mitt.on("current-tabIndex", index => {
	let pNode = contRef?.value?.parentNode?.getElementsByTagName("div");
	if (!pNode) window.location.reload();
	for (let i = 0; i < pNode.length; i++) {
		pNode[i].style.display = "none";
		pNode[index].style.display = "block";
	}
});
</script>
<style scoped lang="scss">
.tag-content {
	.tab-pane {
		display: none;
		&.active {
			display: block;
		}
	}
}
</style>
