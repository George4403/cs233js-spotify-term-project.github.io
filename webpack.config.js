const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {

  console.log(env);

  return {
    mode: 'development',
    entry: {
      spotify: './src/js/App.js',
      jsx: './src/js/MyComponent.js'
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
      // new Dotenv(),
      new webpack.ProvidePlugin({
        jsx: ["@ocdla/view/jsx-runtime", "default"]
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