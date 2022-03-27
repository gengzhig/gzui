import demoblock from "vitepress-theme-demoblock";
module.exports = {
	title: "gzUI组件库", // 网站标题
	description: "gzUI组件库博客.", //网站描述
	base: "/", //  部署时的路径 默认 /  可以使用二级地址 /base/
	// lang: 'en-US', //语言
	repo: "vuejs/vitepress",
	head: [
		// 改变title的图标
		[
			"link",
			{
				rel: "icon",
				href: "/img/linktolink.png", //图片放在public文件夹下
			},
		],
	],
	// 主题配置
	themeConfig: {
		//   头部导航
		nav: [
			{ text: "首页", link: "/" },
			// { text: "关于", link: "/about/" },
		],
		//   侧边导航
		sidebar: [
			{
				text: "布局",
				children: [
					{ text: "栅格", link: "/components/grid/" },
				],
			},
			{
				text: "通用",
				children: [
					{ text: "按钮", link: "/components/button/" },
					{ text: "分割线", link: "/components/button/" },
					{ text: "轮播图", link: "/components/carousel/" },
					{ text: "文本省略", link: "/components/ellipsis/" },
					{ text: "图片", link: "/components/image/" },
					{ text: "渐变文字", link: "/components/image/" },
				],
			},
			{
				text: "数据录入",
				children: [
					{ text: "输入框", link: "/components/input/" },
					{ text: "数字输入", link: "/components/input/" },
					{ text: "单选框", link: "/components/input/" },
					{ text: "复选框", link: "/components/input/" },
					{ text: "选择器", link: "/components/selector/" },
					{ text: "日期选择器", link: "/components/selector/" },
					{ text: "五星好评", link: "/components/fiveStar/" },
					{ text: "开关", link: "/components/fiveStar/" },
					{ text: "表单", link: "/components/fiveStar/" },
				],
			},
			{
				text: "数据展示",
				children: [
					{ text: "日历", link: "/components/virtualList/" },
					{ text: "虚拟列表", link: "/components/virtualList/" },
					{ text: "Tableb表格", link: "/components/table/" },
					{ text: "树组件", link: "/components/tree/" },
					{ text: "图表", link: "/components/chart/" },
				],
			},
			{
				text: "导航",
				children: [
					{ text: "分页器", link: "/components/pagination/" },
					{ text: "Tabs标签页", link: "/components/tabs/" },
					{ text: "多级菜单", link: "/components/pagination/" },
					{ text: "面包屑", link: "/components/tabs/" },
				],
			},
			{
				text: "反馈",
				children: [
					{ text: "模态框", link: "/components/modalBox/" },
					{ text: "抽屉", link: "/components/modalBox/" },
					{ text: "加载", link: "/components/modalBox/" },
					{ text: "Message消息", link: "/components/modalBox/" }
				],
			},
		],
	},
	markdown: {
		config: md => {
			const { demoBlockPlugin } = require("vitepress-theme-demoblock");
			md.use(demoBlockPlugin);
		},
	},
};
