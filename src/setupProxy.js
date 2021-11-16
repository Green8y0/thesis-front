const {
  createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://127.0.0.1:3100',
    // target: 'https://sku-front.kscampus.io:10443',
    changeOrigin: true
  }))
}
