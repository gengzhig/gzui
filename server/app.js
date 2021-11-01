const Koa = require("koa"); // 引入 Koa
const app = new Koa(); // 创建 Koa 实例
const router = require("koa-router")();
const cors = require("koa2-cors");
app.use(cors());

router.get("/a", async (ctx, next) => {
	console.log(1231);
	ctx.response.body = "<p>Hello Koa Server!</p>";
});

// 获取组件库
router.post("/getLibraryList", async (ctx, next) => {
	ctx.response.body = {
		status: 200,
		msg: "获取组件库",
		data: [
			{
				label: "数据录入",
				subLabel: "五星好评",
				preview: '() => <gzFiveStar num={3} size={20} highColor="orange"></gzFiveStar>',
				render: '() => <gzFiveStar width={"100%"} height={"100%"} num={3} size={20} highColor="orange"></gzFiveStar>',
				key: "0001",
				style: {
					width: 150,
					height: 26,
				},
			},
			{
				label: "导航",
				subLabel: "tabs标签页",
				preview: "() => <gz-tabs></gz-tabs>",
				render: `() => (
					<gz-tabs width={"100%"} height={"100%"} activeName={config.activeName} headerHeight={60}>
						{config.tabsData.map((item, index) => {
							return (
								<gz-tabs-pane key={index} label={item.label} name={item.name} class="tab-pane">
									{item.content}
								</gz-tabs-pane>
							);
						})}
					</gz-tabs>)`,
				key: "0002",
				style: {
					width: 400,
					height: 200,
				},
			},
			{
				label: "数据展示",
				subLabel: "虚拟列表",
				preview: `() => <gz-virtual-list width={300} height={200} itemHeight={30}></gz-virtual-list>`,
				render: `() => (
					<gz-virtual-list width={"100%"} height={"100%"} data={config.virtualData} itemHeight={30}></gz-virtual-list>
				)`,
				key: "0003",
				style: {
					width: 300,
					height: 200,
				},
			},
			{
				label: "反馈",
				subLabel: "模态框",
				preview: `() => (
					<gz-modal
						show={true}
						width={400}
						borderRadius={1}
						headerTitle="新增"
						headerTitleColor="#fff"
						headerTitleBackground="#2ed573"
						showBtnGroup={true}
						cancelText="取消"
						confirmText="确定"
					>
						中间内容
					</gz-modal>
				)`,
				render: `() => (
					<gz-modal
						show={true}
						width={"100%"}
						height={"100%"}
						borderRadius={1}
						headerTitle="新增"
						headerTitleColor="#fff"
						headerTitleBackground="#2ed573"
						showBtnGroup={true}
						cancelText="取消"
						confirmText="确定"
					>
						中间内容
					</gz-modal>
				)`,
				key: "0004",
				style: {
					width: 400,
					height: 200,
				},
			},
			{
				label: "数据录入",
				subLabel: "选择器",
				preview: `() => <gz-selector placeholder="请选择"></gz-selector>`,
				render: `() => <gz-selector width={"100%"} height={"100%"} placeholder="请选择"></gz-selector>`,
				key: "0005",
				style: {
					width: 200,
					height: 40,
				},
			},
			{
				label: "数据展示",
				subLabel: "table表格",
				preview: () => `<gz-table></gz-table>`,
				render: () => `<gz-table config={config.tableConfig}></gz-table>`,
				key: "0006",
				style: {
					width: 800,
					height: 250,
				},
			},
			{
				label: "导航",
				subLabel: "分页器",
				preview: `() => <gz-pagination></gz-pagination>`,
				render: `() => (
					<gz-pagination
						showTotal={true}
						showLimit={true}
						total={config.pagination.total}
						defaultLimit={config.pagination.defaultLimit}
						defaultLimitData={config.pagination.defaultLimitData}
					></gz-pagination>
				)`,
				key: "0007",
				style: {
					width: 500,
					height: 50,
				},
			},
			{
				label: "通用",
				subLabel: "按钮",
				preview: `() => <gz-button type="primary">按钮</gz-button>`,
				render: `() => (
					<gz-button width={"100%"} height={"100%"} type="primary">
						按钮
					</gz-button>
				)`,
				key: "0008",
				style: {
					width: 70,
					height: 40,
				},
			},
			{
				label: "通用",
				subLabel: "轮播图",
				preview: `() => (
					<gz-carousel
						dotBgColor="#333"
						imgFit="cover"
						autoplay={true}
						duration={2000}
						initial={0}
						hasDot={true}
						hasDirector={true}
						width={"100%"}
						height={"100%"}
					>
						<gz-carousel-item v-for="(item, index) in config.carousel.cData" key={index}>
							<img src={item.src} />
						</gz-carousel-item>
					</gz-carousel>
				)`,
				render: `() => (
					<gz-carousel
						width={"100%"}
						height={"100%"}
						dotBgColor="#333"
						imgFit="cover"
						autoplay={true}
						duration={2000}
						initial={0}
						hasDot={true}
						hasDirector={true}
					>
						{config.carousel.cData.map((item, index) => {
							return (
								<gz-carousel-item key={index}>
									<img src={item.src} />
								</gz-carousel-item>
							);
						})}
					</gz-carousel>
				)`,
				key: "0009",
				style: {
					width: 600,
					height: 300,
				},
			},
			{
				label: "通用",
				subLabel: "图片",
				preview: `() => <gz-image width={150} height={150} src={config.image.src} fit="fill" alt="state.alt"></gz-image>`,
				render: `() => (
					<gz-image
						width={config.image.width}
						height={config.image.height}
						src={config.image.src}
						fit="fill"
						alt="state.alt"
					></gz-image>
				)`,
				key: "0010",
				style: {
					width: 200,
					height: 200,
				},
			},
		],
	};
});

