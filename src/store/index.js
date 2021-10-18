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
import { Notification, Msgbox, Message } from "element3";
export default createStore({
	state: {
		isCut: false,
		isMobile: false,
		routerMenu: localStorage.getItem("routerMenu") ? JSON.parse(localStorage.getItem("routerMenu")) : [],
		currentComp: [],
		copyData: null,
		curComponentIndex: -1,
		currentCompList: [],
		// 页面全局样式数据
		canvasStyleData: {
			width: 1200,
			height: 740,
			scale: 100,
		},
		areaData: {
			// 选中区域包含的组件以及区域位移信息
			style: {
				top: 0,
				left: 0,
				width: 0,
				height: 0,
			},
			components: [],
		},
		editor: null,
	},
	getters: {
		currentCompLayerTreeList: state => {
			return state.currentCompList
				.map(c => {
					return {
						id: c.id,
						highLight: c.highLight,
						label: c.name + "(" + c.zIndex + ")",
						children: [],
						zIndex: c.zIndex,
					};
				})
				.reverse();
		},
		currentCompName: state => state.currentComp && state.currentComp.length > 0 && state.currentComp[0].name,
		currentCompProperty: state => state.currentComp && state.currentComp.length > 0 && state.currentComp[0],
	},
	mutations: {
		saveRouterMenu(state, payload) {
			state.routerMenu = payload;
			localStorage.setItem("routerMenu", JSON.stringify(payload));
		},
		// 切换设备
		toggleDevice(state, payload) {
			state.isMobile = payload;
		},
		// 设置当前选中组件
		setCurrentComp(state, { compData, index }) {
			state.currentComp = compData;
			state.curComponentIndex = index;
			// 给选中组件加选中样式
			let editorBlock = document.querySelectorAll(".canvas .editor-block");
			tool.clearAllEditorBlock(editorBlock);
			[...editorBlock][state.curComponentIndex].classList.add("editor-block-focus");
			localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
		},
		// 重置当前选中组件
		resetCurrentCompIndex(state, payload) {
			state.curComponentIndex = -1;
			state.currentComp = [];
		},
		// 设置当前画布内所有组件
		setCurrentCompList(state, payload) {
			state.currentCompList = payload;
			localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
		},
		setAreaData(state, data) {
			state.areaData = data;
		},
		// 复制
		copy(state) {
			if (state.currentComp.length == 0) {
				Message({
					message: "请先选择画布中的组件！",
					type: "error",
				});
				return;
			}

			state.copyData = tool.deepCopy(state.currentComp);
			state.copyData[0].id = new Date().getTime();
			Message({
				message: "复制成功！",
				type: "success",
			});
			state.isCut = false;
		},
		// 粘贴
		paste(state, isMouse) {
			if (!state.copyData) {
				Message({
					message: "请先选择画布中的组件！",
					type: "error",
				});
				return;
			}

			const data = state.copyData[0];

			// if (isMouse) {
			// 	data.top = state.menuTop;
			// 	data.left = state.menuLeft;
			// } else {
			// 	data.top += 10;
			// 	data.left += 10;
			// }
			data.top += 10;
			data.left += 10;
			// data.id = generateID();
			// Group 的子组件根节点的 id 是通过组件的 id 生成的，必须重新生成 id，否则拆分 Group 的时候获取根节点不正确
			// if (data.component === "Group") {
			// 	data.propValue.forEach(component => {
			// 		component.id = generateID();
			// 	});
			// }
			data.zIndex = ++state.curComponentIndex + 1;
			state.currentCompList.push(tool.deepCopy(data));
			if (state.isCut) {
				state.copyData = null;
			}
		},
		// 剪切
		cut(state) {
			if (!state.curComponent) {
				toast("请选择组件");
				return;
			}

			if (state.copyData) {
				const data = deepCopy(state.copyData.data);
				const index = state.copyData.index;
				data.id = generateID();

				store.commit("addComponent", { component: data, index });
				if (state.curComponentIndex >= index) {
					// 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
					state.curComponentIndex++;
				}
			}

			store.commit("copy");
			store.commit("deleteComponent");
			state.isCut = true;
		},
		// 撤销组件
		revocationComp(state, payload) {
			state.currentCompList.pop();
			state.currentComp = null;
			localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
		},
		// 上移
		upComponent(state, payload) {
			if (state.curComponentIndex == -1) return false;
			// 上移图层 index，表示元素在数组中越往后
			if (state.curComponentIndex < state.currentCompList.length - 1) {
				swap(state.currentCompList, state.curComponentIndex, state.curComponentIndex + 1);
				tool.resetZindex(state.currentCompList);
				let editorBlock = document.querySelectorAll(".canvas .editor-block");
				tool.clearAllEditorBlock(editorBlock);
				[...editorBlock][state.curComponentIndex + 1].classList.add("editor-block-focus");
				state.curComponentIndex += 1;
				localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
			} else {
				Notification({
					title: "警告",
					message: "当前组件已处于最高层级！",
					type: "warning",
				});
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
				let editorBlock = document.querySelectorAll(".canvas .editor-block");
				tool.clearAllEditorBlock(editorBlock);
				[...editorBlock][state.curComponentIndex - 1].classList.add("editor-block-focus");
				state.curComponentIndex -= 1;
				localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
			} else {
				Notification({
					title: "警告",
					message: "当前组件已处于最低层级！",
					type: "warning",
				});
			}
			function swap(arr, i, j) {
				arr[i] = arr.splice(j, 1, arr[i])[0];
			}
		},
		// 置顶
		topComponent(state, payload) {
			if (state.curComponentIndex == -1) return false;
			if (state.curComponentIndex < state.currentCompList.length - 1) {
				state.currentCompList.splice(state.curComponentIndex, 1);
				state.currentCompList.push(state.currentComp[0]);
				tool.resetZindex(state.currentCompList);
				let editorBlock = document.querySelectorAll(".canvas .editor-block");
				tool.clearAllEditorBlock(editorBlock);
				[...editorBlock][state.currentCompList.length - 1].classList.add("editor-block-focus");
				state.curComponentIndex = state.currentCompList.length - 1;
				localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
			} else {
				Notification({
					title: "警告",
					message: "当前组件已处于最高层级！",
					type: "warning",
				});
			}
		},
		// 置底
		bottomComponentt(state, payload) {
			if (state.curComponentIndex > 0) {
				state.currentCompList.splice(state.curComponentIndex, 1);
				state.currentCompList.unshift(state.currentComp[0]);
				tool.resetZindex(state.currentCompList);
				let editorBlock = document.querySelectorAll(".canvas .editor-block");
				tool.clearAllEditorBlock(editorBlock);
				[...editorBlock][0].classList.add("editor-block-focus");
				state.curComponentIndex = 0;
				localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
			} else {
				Notification({
					title: "警告",
					message: "当前组件已处于最低层级！",
					type: "warning",
				});
			}
		},
		// 删除
		deleteComponent(state, payload) {
			Msgbox.confirm("此操作将永久删除该组件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					state.currentCompList.splice(state.curComponentIndex, 1);
					tool.resetZindex(state.currentCompList);
					state.curComponentIndex = -1;
					state.currentComp = [];
					localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
					Message({
						type: "success",
						message: "删除成功!",
					});
				})
				.catch(() => {
					Message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		hide(state, payload) {},
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
