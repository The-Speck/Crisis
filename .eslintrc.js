module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'linebreak-style': 0,
    'global-require': 0,
    'arrow-body-style': ['error', 'as-needed'],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
