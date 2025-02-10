const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, // Prevents eval() in production
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.devtool = false; // Disables eval() in Webpack
    }
  }
})