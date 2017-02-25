let webpack = require('webpack');
let path = require('path');
const NODE_DIR = __dirname + '/node_modules';
console.log('PROCESS ENV', process.env.NODE_ENV);
let target = process.env.NODE_ENV || 'develop';

let config = {
  context: __dirname + '/client',
  entry: './app.js',
  output: {
    path: __dirname + '/client',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        exclude:'/(node_modules|bower_components)/',
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
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


if(target === 'production') {
  console.log('building for PRODUCTION!');
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    })
  );
} else {
  console.log('building for development!');
}

module.exports = config;
