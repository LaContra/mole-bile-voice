module.exports = {
	entry: './index.js',
	output: {
		path: __dirname + '/static/', // Where to save the output file
		filename: 'bundle.js',
    	publicPath: '/static/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf$/,    loader: "file-loader" },
			{ test: /\.eot$/,    loader: "file-loader" },
			{ test: /\.svg$/,    loader: "file-loader" }
		]
	}
};