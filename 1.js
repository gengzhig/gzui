/*
 * @Author: gz
 * @Date: 2021-08-27 09:48:06
 * @LastEditors: gz
 * @LastEditTime: 2021-08-27 16:02:15
 * @Description: file content
 * @FilePath: \gi-ui\1.js
 */
class MVVM {
	constructor(el, data) {
		this.el = document.querySelector(el);
		this._data = data;
		this.domPool = {};
		this.init();
	}
	init() {
		this.initData();
		this.initDom();
	}
	initDom() {
		this.bindDom(this.el);
		this.bindInput(this.el);
	}
	initData() {
		const that = this;
		this.data = {};
		for (let key in this._data) {
			Object.defineProperty(this.data, key, {
				get() {
					console.log("获取数据", key + ":" + that._data[key]);
					return that._data[key];
				},
				set(newValue) {
					if (that._data[key] != newValue) {
						that.domPool[key].innerText = newValue;
						that._data[key] = newValue;
						console.log("设置数据", key + ":" + that._data[key]);
					}
				},
			});
		}
	}
	bindDom(el) {
		const childNodes = el.childNodes;
		childNodes.forEach(item => {
			if (item.nodeType == 3) {
				const _value = item.nodeValue;
				if (_value.trim().length) {
					// 找到匹配{{ }}的
					let _isValid = /\{\{(.+?)\}\}/.test(_value);
					if (_isValid) {
						const _key = _value.match(/\{\{(.+?)\}\}/)[1].trim();
						this.domPool[_key] = item.parentNode;
						item.parentNode.innerText = this.data[_key];
					}
				}
			}
			item.childNodes && this.bindDom(item);
		});
	}
	bindInput(el) {
		const _allInputs = el.querySelectorAll("input");
		_allInputs.forEach(input => {
			const _vModel = input.getAttribute("v-model");
			if (_vModel) {
				input.addEventListener("keyup", this.handleInput.bind(this, _vModel, input), false);
			}
		});
	}
	handleInput(key, value) {
		const _value = value.value;
		this.data[key] = _value;
	}
}
