import Theme from "vitepress/dist/client/theme-default";
import Button from "../../../gzui/button/index.vue";
import Carousel from "../../../gzui/carousel/index.vue";
import Ellipsis from "../../../gzui/ellipsis/index.vue";
import Image from "../../../gzui/image/index.vue";
import Input from "../../../gzui/input/index.vue";
import Selector from "../../../gzui/selector/index.vue";
import FiveStar from "../../../gzui/fiveStar/index.vue";

import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
// 主题样式
import "vitepress-theme-demoblock/theme/styles/index.css";
export default {
	...Theme,
	enhanceApp({ app }) {
		app.component("gzButton", Button);
		app.component("gzCarousel", Carousel);
		app.component("gzEllipsis", Ellipsis);
		app.component("gzImage", Image);
		app.component("gzInput", Input);
		app.component("gzSelector", Selector);
		app.component("gzFiveStar", FiveStar);

		app.component("Demo", Demo);
		app.component("DemoBlock", DemoBlock);
	},
};
