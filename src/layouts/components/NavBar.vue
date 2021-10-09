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
			<h3 class="title" @click="goHome">gzUI组件库</h3>
			<gz-button>组件库</gz-button>
		</div>
		<el-avatar icon="el-icon-user-solid"></el-avatar>
	</div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const route = useRouter();
const router = useRouter();
const goHome = e => {
	router.push("/home");
};
console.log(route);
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
	.menuList {
		display: flex;
		align-items: center;
		.title {
			letter-spacing: 0.2em;
			cursor: pointer;
		}
	}
}
</style>
