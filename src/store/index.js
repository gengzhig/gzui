import { Store } from "vuex";

/*
 * @Author: your name
 * @Date: 2021-01-30 10:29:13
 * @LastEditTime: 2021-01-30 10:42:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\store\index.js
 */
import { createStore } from "vuex";

export default createStore({
  state: {
    routerMenu: localStorage.getItem("routerMenu") ? JSON.parse(localStorage.getItem("routerMenu")) : []
  },
  mutations: {
    saveRouterMenu(state, payload) {
      state.routerMenu = payload
      localStorage.setItem("routerMenu", JSON.stringify(payload));
    }
  }
});
