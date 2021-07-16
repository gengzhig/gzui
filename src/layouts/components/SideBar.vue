<!--
 * @Author: your name
 * @Date: 2021-01-30 10:59:45
 * @LastEditTime: 2021-01-30 17:42:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\layouts\components\SideBar.vue
-->
<template>
  <div class="side-bar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActiveIndex"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          :default-openeds="defaultOpeneds"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index + 1 + ''"
            v-for="(item, index) in compMenus"
            :key="index"
            @click="menuClick(item)"
          >
            <i class="el-icon-menu"></i>
            <template v-slot:title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    let state = reactive({
      compMenus: [],
      defaultActiveIndex: "1",
    });
    let defaultOpeneds = ref(["1"]);
    onMounted(() => {
      let routerMenu = vm.$route.matched[0].children.map((item) => {
        return {
          name: item.meta.title,
          path: item.path,
        };
      });
      vm.$store.commit("saveRouterMenu", routerMenu);
      state.compMenus = routerMenu;
    });
    watch(
      () => {
        return vm.$route;
      },
      (value) => {
        // 默认菜单高亮
        let findIndex = vm.$store.state.routerMenu.findIndex((item) => {
          return value.path.includes(item.path);
        });
        state.defaultActiveIndex = findIndex + 1 + "";
      }
    );
    const menuClick = (item) => {
      router.push(item.path);
    };
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleSelect = (key, keyPath) => {};
    return {
      ...toRefs(state),
      defaultOpeneds,
      handleOpen,
      handleClose,
      handleSelect,
      menuClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
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
</style>
