const httpsLocalhost = require('https-localhost')()

const modifyWebpackConfig = api => {
  api.chainWebpack(config => {
    config.entry('start').add('./script/start.ts')
    config.output.filename(({ chunk }) => {
      const development = api.service.mode === 'development'
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
  })
}

module.exports = (api, options) => {
  api.registerCommand('serve:custom', async args => {
    modifyWebpackConfig(api)
    const certs = await httpsLocalhost.getCerts()
    options.devServer.hotOnly = true
    options.devServer.disableHostCheck = true
    options.devServer.https = certs
    options.devServer.host = 'localhost'
    await api.service.run('serve', args)
  })
  api.registerCommand('build:custom', async args => {
    modifyWebpackConfig(api)
    options.productionSourceMap = false
    api.service.run('build', args)
  })
}

module.exports.defaultModes = {
  'serve:custom': 'development',
  'build:custom': 'production'
}
