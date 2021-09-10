<template>
	<div>
		<gz-five-star :num="num" :size="20" highColor="orange" @change="change"> </gz-five-star>
	</div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
	setup() {
		const state = reactive({
			num: 1,
		});
		const change = value => {
			state.num += value;
		};
		return {
			change,
			...toRefs(state),
		};
	},
};
</script>

<style lang="scss" scoped></style>
