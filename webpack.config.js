const ExtractTextPlugin  = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const MainStylesExtract =  new ExtractTextPlugin('static/css/main.css');
const VendorStylesExtract = new ExtractTextPlugin('static/css/vendor.css');
const target = process.env.NODE_ENV || 'develop';
const shell = require('shelljs');

const buildDir = path.resolve(__dirname, 'client/customers/dist');
shell.rm('-rf', buildDir);


let config = {
  context: path.resolve(__dirname, "client"),
  entry: {
    customers: './customers/src/app.js',
    // admin: './vue-admin/src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'client/customers/dist'),
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude:[path.resolve(__dirname, 'node_modules'), __dirname + 'customers/dist'],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(less|css)$/,
        include: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: VendorStylesExtract.extract({
          fallback: "style-loader",
          use: "css-loader!less-loader?url=false"
        })
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: MainStylesExtract.extract({
          fallback: "style-loader",
          use: "css-loader?url=false",
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?emitFile=false&name=fonts/[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
      bootstrap: path.resolve(__dirname, "node_modules/bootstrap"),
      npm: __dirname + '/node_modules',
    }
  },
  plugins: [
    VendorStylesExtract,
    MainStylesExtract,
    new CopyWebpackPlugin([
      {
        from: 'customers/assets/fonts',
        to: 'static/fonts'
      },
      {
        from: 'customers/assets/images',
        to: 'static/images'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'client/customers/index.html'),
      inject: true
    })
  ],
  devtool: 'source-map'
};


if(target === 'production') {
  console.log('building for production');
} else {
  console.log('building for development!');
}

module.exports = config;
