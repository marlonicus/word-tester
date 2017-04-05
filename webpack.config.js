const path = require('path')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const jsonLoader = require('json-loader')

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

const ASSET_OUTPUT_CONTEXT = `./assets`
const ASSET_FILE_LOADER = {
	loader: 'file-loader',
	options: {
		context: ASSET_OUTPUT_CONTEXT,
		name: `[path][name].[ext]`,
	},
}

const plugins = [
	new webpack.ExtendedAPIPlugin(),

	// Define global vars (helps for dead code elimination)
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(ENV),
			'BUILD_NUMBER': JSON.stringify(process.env.GO_PIPELINE_LABEL),
			'BUILD_DATE': JSON.stringify(new Date()),
		},
		DEV: ENV === 'development',
		PROD: ENV === 'production',
		TEST: ENV === 'test',
	}),

	// Uglify JS on prod
	ENV === Envs.PROD ? new webpack.optimize.UglifyJsPlugin() : false,

	// Extract styles into file
	new ExtractTextPlugin(`styles.css`),

	// Generate our index page
	new HtmlWebpackPlugin({
		template: `src/index.ejs`,
		inject: false,
		cache: false,
	}),
].filter(x => x)

module.exports = {
	context: __dirname,

	entry: [`./src/main.js`],

	output: {
		path: path.resolve(`public`),
		filename: `bundle.js`,
	},

	devServer: {
		stats: `minimal`,
	},

	watch: ENV === Envs.DEV,

	devtool: 'source-map',

	module: {
		rules: [
			// Javascript
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, `src`),
				],
				loader: [`babel-loader`],
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

			// Fonts
			{
				test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
				use: ASSET_FILE_LOADER,
			},

			// JSON & TSV files
			{
				test: /\.(json|tsv)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},

			// Images
			{
				test: /\.(jpg|png)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[hash].[ext]',
				},
			},

			// Config
			{
				test: /\.config$/,
				use: {
					loader: 'file-loader',
					options: {
						name: `[name].[ext]`,
					},
				},
			},

			// Dynamic pages
			{
				test: /\.aspx$/,
				use: {
					loader: 'file-loader',
					options: {
						name: `[name].[ext]`,
					},
				},
			},
		],
		loaders: [
			{
				include: /\.json$/,
				loaders: ['json-loader'],
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
