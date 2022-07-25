module.exports = {
  root: true,
  extends: ['@react-native-community' /* 'airbnb' */],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'package.json',
    'package-lock.json',
    'README.md',
    'public/',
  ],
  rules: {
    'react/prop-types': 1,
    'no-console': 'off',
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'no-underscore-dangle': 0,
    'arrow-parens': 0,
  },
};
