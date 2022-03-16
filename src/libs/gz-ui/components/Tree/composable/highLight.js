// 点选高亮功能
// class类名
// "active"||""||禁用节点"disabled"
// 高亮
export const highLight = (item, e, cb) => {
	let targetClass = e.target.getAttribute("class");
	let dom = null;
	switch (targetClass) {
		// 节点数量
		case "tree-node-count":
			dom = e.target.parentNode.parentNode;
			break;
		// 行 空白
		case "tree-node":
			dom = e.target.parentNode;
			break;
		// icon
		case "tree-icon":
			return;
			break;
		// label
		default:
			dom = e.target;
			break;
	}
	if (dom) {
		let siblingDom = findSiblings(dom);
		siblingDom.forEach(node => {
			node.classList.remove("active");
		});
		let classList = dom.getAttribute("class");
		if (classList.includes("toggle-disabled")) {
			return;
		} else {
			if (classList.includes("active")) {
				dom.classList.remove("active");
			} else {
				dom.classList.add("active");
			}
		}
	}
	console.log(item);
	cb(dom.getAttribute("class").includes("active"));
};

// 查找所有兄弟元素
const findSiblings = tag => {
	let parentEl = tag.parentNode;
	let childs = parentEl.children;
	let siblings = [];
	for (let i = 0; i < childs.length; i++) {
		if (tag != childs[i]) {
			siblings.push(childs[i]);
		}
	}
	return siblings;
};
