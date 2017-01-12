const webpack = require('webpack');
const config = {
  // the main entry of our app
  entry: ['./app/index.js'],
  // output configuration
  output: {
    path: __dirname + '/app/build/',
    publicPath: 'app/build/',
    filename: 'build.js'
  },
  devServer:{
    proxy: {'/courses': 'http://localhost:3000',
    '/groups': 'http://localhost:3000'},
    hot: true
  },
  module: {
    loaders: [
      // process *.vue files using vue-loader
      { test: /\.vue$/, loader: 'vue' },
      // process *.js files using babel-loader
      // the exclude pattern is important so that we don't
      // apply babel transform to all the dependencies!
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /bootstrap.+\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window' }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime','transform-object-rest-spread']
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  plugins: []
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    )
}

module.exports = config;