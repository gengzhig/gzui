/*
 * @Author: gz
 * @Date: 2021-09-09 10:46:26
 * @LastEditors: gz
 * @LastEditTime: 2021-09-10 12:10:21
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\config.js
 */
let virtualResult = [];
for (let i = 1; i <= 2000; i++) {
	virtualResult.push({
		title: i,
		desc: "说明：这是第" + i + "个虚拟列表",
	});
}

let config = {
	activeName: "first",
	virtualData: virtualResult,
	tableConfig: {
		style: {
			stripe: true,
			border: true,
			height: 300,
			index: false,
			radio: false,
			checkBox: false,
		},
		defaultSort: {
			prop: "phone",
			order: "descending", // ascending 表示升序，descending 表示降序，null 表示还原为原始顺序
		},
		columnData: [
			{
				prop: "name",
				label: "名称",
				minWidth: 200,
				tooltip: true,
				formatter: (row, column) => {
					return row.name;
				},
			},
			{
				prop: "address",
				label: "地址",
				width: 200,
				tooltip: true,
			},
			{
				prop: "phone",
				label: "手机",
				width: 200,
				tooltip: true,
				sort: true,
				template: "selectPhone",
			},
			{
				prop: "isbn",
				label: "ISBN",
				width: 200,
				tooltip: true,
				sort: true,
			},
			{
				prop: "publish",
				label: "出版社",
				width: 150,
				tooltip: true,
				sort: true,
			},
		],
		tableData: [
			{
				name: "webwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebwebweb",
				address: "陕西宝鸡",
				phone: 18829290520,
				isbn: "123456789",
				publish: "北师大",
			},
			{
				name: "map",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
			},
		],
	},
	pagination: {
		total: 51,
		defaultLimit: "10条/页",
		defaultLimitData: [
			{
				id: 1,
				value: "10",
				text: "10条/页",
			},
			{
				id: 2,
				value: "20",
				text: "20条/页",
			},
			{
				id: 3,
				value: "50",
				text: "50条/页",
			},
			{
				id: 4,
				value: "100",
				text: "100条/页",
			},
		],
	},
};

export default config;
