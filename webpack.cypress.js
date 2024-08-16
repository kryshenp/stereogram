const path = require("path");

module.exports = {
	mode: "development",
	devtool: "eval-source-map",
	resolve: {
		extensions: [".ts", ".js"],
		fallback: { fs: false, vm: false, child_process: false, module: false },
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/typescript"],
						},
					},
				],
			},
		],
	},
};
