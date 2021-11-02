<!--
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-09-08 11:54:38
 * @LastEditors: gz
 * @Description: In User Settings Edit
 * @FilePath: \gi-ui\src\App.vue
-->
<template>
	<router-view></router-view>
</template>

<script setup>
import ui from "@/libs/gz-ui/index.jsx";
import tool from "@/assets/js/tool.js";
import { provide } from "vue";
provide("compInfo", ui.compInfo);
provide("$tool", tool);
</script>
<style>
.menuList .title {
	display: block;
	text-decoration: none;
	text-align: center;
	line-height: 1.5;
	margin: 20px 0px;
	background-image: -webkit-linear-gradient(
		left,
		#3498db,
		#f47920 10%,
		#d71345 20%,
		#f7acbc 30%,
		#ffd400 40%,
		#3498db 50%,
		#f47920 60%,
		#d71345 70%,
		#f7acbc 80%,
		#ffd400 90%,
		#3498db
	);
	color: transparent;
	-webkit-background-clip: text;
	background-size: 200% 100%;
	animation: slide 5s infinite linear;
	font-size: 40px;
}
@keyframes slide {
	0% {
		background-position: 0 0;
	}

	100% {
		background-position: -100% 0;
	}
}
</style>
