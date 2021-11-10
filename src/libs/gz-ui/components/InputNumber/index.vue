<template>
	<div class="gzInputNumber">
		<button @click="subtract" :disabled="isAnimating">-</button>
		<!-- <span :class="{ before: isBefore, after: isAfter }" :data-before="countBefore" :data-after="countAfter">{{
			count
		}}</span> -->
		<gz-input v-model:inputValue="count" inputType="text"></gz-input>
		<button @click="add" :disabled="isAnimating">+</button>
	</div>
</template>

<script>
export default {
	name: "gzInputNumber",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";

const count = ref(5);
const countBefore = ref(4);
const countAfter = ref(6);
const isBefore = ref(false);
const isAfter = ref(false);

const props = defineProps({});
const ctx = getCurrentInstance();
const emit = defineEmits();
const isAnimating = computed(() => {
	return isBefore.value || isAfter.value;
});

const subtract = () => {
	isBefore.value = true;
	// setTimeout(() => {
	count.value--;
	countBefore.value = count.value - 1;
	countAfter.value = count.value + 1;
	isBefore.value = false;
	// }, 200);
};
const add = () => {
	isAfter.value = true;

	// setTimeout(() => {
	count.value++;
	countBefore.value = count.value - 1;
	countAfter.value = count.value + 1;
	isAfter.value = false;
	// }, 200);
};
</script>

<style scoped lang="scss">
.gzInputNumber {
	display: flex;
	align-items: center;
	width: max-content;
	// height: 1rem;
	background-color: #000;
	border-radius: 0.2rem;
	display: flex;
	overflow: hidden;
	padding: 0.3rem 0.5em;
	position: relative;
	box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.2);
	span {
		color: #fff;
		display: block;
		flex: 1 1 5rem;
		font-size: 1rem;
		line-height: 1rem;
		text-align: center;

		transform: translateY(-1rem);
	}

	span.before {
		transform: translateY(0rem);
		transition: transform 0.2s ease-in;
	}

	span.after {
		transform: translateY(-2rem);
		transition: transform 0.2s ease-in;
	}

	span::before {
		display: block;
		content: attr(data-before);
	}

	span::after {
		display: block;
		content: attr(data-after);
	}

	button {
		flex: 0 0 1.2rem;
		border: 0;
		background: none;
		color: #fff;
		font-size: 0.6rem;
		line-height: 1rem;
		padding: 0;
		margin: 0;
		width: 1rem;
		height: 1rem;
		position: relative;
		z-index: 100;
		outline: none;
		cursor: pointer;
	}
}

.gzInputNumber::after {
	content: "";
	// position: absolute;
	top: 0;
	left: 0;
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.9) 0%,
		rgba(0, 0, 0, 0) 30%,
		rgba(0, 0, 0, 0) 70%,
		rgba(0, 0, 0, 0.9) 100%
	);
	width: 100%;
	height: 100%;
	border-radius: 0.2rem;
}
</style>
