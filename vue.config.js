const path = require("path");

module.exports = {
  publicPath: "./",
  css: {
    sourceMap: true
  },
  devServer: {
    open: true, // serve 后主动打开浏览器
    port: 8099
  },
  productionSourceMap: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/index.less")]
    }
  },
  transpileDependencies: ["vue-echarts", "resize-detector"]
};
