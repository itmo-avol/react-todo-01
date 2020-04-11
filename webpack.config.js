const Path = require( 'path' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	devtool: 'source-map',
	entry: './sources/index.tsx',
	output: {
		path: Path.resolve( __dirname, 'public/scripts' ),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: '../styles/[name].css',
		} ),
	],
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.module\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
				],
			},
			{
				test: /\.global\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif|webp|svg)$/i,
				loader: 'file-loader',
				options: {
					outputPath: '../assets/',
					publicPath: '/assets'
				},
			},
		],
	},
};
