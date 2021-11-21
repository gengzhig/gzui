<template>
	<!-- 离开前 before-leave 离开后 after-leave-->
	<transition name="gz-message-fade" @before-leave="onClose" @after-leave="handleDestroy">
		<div ref="mss" :id="id" v-show="visible" class="gzMessage" :class="msStyelClass" :style="messageStyle">
			{{ message }}-{{ id }}
		</div>
	</transition>
</template>>
<script setup>
import { computed, ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
const visible = ref(false);
const mss = ref(null);
const ctx = getCurrentInstance();
const props = defineProps({
	id: { type: [Number, String], default: "" },
	message: { type: String, default: "" },
	type: { type: String, default: "info" },
	duration: { type: Number, default: 3000 },
	center: { type: Boolean, default: true },
	onClose: { type: Function },
	offset: { type: Number, default: 20 },
});

const msStyelClass = computed(() => {
	return [`gz-message-${props.type}`, props.center ? "is-center" : ""];
});
const messageStyle = computed(() => {
	return {
		top: `${props.offset}px`,
	};
});
console.log(props.offset);
let timer = null;
const startTime = () => {
	timer = setTimeout(() => {
		visible.value = false;
	}, props.duration);
};
onMounted(() => {
	startTime();
	visible.value = true;
	console.log(mss.value);
});
onUnmounted(() => {
	clearTimeout(timer);
});

const handleDestroy = e => {
	document.body.removeChild(mss.value);
};
</script>
<style lang="scss" scoped>
.gzMessage {
	min-width: 380px;
	height: 40px;
	line-height: 40px;
	color: #fff;
	background-color: #c02c07;
	position: fixed;
	top: 120px;
	left: 50%;
	transform: translateX(-50%);
	padding: 15px 15px 15px 20px;
	box-sizing: border-box;
	border-radius: 4px;
	border-width: 1px;
	border-style: solid;
	border-color: #ebeef5;
	display: flex;
	align-items: center;
	transition: all 0.4s linear;
	z-index: 9999;
}

.gz-message-fade-enter-from,
.gz-message-fade-leave-to {
	transform: translate(-50%, -100%);
	opacity: 0;
}
</style>