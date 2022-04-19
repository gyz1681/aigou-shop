module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://kumanxuan1.f3322.net:8881/cms/',
        changeOrigin: true// 是否跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}
