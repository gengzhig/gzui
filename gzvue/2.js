import Vue from "./vue.js";
let gz = console.log.bind(document);
let vm = new Vue({
	data() {
		return {
			a: 1,
			b: 2,
		};
	},
});
gz(vm.a);
vm.a = 100;
gz(vm.a);
