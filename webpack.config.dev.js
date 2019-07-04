var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
	entry: {
		vendors: [
			'jquery',
			'./js/libs/jquery-ui.min.js', 
			'./js/libs/libs.index.js'
		],
		commonBundle: [
			'./js/eventBus.js',
			'./js/services/localstorage.js',
			'./js/services/firebase-data-service.js',
			/*'./js/app.js',*/
			'./js/services/ping-service.js',
			'./js/services/login-service.js',
			/*'./services/plugins/index.js',*/
		],
		componentsBundle: [
			'./js/pages/login/login.js',
			'./js/components/app-controlls/app-controlls.index.js',
			/*'./js/components/settings/settings_pomodoros/settings_pomodoros.js',*/
			/*'./js/components/settings/settings_pomodoros/cycle/cycle-controller.js',*/
			/*'./js/components/settings/settings_categories/settings_categories.js',*/
			'./js/pages/settings/settings.js',
			'./js/components/active-page/sticky-header/sticky-header.index.js',
			'./js/components/active-page/task-list-app-controlls/task-list-controlls.index.js',
			'./js/components/task/task.index.js',
			'./js/components/active-page/modal-window/modal-window.index.js',
			'./js/components/active-page/timer/timer.index.js',
			'./js/pages/active_page/active_page.js'
		],
		runner: [
			'./js/router.js'
		]/*,
		style:'./styles/app.less'*/
	},
	output: {
		filename: './public/dev/[name].js',
		library: 'app'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("css-loader!less-loader")
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'file?name=./public/dev/fonts/[name]/[name].[ext]'
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'file?publicPath=../&name=./public/dev/img/[name].[ext]?sourceMap'
			}
		]
	},
	plugins: [
				new ExtractTextPlugin("./public/dev/style.css"),
				new webpack.optimize.CommonsChunkPlugin("vendors", "./public/dev/vendors.js")
		]
};