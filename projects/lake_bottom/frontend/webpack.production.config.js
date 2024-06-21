const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: "./src/index.tsx",
  // plugins: [new BundleAnalyzerPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "static"),
  },
  optimization: {
    chunkIds: "size",
    innerGraph: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
    removeAvailableModules: true,
    usedExports: true,
    nodeEnv: "production",
  },
  mode: "production",
}
