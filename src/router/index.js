/*
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-07-29 16:46:56
 * @LastEditors: gz
 * @Description: In User Settings Edit
 * @FilePath: \gi-ui\src\router\index.js
 */
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
// 工厂函数创建router实例
import Layout from "layouts/index.vue";
const router = createRouter({
  history: createWebHashHistory(), // createWebHistory ==> history模式  createWebHashHistory==> hash模式
  routes: [
    {
      path: "/",
      component: Layout,
      meta: {
        title: "首页"
      },
      redirect: "/home",
      children: [
        {
          path: "home",
          name: "Home",
          meta: {
            title: "设计原则"
          },
          component: () => import("views/comp/home.vue")
        },
        {
          path: "tabs",
          name: "Tabs",
          meta: {
            title: "Tabs标签页"
          },
          component: () => import("views/comp/custom/tabs.vue")
        },
        {
          path: "virtualList",
          name: "VirtualList",
          meta: {
            title: "虚拟列表"
          },
          component: () => import("views/comp/custom/virtualList.vue")
        },
        {
          path: "selector",
          name: "Selector",
          meta: {
            title: "下拉菜单"
          },
          component: () => import("views/comp/custom/selector.vue")
        },
        {
          path: "multiMenu",
          name: "MultiMenu",
          meta: {
            title: "多级菜单"
          },
          component: () => import("views/comp/custom/multiMenu.vue")
        },
        {
          path: "carousel",
          name: "Carousel",
          meta: {
            title: "轮播图"
          },
          component: () => import("views/comp/custom/carousel.vue")
        },
        {
          path: "magnifyingGlass",
          name: "MagnifyingGlass",
          meta: {
            title: "放大镜"
          },
          component: () => import("views/comp/custom/magnifyingGlass.vue")
        },
        {
          path: "fiveStar",
          name: "FiveStar",
          meta: {
            title: "五星好评"
          },
          component: () => import("views/comp/custom/fiveStar.vue")
        },
        {
          path: "modalBox",
          name: "ModalBox",
          meta: {
            title: "模态框"
          },
          component: () => import("views/comp/custom/modalBox.vue")
        },
        {
          path: "chart",
          name: "Chart",
          meta: {
            title: "图表"
          },
          component: () => import("views/comp/chart/Base.vue")
        }
      ]
    }
  ]
});

export default router;
