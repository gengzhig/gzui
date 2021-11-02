/*
 * @Author: gz
 * @Date: 2021-07-26 09:45:53
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 16:05:17
 * @Description: file content
 */

import gzButton from "./components/Button/index.vue";
import gzSelector from "./components/Selector/index.vue";
import gzModal from "./components/Modal/index.vue";
import gzFiveStar from "./components/FiveStar/index.vue";
import gzVirtualList from "./components/virtualList/index.vue";
import gzTabs from "./components/Tabs/index.vue";
import gzTabsPane from "./components/Tabs/pane.vue";
import gzTable from "./components/Table/index.vue";
import gzPagination from "./components/Pagination/index.vue";
import gzInput from "./components/Input/index.vue";
import gzTree from "./components/Tree/index.vue";
import gzCarousel from "./components/Carousel/index.vue";
import gzCarouselItem from "./components/Carousel/item.vue";
import gzEllipsis from "./components/Ellipsis/index.vue";
import gzImage from "./components/Image/index.vue";
import gzGradientText from "./components/GradientText/index.vue";
import config from "./config.js";

let gzUI = {};
gzUI.install = function (Vue) {
	Vue.component(gzSelector.name, gzSelector);
	Vue.component(gzModal.name, gzModal);
	Vue.component(gzFiveStar.name, gzFiveStar);
	Vue.component(gzVirtualList.name, gzVirtualList);
	Vue.component(gzTabs.name, gzTabs);
	Vue.component(gzTabsPane.name, gzTabsPane);
	Vue.component(gzTable.name, gzTable);
	Vue.component(gzPagination.name, gzPagination);
	Vue.component(gzInput.name, gzInput);
	Vue.component(gzTree.name, gzTree);
	Vue.component(gzCarousel.name, gzCarousel);
	Vue.component(gzCarouselItem.name, gzCarouselItem);
	Vue.component(gzButton.name, gzButton);
	Vue.component(gzEllipsis.name, gzEllipsis);
	Vue.component(gzImage.name, gzImage);
	Vue.component(gzGradientText.name, gzGradientText);
};

function compSign() {
	let compList = [];
	let compMapList = new Map();
	return {
		compList,
		compMapList,
		register(comp) {
			compList.push(comp);
			compMapList.set(comp.key, comp);
		},
	};
}

let compInfo = compSign();

compInfo.register({
	label: "数据录入",
	subLabel: "五星好评",
	preview: () => <gzFiveStar num={3} size={20} highColor="orange"></gzFiveStar>,
	render: () => <gzFiveStar width={"100%"} height={"100%"} num={3} size={20} highColor="orange"></gzFiveStar>,
	key: "0001",
	style: {
		width: 150,
		height: 26,
	},
});

compInfo.register({
	label: "导航",
	subLabel: "tabs标签页",
	preview: () => <gz-tabs></gz-tabs>,
	render: () => (
		<gz-tabs width={"100%"} height={"100%"} activeName={config.activeName} headerHeight={60}>
			{config.tabsData.map((item, index) => {
				return (
					<gz-tabs-pane key={index} label={item.label} name={item.name} class="tab-pane">
						{item.content}
					</gz-tabs-pane>
				);
			})}
		</gz-tabs>
	),
	key: "0002",
	style: {
		width: 400,
		height: 200,
	},
});

compInfo.register({
	label: "数据展示",
	subLabel: "虚拟列表",
	preview: () => <gz-virtual-list width={300} height={200} itemHeight={30}></gz-virtual-list>,
	render: () => (
		<gz-virtual-list width={"100%"} height={"100%"} data={config.virtualData} itemHeight={30}></gz-virtual-list>
	),
	key: "0003",
	style: {
		width: 300,
		height: 200,
	},
});

compInfo.register({
	label: "反馈",
	subLabel: "模态框",
	preview: () => (
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
	),
	render: () => (
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
	),
	key: "0004",
	style: {
		width: 400,
		height: 200,
	},
});

compInfo.register({
	label: "数据录入",
	subLabel: "选择器",
	preview: () => <gz-selector placeholder="请选择"></gz-selector>,
	render: () => <gz-selector width={"100%"} height={"100%"} placeholder="请选择"></gz-selector>,
	key: "0005",
	style: {
		width: 200,
		height: 40,
	},
});

compInfo.register({
	label: "数据展示",
	subLabel: "table表格",
	preview: () => <gz-table></gz-table>,
	render: () => <gz-table config={config.tableConfig}></gz-table>,
	key: "0006",
	style: {
		width: 800,
		height: 250,
	},
});

compInfo.register({
	label: "导航",
	subLabel: "分页器",
	preview: () => <gz-pagination></gz-pagination>,
	render: () => (
		<gz-pagination
			showTotal={true}
			showLimit={true}
			total={config.pagination.total}
			defaultLimit={config.pagination.defaultLimit}
			defaultLimitData={config.pagination.defaultLimitData}
		></gz-pagination>
	),
	key: "0007",
	style: {
		width: 500,
		height: 50,
	},
});

compInfo.register({
	label: "通用",
	subLabel: "按钮",
	preview: () => <gz-button type="primary">按钮</gz-button>,
	render: () => (
		<gz-button width={"100%"} height={"100%"} type="primary">
			按钮
		</gz-button>
	),
	key: "0008",
	style: {
		width: 70,
		height: 40,
	},
});

compInfo.register({
	label: "通用",
	subLabel: "轮播图",
	preview: () => (
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
	),
	render: () => (
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
	),
	key: "0009",
	style: {
		width: 600,
		height: 300,
	},
});

compInfo.register({
	label: "通用",
	subLabel: "图片",
	preview: () => <gz-image width={150} height={150} src={config.image.src} fit="fill" alt="state.alt"></gz-image>,
	render: () => (
		<gz-image
			width={config.image.width}
			height={config.image.height}
			src={config.image.src}
			fit="fill"
			alt="state.alt"
		></gz-image>
	),
	key: "0010",
	style: {
		width: 200,
		height: 200,
	},
});
export default { gzUI, compInfo };
