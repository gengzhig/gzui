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
		isMobile: false,
		routerMenu: localStorage.getItem("routerMenu") ? JSON.parse(localStorage.getItem("routerMenu")) : [],
		currentComp: {
			// id: null,
			// name: null,
			// width: 0,
			// height: 0,
			// left: 0,
			// top: 0,
			// zIndex: 0,
		},
		curComponentIndex: -1,
		currentCompList: [],
	},
	mutations: {
		saveRouterMenu(state, payload) {
			state.routerMenu = payload;
			localStorage.setItem("routerMenu", JSON.stringify(payload));
		},
		toggleDevice(state, payload) {
			state.isMobile = payload;
		},
		// 设置当前选中组件
		setCurrentComp(state, { compData, index }) {
			state.currentComp = compData;
			state.curComponentIndex = index;
		},
		// 设置当前画布内所有组件
		setCurrentCompList(state, payload) {
			state.currentCompList = payload;
		},
		// 撤销组件
		revocationComp(state, payload) {
			state.currentCompList.pop();
		},
		// 上移
		upComponent(state, payload) {
			if (state.curComponentIndex == -1) return false;
			// 上移图层 index，表示元素在数组中越往后
			if (state.curComponentIndex < state.currentCompList.length - 1) {
				swap(state.currentCompList, state.curComponentIndex, state.curComponentIndex + 1);
				state.currentCompList.map((c, i) => {
					c.zIndex = i + 1;
				});
				console.log(state.currentCompList);
			}
			function swap(arr, i, j) {
				arr[i] = arr.splice(j, 1, arr[i])[0];
			}
		},
	},
	actions: {
		changeDevice({ commit }, payload) {
			commit("toggleDevice", payload);
		},
	},
});
