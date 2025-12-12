const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@api': path.resolve(__dirname, 'src/api'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@stores': path.resolve(__dirname, 'src/store'),
    '@styles': path.resolve(__dirname, 'src/styles'),
    '@types': path.resolve(__dirname, 'src/types'),
  };

  return config;
};