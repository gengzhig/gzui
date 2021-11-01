import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite"; // 代码提示
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
	plugins: [vueJsx()],
});
