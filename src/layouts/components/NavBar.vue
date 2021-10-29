<!--
 * @Author: your name
 * @Date: 2021-01-30 10:49:17
 * @LastEditTime: 2021-09-10 15:18:19
 * @LastEditors: gz
 * @Description: In User Settings Edit
 * @FilePath: \gi-ui\src\layouts\components\NavBar.vue
-->
<template>
	<div class="nav-bar">
		<div class="menuList">
			<h3 class="title" v-if="!store.state.navbar.isEditScreen" @click="goHome">gzUI组件库</h3>
			<h3 class="title" v-else @click="goHome">gzUI画布编辑器</h3>
			<el-tooltip v-if="store.state.navbar.isEditScreen" class="item" effect="dark" content="图层" placement="bottom">
				<el-button type="primary" icon="el-icon-menu" @click="openLayer"></el-button>
			</el-tooltip>
			<el-tooltip v-if="store.state.navbar.isEditScreen" class="item" effect="dark" content="组件库" placement="bottom">
				<el-button type="primary" icon="el-icon-s-grid" @click="openCompLibrary"></el-button>
			</el-tooltip>
			<el-tooltip
				v-if="store.state.navbar.isEditScreen"
				class="item"
				effect="dark"
				content="右侧面板"
				placement="bottom"
			>
				<el-button type="primary" icon="el-icon-setting" @click="openRightArea"></el-button>
			</el-tooltip>
		</div>
		<div class="global-actions">
			<el-tooltip
				v-if="store.state.navbar.isEditScreen"
				class="item"
				effect="dark"
				content="生成快照"
				placement="bottom"
			>
				<el-button type="primary" icon="el-icon-dish" @click="createSnapshot"></el-button>
			</el-tooltip>
			<el-tooltip
				v-if="store.state.navbar.isEditScreen"
				class="item"
				effect="dark"
				content="管理快照"
				placement="bottom"
			>
				<el-button type="primary" icon="el-icon-fork-spoon" @click="manageSnapshot"></el-button>
			</el-tooltip>
			<el-tooltip v-if="store.state.navbar.isEditScreen" class="item" effect="dark" content="发布" placement="bottom">
				<el-button type="primary" icon="el-icon-position" @click="publish"></el-button>
			</el-tooltip>
			<el-tooltip v-if="store.state.navbar.isEditScreen" class="item" effect="dark" content="预览" placement="bottom">
				<el-button type="primary" icon="el-icon-video-play" @click="preview"></el-button>
			</el-tooltip>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { useStore } from "vuex";
import { Message } from "element3";
import compLibrary from "@/views/comp/editor/compLibrary.vue";
const route = useRouter();
const router = useRouter();
const store = useStore();
const drawer = ref(true);
const goHome = e => {
	router.push("/home");
};
const openLayer = () => {
	store.commit("sidebar/toggleLayerArea");
};
const openCompLibrary = () => {
	store.commit("sidebar/toggleCompLibraryArea");
};
const openRightArea = () => {
	store.commit("sidebar/toggleOperateMainArea");
};
const handleClose = done => {
	drawer.value = false;
};

const createSnapshot = () => {
	store.commit("createSnapshot");
};
const manageSnapshot = () => {
	store.commit("manageSnapshot");
};
const publish = () => {
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};
const preview = () => {
	let routeUrl = router.resolve({
		path: "/preview",
	});
	window.open(routeUrl.href, "_blank");
};
</script>

<style lang="scss" scoped>
.nav-bar {
	width: 100vw;
	height: 60px;
	line-height: 60px;
	background: #333;
	color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
	box-sizing: border-box;
	padding: 0 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #000;
	.menuList {
		display: flex;
		align-items: center;
		.title {
			letter-spacing: 0.2em;
			cursor: pointer;
		}
	}
}
.el-header {
	color: #333;
	padding: 0 !important;
	height: 50px !important;
	background: antiquewhite;
}

.el-main {
	height: 100%;
	padding: 0 !important;
	overflow: hidden;
	position: relative;
}
</style>
