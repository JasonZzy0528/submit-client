const { concat, extend } = require('lodash')
const { alias, proxy } = require('./index')

const extendWebpack = config => {
  config.entry = concat(['react-hot-loader/patch'], config.entry)
  config.resolve.alias = extend(config.resolve.alias, alias)
  return config
}

const extendDevServer = config => {
  if (proxy) {
    config.proxy = config.proxy || {}
    config.proxy = extend(config.proxy, proxy)
  }
  return config
}

module.exports = {
  devServer: configFunction => (proxy, allowedHost) => extendDevServer(configFunction(proxy, allowedHost)),
  webpack: config => extendWebpack(config)
}
