const { extend } = require('lodash')
const paths = require('react-scripts/config/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const {
  override,
  addWebpackAlias,
  addBabelPlugin,
  addLessLoader,
  fixBabelImports,
  overrideDevServer
} = require('customize-cra')
const {
  alias,
  babelImports,
  babelPlugin,
  entry,
  lessLoader,
  proxy
} = require('./index')

const removePlugin = (plugins, name) => {
  const list = plugins.filter(it => !(it.constructor && it.constructor.name && name === it.constructor.name))
  if (list.length === plugins.length) {
    throw new Error(`Can not found plugin: ${name}.`)
  }
  return list
}

const genHtmlWebpackPlugin = env => {
  const minify = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: {
      comments: '@cc_on',
    },
    minifyCSS: true,
    minifyURLs: true,
  }
  const config = Object.assign(
    {},
    { inject: true, template: paths.appHtml },
    'development' !== env ? { minify } : undefined,
  )
  return entry => {
    return new HtmlWebpackPlugin({
      ...config,
      chunks: ['vendors', `runtime~${entry}.html`, entry],
      filename: `${entry}.html`,
    })
  }
}
const genManifestPlugin = env => {
  const publicPath = env === 'production' ? paths.servedPath : '/'
  return new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: publicPath,
    generate: (seed, files) => {
      const manifestFiles = files.reduce((manifest, file) => {
        manifest[file.name] = file.path
        if (!file.name.endsWith('.map')) {
          manifest[file.name] = file.path
        }
        return manifest
      }, seed)
      return {
        files: manifestFiles
      }
    },
  })
}

const supportMultiPage = (config, env) => {
  config.entry = entry(env)
  config.plugins = removePlugin(config.plugins, 'HtmlWebpackPlugin')
  config.plugins = removePlugin(config.plugins, 'ManifestPlugin')
  const getHtmlWebpackPlugin = genHtmlWebpackPlugin(env)
  Object.keys(config.entry).forEach(it => {
    config.plugins.push(getHtmlWebpackPlugin(it))
  })

  config.plugins.push(genManifestPlugin(env))

  if ('development' === env) {
    config.output.filename = 'static/js/[name].bundle.js'
  } else {
    config.plugins = removePlugin(config.plugins, 'GenerateSW')
    const workboxWebpackPlugin = new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/, /\.html$/],
      importWorkboxFrom: 'local',
    })
    config.plugins.push(workboxWebpackPlugin)
  }
  return config
}

const extendDevServerConfig = () => config => {
  if (proxy) {
    config.proxy = config.proxy || {}
    config.proxy = extend(config.proxy, proxy)
  }
  config.historyApiFallback.rewrites = [{
    from: /^\/login/,
    to: '/login.html'
  }]
  return config
}

module.exports = {
  devServer: overrideDevServer(extendDevServerConfig()),
  webpack: override(
    supportMultiPage,
    fixBabelImports(...babelImports),
    addBabelPlugin(babelPlugin),
    addLessLoader(lessLoader),
    addWebpackAlias(alias)
  )
}