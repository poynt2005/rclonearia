var webpack = require("webpack");

var path = require("path");

module.exports = {
	entry: {
		main: "./src/index.js",
		auther: "./src/auther.js",
		welcome: "./src/welcome.js"
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].moral.js'
	},
	module: {
		rules: [
			{
				test: /.css$/, 
				use: [
					'style-loader',  
					'css-loader' 
				]
			},
			{
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
				  {
					loader: 'url-loader',
					options: { limit: 40000 }
				  },
				  'image-webpack-loader'
				]
			 }
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 3000,
		hot: true
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Popper: ['popper.js', 'default']
		})
	]
 }
