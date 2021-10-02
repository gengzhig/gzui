<template>
	{{ name }}
	<!-- <div class="header" :style="{ height: headerHeight + 'px' }">
		<span
			:class="['tab', index == state.curIndex ? 'active' : '']"
			v-for="(item, index) in state.slots"
			:key="index"
			@click="select(index)"
		>
			{{ item.props.label }}
		</span>
	</div>
	<div class="tag-content">
		<slot></slot>
	</div> -->
</template>

<script>
export default {
	name: "gzTabsPane",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const ctx = getCurrentInstance();
const contentHeight = computed(() => {});
const store = useStore();

const props = defineProps({
	label: {
		type: String,
	},
	name: {
		type: String,
	},
});
console.log(props);
const slots = useSlots();

const state = reactive({
	content: "",
	curIndex: 0,
	slots: slots.default(),
});
onMounted(() => {
	// state.curIndex = state.slots.findIndex(s => s.props.name === props.activeName);
	// console.log(slots.default()[state.curIndex].el.classList);
	// if (slots.default() && slots.default()[state.curIndex].el) {
	// 	slots.default()[state.curIndex].el.classList.add("active");
	// }
});
const select = index => {
	state.curIndex = index;
	if (slots.default() && slots.default()[state.curIndex].el) {
		slots.default().map(s => {
			s?.el?.classList.remove("active");
		});
		slots.default()[state.curIndex].el.classList.add("active");
	}
};
</script>

<style scoped lang="scss">
.header {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	background: #2ed573;
	.tab {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		cursor: pointer;
		&.active {
			background: chartreuse;
		}
	}
}
.tag-content {
	.tab-pane {
		display: none;
		&.active {
			display: block;
		}
	}
}
.tag-content {
	.tab-pane {
		display: none;
		&.active {
			display: block;
		}
	}
}
</style>
