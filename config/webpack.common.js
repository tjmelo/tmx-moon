const htmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require('../package.json')

const tmxMoon = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [{
          loader: "style-loader",
          options: {
            injectType: "singletonStyleTag",
            insert: require.resolve("../src/utils.ts"),
          },
        }, "css-loader", "stylus-loader"],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".tsx", ".ts"],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new ModuleFederationPlugin({
      name: "TmxMoon",
      filename: "remoteEntry.js",
      exposes: {
        "./TmxMoon": "./src/App",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"] 
        },
      },
    }),
  ],
};

module.exports = tmxMoon;
