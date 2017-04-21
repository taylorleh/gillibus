const ExtractTextPlugin  = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const MainStylesExtract =  new ExtractTextPlugin('assets/main.css');
const VendorStylesExtract = new ExtractTextPlugin('assets/vendor.css');
const target = process.env.NODE_ENV || 'develop';

let config = {
  context: __dirname + '/client',
  entry: './app.js',
  output: {
    path: __dirname + '/client/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude:[path.resolve(__dirname, 'node_modules'), __dirname + '/client/dist'],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: MainStylesExtract.extract({
          fallback: "style-loader",
          use: "css-loader?url=false",
        })
      },
      {
        test: /\.less$/,
        use: VendorStylesExtract.extract({
          fallback: "style-loader",
          use: "css-loader!less-loader"
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?emitFile=false&name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      jquery$:path.resolve( __dirname,'node_modules/jquery/src/jquery.js'),
      moment$:path.resolve( __dirname,'node_modules/moment/moment.js'),
      bootstrapcss$: path.resolve( __dirname,'node_modules/bootstrap/dist/css/bootstrap.css'),
      npm: __dirname + '/node_modules',
      // ass: path.resolve( __dirname,'client/assets/')
      // b: __dirname + '/client/lib'
      // angular$: path.resolve(__dirname, 'node_modules/angular/index.js')
    }
  },
  plugins: [
    MainStylesExtract,
    VendorStylesExtract
  ],
  devtool: 'eval'
};


if(target === 'production') {
  console.log('building for production');
} else {
  console.log('building for development!');
}

module.exports = config;
