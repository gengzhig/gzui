const Koa = require("koa"); // 引入 Koa
const app = new Koa(); // 创建 Koa 实例
const bodyParser = require("koa-bodyparser");
const router = require("koa-router")();
const cors = require("koa2-cors");
app.use(cors());
app.use(bodyParser());
router.get("/", async (ctx, next) => {
	ctx.response.body = {
		status: 200,
		msg: "获取组件库",
		data: [123],
	};
});

// 获取组件库
router.post("/api/getLibraryList", async (ctx, next) => {
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
				label: "数据录入",
				subLabel: "日期选择器",
				preview: `() => <gz-date-picker width={"100%"} height={"100%"}></gz-date-picker>`,
				render: `() => <gz-date-picker width={"100%"} height={"100%"}></gz-date-picker>`,
				key: "0006",
				style: {
					width: 420,
					height: 453,
				},
			},
			{
				label: "数据展示",
				subLabel: "table表格",
				preview: () => `<gz-table></gz-table>`,
				render: () => `<gz-table config={config.tableConfig}></gz-table>`,
				key: "0007",
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
				key: "0008",
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
				key: "0009",
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
				key: "0010",
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
				key: "0011",
				style: {
					width: 200,
					height: 200,
				},
			},
		],
	};
});

let compList = [];
// 更新画布组件
router.post("/api/setCompList", async (ctx, next) => {
	if (!ctx.request.body.list) {
		ctx.response.body = {
			status: 500,
			msg: "缺少list传参！",
			data: false,
		};
	} else {
		compList = ctx.request.body.list;
		ctx.response.body = {
			status: 200,
			msg: "更新画布组件成功！",
			data: true,
		};
	}
});

// 获取画布组件
router.post("/api/getCompList", async (ctx, next) => {
	ctx.response.body = {
		status: 200,
		msg: "获取组件数据",
		data: compList,
	};
});

app.use(router.routes());

// 监听 8000 端口

app.listen(8000, () => {
	console.log("8000端口已启动！");
});
