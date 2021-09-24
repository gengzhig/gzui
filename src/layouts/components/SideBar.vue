<!--
 * @Author: your name
 * @Date: 2021-01-30 10:59:45
 * @LastEditTime: 2021-09-10 13:38:16
 * @LastEditors: gz
 * @Description: In User Settings Edit
 * @FilePath: \gi-ui\src\layouts\components\SideBar.vue
-->
<template>
	<div class="side-bar">
		<el-row class="tac">
			<el-col :span="24">
				<el-menu
					:default-active="state.defaultActiveIndex"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
					@select="handleSelect"
					:default-openeds="defaultOpeneds"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b"
				>
					<!-- <el-menu-item
						:index="index + 1 + ''"
						v-for="(item, index) in state.compMenus"
						:key="index"
						@click="menuClick(item)"
					>
						<i class="el-icon-menu"></i>
						<template v-slot:title>
							<span>{{ item.name }}</span>
						</template>
					</el-menu-item> -->
					<sub-sideBar v-if="state.compMenus.length > 0" :menuData="state.compMenus"></sub-sideBar>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import SubSideBar from "./SubSideBar.vue";

const router = useRouter();
let state = reactive({
	compMenus: [],
	defaultActiveIndex: "1",
});
let defaultOpeneds = ref(["1"]);
onMounted(() => {
	let routerMenu = vm.$route.matched[0].children.map(item => {
		return {
			name: item.meta.title,
			path: item.path,
			children: formatterTree(item.children),
		};
	});
	function formatterTree(data) {
		let result = [];
		if (!data || data.length == 0) {
			return [];
		} else {
			result = data.map(d => {
				return { name: d.meta.title, path: d.path };
			});
		}
		return result;
	}
	vm.$store.commit("saveRouterMenu", routerMenu);
	state.compMenus = routerMenu;

	let findIndex = vm.$store.state.routerMenu.findIndex(item => {
		return vm.$route.path.includes(item.path);
	});
	state.defaultActiveIndex = findIndex + 1 + "";
});
watch(
	() => {
		return vm.$route;
	},
	value => {
		// 默认菜单高亮
		let findIndex = vm.$store.state.routerMenu.findIndex(item => {
			return value.path.includes(item.path);
		});
		state.defaultActiveIndex = findIndex + 1 + "";
	}
);
const menuClick = item => {
	router.push(item.path);
};
const handleOpen = (key, keyPath) => {
	console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
	console.log(key, keyPath);
};
const handleSelect = (key, keyPath) => {};
</script>

<style lang="scss" scoped>
.side-bar {
	width: 200px;
	height: calc(100vh - 60px);
	color: #fff;
	background-color: #304156;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	margin-top: 60px;
	overflow: auto;
}
</style>
