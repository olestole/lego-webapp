/**
 * TODO: Enable commented recommended rules.
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    //'plugin:cypress/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    //'plugin:jsx-a11y/recommended',
    //'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    //'plugin:react-redux/recommended',
    'react-app',
    'react-app/jest',
    'prettier',
  ],
  globals: {
    log: true,
    expect: true,
    jest: true,
    __DEV__: true,
    __CLIENT__: true,
    cypress: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    babelOptions: {
      configFile: './.babelrc',
    },
  },
  plugins: [
    'cypress',
    'import',
    'jsx-a11y',
    'promise',
    'react',
    'react-hooks',
    'react-redux',
  ],
  ignorePatterns: ['mazemap/mazemap.min.*', '**/vendor/*.js'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-app/react/react-in-jsx-scope': 'off',
    'jest/valid-describe': 'off', // valid-describe was replaced by valid-describe-callback, but still needs its rule ...
    'jest/valid-describe-callback': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      webpack: {
        config: './config/webpack.client.js',
      },
    },
    react: {
      version: 'detect',
      flowVersion: '0.131.0',
    },
    jest: {
      version: require('jest/package.json').version,
    },
  },
};
