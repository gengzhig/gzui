module.exports = {
	transform: {
		"^.+\\.(ts|tsx|js|jsx)$": [
			"babel-jest",
			{
				presets: ["@babel/preset-env", "@babel/preset-typescript"],
				plugins: ["@vue/babel-plugin-jsx"], // 新增
			},
		],
	},
};
