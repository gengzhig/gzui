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
import sidebar from "./sidebar";
import navbar from "./navbar";
import tool from "@/assets/js/tool.js";

export default createStore({
	state: {
		isMobile: false,
		routerMenu: localStorage.getItem("routerMenu") ? JSON.parse(localStorage.getItem("routerMenu")) : [],
		currentComp: [],
		curComponentIndex: -1,
		currentCompList: [],
	},
	getters: {
		currentCompLayerTreeList: state =>
			state.currentCompList
				.map(c => {
					return {
						id: c.id,
						label: c.name,
						children: [],
					};
				})
				.reverse(),
		currentCompName: state => state.currentComp && state.currentComp.length > 0 && state.currentComp[0].name,
		currentCompProperty: state => state.currentComp && state.currentComp.length > 0 && state.currentComp[0],
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
			state.currentComp = null;
		},
		// 上移
		upComponent(state, payload) {
			if (state.curComponentIndex == -1) return false;
			// 上移图层 index，表示元素在数组中越往后
			if (state.curComponentIndex < state.currentCompList.length - 1) {
				swap(state.currentCompList, state.curComponentIndex, state.curComponentIndex + 1);
				tool.resetZindex(state.currentCompList);
			}
			function swap(arr, i, j) {
				arr[i] = arr.splice(j, 1, arr[i])[0];
			}
		},
		// 下移
		downComponent(state, payload) {
			// 下移图层 index，表示元素在数组中越往前
			if (state.curComponentIndex > 0) {
				swap(state.currentCompList, state.curComponentIndex, state.curComponentIndex - 1);
				tool.resetZindex(state.currentCompList);
			}
			function swap(arr, i, j) {
				arr[i] = arr.splice(j, 1, arr[i])[0];
			}
		},
		// 置顶
		topComponent(state, payload) {
			if (state.curComponentIndex < state.currentCompList.length - 1) {
				state.currentCompList.splice(state.curComponentIndex, 1);
				state.currentCompList.push(state.currentComp[0]);
				tool.resetZindex(state.currentCompList);
			}
		},
		// 置底
		bottomComponentt(state, payload) {
			if (state.curComponentIndex > 0) {
				state.currentCompList.splice(state.curComponentIndex, 1);
				state.currentCompList.unshift(state.currentComp[0]);
				tool.resetZindex(state.currentCompList);
			}
		},
	},
	actions: {
		changeDevice({ commit }, payload) {
			commit("toggleDevice", payload);
		},
	},
	modules: {
		sidebar,
		navbar,
	},
});
