// 点选高亮功能
// class类名
// "active"||""||禁用节点"disabled"
// 高亮
export const highLight = (item, e) => {
	let targetClass = e.target.getAttribute("class");
	let dom = null;
	dom = targetClass.includes("tree-row") ? e.target : e.target.parentNode
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
