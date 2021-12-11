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
	history: createWebHistory(), // createWebHistory ==> history模式  createWebHashHistory==> hash模式
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
					path: "/home",
					name: "Home",
					meta: {
						title: "设计原则",
						icon: "eleme",
					},
					component: () => import("views/comp/home.vue"),
				},
				{
					path: "/general",
					redirect: "/general/button",
					component: Layout,
					meta: {
						title: "通用",
						icon: "setting",
					},
					children: [
						{
							path: "button",
							name: "Button",
							meta: {
								title: "按钮",
								icon: "s-tools",
							},
							component: () => import("views/comp/custom/button.vue"),
						},
						{
							path: "carousel",
							name: "Carousel",
							meta: {
								title: "轮播图",
								icon: "s-platform",
							},
							component: () => import("views/comp/custom/carousel.vue"),
						},
						{
							path: "ellipsis",
							name: "Ellipsis",
							meta: {
								title: "文本省略",
								icon: "s-platform",
							},
							component: () => import("views/comp/custom/ellipsis.vue"),
						},
						{
							path: "image",
							name: "Image",
							meta: {
								title: "图片",
								icon: "s-platform",
							},
							component: () => import("views/comp/custom/image.vue"),
						},
						{
							path: "gradientText",
							name: "GradientText",
							meta: {
								title: "渐变文字",
								icon: "s-platform",
							},
							component: () => import("views/comp/custom/gradientText.vue"),
						},
					],
				},
				{
					path: "/dataEntry",
					component: Layout,
					redirect: "/dataEntry/input",
					meta: {
						title: "数据录入",
						icon: "download",
					},
					children: [
						{
							path: "input",
							name: "Input",
							meta: {
								title: "输入框",
								icon: "s-order",
							},
							component: () => import("views/comp/custom/input.vue"),
						},
						{
							path: "inputNumber",
							name: "inputNumber",
							meta: {
								title: "数字输入",
								icon: "s-order",
							},
							component: () => import("views/comp/custom/inputNumber.vue"),
						},
						{
							path: "radio",
							name: "Radio",
							meta: {
								title: "单选框",
								icon: "s-order",
							},
							component: () => import("views/comp/custom/radio.vue"),
						},
						{
							path: "checkbox",
							name: "Checkbox",
							meta: {
								title: "复选框",
								icon: "s-order",
							},
							component: () => import("views/comp/custom/checkbox.vue"),
						},
						{
							path: "selector",
							name: "Selector",
							meta: {
								title: "选择器",
								icon: "s-document",
							},
							component: () => import("views/comp/custom/selector.vue"),
						},
						{
							path: "datePicker",
							name: "DatePicker",
							meta: {
								title: "日期选择器",
								icon: "s-document",
							},
							component: () => import("views/comp/custom/datePicker.vue"),
						},
						{
							path: "fiveStar",
							name: "FiveStar",
							meta: {
								title: "五星好评",
								icon: "magic-stick",
							},
							component: () => import("views/comp/custom/fiveStar.vue"),
						},
						{
							path: "switch",
							name: "Switch",
							meta: {
								title: "开关",
								icon: "s-order",
							},
							component: () => import("views/comp/custom/switch.vue"),
						},
						{
							path: "form",
							name: "Form",
							meta: {
								title: "表单",
								icon: "s-order",
							},
							component: () => import("views/comp/custom/form.vue"),
						},
					],
				},
				{
					path: "/dataPresentation",
					name: "DataPresentation",
					redirect: "/dataPresentation/virtualList",
					component: Layout,
					meta: {
						title: "数据展示",
						icon: "mobile",
					},
					children: [
						{
							path: "calendar",
							name: "Calendar",
							meta: {
								title: "日历",
								icon: "document-copy",
							},
							component: () => import("views/comp/custom/calendar.vue"),
						},
						{
							path: "virtualList",
							name: "VirtualList",
							meta: {
								title: "虚拟列表",
								icon: "document-copy",
							},
							component: () => import("views/comp/custom/virtualList.vue"),
						},
						{
							path: "table",
							name: "Table",
							meta: {
								title: "Table表格",
								icon: "tabke-lamp",
							},
							component: () => import("views/comp/custom/table.vue"),
						},
						{
							path: "tree",
							name: "Tree",
							meta: {
								title: "树组件",
								icon: "film",
							},
							component: () => import("views/comp/custom/tree.vue"),
						},
						{
							path: "chart",
							name: "Chart",
							meta: {
								title: "图表",
								icon: "attract",
							},
							component: () => import("views/comp/chart/Base.vue"),
						},
					],
				},
				{
					path: "/nav",
					name: "Nav",
					component: Layout,
					redirect: "/nav/pagination",
					meta: {
						title: "导航",
						icon: "attract",
					},
					children: [
						{
							path: "pagination",
							name: "Pagination",
							meta: {
								title: "分页器",
								icon: "attract",
							},
							component: () => import("views/comp/custom/pagination.vue"),
						},
						{
							path: "tabs",
							name: "Tabs",
							meta: {
								title: "Tabs标签页",
								icon: "attract",
							},
							component: () => import("views/comp/custom/tabs.vue"),
						},
						{
							path: "multiMenu",
							name: "MultiMenu",
							meta: {
								title: "多级菜单",
								icon: "attract",
							},
							component: () => import("views/comp/custom/multiMenu.vue"),
						},
						{
							path: "breadCrumb",
							name: "BreadCrumb",
							meta: {
								title: "面包屑",
								icon: "attract",
							},
							component: () => import("views/comp/custom/breadCrumb.vue"),
						},
					],
				},
				{
					path: "/feedBack",
					name: "FeedBack",
					redirect: "/feedBack/modalBox",
					component: Layout,
					meta: {
						title: "反馈",
						icon: "attract",
					},
					children: [
						{
							path: "modalBox",
							name: "ModalBox",
							meta: {
								title: "模态框",
								icon: "attract",
							},
							component: () => import("views/comp/custom/modalBox.vue"),
						},
						{
							path: "drawer",
							name: "Drawer",
							meta: {
								title: "抽屉",
								icon: "attract",
							},
							component: () => import("views/comp/custom/drawer.vue"),
						},
						{
							path: "loading",
							name: "Loading",
							meta: {
								title: "加载",
								icon: "attract",
							},
							component: () => import("views/comp/custom/loading.vue"),
						},
						{
							path: "message",
							name: "Message",
							meta: {
								title: "Message消息",
								icon: "attract",
							},
							component: () => import("views/comp/custom/message.vue"),
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
		{
			path: "/preview",
			name: "Preview",
			meta: {
				title: "预览区",
			},
			component: () => import("views/comp/editor/preview.vue"),
		},
	],
});
export default router;
