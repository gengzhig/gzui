<template>
	<div class="page-component">
		<h1>开关 Switch</h1>
		<p>表示两种相互对立的状态间的切换，多用于触发「开/关」。</p>
		<h3>基础用法</h3>
		<p>绑定 v-model 到一个 Boolean 类型的变量。 可以使用 active-color 属性与 inactive-color 属性来设置开关的背景色。</p>
		<div class="meta">
			<div class="demo">
				<gz-switch v-model="value" text="开|关" activeColor="#13ce66" inactiveColor="#fdfdfd"></gz-switch>
			</div>
		</div>
		<h3>禁用状态</h3>
		<p>设置disabled属性来控制是否禁用开关。</p>
		<div class="meta">
			<div class="demo">
				<gz-switch disabled v-model="value2" text="on|off" activeColor="#13ce66" inactiveColor="#fdfdfd"></gz-switch>
			</div>
			<base-copy :code="state.code" :attributeBrief="state.attributesBrief" :eventBrief="state.eventsBrief"></base-copy>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
const value = ref(true);
const value2 = ref(false);
const state = reactive({
	code: `<gz-switch v-model="value" text="开|关" activeColor="#13ce66" inactiveColor="#fdfdfd"></gz-switch>
<gz-switch disabled v-model="value" text="on|off" activeColor="#13ce66" inactiveColor="#fdfdfd"></gz-switch>`,
	attributesBrief: {
		tableData: [
			{
				param: "text",
				explain: "文字描述",
				type: "String",
				optional: "---",
				default: "on|off",
			},
			{
				param: "activeColor",
				explain: "开颜色",
				type: "String",
				optional: "---",
				default: "#13ce66",
			},
			{
				param: "inactiveColor",
				explain: "关颜色",
				type: "String",
				optional: "---",
				default: "#ff4949",
			},
		],
	},
	eventsBrief: {
		tableData: [],
	},
});
</script>

<style lang="scss" scoped>
.demo {
	.gz-switch:first-child {
		margin-bottom: 10px;
	}
	.el-row {
		margin-bottom: 20px;
		button {
			margin-right: 10px;
		}
	}
}
</style>
