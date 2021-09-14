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
		<h3 class="title" @click="goHome">gzUI组件库133444</h3>
		<el-avatar icon="el-icon-user-solid"></el-avatar>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = (e) => {
	router.push("/home");
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
	.title {
		letter-spacing: 0.2em;
    cursor: pointer;
	}
}
</style>
