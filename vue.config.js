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
    chainWebpack: config => {
      config
        .plugin('preload')
        .tap(args => {
          args[0].include = 'initial'
          return args
        })
    }
}
