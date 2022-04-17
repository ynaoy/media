const { environment } = require('@rails/webpacker')

// jQueryとBootstapのJSを使えるように
const  webpack  = require('webpack')

environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery/src/jquery',
    jQuery: 'jquery/src/jquery',
    Popper: ['popper.js', 'default']
  })
)

// vue3を使えるように
const { VueLoaderPlugin } = require('vue-loader')

environment.plugins.prepend(
  'VueLoaderPlugin',
   new VueLoaderPlugin()
)
environment.loaders.prepend('vue', {
    test: /\.vue$/,
    use: [{
        loader: 'vue-loader'
    }]
})

module.exports = environment
