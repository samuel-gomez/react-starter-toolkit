const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig = {
        ...webpackConfig,
        plugins: [
          ...webpackConfig.plugins.filter(element => {
            if (element.options) {
              return !element.options.hasOwnProperty('ignoreOrder');
            }
            return true;
          }),
          new MiniCssExtractPlugin({
            ignoreOrder: true,
          }),
          // new BundleAnalyzerPlugin(),
        ],
      };
      return webpackConfig;
    },
  },
};
