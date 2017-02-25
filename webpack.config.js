let webpack = require('webpack');
let path = require('path');
const NODE_DIR = __dirname + '/node_modules';

module.exports = {
  context: __dirname + '/client',
  entry: './app.js',
  output: {
    path: __dirname + '/client',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test:/\.js$/, exclude:'/(node_modules|bower_components)/', loader: 'babel-loader' }
    ]

  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      jquery$:path.resolve( __dirname,'node_modules/jquery/src/jquery.js'),
      moment$:path.resolve( __dirname,'node_modules/moment/moment.js'),
      npm: __dirname + '/node_modules',
      b: __dirname + '/client/lib'
      // angular$: path.resolve(__dirname, 'node_modules/angular/index.js')
    }
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   'window.$': 'jquery',
    //   $: "jquery"
    // })

  ],
  devtool: 'source-map'
};
