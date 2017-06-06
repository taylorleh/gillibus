const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const shell = require('shelljs');
const target = process.env.NODE_ENV || 'develop';

const MainStylesExtract = new ExtractTextPlugin('customers/dist/static/css/main.css');
const VendorStylesExtract = new ExtractTextPlugin('[name]/dist/static/css/vendor.css');
// const AdminVendorStylesExtract = new ExtractTextPlugin('vue-admin/dist/static/css/VADMIN.css');
const VCustomersMainStyles = new ExtractTextPlugin('[name]/dist/static/css/main.css');
// const VFontExtracts = new ExtractTextPlugin('[name]/dist/static')

// const TEST = new ExtractTextPlugin('[name]/dist/static/css/main.css');

// const CustomerLocalStyles = new ExtractTextPlugin('vcustomers/dist/static/css/main.css');
const CustomerVendorStyles = new ExtractTextPlugin('vcustomers/dist/static/css/vendor.css');
// const AdminLocalStyles = new ExtractTextPlugin('[name]/dist/static/css/main.css');
const AdminVendorStyles = new ExtractTextPlugin('vue-admin/dist/static/css/vendor.css');

const AllLocalStyles = new ExtractTextPlugin({
  filename: '[name]/dist/static/css/main.css',
  allChunks: true
});

const customerBuildDir = path.resolve(__dirname, 'client/customers/dist');
const adminBuildDir = path.resolve(__dirname, 'client/vue-admin/dist');
const vcustomerBuildDir = path.resolve(__dirname, 'client/vcustomers/dist');
const testingDir = path.resolve(__dirname, 'client/LEHMAN');
shell.rm('-rf', customerBuildDir, adminBuildDir, vcustomerBuildDir, testingDir);


let config = {
  context: path.resolve(__dirname, "client"),
  entry: {
    // customers: './customers/src/app.js',
    vcustomers: './vcustomers/src/main.js',
    "vue-admin": './vue-admin/src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: '[name]/dist/static/js/[name].js'
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
          name: '/static/images/[hash].[ext]',
          outputPath: '/vcustomers/dist'
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




      // **********************
      // ***** ADMIN CSS ******
      // **********************

      // --- ADMIN-LOCAL ---
      // {
      //   test: /\.css$/,
      //   exclude: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   include: [
      //     path.resolve(__dirname, 'client/vue-admin/src')
      //   ],
      //   use: AdminLocalStyles.extract({
      //     fallback: "style-loader",
      //     use: "css-loader?url=false"
      //   })
      // },
      //
      // {
      //   test: /\.less$/,
      //   include: [
      //     path.resolve(__dirname, 'client/vue-admin/src')
      //   ],
      //   exclude: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   use: AdminLocalStyles.extract({
      //     fallback: "style-loader",
      //     use: "css-loader!less-loader"
      //   })
      // },



      // --- ADMIN-EXTERNAL ---


      // {
      //   test: /\.css$/,
      //   include: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   exclude: [
      //     path.resolve(__dirname, 'client/vcustomers/src')
      //   ],
      //   use: AdminVendorStyles.extract({
      //     fallback: "style-loader",
      //     use: "css-loader?url=false"
      //   })
      // },
      // {
      //   test: /\.less$/,
      //   include: [
      //     path.resolve(__dirname, 'client/vcustomers'),
      //     path.resolve(__dirname, 'client/vue-admin')
      //   ],
      //   use: VCustomersMainStyles.extract({
      //     fallback: "style-loader",
      //     use: "css-loader!less-loader"
      //   })
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
      //   loader: 'file-loader',
      //   query: {
      //     name:'/static/fonts/[name].[ext]',
      //     outputPath: '/vcustomers/dist'
      //   }
      // },



      {
        test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
        loader: 'file-loader',
        query: {
          name:'/static/fonts/[name].[ext]',
          outputPath: '/vcustomers/dist'
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
      bootstrapcss$: path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
      // bootstrap: path.resolve(__dirname, "node_modules/bootstrap"),
      // assets: path.resolve(__dirname, 'client/vcustomers/src/static/'),
      '@': __dirname + '/client/vcustomers/src/assets/images/',
      VLess: path.resolve(__dirname, 'client/vcustomers/src/less'),
      VAdminLess: path.resolve(__dirname, 'client/vue-admin/src/less'),
      npm: __dirname + '/node_modules'
    }
  },
  plugins: [
    // VendorStylesExtract, //TODO - put this back!
    // MainStylesExtract, //TODO - put this back!
    // VCustomersMainStyles, //TODO - put this back!
    CustomerVendorStyles,
    // CustomerLocalStyles,
    AdminVendorStyles,
    AllLocalStyles,
    // AdminLocalStyles,
    // TEST,
    // new CopyWebpackPlugin([
    //   {
    //     from: 'customers/assets/fonts',
    //     to: 'customers/dist/static/fonts'
    //   },
    //   {
    //     from: 'customers/assets/images',
    //     to: 'customers/dist/static/images'
    //   },
    //   {
    //     from: 'customers/assets/fonts',
    //     to: 'vue-admin/dist/static/fonts'
    //   },
    //   {
    //     from: 'customers/assets/images',
    //     to: 'vue-admin/dist/static/images'
    //   }
    // ]),
    // new HtmlWebpackPlugin({
    //   filename: 'customers/dist/index.html',
    //   template: path.resolve(__dirname, 'client/customers/index.html'),
    //   inject: false,
    //   chunks: ['customers']
    // }),
    new HtmlWebpackPlugin({
      filename: 'vue-admin/dist/index.html',
      template: path.resolve(__dirname, 'client/vue-admin/index.ejs'),
      inject: false,
      chunks: ['vue-admin']
    }),
    new HtmlWebpackPlugin({
      filename: 'vcustomers/dist/index.html',
      template: path.resolve(__dirname, 'client/vcustomers/index.html'),
      inject: false,
      chunks: ['vcustomers']
    })
  ],
  devtool: 'source-map'
};


if (target === 'production') {
  console.log('building for production');
} else {
  console.log('building for development!');
}

module.exports = config;
