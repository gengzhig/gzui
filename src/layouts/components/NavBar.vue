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
		<el-avatar icon="el-icon-user-solid"></el-avatar>
		<!-- <el-drawer
			title="组件库"
			:append-to-body="true"
			:visible.sync="drawer"
			style="position: absolute"
			direction="ltr"
			z-index="1000"
			:before-close="handleClose"
		>
			<compLibrary></compLibrary>
		</el-drawer> -->
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import compLibrary from "@/views/comp/editor/compLibrary.vue";
const route = useRouter();
const router = useRouter();
const store = useStore();
const drawer = ref(false);
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
