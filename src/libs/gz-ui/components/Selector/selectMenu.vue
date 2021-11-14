<template>
	<div class="selector-menu">
		<template v-if="searchData.length > 0">
			<div class="list-menu" v-for="(item, index) in searchData" :key="index" @click="selectItem(item)">
				{{ item.label }}
			</div>
		</template>
		<noDataTip v-else></noDataTip>
	</div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from "vue";

import noDataTip from "./noDataTip.vue";
export default {
	name: "selectorMenu",
	components: {
		noDataTip,
	},
	props: {
		searchValue: {
			type: String,
		},
		data: {
			type: Array,
			default: [
				{
					id: 1,
					value: "1",
					text: "选项1",
				},
			],
		},
		filtrateData: {
			type: Boolean,
			default: false,
		},
		width: Number,
	},
	setup(props, ctx) {
		const state = reactive({
			searchData: [],
		});

		onMounted(() => {
			state.searchData = props.data;
		});
		watch(
			() => {
				return props.searchValue;
			},
			value => {
				// 开启筛选数据
				if (props.filtrateData) {
					state.searchData = filterSearchData(value);
				}
			}
		);
		watch(
			() => {
				return props.data;
			},
			value => {
				state.searchData = value;
			}
		);
		const filterSearchData = value => {
			return props.data.filter(item => {
				return item.label.toLowerCase().includes(props.searchValue.toLowerCase());
			});
		};
		const selectItem = item => {
			ctx.emit("selectItem", item);
		};
		return { ...toRefs(state), selectItem };
	},
};
</script>

<style lang="scss" scoped>
.selector-menu {
	width: 100%;
	max-height: 200px;
	position: absolute;
	top: 50px;
	display: none;
	border: 1px solid #e4e7ed;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	box-sizing: border-box;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 1000;
	.list-menu {
		color: #606266;
		font-size: 14px;
		padding: 0 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 34px;
		line-height: 34px;
		box-sizing: border-box;
		cursor: pointer;
		text-align: left;

		&:hover {
			background-color: #f5f7fa;
		}
	}
}
</style>
