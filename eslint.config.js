import js from '@eslint/js'
import ts from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier'
import globals from 'globals' // 1. Import globals package

export default [
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  // Core ESLint & TypeScript configs
  js.configs.recommended,
  ...ts.configs.recommended,
  // Vue 3 configs
  ...pluginVue.configs['flat/essential'],

  // Explicitly hook TypeScript parser into Vue files
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        parser: ts.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },

  // Custom overrides and environment settings
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 2. Enable browser global variables (document, window, etc.)
        ...globals.node, // Optional: Enables Node globals if needed
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  // Prettier config to override everything else (must be last)
  skipFormatting,
]
