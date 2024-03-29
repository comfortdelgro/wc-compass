const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PACKAGE = require('./package.json')
const version = PACKAGE.version

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    docs: './public/demo.js',
    compassDesign: '../../packages/wc-compass/src/index.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './public/bundled'),
    filename: 'main.js',
    library: 'wc-compass', // if you keen to have a name for library
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpe?g)$/,
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, './public/components')],
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'components/',
            },
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, './public/pages')],
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'pages/',
            },
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, './public/services')],
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'services/',
            },
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, './public/fragments')],
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'fragments/',
            },
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public/bundled'),
    filename: devMode ? '[name].min.js' : '[name].' + version + '.min',
    chunkFilename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].min.css' : '[name].' + version + '.min.css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
  ],
}
