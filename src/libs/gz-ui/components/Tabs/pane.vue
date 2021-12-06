<template>
	<div class="tab-item" v-show="name == activeKey">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "gzTabsPane",
};
</script>

<script setup>
import { inject, ref } from "vue";
const props = defineProps({
	label: {
		type: String,
	},
	name: {
		type: String,
	},
});
let activeKey = ref();
activeKey = inject("activeKey");
</script>
