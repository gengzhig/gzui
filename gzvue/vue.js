let gz = console.log.bind(document);
import { reactive } from "./reactive.js";
export default class Vue {
	constructor(options) {
		const { data, computed, watch } = options;
		this.$data = data();
		this.init(this, computed, watch);
	}
	init(vm, computed, watch) {
		this.initData(vm);
		const computedIns = this.initComputed(vm, computed);
		const watcherIns = this.initWatcher(vm, watch);
	}
	initData(vm) {
		// 普通数据 => 响应式数据
		reactive(
			vm,
			(key, value) => {
				gz(key, value, "INIT");
			},
			(key, newValue, oldValue) => {
				gz(key, newValue, oldValue, "INIT");
			}
		);
	}
	initComputed(vm, computed) {}
	initWatcher(vm, watch) {}
}
