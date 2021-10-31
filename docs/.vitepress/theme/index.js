import Theme from "vitepress/dist/client/theme-default";
import Button from "../../../gzui/button/button";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";

export default {
	...Theme,
	enhanceApp({ app }) {
		app.component("d-button", Button);
		app.component("Demo", Demo);
		app.component("DemoBlock", DemoBlock);
	},
};
