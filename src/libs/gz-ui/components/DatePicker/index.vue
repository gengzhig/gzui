<template>
	<div class="gzDatePicker">
		<div class="header">
			<gz-button>{{ prevMonth }}</gz-button>
			<gz-button>{{ prevDay }}</gz-button>
			<span class="year">{{ year }}年</span>
			<span class="month">{{ month }}月</span>
			<gz-button>{{ nextDay }}</gz-button>
			<gz-button @click="nextM">{{ nextMonth }}</gz-button>
		</div>
		<div class="content">
			<gz-table :config="config"> </gz-table>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzDatePicker",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, useSlots, nextTick } from "vue";
const props = defineProps({});
const emit = defineEmits();

const prevMonth = ref("<<");
const nextMonth = ref(">>");
const prevDay = ref("<");
const nextDay = ref(">");

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);
// const month = ref(12);

onMounted(() => {
	layout();
});
// 排版
const layout = (Year, Month) => {
	// 获取当前日期
	let currentDate = new Date().getDate();
	// 获取当前月第一天是星期几
	let currentMonthFirstDayWeek = new Date(year.value, month.value - 1, 1).getDay();
	// 获取当前月最后一天天数
	let currentMonthLastDay = new Date(new Date(year.value, month.value, 1) - 86400 * 1000).getDate();
	// 获取上个月最后一天天数
	let prevMonthLastDay = new Date(new Date(year.value, month.value - 1, 1) - 86400 * 1000).getDate();
	// console.log(prevMonthLastDay, currentMonthFirstDayWeek, currentMonthLastDay);

	let timeData = [];
	for (let i = prevMonthLastDay - (currentMonthFirstDayWeek - 1) + 1; i <= prevMonthLastDay; i++) {
		timeData.push(i);
	}
	for (let i = 1; i <= currentMonthLastDay; i++) {
		timeData.push(i);
	}
	let suppleDate = 42 - currentMonthLastDay - (currentMonthFirstDayWeek - 1);
	// 再补充 42-currentMonthLastDay-(currentMonthFirstDayWeek-1)
	for (let i = 1; i <= suppleDate; i++) {
		timeData.push(i);
	}
	timeData = ArrayGroup(timeData, 7);
	console.log(timeData, timeData.length);
	for (let i = 0; i < timeData.length; i++) {
		for (let j = 0; j < timeData[i].length; j++) {
			console.log(j);
			if (j == 0) {
			}
		}
	}
};

const ArrayGroup = (array, subGroupLength) => {
	let index = 0;
	let newArray = [];
	while (index < array.length) {
		newArray.push(array.slice(index, (index += subGroupLength)));
	}
	return newArray;
};

const config = ref({
	style: {
		width: 352,
		stripe: true,
		border: true,
		height: 337,
		index: false,
		radio: false,
		checkBox: false,
	},
	columnData: [
		{
			prop: "Mon",
			label: "一",
			width: 50,
		},
		{
			prop: "Tue",
			label: "二",
			width: 50,
		},
		{
			prop: "Wed",
			label: "三",
			width: 50,
		},
		{
			prop: "Thu",
			label: "四",
			width: 50,
		},
		{
			prop: "Fri",
			label: "五",
			width: 50,
		},
		{
			prop: "Sat",
			label: "六",
			width: 50,
		},
		{
			prop: "Sun",
			label: "日",
			width: 50,
		},
	],
	tableData: [
		{
			Mon: 1,
			Tue: 2,
			Wed: 3,
			Thu: 4,
			Fri: 5,
			Sat: 6,
			Sun: 7,
		},
		{
			Mon: 8,
			Tue: 9,
			Wed: 10,
			Thu: 11,
			Fri: 12,
			Sat: 13,
			Sun: 14,
		},
		{
			Mon: 15,
			Tue: 16,
			Wed: 17,
			Thu: 18,
			Fri: 19,
			Sat: 20,
			Sun: 21,
		},
		{
			Mon: 22,
			Tue: 23,
			Wed: 24,
			Thu: 25,
			Fri: 26,
			Sat: 27,
			Sun: 28,
		},
		{
			Mon: 29,
			Tue: 30,
			Wed: 31,
			Thu: 1,
			Fri: 2,
			Sat: 3,
			Sun: 4,
		},
		{
			Mon: 5,
			Tue: 6,
			Wed: 7,
			Thu: 8,
			Fri: 9,
			Sat: 10,
			Sun: 11,
		},
	],
});

const nextM = () => {
	month.value++;
};
</script>

<style scoped lang="scss">
.gzDatePicker {
	width: 350px;
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		.gz-button {
			margin-bottom: 0;
			margin-right: 0;
		}
	}
}
</style>
