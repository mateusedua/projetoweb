const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/pages/inicial.html',
    }),
  ],
};