<!--
 * @Author: your name
 * @Date: 2021-01-30 10:59:45
 * @LastEditTime: 2021-09-10 13:38:16
 * @LastEditors: gz
 * @Description: In User Settings Edit
 * @FilePath: \gi-ui\src\layouts\components\SideBar.vue
-->
<template>
	<div class="side-bar" :class="[state.isMobile ? 'mobile' : '']">
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
					<sub-sideBar v-if="state.compMenus.length > 0" :menuData="state.compMenus"></sub-sideBar>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onBeforeUnmount, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import SubSideBar from "./SubSideBar.vue";
const WIDTH = 375;
const router = useRouter();
const route = useRoute();
const store = useStore();
let state = reactive({
	isMobile: false,
	compMenus: [],
	defaultActiveIndex: "设计原则",
});
let defaultOpeneds = ref(["1"]);
// 挂载前
onBeforeMount(() => {
	window.addEventListener("resize", resizeHandler);
});

// 卸载前
onBeforeUnmount(() => {
	window.removeEventListener("resize", resizeHandler);
});

onMounted(() => {
	state.isMobile = checkMobile();

	let routerMenu = route.matched[0].children.map(item => {
		return {
			name: item.meta.title,
			path: item.path,
			icon: "el-icon-" + item.meta.icon,
			children: formatterTree(item.children, item.path),
		};
	});
	function formatterTree(data, sPath) {
		let result = [];
		if (!data || data.length == 0) {
			return [];
		} else {
			result = data.map(d => {
				return { name: d.meta.title, icon: "el-icon-" + d.meta.icon, path: sPath + "/" + d.path };
			});
		}

		return result;
	}
	store.commit("saveRouterMenu", routerMenu);
	state.compMenus = routerMenu;

	let findIndex = store.state.routerMenu.findIndex(item => {
		return route.path.includes(item.path);
	});
	state.defaultActiveIndex = findIndex + 1 + "";
});

watch(
	() => {
		return vm.$route;
	},
	value => {
		// 默认菜单高亮
		let findIndex = store.state.routerMenu.findIndex(item => {
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

const checkMobile = () => {
	const { body } = document;
	const rect = body.getBoundingClientRect();
	store.dispatch("changeDevice", rect.width - 1 < WIDTH);
	return rect.width - 1 < WIDTH;
};
const resizeHandler = () => {
	state.isMobile = checkMobile();
};
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
	&.mobile {
		width: 90px;
	}
}
</style>
