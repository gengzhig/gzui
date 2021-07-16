<!--
 * @Author: your name
 * @Date: 2021-01-30 10:48:49
 * @LastEditTime: 2021-01-30 16:40:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\layouts\components\AppMain.vue
-->
<template>
  <div class="app-main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in routerList"
        :key="index"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "AppMain",
  setup(props, ctx) {
    const state = reactive({
      routerList: [],
    });
    const route = useRoute();
    onMounted(() => {
      route.matched.splice(0, 1);
      state.routerList = route.matched;
    });
    watch(
      () => {
        return route.path;
      },
      (value) => {
        let result = route.matched[0].children.filter((item) => {
          return "/" + item.path == value;
        })[0];
        state.routerList = [result];
      }
    );
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.app-main {
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
</style>
