<template>
	<div class="preview">
		<div
			v-for="(item, index) in compData"
			:key="index"
			class="comp"
			:style="getCompStyle(item.style, index, item.isGroup)"
		>
			<component-preview :item="item" :index="index"></component-preview>
		</div>
	</div>
</template>

<script>
export default {
	name: "preview",
};
</script>

<script setup>
import { reactive, ref, onMounted, inject, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import componentPreview from "./componentPreview.vue";
const props = defineProps({});
const ctx = getCurrentInstance();
const emit = defineEmits();
const state = reactive({});
const store = useStore();
const route = useRoute();
const slots = useSlots();
const router = useRouter();
const compInfo = inject("compInfo");
const compData = ref([]);
onMounted(() => {
	let compList = JSON.parse(localStorage.getItem("currentCompList"));
	compData.value = compList;
});
const getCompStyle = (style, index, isGroup) => {
	const result = {};
	["width", "height", "top", "left", "rotate", "z-index", "opacity"].forEach(attr => {
		if (attr == "z-index") {
			result["z-index"] = index + 1;
		} else if (attr == "opacity") {
			result[attr] = isGroup ? style[attr] : style[attr] / 100;
		} else if (attr == "rotate") {
			result.transform = "rotate(" + style[attr] + "deg)";
		} else {
			result[attr] = style[attr] + "px";
		}
	});
	return result;
};
</script>

<style scoped lang="scss">
.preview {
	width: 100vw;
	height: 100vh;
	position: relative;
	.comp {
		position: absolute;
		.group {
			width: 100%;
			height: 100%;
			position: relative;
			.singleGroup {
				position: absolute;
			}
		}
	}
}
</style>
