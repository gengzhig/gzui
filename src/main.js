/*
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-09-08 11:53:44
 * @LastEditors: gz
 * @Description: In User Settings Edit
 * @FilePath: \gi-ui\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "./store";
import axios from "axios";
// 全局样式
import "styles/index.scss";
import "animate.css";
// 全局引入element3
import element3 from "plugins/element3";

// 全局引入工具类
import tool from "@/assets/js/tool.js";
// 全局引入gzUI
import ui from "@/libs/gz-ui/index.jsx";
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$tool = tool;
app.use(router);
app.use(store);
app.use(element3);
app.use(ui.gzUI);

router.beforeEach((to, from, next) => {
	if (to.path == "/editor") {
		store.commit("navbar/toggleEditScreen", true);
	} else {
		store.commit("navbar/toggleEditScreen", false);
	}
	next();
});
app.config.errorHandler = (err, vm, info) => {
	console.log(err);
	console.log(vm);
	console.log(info);
};

window.vm = app.mount("#app");
