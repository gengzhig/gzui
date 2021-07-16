/*
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-01-30 10:40:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "./store";
import axios from "axios"
// 全局样式
import "styles/index.scss";

// 全局引入element3
import element3 from "plugins/element3";

// 全局引入工具类
import tool from '@/assets/js/tool.js';
// 全局引入gzUI
import gzUI from "@/libs/gz-ui"
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$tool = tool;
app.use(router);
app.use(store);
app.use(element3);
app.use(gzUI);
app.config.errorHandler = (err, vm, info) => {
  console.log(err);
  console.log(vm);
  console.log(info);
}
window.vm = app.mount("#app");
