const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
// const shell = require('shelljs');
const target = process.env.NODE_ENV || 'develop';


const CustomerVendorStyles = new ExtractTextPlugin('static/css/vendor.css');
const AllLocalStyles = new ExtractTextPlugin({
  filename: 'static/css/main.css',
  allChunks: true
});

// const customerBuildDir = path.resolve(__dirname, 'client/customers/dist');
// const adminBuildDir = path.resolve(__dirname, 'client/vue-admin/dist');
// const vcustomerBuildDir = path.resolve(__dirname, 'client/vcustomers/dist');
// shell.rm('-rf', vcustomerBuildDir);


let config = {
  context: path.resolve(__dirname, 'client', 'vcustomers'),
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'client', 'vcustomers', 'dist'),
    filename: 'bundle.js?[hash]',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'client', 'vcustomers','src'),
          path.resolve(__dirname, 'node_modules', 'bootstrap-vue')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: /\.(png|jpg)$/,
        include: [path.resolve(__dirname, 'client/vcustomers')],
        loader: 'file-loader',
        query: {
          name: 'static/images/[hash].[ext]'
        }
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'client/vcustomers/src'),
          path.resolve(__dirname, 'client/vue-admin/src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: AllLocalStyles.extract({
          fallback: "style-loader",
          use: "css-loader!less-loader"
        })
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: CustomerVendorStyles.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: CustomerVendorStyles.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'client', 'vcustomers', 'src')
        ],
        use: AllLocalStyles.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
        loader: 'file-loader',
        query: {
          name:'static/fonts/[name].[ext]',
          // outputPath: '/vcustomers/dist'
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      jquery$: path.resolve(__dirname, 'node_modules/jquery/src/jquery.js'),
      moment$: path.resolve(__dirname, 'node_modules/moment/moment.js'),
      style: path.resolve(__dirname, 'client/vcustomers/src/less'),
      api: path.resolve(__dirname, 'client', 'vcustomers', 'src', 'api'),
      '@': path.resolve(__dirname, 'client', 'vcustomers', 'src'),
      'components': path.resolve(__dirname, 'client', 'vcustomers', 'src', 'components'),
      utils:  path.resolve(__dirname, 'client', 'vcustomers', 'src', 'util')
    }
  },
  plugins: [
    CustomerVendorStyles,
    AllLocalStyles,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'client/vcustomers/index.html'),
      inject: true
    })
  ],
  devtool: false
};


if (target === 'production') {
  console.log('building for production');
} else {
  console.log('building for development!');
}

module.exports = config;
