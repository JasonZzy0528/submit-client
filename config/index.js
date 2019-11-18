const path = require('path')
const client = path.resolve(__dirname, '..', 'src')

const config = {
  alias: {
    '@': client,
    'react-dom': '@hot-loader/react-dom'
  },
  proxy: {
    '/api': {
      changeOrigin: true,
      logLevel: 'silent',
      proxyTimeout: 60000,
      secure: false,
      target: process.env.API || 'http://localhost:5000',
      pathRewrite: {
        '^/api': '/api/v1',
      }
    }
  }
}

module.exports = config
