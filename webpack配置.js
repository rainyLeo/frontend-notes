

var webpack = require('webpack'); // 引入webpack模块
var path = require('path'); // 引入node的path模块
var nodeModulesPath = path.join(__dirname, '/node_modules'); // 设置node_modules目录

module.exports = {
  // 配置入口（此处定义了双入口）
  entry: {
    bundle: './src/index',
    vendor: [
      'react', 'react-dom', 'redux',
    ],
  },
  // 配置输出目录
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: "/assets/",
    filename: 'bundle.js',
  },
  module: {
    noParse: [
      path.join(nodeModulesPath, '/react/dist/react.min'),
      path.join(nodeModulesPath, '/react-dom/dist/react-dom.min'),
      path.join(nodeModulesPath, '/redux/dist/redux.min'),
    ],
    // 加载器
    loaders: [
      // less加载器
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      // babel加载器
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // 图片加载器（图片超过8k会自动转base64格式）
      {
        test: /\.(gif|jpg|png)$/,
        loader: "url?limit=8192&name=images/[name].[hash].[ext]",
      },
      // 加载icon字体文件
      {
        test: /\.(woff|svg|eot|ttf)$/,
        loader: 'url?limit=50000&name=fonts/[name].[hash].[ext]',
      },
    ],
  },
  // 外部依赖（不会打包到bundle.js里）
  externals: {
    'citys': 'Citys'
  },
  // 插件
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),  // 版本上线时开启
    new webpack.DefinePlugin({
      // 定义生产环境
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }), // 版本上线时开启
    // 公共部分会被抽离到vendor.js里
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    // 比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
    new webpack.optimize.OccurenceOrderPlugin(),
    // 允许错误不打断程序
    new webpack.NoErrorsPlugin(),
  ]
};