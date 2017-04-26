const ExtractTextPlugin  = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const MainStylesExtract =  new ExtractTextPlugin('assets/main.css');
const VendorStylesExtract = new ExtractTextPlugin('assets/vendor.css');
const target = process.env.NODE_ENV || 'develop';

let config = {
  context: path.resolve(__dirname, 'client'),
  entry: './app.js',
  output: {
    path: __dirname + '/client',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude:[path.resolve(__dirname, 'node_modules')],
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
    modules: [
      path.resolve(__dirname, 'node_modules')
    ],
    alias: {
      jquery$:path.resolve( __dirname,'node_modules/jquery/src/jquery.js'),
      moment$:path.resolve( __dirname,'node_modules/moment/moment.js'),
      bootstrapcss$: path.resolve( __dirname,'node_modules/bootstrap/dist/css/bootstrap.css'),
      npm: __dirname + '/node_modules',
      b: __dirname + '/client/lib'
    }
  },
  plugins: [
    MainStylesExtract,
    VendorStylesExtract
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: "client",
    // https: true,
    proxy: {
      '/api': {
        secure: false,
        target: 'http://localhost:3000'
      },
      '/sockjs-node/*': {
        secure: false,
        target:'http://localhost:3000'
      },
      '/socket.io/*': {
        secure:false,
        target:'http://localhost:3000'
      }
    }

  }
};



module.exports = config;
