const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    // 跨域
    proxy:{
      '/api':{
        target:'http://39.98.123.211',
        // pathRewrite:{
        // }
      }
    }
  },
  // 打包没有map
  productionSourceMap:false
})
