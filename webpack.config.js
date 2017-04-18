const path = require('path')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const Envs = {
	DEV: 'development',
	PROD: 'production',
	TEST: 'test',
}

// normalise an environment variable based on NODE_ENV.
// can be one of: "development" (default), "production", or "test".
const ENV = (
	/prod(uction)?/.test(process.env.NODE_ENV) ? Envs.PROD :
	/test/.test(process.env.NODE_ENV) ? Envs.TEST :
	Envs.DEV
)

const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	// enable HMR globally

	new webpack.NamedModulesPlugin(),
	// prints more readable module names in the browser console on HMR updates

	// Uglify JS on prod
	ENV === Envs.PROD ? new webpack.optimize.UglifyJsPlugin() : false,

	// Extract styles into file
	new ExtractTextPlugin({
		filename: `styles.css`,
		disable: true,
	}),

	// Generate our index page
	new HtmlWebpackPlugin({
		template: `src/index.ejs`,
		hash: true,
		inject: true,
		cache: false,
	}),
].filter(x => x)

module.exports = {
	context: __dirname,

	entry: [
		'react-hot-loader/patch',
		// activate HMR for React

		'webpack-dev-server/client?http://localhost:8080',
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates

		`./src/main.js`
	],

	output: {
		path: path.resolve(`public`),
		filename: `bundle.js`,
		publicPath: `/`
	},

	devServer: {
		hot: true,
		stats: `minimal`,
		publicPath: `/`,
		contentBase: path.resolve(`public`),
	},

	watch: ENV === Envs.DEV,

	devtool: 'inline-source-map',

	module: {
		rules: [
			// Javascript
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, `src`),
				],
				loader: [`react-hot-loader/webpack`, `babel-loader`],
			},

			// Styles
			{
				test: /\.scss$/,
				use:
					ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [{
							loader: `css-loader`,
							options: {
								importLoaders: 1,
								localIdentName: `[name]__[local]--[hash:base64:5]`,
								sourceMap: true,
							},
						}, {
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
								plugins: [autoprefixer()],
							},
						}, {
							loader: 'sass-loader',
							options: {
								includePaths: [ path.resolve('src/styles'), path.resolve('src/components') ],
							},
						}],
					}),
				include: path.resolve('src'),
			},
		],
	},

	resolve: {
		modules: [
			`node_modules`,
			path.resolve('.'),
		],
	},

	plugins,
}
