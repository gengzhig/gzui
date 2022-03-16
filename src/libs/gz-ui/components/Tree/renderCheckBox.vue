<template>
	<div :class="['tree-checkbox', item.checked ? 'checked' : '']" @click="e => toggle(item, e)">
		<img
			class="tree-checkbox-img"
			src="./icon/all.png"
			v-if="item.checked && !item.toggleDisabled"
			alt
		/>
		<!-- <img src="./icon/half.png" v-if="item.checked" alt /> -->
	</div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
	item: {
		type: Object,
	},
});

const emit = defineEmits(["checkboxClick"]);


const toggle = (item, e) => {
	// if (!item.children) return;
	if (item.toggleDisabled) return;
	item.checked = !item.checked;

	// console.log(e.target, item);
	// 有子级
	if (item.children) {
		fatherAndSonLinkage(item.children, item.checked);
	}
	emit("checkboxClick", item);
};

// 父子联动
const fatherAndSonLinkage = (children, status) => {
	children.map(c => {
		c.checked = status;
		if (c.children) {
			fatherAndSonLinkage(c.children, status);
		}
	})
	// console.log(item);
}

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
</style>
