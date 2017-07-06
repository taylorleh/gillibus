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
          name: 'static/images/[hash].[ext]',
          // outputPath: '/vcustomers/dist'
        }
      },

      // **********************
      //  *** ````ALL```` CSS *
      // **********************

      // TODO - added 12:23pm; 12:36 THIS WORKS - exports styles to respective bundle!!!
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


      // **********************
      //  *** CUSTOMER CSS ****
      // **********************

      // - Local
      // {
      //   test: /\.css$/,
      //   include: [
      //     path.resolve(__dirname, 'client/vcustomers/src')
      //   ],
      //   exclude: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   use: CustomerLocalStyles.extract({
      //     fallback: "style-loader",
      //     use: "css-loader?url=false",
      //   })
      // },

      // TODO - add back in: 12:28
      // {
      //   test: /\.less$/,
      //   include: [
      //     path.resolve(__dirname, 'client/vcustomers/src')
      //   ],
      //   exclude: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   use: CustomerLocalStyles.extract({
      //     fallback: "style-loader",
      //     use: "css-loader!less-loader"
      //   })
      // },


      // - External
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'node_modules')
        ],
        // exclude: [
        //   path.resolve(__dirname, 'client/vue-admin/src')
        // ],
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



      // {
      //   test: /\.(less|css)$/,
      //   include: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   use: VendorStylesExtract.extract({
      //       fallback: "style-loader",
      //       use: "css-loader!less-loader?url=false"
      //     })
      // },
      // {
      //   test: /\.css$/,
      //   exclude: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   use: MainStylesExtract.extract({
      //     fallback: "style-loader",
      //     use: "css-loader?url=false",
      //   })
      // },
      // {
      //   test: /\.less$/,
      //   include: [
      //     path.resolve(__dirname, 'client/vue-admin/src')
      //   ],
      //   use: AdminVendorStylesExtract.extract({
      //     fallback: "style-loader",
      //     use: "css-loader!less-loader?url=false"
      //   })
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|svg)$/,
      //   loader: 'file-loader?emitFile=false&name=fonts/[name].[ext]'
      // },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     js: 'babel-loader!file-loader'
      //   }
      // }
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
    // VendorStylesExtract, //TODO - put this back!
    // MainStylesExtract, //TODO - put this back!
    // VCustomersMainStyles, //TODO - put this back!
    CustomerVendorStyles,
    AllLocalStyles,
    // new HtmlWebpackPlugin({
    //   filename: 'customers/dist/index.html',
    //   template: path.resolve(__dirname, 'client/customers/index.html'),
    //   inject: false,
    //   chunks: ['customers']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'vue-admin/dist/index.html',
    //   template: path.resolve(__dirname, 'client/vue-admin/index.ejs'),
    //   inject: false,
    //   chunks: ['vue-admin']
    // }),
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
