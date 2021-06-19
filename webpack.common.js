const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');

module.exports = {
  entry: {
    ['main-layout']: path.resolve(__dirname, 'src/app/main/main-layout/main-layout.ts'),
    ['example-page']: path.resolve(__dirname, 'src/app/main/pages/example-page/example-page.ts'),
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
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
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
    // alias: {
    //   'common': path.resolve(__dirname, 'src/app/common'),
    //   'modules': path.resolve(__dirname, 'node_modules')
    // }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html'
    // }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }]
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules'
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "src", "app", "main", "pages", "**", "*-page.hbs"),
      output: path.join(process.cwd(), "dist", "[name].html"),

      partials: [
        path.join(__dirname, "src", "**", "*.hbs")
      ]
    })
  ],
  // ...generateConfig('./src/app/main/pages')
};
