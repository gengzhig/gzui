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
import mitt from "@/mitt.js";
import { Notification, Msgbox, Message } from "element3";
export default createStore({
	state: {
		isCut: false,
		isMobile: false,
		routerMenu: localStorage.getItem("routerMenu") ? JSON.parse(localStorage.getItem("routerMenu")) : [],
		menuTop: 0, // 右击菜单数据
		menuLeft: 0,
		menuShow: false,
		currentComp: null,
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
						label: c.name + "(" + c.style.zIndex + ")",
						children: [],
						zIndex: c.style.zIndex,
					};
				})
				.reverse();
		},
		currentCompId: state => state?.currentComp?.id,
		currentCompName: state => state.currentComp && state.currentComp && state.currentComp.name,
		currentCompProperty: state => state.currentComp && state.currentComp && state.currentComp,
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
		showContextMenu(state, { top, left }) {
			state.menuShow = true;
			state.menuTop = top;
			state.menuLeft = left;
		},

		hideContextMenu(state) {
			state.menuShow = false;
		},
		// 设置当前选中组件
		setCurrentComp(state, { compData, index }) {
			state.currentComp = compData;
			state.curComponentIndex = index;
			// 给选中组件加选中样式
			let editorBlock = document.querySelectorAll(".canvas .editor-block");
			localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
		},
		// 重置当前选中组件
		resetCurrentCompIndex(state, payload) {
			state.curComponentIndex = -1;
			// state.currentComp = {};
			state.currentComp.id = 0;
			console.log("resetCurrentCompIndex");
		},
		// 新增组件
		addComponent(state, { component, index }) {
			if (index !== undefined) {
				state.currentCompList.splice(index, 0, component);
			} else {
				state.currentCompList.push(component);
			}
		},
		// 设置当前画布内所有组件
		setCurrentCompList(state, payload) {
			state.currentCompList = payload;
			console.log(state.currentCompList, "当前画布内所有组件信息");
			localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
		},
		// 设置圈选组件数据
		setAreaData(state, data) {
			state.areaData = data;
		},
		// 成组
		compose({ currentCompList, areaData, editor }) {
			const components = [];

			areaData.components.forEach(component => {
				component.style = {
					left: component.left,
					top: component.top,
					width: component.width,
					height: component.height,
				};
				if (!component.isGroup) {
					components.push(component);
				} else {
					// 如果要组合的组件中，已经存在组合数据，则需要提前拆分
					// const parentStyle = { ...component.style };
					// const subComponents = component.propValue;
					// const editorRect = editor.getBoundingClientRect();
					// this.commit("deleteComponent");
					// subComponents.forEach(component => {
					// 	decomposeComponent(component, editorRect, parentStyle);
					// 	this.commit("addComponent", { component });
					// });
					// components.push(...component.propValue);
					// this.commit("batchDeleteComponent", component.propValue);
				}
			});

			const groupComponent = {
				id: new Date().getTime(),
				name: "成组组件",
				top: areaData.style.top,
				left: areaData.style.left,
				width: areaData.style.width,
				height: areaData.style.height,
				zIndex: 1,
				opacity: 100,
				rotate: 0,
				isLock: false,
				isGroup: true,
				animations: [],
				events: {},
				groupStyle: {},
				group: components,
				style: {
					...areaData.style,
					opacity: 1,
					rotate: 0,
				},
			};
			tool.createGroupStyle(groupComponent);
			this.commit("addComponent", {
				component: groupComponent,
			});

			mitt.emit("hideArea");

			this.commit("batchDeleteComponent", areaData.components);
			this.commit("setCurrentComp", {
				compData: currentCompList[currentCompList.length - 1],
				index: currentCompList.length - 1,
			});

			areaData.components = [];
		},
		// 将已经放到 Group 组件数据删除，也就是在 componentData 中删除，因为它们已经放到 Group 组件中了
		batchDeleteComponent({ currentCompList }, deleteData) {
			deleteData.forEach(component => {
				for (let i = 0, len = currentCompList.length; i < len; i++) {
					if (component.id == currentCompList[i].id) {
						currentCompList.splice(i, 1);
						break;
					}
				}
			});
		},
		// 复制
		copy(state) {
			if (!state.currentComp) {
				Message({
					message: "请先选择画布中的组件！",
					type: "error",
				});
				return;
			}

			state.copyData = tool.deepCopy(state.currentComp);
			state.copyData.id = new Date().getTime();
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

			const data = state.copyData;

			// if (isMouse) {
			// 	data.top = state.menuTop;
			// 	data.left = state.menuLeft;
			// } else {
			// 	data.top += 10;
			// 	data.left += 10;
			// }
			data.style.top += 10;
			data.style.left += 10;
			// data.id = generateID();
			// Group 的子组件根节点的 id 是通过组件的 id 生成的，必须重新生成 id，否则拆分 Group 的时候获取根节点不正确
			// if (data.component === "Group") {
			// 	data.propValue.forEach(component => {
			// 		component.id = generateID();
			// 	});
			// }
			data.style.zIndex = ++state.curComponentIndex + 1;
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

				this.commit("addComponent", { component: data, index });
				if (state.curComponentIndex >= index) {
					// 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
					state.curComponentIndex++;
				}
			}

			this.commit("copy");
			this.commit("deleteComponent");
			state.isCut = true;
		},
		// 锁定
		lock(state) {
			state.currentComp.isLock = true;
			localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
		},
		// 解锁
		unlock(state) {
			state.currentComp.isLock = false;
			localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
		},
		// 重命名
		rename(state, payload) {
			debugger;
			state.currentComp.name = payload;
			localStorage.setItem("currentCompList", JSON.stringify(state.currentCompList));
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
				state.currentCompList.push(state.currentComp);
				tool.resetZindex(state.currentCompList);
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
		bottomComponent(state, payload) {
			if (state.curComponentIndex > 0) {
				state.currentCompList.splice(state.curComponentIndex, 1);
				state.currentCompList.unshift(state.currentComp);
				tool.resetZindex(state.currentCompList);
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
					state.currentComp = null;
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
