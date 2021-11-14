<template>
	<!-- <div class="gz-form">
		<template v-for="(item, index) in config" :key="index">
			<component
				:is="compInfo.compMapList.get(item.key).render()"
				:width="item.width"
				:height="item.height"
				:style="{ margin: '0 0 10px 0' }"
			></component>
		</template>
	</div> -->
	<div ref="form" class="gzForm" :form="form" :labelWidth="labelWidth" :style="{ display: inline ? 'flex' : '' }">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "gzForm",
};
</script>

<script setup>
import { reactive, inject, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useStore } from "vuex";
const compInfo = inject("compInfo");
const props = defineProps({
	labelWidth: {
		type: [String, Number],
	},
	inline: {
		type: Boolean,
		default: false,
	},
});
const form = ref();
const emit = defineEmits();
const store = useStore();
const slots = useSlots();
</script>

<style scoped lang="scss">
.gzForm {
	overflow: auto;
}
</style>