// 获取组件数据
router.post("/getCompList", async (ctx, next) => {
	ctx.response.body = {
		status: 200,
		msg: "获取组件数据",
		data: [
			{
				id: 1635758098912,
				name: "五星好评",
				key: "0001",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 150, height: 26, zIndex: 1, opacity: 100, rotate: 0, animationGroup: [] },
			},
			{
				id: 1635757805065,
				name: "tabs标签页",
				key: "0002",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 400, height: 200, zIndex: 1, opacity: 100, rotate: 0, animationGroup: [] },
			},
			{
				id: 1635758160495,
				name: "虚拟列表",
				key: "0003",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 300, height: 200, zIndex: 1, opacity: 100, rotate: 0, animationGroup: [] },
			},
			{
				id: 1635758179447,
				name: "模态框",
				key: "0004",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 400, height: 200, zIndex: 1, opacity: 100, rotate: 0, animationGroup: [] },
			},
			{
				id: 1635758208825,
				name: "选择器",
				key: "0005",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 200, height: 40, zIndex: 1, opacity: 100, rotate: 0, animationGroup: [] },
			},
			{
				id: 1635758227368,
				name: "table表格",
				key: "0006",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 800, height: 250, zIndex: 1, opacity: 100, rotate: 0, animationGroup: [] },
			},
			{
				id: 1635758228929,
				name: "分页器",
				key: "0007",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 500, height: 50, zIndex: 1, opacity: 100, rotate: 0 },
			},
			{
				id: 1635758280647,
				name: "按钮",
				key: "0008",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 70, height: 40, zIndex: 1, opacity: 100, rotate: 0, animationGroup: [] },
			},
			{
				id: 1635758291479,
				name: "轮播图",
				key: "0009",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 600, height: 300, zIndex: 1, opacity: 100, rotate: 0 },
			},
			{
				id: 1635758311255,
				name: "图片",
				key: "0010",
				isLock: false,
				isHide: false,
				isGroup: false,
				animations: [],
				events: {},
				groupStyle: {},
				group: [],
				style: { top: 0, left: 0, width: 200, height: 200, zIndex: 1, opacity: 100, rotate: 0 },
			},
		],
	};
});

app.use(router.routes());

// 监听 8000 端口

app.listen(8000, () => {
	console.log("8000端口已启动！");
});
