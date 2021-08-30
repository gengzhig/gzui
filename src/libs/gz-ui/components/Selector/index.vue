<!--
 * @Author: gz
 * @Date: 2021-08-11 09:36:48
 * @LastEditors: gz
 * @LastEditTime: 2021-08-30 11:52:15
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Selector\index.vue
-->
<template>
	<div class="select" v-focus>
		<SelectInput :width="width" :height="height" :value="value" :placeholder="placeholder" @searchValue="searchValue" />
		<SelectMenu
			:width="width"
			:height="height"
			:filtrateData="filtrateData"
			:searchValue="inputSearchValue"
			:data="menuData"
			@selectItem="selectItem"
		/>
	</div>
</template>

<script>
import SelectInput from "./selectInput.vue";
import SelectMenu from "./selectMenu.vue";

import focus from "../../directives/focus";
import { reactive, toRef, toRefs } from "vue";
export default {
	name: "gzSelector",
	components: {
		SelectInput,
		SelectMenu,
	},
	directives: {
		focus,
	},
	props: {
		placeholder: String,
		value: String,
		menuData: Array,
		width: Number,
		height: Number,
		filtrateData: Boolean,
	},
	setup(props, ctx) {
		const state = reactive({
			inputSearchValue: "",
		});
		const selectItem = item => {
			ctx.emit("selectItem", item);
		};

		const searchValue = value => {
			state.inputSearchValue = value;
		};
		return {
			...toRefs(state),
			selectItem,
			searchValue,
		};
	},
};
</script>

<style scoped lang="scss">
.select {
	position: relative;
}
</style>
