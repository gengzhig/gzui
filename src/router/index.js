/*
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-09-10 16:02:30
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
				title: "首页",
			},
			redirect: "/home",
			children: [
				{
					path: "home",
					name: "Home",
					meta: {
						title: "设计原则",
					},
					component: () => import("views/comp/home.vue"),
				},
				{
					path: "general",
					name: "General",
					redirect: "/general/button",
					meta: {
						title: "通用组件",
					},
					children: [
						{
							path: "/button",
							name: "Button",
							meta: {
								title: "按钮",
							},
							component: () => import("views/comp/custom/button.vue"),
						},
						{
							path: "carousel",
							name: "Carousel",
							meta: {
								title: "轮播图",
							},
							component: () => import("views/comp/custom/carousel.vue"),
						},
					],
				},
				{
					path: "dataEntry",
					name: "DataEntry",
					meta: {
						title: "数据录入组件",
					},
					children: [
						{
							path: "input",
							name: "Input",
							meta: {
								title: "输入框",
							},
							component: () => import("views/comp/custom/input.vue"),
						},
						{
							path: "selector",
							name: "Selector",
							meta: {
								title: "下拉菜单",
							},
							component: () => import("views/comp/custom/selector.vue"),
						},
						{
							path: "fiveStar",
							name: "FiveStar",
							meta: {
								title: "五星好评",
							},
							component: () => import("views/comp/custom/fiveStar.vue"),
						},
					],
				},
				{
					path: "dataPresentation",
					name: "DataPresentation",
					meta: {
						title: "数据展示组件",
					},
					children: [
						{
							path: "virtualList",
							name: "VirtualList",
							meta: {
								title: "虚拟列表",
							},
							component: () => import("views/comp/custom/virtualList.vue"),
						},
						{
							path: "table",
							name: "Table",
							meta: {
								title: "Table表格",
							},
							component: () => import("views/comp/custom/table.vue"),
						},
						{
							path: "tree",
							name: "Tree",
							meta: {
								title: "树组件",
							},
							component: () => import("views/comp/custom/tree.vue"),
						},
						{
							path: "chart",
							name: "Chart",
							meta: {
								title: "图表",
							},
							component: () => import("views/comp/chart/Base.vue"),
						},
					],
				},
				{
					path: "nav",
					name: "Nav",
					meta: {
						title: "导航组件",
					},
					children: [
						{
							path: "pagination",
							name: "Pagination",
							meta: {
								title: "分页器",
							},
							component: () => import("views/comp/custom/pagination.vue"),
						},
						{
							path: "tabs",
							name: "Tabs",
							meta: {
								title: "Tabs标签页",
							},
							component: () => import("views/comp/custom/tabs.vue"),
						},
						{
							path: "multiMenu",
							name: "MultiMenu",
							meta: {
								title: "多级菜单",
							},
							component: () => import("views/comp/custom/multiMenu.vue"),
						},
					],
				},
				{
					path: "feedBack",
					name: "FeedBack",
					meta: {
						title: "反馈组件",
					},
					children: [
						{
							path: "modalBox",
							name: "ModalBox",
							meta: {
								title: "模态框",
							},
							component: () => import("views/comp/custom/modalBox.vue"),
						},
					],
				},
			],
		},
		{
			path: "/editor",
			name: "Editor",
			meta: {
				title: "编辑区",
			},
			component: () => import("views/comp/editor/index.vue"),
		},
	],
});
export default router;
// export const constantRoutes = [
// 	{
// 		path: "/",
// 		component: Layout,
// 		redirect: "/dashboard",
// 		children: [
// 			{
// 				path: "dashboard",
// 				component: () => import("@/views/dashboard/index"),
// 				name: "Dashboard",
// 				meta: { title: "Dashboard", icon: "dashboard", affix: true },
// 			},
// 		],
// 	},
// 	{
// 		path: "/documentation",
// 		component: Layout,
// 		children: [
// 			{
// 				path: "index",
// 				component: () => import("@/views/documentation/index"),
// 				name: "Documentation",
// 				meta: { title: "Documentation", icon: "documentation", affix: true },
// 			},
// 		],
// 	},
// ];
