const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const nextPlugin = require('@next/eslint-plugin-next');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const globals = require('globals');

function allRulesAsWarnings(rules) {
  if (!rules) {
    return {};
  }
  const newRules = {};
  for (const rule in rules) {
    newRules[rule] = 'warn';
  }
  return newRules;
}

module.exports = [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
        ...allRulesAsWarnings(nextPlugin.configs.recommended.rules),
        ...allRulesAsWarnings(nextPlugin.configs['core-web-vitals'].rules),
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@next/next': nextPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...allRulesAsWarnings(typescriptPlugin.configs.recommended.rules),
      ...allRulesAsWarnings(nextPlugin.configs.recommended.rules),
      ...allRulesAsWarnings(nextPlugin.configs['core-web-vitals'].rules),
      ...allRulesAsWarnings(reactPlugin.configs.recommended.rules),
      ...allRulesAsWarnings(reactHooksPlugin.configs.recommended.rules),
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
  },
];

