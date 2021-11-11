<template>
	<div class="gzDatePicker">
		<div class="header">
			<gz-button @click="prevM">{{ prevMonth }}</gz-button>
			<gz-button>{{ prevDay }}</gz-button>
			<span class="year">{{ year }}年</span>
			<span class="month">{{ month }}月</span>
			<span class="date">{{ date }}日</span>
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
const config = ref({
	style: {
		width: 422,
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
			width: 60,
		},
		{
			prop: "Tue",
			label: "二",
			width: 60,
		},
		{
			prop: "Wed",
			label: "三",
			width: 60,
		},
		{
			prop: "Thu",
			label: "四",
			width: 60,
		},
		{
			prop: "Fri",
			label: "五",
			width: 60,
		},
		{
			prop: "Sat",
			label: "六",
			width: 60,
		},
		{
			prop: "Sun",
			label: "日",
			width: 60,
		},
	],
	tableData: [
		{
			Mon: "",
			Tue: "",
			Wed: "",
			Thu: "",
			Fri: "",
			Sat: "",
			Sun: "",
		},
		{
			Mon: "",
			Tue: "",
			Wed: "",
			Thu: "",
			Fri: "",
			Sat: "",
			Sun: "",
		},
		{
			Mon: "",
			Tue: "",
			Wed: "",
			Thu: "",
			Fri: "",
			Sat: "",
			Sun: "",
		},
		{
			Mon: "",
			Tue: "",
			Wed: "",
			Thu: "",
			Fri: "",
			Sat: "",
			Sun: "",
		},
		{
			Mon: "",
			Tue: "",
			Wed: "",
			Thu: "",
			Fri: "",
			Sat: "",
			Sun: "",
		},
		{
			Mon: "",
			Tue: "",
			Wed: "",
			Thu: "",
			Fri: "",
			Sat: "",
			Sun: "",
		},
	],
});

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);
const date = ref(new Date().getDate());
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
	config.value.tableData.map((t, i) => {
		t.Mon = timeData[i][0];
		t.Tue = timeData[i][1];
		t.Wed = timeData[i][2];
		t.Thu = timeData[i][3];
		t.Fri = timeData[i][4];
		t.Sat = timeData[i][5];
		t.Sun = timeData[i][6];
	});
};

const ArrayGroup = (array, subGroupLength) => {
	let index = 0;
	let newArray = [];
	while (index < array.length) {
		newArray.push(array.slice(index, (index += subGroupLength)));
	}
	return newArray;
};

const nextM = () => {
	if (month.value == 12) {
		month.value = 1;
		year.value++;
	} else {
		month.value++;
	}
	layout();
};

const prevM = () => {
	if (month.value == 1) {
		month.value = 12;
		year.value--;
	} else {
		month.value--;
	}
	layout();
};
</script>

<style scoped lang="scss">
.gzDatePicker {
	width: 420px;
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
