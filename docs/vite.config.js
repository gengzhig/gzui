import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite"; // 代码提示

export default defineConfig({
	plugins: [vueJsx()],
});
