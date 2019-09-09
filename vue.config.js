module.exports = {
  publicPath: './',
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: { 
       resolve: { 
           alias: { 
              'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1 
           } 
       } 
    },
    //Preloadd All Pages
    chainWebpack: config => {
    config.plugin('preload').tap(options => {
      options[0].include = "all"
      return options
    })
  }
}
