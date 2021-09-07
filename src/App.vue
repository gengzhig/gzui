<!--
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-01-30 10:10:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\App.vue
-->
<template>
	<router-view></router-view>
</template>

<script setup>
import { compInfo } from "@/libs/gz-ui/index.jsx";
import { provide } from "vue";
provide("compInfo", compInfo);
</script>
