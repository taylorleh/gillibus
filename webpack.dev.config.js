const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const CustomerVendorStyles = new ExtractTextPlugin('static/css/vendor.css');
const AllLocalStyles = new ExtractTextPlugin({
  filename: 'static/css/main.css',
  allChunks: true
});

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


let config = {
  context: path.resolve(__dirname, 'client', 'vcustomers'),
  entry: [ './src/main.js', hotMiddlewareScript],

  output: {
    path: path.resolve(__dirname, 'client', 'vcustomers', 'dist'),
    filename: 'bundle.js',
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
        exclude: [path.resolve(__dirname, 'node_modules'), __dirname + 'customers/dist'],
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
          // outputPath: '/static/images/'
          // publicPath: 'static/images/'
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
          name:'static/fonts/[name].[ext]'
          // outputPath: '/vcustomers/dist'
        }
      },
    ]

  },

  resolve: {
    extensions: ['.js'],
    alias: {
      styles: path.resolve(__dirname, 'client', 'vcustomers', 'src', 'less'),
      "api": path.resolve(__dirname, 'client', 'vcustomers', 'src', 'api'),
      '@': path.resolve(__dirname, 'client', 'vcustomers', 'src'),
      'components': path.resolve(__dirname, 'client', 'vcustomers', 'src', 'components'),
      utils:  path.resolve(__dirname, 'client', 'vcustomers', 'src', 'util')
    }
  },

  plugins: [
    CustomerVendorStyles,
    AllLocalStyles,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'client/vcustomers/index.ejs'),
      inject: false,
      develop: true,
      title: 'Gillibus'
    })
  ],
  devtool: 'source-map'
};


module.exports = config;
