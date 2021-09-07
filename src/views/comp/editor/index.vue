<!--
 * @Author: gz
 * @Date: 2021-09-07 15:29:01
 * @LastEditors: gz
 * @LastEditTime: 2021-09-07 15:43:23
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\editor\index.vue
-->
<template>
	<div class="layout">
		<Navbar></Navbar>
		<div class="container">
			<div class="sidebar">
				<compList></compList>
			</div>
			<div class="appMain">画布</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Editor",
};
</script>
<script setup>
import Navbar from "layouts/components/Navbar.vue";
import compList from "views/comp/editor/compList.jsx";
</script>

<style lang="scss" scoped>
.layout {
	height: 100vh;
	.container {
		.sidebar {
			width: 200px;
			height: calc(100vh - 60px);
			color: #fff;
			background-color: #304156;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1;
			margin-top: 60px;
		}
		.appMain {
			width: 100%;
			height: 100%;
			color: #333;
			background-color: #fff;
			position: fixed;
			top: 0;
			left: 0;
			box-sizing: border-box;
			padding: 90px 30px 30px 230px;
			overflow: auto;
		}
	}
}
</style>
