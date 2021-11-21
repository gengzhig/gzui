import { createVNode, render } from "vue";
import messageVue from "./index.vue";
let instances = [];
function gzMessage(options) {
	if (typeof options == "string") {
		options = {
			message: options,
		};
	}
	let userClose = options.onClose;
	let opts = {
		id: "mes" + new Date().getTime(),
		...options,
		onClose: () => {
			console.log("dom移除");
			userClose?.();
		},
	};
	opts.offset = (instances.length + 1) * 50;
	console.log(opts.offset, ":opts");
	const container = document.createElement("div");
	const vm = createVNode(messageVue, opts);
	// vm.props.onDestroy = () => {
	// 	// render(null, container);
	// 	let ms = document.querySelectorAll(".gzMessage");

	// 	console.log(ms);
	// 	document.body.removeChild(ms[ms.length - 1]);
	// };
	render(vm, container);
	// 将渲染的结果放到body下
	document.body.appendChild(container.firstElementChild);

	instances.push(vm);
}
export { gzMessage };
