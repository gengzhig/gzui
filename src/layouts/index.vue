<!--
 * @Author: your name
 * @Date: 2021-01-30 10:45:09
 * @LastEditTime: 2021-01-30 11:14:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\layouts\index.vue
-->
<template>
  <div class="layouts">
    <!-- 头部导航区 -->
    <Navbar></Navbar>
    <!-- 内容区 -->
    <div class="container">
      <!-- 侧边栏 -->
      <SideBar></SideBar>
      <!-- 主体内容区 -->
      <App-main></App-main>
    </div>
  </div>
</template>

<script setup>
import SideBar from "layouts/components/SideBar.vue";
import Navbar from "layouts/components/Navbar.vue";
import AppMain from "layouts/components/AppMain.vue";
</script>

<style lang="scss" scoped>
.layouts {
  height: 100vh;
  .container {
  }
}
</style>
