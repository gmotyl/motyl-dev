// Flat ESLint config. This file must be ESM: package.json sets "type": "module",
// so a `require`-based config here cannot load at all.
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

function allRulesAsWarnings(rules) {
  if (!rules) {
    return {};
  }
  const newRules = {};
  for (const rule in rules) {
    const setting = rules[rule];
    const level = Array.isArray(setting) ? setting[0] : setting;
    // Keep rules the upstream config deliberately disables. Blanket-warning them
    // re-enabled core rules that a plugin replaces — notably core no-unused-vars,
    // which typescript-eslint turns off in favour of its own TS-aware version.
    newRules[rule] = level === 'off' || level === 0 ? 'off' : 'warn';
  }
  return newRules;
}

export default [
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

