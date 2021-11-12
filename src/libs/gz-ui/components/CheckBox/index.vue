<template>
	<div v-for="(item, index) in list" :key="index" class="gzCheckBox">
		<input type="checkbox" :disabled="item.disabled" :id="item.value" :value="item.value" v-model="defaults" />
		<label :for="item.value">{{ item.label }}</label>
	</div>
</template>

<script>
export default {
	name: "gzCheckBox",
};
</script>

<script setup>
import { ref, onMounted, watch, getCurrentInstance, nextTick } from "vue";
const props = defineProps({
	list: {
		type: Array,
		default: () => [],
	},
	defaults: {
		type: Array,
		default: () => [],
	},
});
const emit = defineEmits(["sendValue"]);
watch(
	() => props.defaults,
	value => {
		emit("update:defaults", value);
	}
);
</script>

<style scoped lang="scss">
.gzCheckBox {
	input[type="checkbox"] + label::before {
		content: "\a0"; /*不换行空格*/
		display: inline-block;
		vertical-align: 0.2em;
		width: 0.8em;
		height: 0.8em;
		margin-right: 0.2em;
		border-radius: 0.2em;
		background-color: silver;
		text-indent: 0.15em;
		line-height: 0.65; /*行高不加单位，子元素将继承数字乘以自身字体尺寸而非父元素行高*/
	}
	input[type="checkbox"]:checked + label {
		color: #18a058;
	}
	input[type="checkbox"]:checked + label::before {
		content: "\2713";
		color: #fff;
		background-color: #18a058;
	}
	input {
		position: absolute;
		clip: rect(0, 0, 0, 0);
	}
	input[type="checkbox"]:focus + label::before {
		// box-shadow: 0 0 0.1em 0.1em #58a;
	}
	input[type="checkbox"]:disabled + label::before {
		background-color: gray;
		box-shadow: none;
		color: #555;
	}
}
</style>
