const pkg = require('./package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: pkg._moduleAliases,
      },
    ],
  ],
};
