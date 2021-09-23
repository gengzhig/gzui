<template>
	<div class="page-component">
		<h1>Chart 图表</h1>
		<p>一个基于 echats 封装的可视化图表库。</p>
		<h3>基础用法</h3>
		<p>根据图表类型去配置options。</p>
		<div class="meta">
			<div class="demo">
				<gz-button
					type="primary"
					:class="[index == state.currentIndex ? 'active' : '']"
					v-for="(item, index) in state.chartButtonGroup"
					:key="index"
					@click="setChartType(item, index)"
				>
					{{ item.name }}
				</gz-button>
				<gz-chart class="chart" :options="state.options" />
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
	</div>
</template>
<script setup>
import gzChart from "@/components/baseChart/index.vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
import { onMounted, reactive } from "vue";
const state = reactive({
	code: `<gz-chart class="chart" :options="state.options" />`,
	currentIndex: 0,
	options: {},
	chartButtonGroup: [
		{
			name: "基础折线图",
			options: {
				xAxis: {
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: "line",
					},
				],
			},
		},
		{
			name: "基础柱状图",
			options: {
				xAxis: {
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: "bar",
					},
				],
			},
		},
		{
			name: "基础环形图",
			options: {
				tooltip: {
					trigger: "item",
				},
				legend: {
					top: "5%",
					left: "center",
				},
				series: [
					{
						name: "访问来源",
						type: "pie",
						radius: ["40%", "70%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "20",
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: [
							{ value: 1048, name: "搜索引擎" },
							{ value: 735, name: "直接访问" },
							{ value: 580, name: "邮件营销" },
							{ value: 484, name: "联盟广告" },
							{ value: 300, name: "视频广告" },
						],
					},
				],
			},
		},
	],
});
onMounted(() => {
	state.options = state.chartButtonGroup[0].options;
});
const setChartType = (item, index) => {
	state.currentIndex = index;
	// 清除图表元素
	state.options = state.chartButtonGroup[index].options;
};
</script>
<style lang="scss" scoped>
.demo {
	height: 300px;
	button {
		margin-right: 10px;
		&.active {
			background: greenyellow;
			border-color: greenyellow;
		}
	}
}
</style>
