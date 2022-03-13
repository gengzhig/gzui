// 扁平化需要渲染的数据
export const flatTreeData = data => {
	return data.reduce((acc, item) => (item.open ? acc.concat(item, flatTreeData(item.children)) : acc.concat(item)), []);
};
