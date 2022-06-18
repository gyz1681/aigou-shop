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
}
