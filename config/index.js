const path = require('path')
const paths = require('react-scripts/config/paths')

paths.appIndexJs = `${paths.appSrc}/pages/index.js`
paths.servedPath = './'

const config = {
  alias: {
    '@': paths.appSrc,
    'react-dom': '@hot-loader/react-dom'
  },
  proxy: {
    '/api': {
      changeOrigin: true,
      logLevel: 'silent',
      proxyTimeout: 60000,
      secure: false,
      target: process.env.API_URL || 'http://localhost:5000',
      pathRewrite: {
        '^/api': '/api/v1',
      }
    }
  },
  babelPlugin: 'react-hot-loader/babel',
  babelImports: [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }
  ],
  lessLoader: {
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#094183',
      '@processing-color': '#094183'
    }
  },
  entry: env => {
    const devEntry = {
      index: [
        require.resolve('react-hot-loader/patch'),
        require.resolve('react-dev-utils/webpackHotDevClient'),
        path.resolve(paths.appSrc, 'pages', 'index.js'),
        require.resolve('webpack/hot/only-dev-server')
      ],
      login: [
        require.resolve('react-hot-loader/patch'),
        require.resolve('react-dev-utils/webpackHotDevClient'),
        path.resolve(paths.appSrc, 'pages', 'login.js'),
        require.resolve('webpack/hot/only-dev-server')
      ]
    }
    const prodEntry = {
      index: path.resolve(paths.appSrc, 'pages', 'index.js'),
      login: path.resolve(paths.appSrc, 'pages', 'login.js')
    }
    if (env === 'development') {
      return devEntry
    } else {
      return prodEntry
    }
  }
}

module.exports = config
