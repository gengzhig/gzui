class Vue {
	constructor(el, data) {
		this.el = document.querySelector(el);
		this.data = data;
		this.domPool = {};
		this.showPool = new Map(); // v-if,v-show
		this.init();
	}
	init() {
		this.initData();
		this.initDom();
	}
	initDom() {
		this.bindDom(this.el);
		this.bindInput(this.el);
		this.initView(this.showPool);
	}
	initData() {
		let that = this;
		that.data = new Proxy(that.data, {
			get(target, key) {
				return Reflect.get(target, key);
			},
			set(target, key, value) {
				that.domPool[key].innerHTML = value;
				return Reflect.set(target, key, value);
			},
		});
	}
	bindInput(el) {
		const inputAll = el.querySelectorAll("input");
		inputAll.forEach(input => {
			let vmodel = input.getAttribute("v-model");
			if (vmodel) {
				input.addEventListener("keyup", this.handleInput.bind(this, vmodel, input), false);
			}
		});
	}
	handleInput(key, input) {
		let inputValue = input.value;
		this.data[key] = inputValue;
	}
	bindDom(el) {
		let childNodes = el.childNodes;
		childNodes.forEach(item => {
			// 文本节点 {{xxx}}
			if (item.nodeType == 3) {
				let value = item.nodeValue;
				if (value.trim().length) {
					let valid = /\{\{(.+?)\}\}/.test(value.trim());
					if (valid) {
						let _key = value.match(/\{\{(.+?)\}\}/)[1].trim();
						this.domPool[_key] = item.parentNode;
						item.parentNode.innerHTML = this.data[_key] || undefined;
					}
				}
			}
			// 标签节点 <div></div>
			if (item.nodeType === 1) {
				let vIf = item.getAttribute("v-if");
				let vShow = item.getAttribute("v-show");
				if (vIf) {
					this.showPool.set(item, {
						type: "if",
						show: this.data[vIf],
						data: vIf,
					});
				}
				if (vShow) {
					this.showPool.set(item, {
						type: "show",
						show: this.data[vShow],
						data: vShow,
					});
				}
			}
			item.childNodes && this.bindDom(item);
		});
	}
	initView(showPool) {
		for (const [k, v] of showPool) {
			console.log(k, v);
			switch (v.type) {
				case "if":
					v.comment = document.createComment("v-if");
					!v.show && k.parentNode.replaceChild(v.comment, k);
					break;
				case "show":
					!v.show && (k.style.display = "none");
					break;
				default:
					break;
			}
		}
	}
}
