const { connect } = require('ngrok')

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
    updateWebpackConfig(api)
    api.service.run('build', args)
  })
}

module.exports.defaultModes = {
  'serve:custom': 'development',
  'build:custom': 'production'
}
