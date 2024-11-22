import uni from '@uni-helper/eslint-config'

export default uni(
  {
    unocss: true,
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      'no-console': 'off',
    },
  },
)
