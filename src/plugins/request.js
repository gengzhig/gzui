import axios from "axios";
import { Message } from "element3";
axios.defaults.baseURL = ""; // 配置axios请求的地址
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common["Authorization"] = ""; // 设置请求头为 Authorization
// 请求拦截器
axios.interceptors.request.use(
	config => {
		// 每次发送请求之前判断vuex中是否存在token
		// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		const token = window.localStorage.getItem("token");
		token && (config.headers.Authorization = token);
		return config;
	},
	error => {
		return Promise.error(error);
	}
);

axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			if (response.data && response.data.status === 200) {
				return Promise.resolve(response.data.data);
			} else {
				Message.warning({
					message: response.data && response.data.msg,
					type: "warning",
				});
			}
		} else {
			return Promise.reject(response);
		}
	},
	error => {
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作。
				case 401:
					Message.warning({
						message: "401：身份验证失败，请关闭重新进入。",
						type: "warning",
					});
					break;

				// 403 token过期
				// 登录过期对用户进行提示
				// 清除本地token和清空vuex中token对象
				// 跳转登录页面
				case 403:
					Message.warning({
						message: "403：登录过期，请关闭重新进入。",
						type: "warning",
					});
					// 清除token
					break;

				// 404请求不存在
				case 404:
					Message.warning({
						message: "404：您访问的网页不存在。",
						type: "warning",
					});
					break;
				// 其他错误，直接抛出错误提示
				default:
					Message.warning({
						message: error.response.data.msg,
						type: "warning",
					});
			}
			return Promise.reject(error.response);
		}
	}
);

export default axios;
