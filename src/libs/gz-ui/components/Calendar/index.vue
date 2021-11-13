<template>
	<div class="gzCalendar" :style="{ width: typeof width == 'number' ? width + 'px' : width }">
		<div class="header">
			<gz-button size="mini" @click="prevM">{{ prevMonth }}</gz-button>
			<gz-button size="mini" @click="changeD(-1)">{{ prevDay }}</gz-button>
			<span class="time">{{ year }} 年{{ month }} 月{{ date }} 日</span>
			<gz-button size="mini" @click="changeD(1)">{{ nextDay }}</gz-button>
			<gz-button size="mini" @click="nextM">{{ nextMonth }}</gz-button>
		</div>
		<div class="content">
			<div class="content-header">
				<div class="item" v-for="(item, index) in weekHearders" :key="index">{{ item }}</div>
			</div>
			<div class="content-wrap">
				<div
					class="item"
					:class="{ today: item == today, active: item == nowDate, next: item.split('-')[1] != month }"
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
	name: "gzCalendar",
};
</script>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import layout from "./layout";
let oldTime = null;
const props = defineProps({
	width: {
		type: [Number, String],
		default: 420,
	},
	modelValue: {
		type: [String, Number],
	},
});
const emits = defineEmits(["modelValue"]);
const weekHearders = ref(["一", "二", "三", "四", "五", "六", "日"]);
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
const today = computed(() => {
	return new Date().getFullYear() + "-" + (+new Date().getMonth() + 1) + "-" + new Date().getDate();
});
onMounted(() => {
	// 外界传值显示日期
	if (props.modelValue) {
		year.value = props.modelValue.split("-")[0];
		month.value = props.modelValue.split("-")[1];
		date.value = props.modelValue.split("-")[2];
		oldTime = props.modelValue;
	}
	timeDatas.value = layout(year.value, month.value);
});
watch(
	() => nowDate.value,
	value => {
		emits("update:modelValue", value);
	}
);
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
.gzCalendar {
	height: 100%;
	background-color: #fff;
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
		height: calc(100% - 50px);
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
				height: 50px;
				line-height: 50px;
				cursor: pointer;
				user-select: none;
				&.active {
					background: #c7ffe2;
				}
				&.next {
					background: #a07d7d24;
				}
				&.today {
					background: #18a058;
				}
			}
		}
	}
}
</style>
