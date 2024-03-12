module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  globals: {
    __DEV__: 'readonly',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-use-before-define': ['error', { variables: false }],
    'global-require': 0,
    'react/jsx-props-no-multi-spaces': 0,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unstable-nested-components': 0,
    'import/named': 0,
    'no-unused-vars': 0,
    'import/no-cycle': 0,
    'import/prefer-default-export': 0,
    'default-param-last': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
  },
};
