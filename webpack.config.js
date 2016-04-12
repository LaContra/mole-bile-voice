module.exports = {
	entry: './js/main.js',
	output: {
		path: __dirname, // Where to save the output file
		filename: './js/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	}
};