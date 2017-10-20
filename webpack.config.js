 const path = require("path");
 const buidDir = "dist";
 const HtmlWebPlugin = require("html-webpack-plugin");
 const ExtractTextPlugin = require('extract-text-webpack-plugin');


 module.exports = {
 	entry: "./index.js",
 	output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, buidDir )
 	},
 	module:{
 		rules:[
         {
         	test:/\.js$/,
         	exclude: [/node_modules/],
         	use: [{
              loader: "babel-loader",
              options:{
              	presets: ["es2015"]
              }
         	}
         	]
         },
        {
      test:/\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader', 'sass-loader'],
      }) 
    },
 		]
        
 	},
  devServer:{
    stats: "errors-only",
    historyApiFallback: true,
    port: 5000
  },
  plugins: [
    new HtmlWebPlugin({
      title: 'start React',
      minify: {
       collapseWhitespace: true
      },
      hash: true,
      template: './src/index.ejs'
    }),
   new ExtractTextPlugin("app.css")
  ]
 }

