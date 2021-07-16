<!--
 * @Author: your name
 * @Date: 2021-01-30 10:49:17
 * @LastEditTime: 2021-01-30 11:50:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\layouts\components\Navbar.vue
-->
<template>
  <div class="nav-bar">
    <h3 class="title">gzUI组件库</h3>
    <el-avatar icon="el-icon-user-solid"></el-avatar>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
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
  }
}
</style>
