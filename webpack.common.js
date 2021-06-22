const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    ['main-page']: path.resolve(__dirname, 'src/app/main/pages/main-page/main-page.ts')
  },
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
              useRelativePath: true,
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isDevelopment
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader?url=false'
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
              postcssOptions: {
                autoprefixer: {
                  browsers: ['last 2 versions']
                },
                plugins: [
                  ['autoprefixer']
                ]
              }
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@common': path.resolve(__dirname, 'src', 'app', 'common'),
      'styles': path.resolve(__dirname, 'src', 'app', 'common', 'styles')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }]
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules'
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', 'app', 'main', 'pages', '**', '*-page.hbs'),
      output: path.join(process.cwd(), 'dist', '[name].html'),

      partials: [
        path.join(__dirname, 'src', '**', '*.hbs')
      ]
    })
  ]
};
