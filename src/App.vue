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
