/*
 * @Author: gz
 * @Date: 2021-07-26 09:45:53
 * @LastEditors: gz
 * @LastEditTime: 2021-08-03 09:35:28
 * @Description: file content
 */

import gzSelector from "./components/Selector/index.vue";
import gzModal from "./components/Modal/index.vue";
import gzFiveStar from "./components/FiveStar/index.vue";
import gzVirtualList from "./components/virtualList/index.vue";
import gzTabs from "./components/Tabs/index.vue";
import gzTable from "./components/Table/index.vue";

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

// compInfo.register({
// 	label: "模态框",
// 	preview: () => (
// 		<gz-modal
// 			show={true}
// 			width={400}
// 			borderRadius={1}
// 			headerTitle="新增"
// 			headerTitleColor="#fff"
// 			headerTitleBackground="#2ed573"
// 			showBtnGroup={true}
// 			cancelText="取消"
// 			confirmText="确定"
// 		>
// 			中间内容
// 		</gz-modal>
// 	),
// 	render: () => (
// 		<gz-modal
// 			show={true}
// 			width={400}
// 			borderRadius={1}
// 			headerTitle="新增"
// 			headerTitleColor="#fff"
// 			headerTitleBackground="#2ed573"
// 			showBtnGroup={true}
// 			cancelText="取消"
// 			confirmText="确定"
// 		>
// 			中间内容
// 		</gz-modal>
// 	),
// 	key: "0002",
// });

compInfo.register({
	label: "下拉菜单",
	preview: () => <gz-selector placeholder="请选择"></gz-selector>,
	render: () => <gz-selector placeholder="请选择"></gz-selector>,
	key: "0003",
});

// for (const [key, value] of reg.compMapList) {
// 	console.log(value);
// }
// export default { gzUI, reg };
export { gzUI, compInfo };
