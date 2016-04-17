module.exports = {
	entry: './index.js',
	output: {
		path: __dirname, // Where to save the output file
		filename: 'bundle.js',
    	publicPath: '/static/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	}
};