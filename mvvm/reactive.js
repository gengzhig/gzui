// export function reactive(origin) {
// 	origin = new Proxy(origin, {
// 		get(target, key) {
// 			console.log(2, "reactive");
// 			return Reflect.get(target, key);
// 		},
// 		set(target, key, value) {
// 			console.log(1, "reactive");
// 			return Reflect.set(target, key, value);
// 		},
// 	});
// 	console.log(origin);
// 	return origin;
// }
export class Reactive {
	constructor(origin) {
		this.origin = origin;
		this.initData();
	}
	initData() {
		this.origin = new Proxy(this.origin, {
			get(target, key) {
				console.log(2, "reactive");
				return Reflect.get(target, key);
			},
			set(target, key, value) {
				console.log(1, "reactive");
				return Reflect.set(target, key, value);
			},
		});
	}
}
