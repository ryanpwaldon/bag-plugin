const modifyWebpackConfig = api => {
  api.chainWebpack(config => {
    config.entry('start').add('./public/start.ts')
    config.output.filename(({ chunk }) => {
      const development = api.service.mode === 'development'
      if (chunk.name === 'app') return development ? 'js/[name].js' : 'js/[name].[contenthash:8].js'
      return '[name].js'
    })
    config.optimization.splitChunks({})
    config.plugin('html').tap(args => {
      args[0].excludeChunks = ['start']
      return args
    })
    config.plugin('preload').tap(args => {
      args[0].fileBlacklist.push(/start.js/)
      return args
    })
  })
}

module.exports = (api, options) => {
  api.registerCommand('serve:custom', async args => {
    modifyWebpackConfig(api)
    options.devServer.https = true
    options.devServer.hotOnly = true
    options.devServer.disableHostCheck = true
    options.devServer.public = 'localhost:8080'
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
