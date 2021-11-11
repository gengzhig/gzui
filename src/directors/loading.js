export default {
	mounted(el, options) {
		if (!options.value && typeof options.value !== "boolean") {
			throw new Error("使用方式有误！缺少参数！");
		}
		let full = options.value?.full ?? false;
		let theme = options.value?.theme || "dark";
		let loading = options.value === false ? false : options.value?.loading ?? true;
		let tips = options.value?.tips || "加载中...";
		if (!loading) {
			return false;
		}
		let subDom = `
    <div class="loading-content loading">
        <i class="el-icon-loading"></i>
        <div class="tip">${tips}</div>
    </div>`;
		el.insertAdjacentHTML("beforeend", subDom);

		let loadingMask = el.querySelectorAll(".loading-content")[0];
		// full true：全屏 false:局部
		if (full) {
			loadingMask.classList.add("full");
			el.classList.remove("loading-root");
		} else {
			el.classList.add("loading-root");
			loadingMask.classList.remove("full");
		}
		if (theme == "dark") {
			loadingMask.classList.add("dark");
		}
		if (theme == "light") {
			loadingMask.classList.add("light");
		}
	},
	updated(el, options) {
		if (!options.value && typeof options.value !== "boolean") {
			throw new Error("使用方式有误！缺少参数！");
		}
		let full = options.value?.full ?? false;
		let theme = options.value?.theme || "dark";
		let loading = options.value === false ? false : options.value?.loading ?? true;
		let tips = options.value?.tips || "加载中...";
		if (loading) {
			let loadingMask = el.querySelectorAll(".loading-content")[0];
			if (loadingMask) {
				el.removeChild(loadingMask);
			}
			let subDom = `
    <div class="loading-content loading">
        <i class="el-icon-loading"></i>
        <div class="tip">${tips}</div>
    </div>`;
			el.insertAdjacentHTML("beforeend", subDom);
		} else {
			let loadingMask = el.querySelectorAll(".loading-content")[0];
			el.removeChild(loadingMask);
			return false;
		}
		let loadingMask = el.querySelectorAll(".loading-content")[0];
		// full true：全屏 false:局部
		if (full) {
			loadingMask.classList.add("full");
			el.classList.remove("loading-root");
		} else {
			el.classList.add("loading-root");
			loadingMask.classList.remove("full");
		}
		if (theme == "dark") {
			loadingMask.classList.add("dark");
		}
		if (theme == "light") {
			loadingMask.classList.add("light");
		}
	},
};
