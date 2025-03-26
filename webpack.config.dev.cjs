// webpack.config.js
const {
  ModuleFederationPlugin
} = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {
  DefinePlugin
} = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/main.jsx', // or your main entry file
  output: {
    publicPath: 'auto',
    filename: '[name].bundle.js',
    // chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000, // Different port for each microfrontend
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell_app',
      remotes: {
        fe_expense_service: 'fe_expense_service@http://localhost:3002/remoteEntry.js', // Remote module and its URL
        fe_projects_service: 'fe_projects_service@https://oca-project-tracker.vercel.app/remoteEntry.js', // Remote module and its URL
        fe_oca_fun: 'fe_oca_fun@http://localhost:3003/remoteEntry.js', // Remote module and its URL
        // fe_projects_service: 'fe_projects_service@http://localhojst:3001/remoteEntry.js', // Remote module and its URL
        // app_1: 'app_1@http://localhost:3002/remoteEntry.js', // Remote module and its URL
      },
      exposes: {
        './context': './src/giraff/index.jsx', // Expose the context
        './project_context': './src/giraff/index.jsx', // Expose the context
        './cookies': './src/utils/cookies.jsx'
      },
      shared: {
        // Share dependencies here, like React
        react: {
          singleton: true,
          eager: true,
          requiredVersion: false
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: false
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: false
        },
      },
    }),
    new DefinePlugin({
      'process.env.VITE_API_AUTH_URL': JSON.stringify(process.env.VITE_API_AUTH_URL),
      'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon:'./oca_short_logo.png'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
  },
  module: {
    rules: [{
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Add loaders for CSS files
      },
      {
        test: /\.(scss|sass)$/, // Add this rule to handle SCSS files
        use: [
          'style-loader', // Inject CSS into the DOM
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Add loader for images and SVGs
      },
    ],
  },
};