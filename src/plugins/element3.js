/*
 * @Author: your name
 * @Date: 2021-01-30 10:25:15
 * @LastEditTime: 2021-01-30 10:25:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\plugins\element3.js
 */

// 全局引入element3
import element3 from "element3";
import "element3/lib/theme-chalk/index.css";

export default function (app) {
	app.use(element3);
}
