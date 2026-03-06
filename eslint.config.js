import eslintConfigAgent from 'eslint-config-agent'

export default [
  {
    ignores: ['dist/'],
  },
  ...eslintConfigAgent,
  {
    rules: {
      'ddd/require-spec-file': 'off',
      'single-export/single-export': 'off',
      'import/order': 'off',
    },
  },
]
