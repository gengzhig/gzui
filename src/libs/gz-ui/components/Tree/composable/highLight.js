// 点选高亮功能
// class类名
// "active"||""||禁用节点"disabled"
// 高亮
export const highLight = (item, e, cb) => {
	if (item.toggleDisabled) return;
	if (!e.target) return;
	let targetClass = e.target.getAttribute("class");
	let dom = null;
	// 拦截复选框点击事件
	if (!targetClass) return;
	if (targetClass.includes("tree-checkbox")) return;
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
			dom = e.target.parentNode;
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
		if (classList) {
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
	}
	if (!item.children) {
		cb(dom.getAttribute("class").includes("active"));
	}
};

// 查找所有兄弟元素
const findSiblings = tag => {
	let parentEl = tag.parentNode;
	let children = parentEl.children;
	let siblings = [];
	for (let i = 0; i < children.length; i++) {
		if (tag != children[i]) {
			siblings.push(children[i]);
		}
	}
	return siblings;
};
