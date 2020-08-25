const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules.unshift({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });

  return config;
};
