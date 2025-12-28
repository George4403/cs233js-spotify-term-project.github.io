const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
  _jsx(): This function is used by the compiler for JSX elements that have dynamic children (e.g., <MyComponent>{someVariable}</MyComponent>).

  _jsxs(): The "s" stands for "static" or "spanning". This is an optimization used for elements with multiple, static children.  For example:
  
    <div>
      <span>Static 1</span>
      <span>Static 2</span>
    </div>
    
    It handles children more efficiently by passing them as a single, combined array, which allows for better performance by skipping certain runtime checks and manipulations.

  Performance: The primary benefit of the jsxs() function is a performance improvement. By optimizing the handling of static children, it can potentially result in smaller bundle sizes and slightly faster rendering, as it avoids array slicing and other runtime overheads associated with the older React.createElement or jsx() methods for these specific cases. 
*/


module.exports = (env) => {

  console.log(env);

  return {
    mode: 'development',
    entry: {
      spotify: './src/js/index.js',
      jsx: './src/js/SpotifyApp.js'
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: '[name].bundle.js',
      assetModuleFilename: "images/[name][ext]",
      clean: true,
    },
    target: 'web',
    devServer: {
      static: "./dist"
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(svg|eot|ttf|woff|woff2)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        jsx: ["react/jsx-runtime", "default"],
        jsxs: ["react/jsx-runtime", "jsxs"], // 
        Fragment: ["react/jsx-runtime", "Fragment"],

      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        chunks: ["spotify"],
        inject: "body",
        filename: "index.html",
      })
    ]
  };
};