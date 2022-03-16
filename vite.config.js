/*
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-08-11 10:02:14
 * @LastEditors: gz
 * @Description: In User Settings Edit
 * @FilePath: \gi-ui\vite.config.js
 */
/**
 * @type {import('vite').UserConfig}
 */

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite"; // 代码提示
// import svgLoader from 'vite-svg-loader' // 引入vite-svg-loader插件
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			common: path.resolve(__dirname, "src/common"),
			comps: path.resolve(__dirname, "src/components"),
			views: path.resolve(__dirname, "src/views"),
			styles: path.resolve(__dirname, "src/styles"),
			plugins: path.resolve(__dirname, "src/plugins"),
			layouts: path.resolve(__dirname, "src/layouts"),
		}, // 别名
	},
	server: {
		// host: "192.168.0.166",
		proxy: {
			"/api": {
				target: "http://localhost:8000/api",
				changeOrigin: true,
				ws: true,
				rewrite: path => path.replace(/^\/api/, ""),
			},
		},
	},
	plugins: [
		vue(),
		vueJsx(),
		// svgLoader(), // 使用vite-svg-loader插件
	],
	test: {
		environment: "jsdom",
		global: true,
	},
});
