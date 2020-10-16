const httpsLocalhost = require('https-localhost')()

const updateWebpackConfig = api => {
  api.chainWebpack(config => {
    const appFilename = api.service.mode === 'development' ? 'js/[name].js' : 'js/[name].[contenthash:8].js'
    const scriptFilename = '[name].js'
    config.entry('script').add('./public/script.ts')
    config.output.filename(({ chunk }) => (chunk.name === 'app' ? appFilename : scriptFilename))
    config.optimization.splitChunks({})
    config.plugin('html').tap(args => {
      const [options] = args
      options.excludeChunks = ['script']
      return args
    })
  })
}

module.exports = (api, options) => {
  api.registerCommand('serve:custom', async args => {
    updateWebpackConfig(api)
    const certs = await httpsLocalhost.getCerts()
    options.devServer.hotOnly = true
    options.devServer.disableHostCheck = true
    options.devServer.https = certs
    options.devServer.host = 'localhost'
    await api.service.run('serve', args)
  })
  api.registerCommand('build:custom', async args => {
    updateWebpackConfig(api)
    api.service.run('build', args)
  })
}

module.exports.defaultModes = {
  'serve:custom': 'development',
  'build:custom': 'production'
}
