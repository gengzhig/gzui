<template>
	<div :class="['tree-checkbox', item.checked ? 'checked' : '']" @click="e => toggle(item, e)">
		<template v-if="!item.toggleDisabled">
			<!-- 全选 -->
			<img class="tree-checkbox-img" src="./icon/all.png" v-if="item.checked === true" alt />
			<!-- 半选 -->
			<img src="./icon/half.png" v-if="item.checked === 'half'" alt />
		</template>
	</div>
</template>

<script setup>
import { computed, watch } from "vue";

const props = defineProps({
	item: {
		type: Object,
	},
	checkableRelation: {
		type: String,
		default: "both"
	}
});

const emit = defineEmits(["checkboxClick"]);

const toggle = (item, e) => {
	let { checkableRelation } = props;
	if (item.toggleDisabled) return;
	item.checked = !item.checked;
	switch (checkableRelation) {
		case "none":
			emit("checkboxClick", "none", item);
			break;
		// 向下联动
		case "downward":
			emit("checkboxClick", "downward", item);
			break;
		// 向上联动
		case "upward":
			emit("checkboxClick", "upward", item);
			break;
		// 上下联动
		case "both":
			emit("checkboxClick", "both", item);
			break;
		default:
			break;
	}
};

// 获取同级兄弟元素

</script>

<style scoped lang="scss">
.tree-checkbox {
	width: 16px;
	height: 16px;
	outline: 1px solid rgb(224, 224, 230);
	border-radius: 2px;
	box-sizing: border-box;
	margin: 0 3px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	&.checked {
		background-color: #18a058;
		outline: 1px solid #18a058;
	}
	img {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
}

// 禁止折叠 复选框样式
.tree-row.toggle-disabled {
	.tree-checkbox {
		background-color: #adb0b8;
		outline: 1px solid #adb0b8;
		&.checked {
			background-color: #adb0b8;
			outline: 1px solid #adb0b8;
		}
	}
}
</style>
