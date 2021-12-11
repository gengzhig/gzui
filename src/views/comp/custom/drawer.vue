<template>
	<div class="page-component">
		<h1>Drawer 抽屉</h1>
		<p>
			有些时候, Modal 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Modal
			几乎相同的 API, 在 UI 上带来不一样的体验。
		</p>
		<h3>基础用法</h3>
		<p>呼出一个临时的侧边栏，支持上下左右四个方向。</p>
		<div class="meta">
			<div class="demo">
				<gz-button @click="openDrawer">OPEN</gz-button>
				<gzDrawer v-model="drawer" :direction="direction">
					<h1>抽屉内的内容</h1>
				</gzDrawer>
			</div>
			<base-copy :code="state.code"></base-copy>
		</div>
		<base-copy :code="state.zlcode" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
	</div>
</template>
<script setup>
import { reactive, toRefs, ref, getCurrentInstance } from "vue";
import { gzMessage } from "@/libs/gz-ui/components/Message/index.js";
import { Notification, Msgbox, Message } from "element3";
import baseCopy from "@/components/baseFunction/Copy.vue";
const drawer = ref(false);
const direction = ref("rtl");
const ctx = getCurrentInstance();
const state = reactive({
	code: ``,
	attributesBrief: {
		tableData: [
			// {
			// 	param: "full",
			// 	explain: "加载方式",
			// 	type: "Boolean",
			// 	optional: "true局部加载/false全局加载",
			// 	default: "false",
			// },
		],
	},
	eventsBrief: {
		tableData: [],
	},
});
const openDrawer = () => {
	drawer.value = true;
};
</script>

<style lang="scss" scoped>
</style>
