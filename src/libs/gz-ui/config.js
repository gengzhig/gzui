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
		maxHeight: 500,
		headerStyle: {
			color: "#fff",
		},
		pagination: true,
		// type:0 一般列 1：索引列 2：扩展列
		columnData: [
			{
				prop: "index",
				label: "序号",
				minWidth: 100,
				fixed: true,
				type: 0,
			},
			{
				prop: "name",
				label: "名称",
				minWidth: 200,
				fixed: false,
				type: 1,
			},
			{
				prop: "address",
				label: "地址",
				minWidth: 200,
				fixed: false,
				type: 1,
			},
			{
				prop: "phone",
				label: "手机",
				minWidth: 200,
				fixed: false,
				type: 1,
			},
			{
				prop: "isbn",
				label: "ISBN",
				minWidth: 200,
				fixed: false,
				type: 1,
			},
			{
				prop: "publish",
				label: "出版社",
				minWidth: 150,
				fixed: false,
				type: 1,
			},
			{
				prop: "operate",
				label: "操作",
				minWidth: 300,
				fixed: true,
				type: 2,
			},
		],
		tableData: [
			{
				name: "html",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit"],
			},
			{
				name: "css",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "js",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "node",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "web",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
			},
			{
				name: "map",
				address: "北京大学",
				phone: 1234234234,
				isbn: "234234234",
				publish: "北师大",
				operate: ["edit", "del"],
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
