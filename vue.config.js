module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'process.env.VUE_APP_BASE_URL',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  // // 这个是给webpack-dev-server开启可IP和域名访问权限。
  // chainWebpack: config => {
  //   config.devServer.disableHostCheck(true)
  // },
  // configureWebpack: {
  //   externals: {
  //     qc: 'QC'
  //   }
  // }
}
