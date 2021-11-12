<template>
	<div class="gzDatePicker">
		<div class="header">
			<gz-button @click="prevM">{{ prevMonth }}</gz-button>
			<gz-button @click="changeD(-1)">{{ prevDay }}</gz-button>
			<span class="year">{{ year }}年</span>
			<span class="month">{{ month }}月</span>
			<span class="date">{{ date }}日</span>
			<gz-button @click="changeD(1)">{{ nextDay }}</gz-button>
			<gz-button @click="nextM">{{ nextMonth }}</gz-button>
		</div>
		<div class="content">
			<div class="content-header">
				<div class="item">一</div>
				<div class="item">二</div>
				<div class="item">三</div>
				<div class="item">四</div>
				<div class="item">五</div>
				<div class="item">六</div>
				<div class="item">日</div>
			</div>
			<div class="content-wrap">
				<div
					class="item"
					:class="{ active: item == nowDate }"
					v-for="(item, index) in timeDatas"
					:key="index"
					@click="selectItem(item)"
				>
					{{ item.split("-")[2] }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzDatePicker",
};
</script>

<script setup>
import { ref, onMounted, computed } from "vue";
import layout from "./layout";
let oldTime = null;

const prevMonth = ref("<<");
const nextMonth = ref(">>");
const prevDay = ref("<");
const nextDay = ref(">");
const timeDatas = ref([]);
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);
const date = ref(new Date().getDate());
// 当天/选中日期（年-月-日）
const nowDate = computed(() => {
	return year.value + "-" + month.value + "-" + date.value;
});

onMounted(() => {
	// 外界传值显示日期
	timeDatas.value = layout(year.value, month.value);
});

const changeD = num => {
	let nowTime = null;
	nowTime = new Date(
		+new Date(
			oldTime ? oldTime.split("-")[0] : new Date().getFullYear(),
			oldTime ? oldTime.split("-")[1] - 1 : new Date().getMonth(),
			oldTime ? oldTime.split("-")[2] : new Date().getDate()
		) +
			86400 * 1000 * num
	)
		.toLocaleDateString()
		.replaceAll("/", "-");

	oldTime = nowTime;
	year.value = +nowTime.split("-")[0];
	month.value = +nowTime.split("-")[1];
	date.value = +nowTime.split("-")[2];
	timeDatas.value = layout(year.value, month.value);
};
const prevM = () => {
	if (month.value == 1) {
		month.value = 12;
		year.value--;
	} else {
		month.value--;
	}
	oldTime = year.value + "-" + month.value + "-" + date.value;
	timeDatas.value = layout(year.value, month.value);
};
const nextM = () => {
	if (month.value == 12) {
		month.value = 1;
		year.value++;
	} else {
		month.value++;
	}
	oldTime = year.value + "-" + month.value + "-" + date.value;
	timeDatas.value = layout(year.value, month.value);
};
// 选中天
const selectItem = item => {
	year.value = +item.split("-")[0];
	month.value = +item.split("-")[1];
	date.value = +item.split("-")[2];
	oldTime = item;
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
	.content {
		border: 1px solid #ccc;
		.content-header {
			height: 40px;
			line-height: 40px;
			display: flex;
			justify-content: space-around;
			border-bottom: 1px solid #ccc;
		}
		.content-wrap {
			.item {
				width: calc(100% / 7);
				display: inline-block;
				text-align: center;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
				&.active {
					background: #18a058;
					color: #fff;
				}
			}
		}
	}
}
</style>
