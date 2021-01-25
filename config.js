const { connect } = require('ngrok')
const httpsLocalhost = require('https-localhost')()
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const modifyWebpackConfig = (api, analyze) => {
  const development = api.service.mode === 'ngrok' || 'https'
  api.chainWebpack(config => {
    config.entry('start').add('./script/start.ts')
    config.output.filename(({ chunk }) => {
      if (chunk.name === 'app') return development ? 'js/[name].js' : 'js/[name].[contenthash:8].js'
      return '[name].js'
    })
    // reset splitChunks config to prevents vendors from being imported into start.js
    config.optimization.splitChunks({})
    // ensure start.js is not imported into index.html
    config.plugin('html').tap(args => {
      args[0].excludeChunks = ['start']
      return args
    })
    // ensure start.js is not preloaded into index.html
    config.plugin('preload').tap(args => {
      args[0].fileBlacklist.push(/start.js/)
      return args
    })
    // open webpack bundle analyzer
    if (analyze) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin)
        .init(Plugin => new Plugin())
    }
  })
}

module.exports = (api, options) => {
  api.registerCommand('serve:https', async args => {
    modifyWebpackConfig(api)
    const certs = await httpsLocalhost.getCerts()
    options.devServer.https = certs
    options.devServer.host = 'localhost'
    await api.service.run('serve', args)
  })
  api.registerCommand('serve:ngrok', async args => {
    modifyWebpackConfig(api)
    options.devServer.hotOnly = true
    options.devServer.disableHostCheck = true
    options.devServer.public = 'r2.au.ngrok.io'
    await api.service.run('serve', args)
    await connect({
      addr: 8080,
      region: 'au',
      subdomain: process.env.NGROK_SUBDOMAIN,
      authtoken: process.env.NGROK_AUTH_TOKEN
    })
      .then(console.log)
      .catch(console.log)
  })
  api.registerCommand('build:custom', async args => {
    modifyWebpackConfig(api, args.analyze)
    options.productionSourceMap = false
    api.service.run('build', args)
  })
}

module.exports.defaultModes = {
  'serve:https': 'https',
  'serve:ngrok': 'ngrok',
  'build:custom': 'production'
}
