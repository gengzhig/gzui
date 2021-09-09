/*
 * @Author: gz
 * @Date: 2021-07-26 09:45:53
 * @LastEditors: gz
 * @LastEditTime: 2021-09-09 16:22:11
 * @Description: file content
 */

import gzSelector from "./components/Selector/index.vue";
import gzModal from "./components/Modal/index.vue";
import gzFiveStar from "./components/FiveStar/index.vue";
import gzVirtualList from "./components/virtualList/index.vue";
import gzTabs from "./components/Tabs/index.vue";
import gzTable from "./components/Table/index.vue";
import config from "./config.js";

let gzUI = {};
gzUI.install = function (Vue) {
	Vue.component(gzSelector.name, gzSelector);
	Vue.component(gzModal.name, gzModal);
	Vue.component(gzFiveStar.name, gzFiveStar);
	Vue.component(gzVirtualList.name, gzVirtualList);
	Vue.component(gzTabs.name, gzTabs);
	Vue.component(gzTable.name, gzTable);
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
	label: "五星好评",
	preview: () => <gzFiveStar num={3} size={20} highColor="orange"></gzFiveStar>,
	render: () => <gzFiveStar num={3} size={20} highColor="orange"></gzFiveStar>,
	key: "0001",
});

compInfo.register({
	label: "tabs标签页",
	preview: () => <gz-tabs></gz-tabs>,
	render: () => (
		<gz-tabs activeName={config.activeName} width={400} height={200} headerHeight={60}>
			<div label="用户管理" name="first" class="tab-pane">
				111
			</div>
			<div label="配置管理" name="second" class="tab-pane">
				222
			</div>
			<div label="角色管理" name="third" class="tab-pane">
				333
			</div>
		</gz-tabs>
	),

	key: "0002",
});

compInfo.register({
	label: "虚拟列表",
	preview: () => <gz-virtual-list width={300} height={200} itemHeight={30}></gz-virtual-list>,
	render: () => <gz-virtual-list width={300} height={200} data={config.virtualData} itemHeight={30}></gz-virtual-list>,
	key: "0003",
});

compInfo.register({
	label: "模态框",
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
	key: "0004",
});

compInfo.register({
	label: "下拉菜单",
	preview: () => <gz-selector placeholder="请选择"></gz-selector>,
	render: () => <gz-selector placeholder="请选择"></gz-selector>,
	key: "0005",
});

compInfo.register({
	label: "表格",
	preview: () => <gz-table></gz-table>,
	render: () => <gz-table config={config.tableConfig}></gz-table>,
	key: "0006",
});

export default { gzUI, compInfo };
