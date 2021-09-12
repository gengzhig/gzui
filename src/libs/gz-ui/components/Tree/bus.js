class Bus {
	constructor() {
		this.list = {};
	}
	$on(name, fn) {
		this.list[name] = this.list[name] || [];
		this.list[name].push(fn);
	}
	$emit(name, data) {
		if (this.list[name]) {
			this.list[name].forEach(fn => {
				fn(data);
			});
		}
	}
	$off(name) {
		if (this.list[name]) {
			delete this.list[name];
		}
	}
}

export default Bus;
