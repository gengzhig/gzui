<!--
 * @Author: your name
 * @Date: 2021-01-30 10:48:49
 * @LastEditTime: 2021-01-30 16:40:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\layouts\components\AppMain.vue
-->
<template>
	<div class="app-main" :class="[store.state.isMobile ? 'mobile' : '']">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
			<el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in state.routerList" :key="index">{{
				item.meta.title
			}}</el-breadcrumb-item>
		</el-breadcrumb>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	name: "AppMain",
};
</script>
<script setup>
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const state = reactive({
	routerList: [],
});
const route = useRoute();
const store = useStore();
onMounted(() => {
	state.routerList = route.matched;
	console.log(store.state.isMobile, "appMain");
});
watch(
	() => {
		return route.path;
	},
	(oldValue, newValue) => {
		state.routerList = route.matched;
	}
);
</script>

<style lang="scss" scoped>
.app-main {
	width: 100%;
	height: 100%;
	color: #333;
	background-color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	box-sizing: border-box;
	padding: 90px 30px 30px calc(200px + 30px);
	overflow: auto;
	&.mobile {
		padding: 90px 10px 10px 100px;
	}
}
</style>
