module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@rocketseat/eslint-config/react'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
